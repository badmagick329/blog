'use client';

import CoffeeMug, { surfaceFor } from '@/components/coffee-mug';
import {
  prefersReducedMotion,
  readCoffeeLevel,
  saveCoffeeLevel,
} from '@/lib/coffee';
import { cn } from '@/lib/utils';
import '@/styles/coffee.css';
import { useEffect, useRef, useState } from 'react';

// Scene coordinates: where the stream starts (hidden behind the spout) and how
// the mug is placed under it.
const SPOUT_Y = 106;
const MUG_Y = 140;
const MUG_SCALE = 1.15;
// A full pour takes about three seconds; a part-full cup tops up only the
// difference, so it takes proportionally less.
const START_S = 0.28;
const END_S = 0.35;
const POUR_RATE = 0.36;

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

// The coffee machine on /posts, where the reader pours a cup before reading.
export type CoffeeCopy = {
  title: string;
  empty: string;
  partFull: string;
  full: string;
  pouring: string;
  pour: string;
  topUp: string;
  fullButton: string;
};

export default function CoffeeStation({ copy }: { copy: CoffeeCopy }) {
  const [level, setLevel] = useState<number | null>(null);
  const [pouring, setPouring] = useState(false);
  const levelRef = useRef(0);
  const streamRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    levelRef.current = readCoffeeLevel();
    setLevel(levelRef.current);
  }, []);

  useEffect(() => {
    if (!pouring) return;
    const stream = streamRef.current;
    let phase: 'start' | 'fill' | 'end' = 'start';
    let t = 0;
    let last = performance.now();
    let raf = 0;

    // The stream grows down from the spout, then its top falls into the cup.
    const drawStream = () => {
      const surface =
        MUG_Y + MUG_SCALE * Math.min(surfaceFor(levelRef.current), 99) - 1;
      let top = SPOUT_Y;
      let bottom = surface;
      if (phase === 'start')
        bottom = SPOUT_Y + (surface - SPOUT_Y) * easeOut(t / START_S);
      if (phase === 'end')
        top = SPOUT_Y + (surface - SPOUT_Y) * easeOut(t / END_S);
      stream?.setAttribute('y', top.toFixed(1));
      stream?.setAttribute('height', Math.max(0, bottom - top).toFixed(1));
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (phase === 'start' && t >= START_S) {
        phase = 'fill';
        t = 0;
      } else if (phase === 'fill') {
        levelRef.current = Math.min(1, levelRef.current + dt * POUR_RATE);
        setLevel(levelRef.current);
        if (levelRef.current >= 1) {
          phase = 'end';
          t = 0;
        }
      } else if (phase === 'end' && t >= END_S) {
        setPouring(false);
        return;
      }
      drawStream();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Also runs if the reader leaves mid-pour, so what was poured is kept.
    return () => {
      cancelAnimationFrame(raf);
      stream?.setAttribute('height', '0');
      saveCoffeeLevel(levelRef.current);
    };
  }, [pouring]);

  const full = level !== null && level >= 0.99;
  const partFull = level !== null && level > 0.005;

  function startPour() {
    if (pouring || level === null || full) return;
    if (prefersReducedMotion()) {
      levelRef.current = 1;
      setLevel(1);
      saveCoffeeLevel(1);
      return;
    }
    setPouring(true);
  }

  const status =
    level === null
      ? ''
      : pouring
        ? copy.pouring
        : full
          ? copy.full
          : partFull
            ? copy.partFull
            : copy.empty;
  const label = pouring
    ? copy.pouring
    : full
      ? copy.fullButton
      : partFull
        ? copy.topUp
        : copy.pour;

  // Phones: drawing left, text beside it. From lg: a narrow column, centred.
  return (
    <aside
      aria-label='Coffee'
      className='section-card grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-2 p-4 lg:grid-cols-1 lg:justify-items-center lg:gap-y-3 lg:px-5 lg:py-6 lg:text-center'
    >
      <svg
        viewBox='8 16 244 268'
        aria-hidden='true'
        onClick={startPour}
        className='coffee-art row-span-3 block h-auto w-full cursor-pointer lg:row-span-1 lg:max-w-[14rem]'
      >
        {/* Behind the spout and mug, so the stream appears from the nozzle
            and disappears into the coffee. */}
        <rect
          ref={streamRef}
          className='m-stream'
          x='89'
          y='106'
          width='6'
          height='0'
          rx='3'
        />
        <rect
          className='m-lid m-line'
          x='62'
          y='26'
          width='146'
          height='20'
          rx='9'
        />
        <path
          className='m-body m-line'
          d='M56 40 H214 Q230 40 230 56 V264 H170 V114 Q170 100 156 100 H56 Q40 100 40 84 V56 Q40 40 56 40 Z'
        />
        <path className='m-spout m-line' d='M78 99 H106 L101 110 H83 Z' />
        <rect
          className='m-window m-line'
          x='184'
          y='118'
          width='32'
          height='68'
          rx='8'
        />
        <path
          className='m-water'
          d='M188 142 H212 V178 Q212 182 208 182 H192 Q188 182 188 178 Z'
        />
        <circle className='m-dial m-line' cx='200' cy='214' r='11' />
        <path className='m-pointer' d='M200 214 V206' />
        <circle
          className={cn('m-lamp', pouring && 'on')}
          cx='200'
          cy='240'
          r='4.5'
        />
        <rect
          className='m-base m-line'
          x='18'
          y='262'
          width='224'
          height='16'
          rx='8'
        />
        <CoffeeMug
          level={level}
          hot={!pouring}
          transform={`translate(27.6 ${MUG_Y}) scale(${MUG_SCALE})`}
        />
      </svg>
      <h2 className='display-script m-0 text-3xl leading-none lg:text-4xl'>
        {copy.title}
      </h2>
      <p
        aria-live='polite'
        className='m-0 text-base text-foreground/75 lg:min-h-[3.2em]'
      >
        {status}
      </p>
      <button
        type='button'
        onClick={startPour}
        disabled={pouring || level === null || full}
        className='motion-lift justify-self-start rounded-md bg-accent px-5 py-2 font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-50 lg:justify-self-center'
      >
        {label}
      </button>
    </aside>
  );
}
