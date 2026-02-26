'use client';

import { Container } from '@/components/GeneralComponents/Container/Container';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '@/services/api';

type SeasonalProduct = {
  id: string;
  imageUrl?: string | null;
  active?: boolean;
  priority?: number;
};

type SeasonalListResponse = {
  items: SeasonalProduct[];
};

function fixSupabaseUrl(raw: string) {
  const cleaned = String(raw ?? '')
    .replace(/\u00A0/g, ' ')
    .trim();
  if (!cleaned) return '';

  // só faz o ajuste se for URL absoluta
  if (!/^https?:\/\//i.test(cleaned)) return cleaned;

  try {
    const u = new URL(cleaned);

    // ✅ re-encoda o pathname por segmento (evita encoding inconsistente)
    const parts = u.pathname
      .split('/')
      .map((seg) => decodeURIComponent(seg))
      .map((seg) => encodeURIComponent(seg));

    u.pathname = parts.join('/');

    return u.toString();
  } catch {
    return cleaned;
  }
}

function isValidHttpUrl(u: string) {
  try {
    const x = new URL(u);
    return x.protocol === 'http:' || x.protocol === 'https:';
  } catch {
    return false;
  }
}

async function probeImage(url: string): Promise<{ url: string; ok: boolean; status: number }> {
  try {
    // tenta HEAD primeiro
    const head = await fetch(url, { method: 'HEAD' });
    if (head.ok) return { url, ok: true, status: head.status };

    // fallback: alguns lugares não aceitam HEAD ou retornam 400/405
    const ranged = await fetch(url, {
      method: 'GET',
      headers: { Range: 'bytes=0-0' },
    });

    return { url, ok: ranged.ok, status: ranged.status };
  } catch {
    return { url, ok: false, status: 0 };
  }
}

function LogoItem({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur">
        <div className="h-7 w-7 rounded-md bg-white/10" />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur">
      <Image
        src={src}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
        onError={() => {
          setBroken(true);
          console.log('[seasonal] image render failed:', src);
        }}
        // Se você suspeitar do otimizador do Next, descomente:
        // unoptimized
      />
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration = 18,
}: {
  items: string[];
  direction: 'left' | 'right';
  duration?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cycleRef = useRef<HTMLDivElement | null>(null);

  const [repeat, setRepeat] = useState(2);
  const marqueeClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

  const cycle = useMemo(() => {
    const out: string[] = [];
    for (let r = 0; r < repeat; r++) out.push(...items);
    return out;
  }, [items, repeat]);

  const track = useMemo(() => [...cycle, ...cycle], [cycle]);

  useEffect(() => {
    const container = containerRef.current;
    const cycleEl = cycleRef.current;
    if (!container || !cycleEl) return;

    let raf = 0;

    const ensureFull = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const containerW = container.clientWidth;
        const cycleW = cycleEl.scrollWidth;
        const needed = containerW + 360;

        if (cycleW < needed) setRepeat((r) => Math.min(r + 1, 160));
      });
    };

    ensureFull();

    const ro = new ResizeObserver(() => ensureFull());
    ro.observe(container);
    ro.observe(cycleEl);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [cycle]);

  return (
    // ✅ removido "group" daqui (o hover agora fica no wrapper externo)
    <div ref={containerRef} className="relative overflow-hidden">
      <div
        className="absolute -top-[9999px] left-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <div ref={cycleRef} className="flex w-max gap-3 py-2">
          {cycle.map((src, idx) => (
            <LogoItem key={`measure-${src}-${idx}`} src={src} />
          ))}
        </div>
      </div>

      <div
        className={`${marqueeClass} flex w-max gap-3 py-2`}
        style={{ ['--dur' as any]: `${duration}s` }}
      >
        {track.map((src, idx) => (
          <LogoItem key={`${src}-${idx}`} src={src} />
        ))}
      </div>
    </div>
  );
}

export default function StatsHome() {
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        const { data } = await api.get<SeasonalListResponse>('/seasonal-products', {
          params: { page: 1, limit: 50 },
        });

        const items = data.items ?? [];
        const sorted = [...items].sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));

        // 1) pega URLs
        const urls = sorted
          .filter((p) => p.active !== false)
          .map((p) => String(p.imageUrl ?? '').trim())
          .filter(Boolean)
          .map(fixSupabaseUrl)
          .filter(isValidHttpUrl);

        // 2) dedupe + limita sample
        const unique = Array.from(new Set(urls));
        const sample = unique.slice(0, 20);

        // 3) testa quais funcionam
        const checks = await Promise.all(sample.map(probeImage));
        console.table(checks);

        const okUrls = checks.filter((c) => c.ok).map((c) => c.url);

        // 4) monta marquee só com válidas
        const limited = okUrls.slice(0, 14);
        const filled = limited.length >= 8 ? limited : [...limited, ...limited].slice(0, 12);

        if (alive) {
          setLogos(filled);
        }
      } catch (e: any) {
        if (alive) {
          setLogos([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const safeLogos = logos.length ? logos : ['/amarelo.png', '/amarelo.png', '/amarelo.png'];

  return (
    <section className="relative w-full overflow-hidden bg-radial-red-section">
      <Container>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-radial-white-center" />
          <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-radial-red-glow-top blur-[160px]" />
          <div className="absolute -bottom-28 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-radial-red-glow-bottom blur-[180px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-center text-sm text-white/90">
            Aproveite as promoções relampago {loading ? '(carregando...)' : ''}
          </p>

          <div className="mt-10 w-full rounded-2xl p-4 backdrop-blur">
            {/* ✅ "group" agora fica aqui para o hover pausar AMBAS as linhas */}
            <div className="marqueeMask group relative overflow-hidden rounded-2xl py-[10px]">
              <div className="space-y-3">
                {/* ✅ mais devagar: aumentei duration */}
                <MarqueeRow items={safeLogos} direction="right" duration={60} />
                <MarqueeRow items={safeLogos} direction="left" duration={74} />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* ✅ hover no wrapper externo pausa as animações */
          .group:hover :global(.marquee-left),
          .group:hover :global(.marquee-right) {
            animation-play-state: paused;
          }

          :global(.marquee-left) {
            animation: scroll-left var(--dur) linear infinite;
            will-change: transform;
          }

          :global(.marquee-right) {
            animation: scroll-right var(--dur) linear infinite;
            will-change: transform;
          }

          @keyframes scroll-left {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @keyframes scroll-right {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0);
            }
          }

          .marqueeMask {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 14%,
              black 86%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 14%,
              black 86%,
              transparent 100%
            );
          }

          @media (prefers-reduced-motion: reduce) {
            :global(.marquee-left),
            :global(.marquee-right) {
              animation: none;
              transform: none;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
