'use client';

import { Button } from '@/components/ui/button';
import { Home, Mail, NotebookPen, User } from 'lucide-react';
import Link from 'next/link';

type ValidPath = 'Home' | 'Blog' | 'About' | 'Contact';
// type ValidPath = 'Home' | 'About' | 'Contact';
const pathToPathName = new Map<string, ValidPath>([
  ['/', 'Home'],
  ['/posts', 'Blog'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]);

const pathToIcon = new Map<ValidPath, JSX.Element>([
  ['Home', <Home />],
  ['Blog', <NotebookPen />],
  ['About', <User />],
  ['Contact', <Mail />],
]);

export default function NavbarLink({
  href,
  pathname,
}: {
  href: string;
  pathname: string;
}) {
  const hrefAsValidPath = pathText(href);

  if (hrefAsValidPath === undefined) {
    return (
      <LinkWrapper href={href} isActive>
        <LinkContent
          href={href}
          hrefAsValidPath={hrefAsValidPath}
          pathname={pathname}
          isActive
        />
      </LinkWrapper>
    );
  }

  const isActive = pathIsActive(pathname, hrefAsValidPath);

  return (
    <LinkWrapper isActive={isActive} href={href}>
      <LinkContent
        isActive={isActive}
        href={href}
        hrefAsValidPath={hrefAsValidPath}
        pathname={pathname}
      />
    </LinkWrapper>
  );
}

function LinkWrapper({
  isActive,
  href,
  children,
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}) {
  if (isActive) {
    return (
      <div className='relative flex select-none items-center text-foreground'>
        <span className='absolute -bottom-2 left-1/2 hidden h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent sm:block' />
        {children}
      </div>
    );
  }
  return (
    <Link
      className='relative flex items-center rounded-sm text-foreground/75 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      href={href}
    >
      {children}
    </Link>
  );
}

function LinkContent({
  isActive,
  href,
  hrefAsValidPath,
  pathname,
}: {
  isActive: boolean;
  href: string;
  hrefAsValidPath: ValidPath | undefined;
  pathname: string;
}) {
  return (
    <>
      {!isActive ? (
        <Button
          className='motion-lift hover:bg-foreground/1 dark:hover:bg-foreground/1 h-9 w-9 font-semibold hover:text-accent'
          variant='ghost'
          size='icon'
        >
          {ValidIcon(href)}
          <span className='sr-only'>{hrefAsValidPath}</span>
        </Button>
      ) : null}
      <span className='hidden text-center font-semibold tracking-wide sm:block'>
        {hrefAsValidPath}
      </span>
      {isActive ? (
        <span className='px-2 py-1 text-center text-lg font-semibold sm:hidden sm:py-0'>
          {pathText(pathname)}
        </span>
      ) : null}
    </>
  );
}

function pathText(path: string): ValidPath | undefined {
  return pathToPathName.get(path);
}

function ValidIcon(path: string): JSX.Element {
  const text = pathText(path);
  return text ? (pathToIcon.get(text) ?? <Home />) : <></>;
}

function pathIsActive(path: string, validPath: ValidPath): boolean {
  return pathText(path) === validPath;
}
