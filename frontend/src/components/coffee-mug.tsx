'use client';

import { prefersReducedMotion } from '@/lib/coffee';
import { type SVGProps, useEffect, useId, useRef } from 'react';

// Mug geometry in its own units: the liquid surface moves between these
// heights.
const SURFACE_FULL = 36;
const SURFACE_EMPTY = 104;

export const surfaceFor = (level: number) =>
  SURFACE_EMPTY - level * (SURFACE_EMPTY - SURFACE_FULL);

// One wave period is 40 units; the CSS drift shifts by exactly one period so
// the loop is seamless.
const WAVE = (() => {
  let d = 'M-80 0 q10 -3.5 20 0';
  for (let x = -60; x < 200; x += 20) d += ' t20 0';
  return d;
})();

type CoffeeMugProps = {
  // null until the stored level is read; the mug shows empty until then and
  // snaps to the first real level instead of animating up to it.
  level: number | null;
  hot: boolean;
} & Omit<SVGProps<SVGGElement>, 'ref'>;

// The glass mug, drawn inside a parent <svg>. The shown level eases toward
// `level` each frame, so scroll jumps read as sips rather than jolts; it is
// written straight to the DOM to avoid a React render per frame.
export default function CoffeeMug({ level, hot, ...props }: CoffeeMugProps) {
  const clipId = `mug-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const groupRef = useRef<SVGGElement>(null);
  const levelRef = useRef<SVGGElement>(null);
  const target = useRef(level);
  const isHot = useRef(hot);
  target.current = level;
  isHot.current = hot;

  useEffect(() => {
    let shown: number | null = null;
    let drawn = '';
    let last = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const goal = target.current;
      if (goal !== null) {
        if (shown === null || prefersReducedMotion()) shown = goal;
        else shown += (goal - shown) * (1 - Math.exp(-dt * 7));
        if (Math.abs(goal - shown) < 0.0008) shown = goal;
        const y = surfaceFor(shown).toFixed(2);
        if (y !== drawn) {
          levelRef.current?.setAttribute('transform', `translate(0 ${y})`);
          drawn = y;
        }
      }
      groupRef.current?.classList.toggle(
        'is-hot',
        isHot.current && (shown ?? 0) > 0.04
      );
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <g ref={groupRef} {...props}>
      <defs>
        <clipPath id={clipId}>
          <path d='M28 30 L84 30 L81 92 Q80 100 72 100 L40 100 Q32 100 31 92 Z' />
        </clipPath>
      </defs>
      <g className='mug-steam'>
        <path d='M44 16 q-6 -6 0 -12 t0 -12' />
        <path d='M56 12 q-6 -6 0 -12 t0 -12' />
        <path d='M68 16 q-6 -6 0 -12 t0 -12' />
      </g>
      <path
        className='mug-glass'
        d='M88 38 C114 38 117 86 85 88 L86 78 C104 76 104 50 89 49 Z'
      />
      <path
        className='mug-glass'
        d='M22 24 L90 24 L86 94 Q85 106 72 106 L40 106 Q27 106 26 94 Z'
      />
      <g clipPath={`url(#${clipId})`}>
        <g ref={levelRef} transform={`translate(0 ${SURFACE_EMPTY})`}>
          <g className='mug-wave'>
            <path className='mug-coffee' d={`${WAVE} V90 H-80 Z`} />
            <path className='mug-crema' d={WAVE} />
          </g>
        </g>
      </g>
      <path className='mug-glint' d='M31 34 L34.5 86' />
    </g>
  );
}
