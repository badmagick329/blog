'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className='flex flex-col items-center pb-4 pt-8 text-sm sm:text-base'>
      <section className='flex items-center justify-center gap-1 text-center'>
        <span>© Krista Lomu, {currentYear()}</span>
        <p>-</p>
        <span>
          Made by{' '}
          <Link
            className='underline hover:text-accent'
            href='https://github.com/badmagick329'
            rel='noopener noreferrer'
            aria-label='Opens in new tab'
            target='_blank'
          >
            badmagick
          </Link>
        </span>
        <p>-</p>
        <span>
          <Link className='underline hover:text-accent' href='/terms-of-use'>
            Terms of Use
          </Link>
        </span>
      </section>
      {pathname === '/' && (
        <section>
          <span>Icons by </span>
          <Link
            className='underline hover:text-accent'
            href='https://www.flaticon.com/authors/smashingstocks'
            rel='noopener noreferrer'
            aria-label='Opens in new tab'
            target='_blank'
          >
            smashingstocks
          </Link>{' '}
          <span>from Flaticon</span>
        </section>
      )}
    </footer>
  );
}

function currentYear(): number {
  return new Date().getFullYear();
}
