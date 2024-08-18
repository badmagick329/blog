'use client';

import { FontsType } from '@/app/layout';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

import { ModeToggle } from './mode-toggle';
import NavbarLink from './navbar-link';

type Props = {
  fonts: FontsType;
  chosenFont: keyof FontsType;
  setChosenFont: Dispatch<SetStateAction<keyof FontsType>>;
};

export default function Header({ fonts, chosenFont, setChosenFont }: Props) {
  const pathname = usePathname();

  return (
    <div className='flex flex-col'>
      <header className='flex justify-center gap-4 pt-4'>
        <nav className='xs:text-xl flex justify-center gap-4 text-lg sm:gap-12 sm:text-2xl lg:gap-24'>
          <NavbarLink href='/' pathname={pathname} />
          <NavbarLink href='/posts' pathname={pathname} />
          <NavbarLink href='/about' pathname={pathname} />
          <NavbarLink href='/contact' pathname={pathname} />
          <ModeToggle />
        </nav>
      </header>
      {/* <section className='flex justify-center gap-4 pt-4'>
        <select
          value={chosenFont}
          onChange={(e) => {
            setChosenFont(e.target.value as keyof FontsType);
          }}
        >
          {Object.keys(fonts).map((k) => {
            return (
              <option key={k} value={k}>
                {k}
              </option>
            );
          })}
        </select>
      </section> */}
    </div>
  );
}
