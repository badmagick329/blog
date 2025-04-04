'use client';

import { usePathname } from 'next/navigation';

import { ModeToggle } from './mode-toggle';
import NavbarLink from './navbar-link';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className='sticky top-0 z-10 flex flex-col border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-md'>
      <header className='flex justify-center gap-4 py-4'>
        <nav className='xs:text-xl flex justify-center gap-4 text-lg sm:gap-12 sm:text-2xl lg:gap-24'>
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
