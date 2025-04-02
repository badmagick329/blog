'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className='flex flex-col items-center bg-background pb-4 pt-8'>
      <section className='flex items-center justify-center gap-1 text-center'>
        © Krista Lomu, {currentYear()} - Made by
        <Link
          className='underline hover:text-accent'
          href='https://github.com/badmagick329'
          rel='noopener noreferrer'
          aria-label='Opens in new tab'
          target='_blank'
        >
          badmagick
        </Link>
        <p>-</p>
        <Link className='underline hover:text-accent' href='/terms-of-use'>
          Terms of Use
        </Link>
      </section>
      {pathname === '/' && (
        <section>
          Icons by{' '}
          <Link
            className='underline hover:text-accent'
            href='https://www.flaticon.com/authors/smashingstocks'
            rel='noopener noreferrer'
            aria-label='Opens in new tab'
            target='_blank'
          >
            smashingstocks
          </Link>{' '}
          from Flaticon
        </section>
      )}
    </footer>
  );
}

function currentYear(): number {
  return new Date().getFullYear();
}
