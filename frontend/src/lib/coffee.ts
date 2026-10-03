// Coffee-cup reading: the reader pours a cup on /posts and it drains as they
// scroll a post. The level (0 empty, 1 full) is the only state shared between
// pages, so it lives in localStorage.

const KEY = 'coffee-break-level';

export const clampLevel = (v: number) => Math.min(1, Math.max(0, v));

// Storage can be unavailable (private windows) or hold anything a visitor put
// there, so a missing or invalid value means an empty cup.
export function readCoffeeLevel(): number {
  try {
    const v = parseFloat(localStorage.getItem(KEY) ?? '');
    return Number.isFinite(v) ? clampLevel(v) : 0;
  } catch {
    return 0;
  }
}

export function saveCoffeeLevel(level: number) {
  try {
    localStorage.setItem(KEY, level.toFixed(3));
  } catch {}
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
