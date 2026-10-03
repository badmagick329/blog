'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NavbarLink from './navbar-link';

export default function Header() {
  const pathname = usePathname();

  return (
    // transform-gpu gives the sticky bar its own compositor layer, so
    // transformed content (animated or tilted cards) can't paint over it
    // mid-scroll. Nothing inside is position: fixed, so the new containing
    // block is harmless.
    <div className='sticky top-0 z-10 flex transform-gpu flex-col border-b border-border/40 bg-background/75 backdrop-blur-md'>
      <header className='content-shell flex items-center justify-between gap-2 py-3 sm:py-4'>
        <Link
          href='/'
          className='site-wordmark shrink-0 rounded-sm text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-2xl'
        >
          Krista Lomu
        </Link>
        <nav
          aria-label='Primary navigation'
          className='flex items-center gap-0.5 text-lg sm:gap-2'
        >
          {/* The wordmark already links home; phones skip the duplicate. */}
          <span className='hidden sm:contents'>
            <NavbarLink href='/' pathname={pathname} />
          </span>
          <NavbarLink href='/about' pathname={pathname} />
          <NavbarLink href='/posts' pathname={pathname} />
          <NavbarLink href='/contact' pathname={pathname} variant='button' />
        </nav>
      </header>
    </div>
  );
}
