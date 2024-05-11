import Link from 'next/link';

import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <header className='container pt-4'>
      <nav className='xs:text-xl flex justify-center gap-4 text-lg sm:gap-12 sm:text-2xl lg:gap-24'>
        <Link className='hover:text-foreground/60' href='/'>
          Home
        </Link>
        <Link className='hover:text-foreground/60' href='/posts'>
          Blog
        </Link>
        <Link className='hover:text-foreground/60' href='/about'>
          About
        </Link>
        <Link className='hover:text-foreground/60' href='/contact'>
          Contact
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
