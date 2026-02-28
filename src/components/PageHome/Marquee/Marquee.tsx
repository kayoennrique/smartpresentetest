'use client';

import { useEffect, useState } from 'react';

import { Container } from '@/components/GeneralComponents/Container/Container';
import { api } from '@/services/api';

import { LogoItem } from './LogoItem/LogoItem';
import { MarqueeRow } from './MarqueeRow/MarqueeRow';
import type { SeasonalListResponse } from './types';

function fixSupabaseUrl(raw: string) {
  const cleaned = String(raw ?? '')
    .replace(/\u00A0/g, ' ')
    .trim();
  if (!cleaned) {return '';}

  if (!/^https?:\/\//i.test(cleaned)) {return cleaned;}

  try {
    const u = new URL(cleaned);

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
    const head = await api.request({
      url,
      method: 'HEAD',
      baseURL: '',
      timeout: 8000,
      validateStatus: () => true,
    });

    if (head.status >= 200 && head.status < 300) {
      return { url, ok: true, status: head.status };
    }

    const ranged = await api.request({
      url,
      method: 'GET',
      baseURL: '',
      timeout: 8000,
      headers: { Range: 'bytes=0-0' },
      validateStatus: () => true,
    });

    return { url, ok: ranged.status >= 200 && ranged.status < 300, status: ranged.status };
  } catch {
    return { url, ok: false, status: 0 };
  }
}

export default function Marquee() {
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

        const urls = sorted
          .filter((p) => p.active !== false)
          .map((p) => String(p.imageUrl ?? '').trim())
          .filter(Boolean)
          .map(fixSupabaseUrl)
          .filter(isValidHttpUrl);

        const unique = Array.from(new Set(urls));
        const sample = unique.slice(0, 20);

        const checks = await Promise.all(sample.map(probeImage));
        console.table(checks);

        const okUrls = checks.filter((c) => c.ok).map((c) => c.url);

        const limited = okUrls.slice(0, 14);
        const filled = limited.length >= 8 ? limited : [...limited, ...limited].slice(0, 12);

        if (alive) {setLogos(filled);}
      } catch {
        if (alive) {setLogos([]);}
      } finally {
        if (alive) {setLoading(false);}
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const safeLogos = logos.length > 0 ? logos : ['/amarelo.png', '/amarelo.png', '/amarelo.png'];

  return (
    <section className="relative w-full overflow-hidden bg-radial-red-section">
      <Container>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-radial-white-center" />
          <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-radial-red-glow-top blur-[160px]" />
          <div className="absolute -bottom-28 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-radial-red-glow-bottom blur-[180px]" />
        </div>

        <div className="relative mx-auto py-8">
          <h1 className="font-sora text-[1.75rem] md:text-[2rem] font-semibold leading-tight text-left text-white">
            Promoções relâmpago {loading ? 'carregando...' : ''}
          </h1>

          <div className="mt-10 w-full rounded-2xl p-4 backdrop-blur">
            <div className="marqueeMask group relative overflow-hidden rounded-2xl py-[10px]">
              <MarqueeRow
                items={safeLogos}
                direction="right"
                duration={250}
                gapClassName="gap-4"
                paddingClassName="py-2"
                renderItem={(src, idx, prefix) => (
                  <LogoItem key={`${prefix ? `${prefix}-` : ''}${src}-${idx}`} src={src} />
                )}
              />
            </div>
          </div>
        </div>

        <style jsx>{`
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
