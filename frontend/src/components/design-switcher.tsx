'use client';

import { designs } from '@/lib/designs';
import '@/styles/designs/index.css';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'design-lab';
const FONTS_LINK_ID = 'design-lab-fonts';
// Empty id means the current production look: no data-design attribute.
const BASELINE = '';

function isKnown(id: string) {
  return id === BASELINE || designs.some((design) => design.id === id);
}

/**
 * Dev-only picker for trying candidate designs on the running dev server.
 * `?design=<id>` selects one directly; the last choice persists across
 * reloads.
 */
export default function DesignSwitcher() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('design');
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = [fromUrl, stored].find(
      (id): id is string => id !== null && isKnown(id)
    );
    setActive(initial ?? BASELINE);
  }, []);

  useEffect(() => {
    if (active === null) return;

    const root = document.documentElement;
    if (active) root.dataset.design = active;
    else delete root.dataset.design;
    localStorage.setItem(STORAGE_KEY, active);

    const fontsHref = designs.find((design) => design.id === active)?.fontsHref;
    let link = document.getElementById(FONTS_LINK_ID) as HTMLLinkElement | null;
    if (!fontsHref) {
      link?.remove();
      return;
    }
    if (!link) {
      link = document.createElement('link');
      link.id = FONTS_LINK_ID;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = fontsHref;
  }, [active]);

  if (active === null) return null;

  return (
    <label className='fixed bottom-3 left-3 z-50 flex items-center gap-2 rounded-md bg-black/80 px-3 py-2 font-sans text-sm text-white shadow-lg'>
      Design
      <select
        className='rounded bg-white/10 px-1 py-0.5 text-white'
        value={active}
        onChange={(event) => setActive(event.target.value)}
      >
        <option className='text-black' value={BASELINE}>
          Current
        </option>
        {designs.map((design) => (
          <option className='text-black' key={design.id} value={design.id}>
            {design.name}
          </option>
        ))}
      </select>
    </label>
  );
}
