'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { MarqueeRowProps } from './types';

export function MarqueeRow({
  items,
  direction,
  duration = 18,
  gapClassName = 'gap-4',
  paddingClassName = 'py-2',
  renderItem,
}: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cycleRef = useRef<HTMLDivElement | null>(null);

  const [repeat, setRepeat] = useState(2);
  const marqueeClass = direction === 'left' ? 'marquee-left' : 'marquee-right';

  const cycle = useMemo(() => {
    const out: string[] = [];
    for (let r = 0; r < repeat; r++) {out.push(...items);}
    return out;
  }, [items, repeat]);

  const track = useMemo(() => [...cycle, ...cycle], [cycle]);

  useEffect(() => {
    const container = containerRef.current;
    const cycleEl = cycleRef.current;
    if (!container || !cycleEl) {return;}

    let raf = 0;

    const ensureFull = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const containerW = container.clientWidth;
        const cycleW = cycleEl.scrollWidth;
        const needed = containerW + 360;

        if (cycleW < needed) {setRepeat((r) => Math.min(r + 1, 160));}
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
    <div ref={containerRef} className="relative overflow-hidden">
      <div
        className="absolute -top-[9999px] left-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <div ref={cycleRef} className={`flex w-max ${gapClassName} ${paddingClassName}`}>
          {cycle.map((src, idx) => renderItem(src, idx, 'measure'))}
        </div>
      </div>

      <div
        className={`${marqueeClass} flex w-max ${gapClassName} ${paddingClassName}`}
        style={{ ['--dur' as any]: `${duration}s` }}
      >
        {track.map((src, idx) => renderItem(src, idx))}
      </div>
    </div>
  );
}
