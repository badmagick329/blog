'use client';

import { usePathname } from 'next/navigation';

import { ModeToggle } from './mode-toggle';
import NavbarLink from './navbar-link';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className='sticky top-0 z-10 flex flex-col border-b border-border/40 bg-background/75 backdrop-blur-md'>
      <header className='content-shell flex items-center justify-center py-3 sm:py-4'>
        <nav className='2xs:gap-4 flex w-full items-center justify-center text-lg sm:gap-6 sm:text-xl'>
          <NavbarLink href='/' pathname={pathname} />
          <NavbarLink href='/about' pathname={pathname} />
          <NavbarLink href='/posts' pathname={pathname} />
          <NavbarLink href='/contact' pathname={pathname} />
          <ModeToggle />
        </nav>
      </header>
    </div>
  );
}
