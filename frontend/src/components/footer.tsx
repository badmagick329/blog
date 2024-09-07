'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className='flex flex-col items-center bg-background pb-4 pt-8'>
      <section className='flex items-center justify-center gap-1 text-center'>
        © Krista Lomu, {currentYear()} - Made by
        <a
          className='underline hover:text-accent'
          href='https://github.com/badmagick329'
          target='_blank'
        >
          badmagick
        </a>
        <p>-</p>
        <a className='underline hover:text-accent' href='/terms-of-use'>
          Terms of Use
        </a>
      </section>
      {pathname === '/' && (
        <section>
          Icons by{' '}
          <a
            className='underline hover:text-accent'
            href='https://www.flaticon.com/authors/smashingstocks'
            target='_blank'
          >
            smashingstocks
          </a>{' '}
          from Flaticon
        </section>
      )}
    </footer>
  );
}

function currentYear(): number {
  return new Date().getFullYear();
}
