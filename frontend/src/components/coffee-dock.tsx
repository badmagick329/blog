'use client';

import CoffeeMug from '@/components/coffee-mug';
import {
  clampLevel,
  prefersReducedMotion,
  readCoffeeLevel,
  saveCoffeeLevel,
} from '@/lib/coffee';
import '@/styles/coffee.css';
import { useEffect, useState } from 'react';

// Spoken only; the cup itself shows the level, and the user asked for no
// visible text under it.
const describe = (v: number) =>
  v >= 0.95
    ? 'full'
    : v > 0.66
      ? 'three quarters left'
      : v > 0.4
        ? 'half left'
        : v > 0.15
          ? 'a quarter left'
          : v > 0.005
            ? 'one last sip'
            : 'empty';

// The cup on a post page that drains as the visitor scrolls. Remount it per
// post (key it by slug) so each post starts its own drain.
export default function CoffeeDock() {
  const [level, setLevel] = useState<number | null>(null);

  useEffect(() => {
    let current = readCoffeeLevel();
    let start = current;
    // Furthest point read; scrolling back up never refills the cup.
    let furthest = 0;
    let filling = false;
    let raf = 0;

    const commit = (v: number) => {
      current = v;
      setLevel(v);
      saveCoffeeLevel(v);
    };

    // Progress runs over the whole page, so the last sip lands exactly at the
    // bottom; measuring only the article emptied the cup too early.
    const progress = () => {
      const end = document.documentElement.scrollHeight - window.innerHeight;
      return end <= 0 ? 1 : clampLevel(window.scrollY / end);
    };

    const onScroll = () => {
      if (filling) return;
      const p = progress();
      if (p <= furthest) return;
      furthest = p;
      commit(p >= 0.995 ? 0 : start * (1 - p));
    };

    const finishFill = () => {
      filling = false;
      start = 1;
      commit(1);
      onScroll();
    };

    setLevel(current);
    // Most visitors land on a post from search or social and never see the
    // pour on /posts, so an empty cup is filled for them on arrival.
    if (current < 0.02) {
      if (prefersReducedMotion()) {
        finishFill();
      } else {
        filling = true;
        let last = performance.now();
        const frame = (now: number) => {
          current = Math.min(1, current + ((now - last) / 1000) * 1.4);
          last = now;
          setLevel(current);
          if (current >= 1) finishFill();
          else raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    // Docked in the screen corner on small screens, on a card so it reads over
    // the post text. From lg the post page places it in the photo's sticky
    // column, where it sits in flow on the page background, needs no card
    // (`.coffee-dock` in coffee.css), and is pushed to the column's
    // bottom-right corner.
    <div className='section-card coffee-dock fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-20 w-[4.2rem] px-1.5 py-2 sm:w-20 lg:static lg:mt-auto lg:w-24 lg:self-end lg:p-0'>
      <svg
        viewBox='14 -18 108 128'
        role='img'
        aria-label={`Coffee cup, ${describe(level ?? 0)}`}
        className='coffee-art block h-auto w-full'
      >
        <CoffeeMug level={level} hot />
      </svg>
    </div>
  );
}
