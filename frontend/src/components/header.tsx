import Link from 'next/link';

import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <header className='container pt-4'>
      <nav className='flex justify-center gap-4 text-2xl md:gap-12 lg:gap-24'>
        <Link href='/'>Home</Link>
        <Link href='/blog'>Blog</Link>
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact</Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
