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
      <div className='flex select-none items-center text-foreground/70'>
        {children}
      </div>
    );
  }
  return (
    <Link className='flex items-center hover:text-accent' href={href}>
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
        <Button className='sm:hidden' size='icon'>
          {ValidIcon(href)}
          <span className='sr-only'>{hrefAsValidPath}</span>
        </Button>
      ) : null}
      <span className='hidden sm:block'>{hrefAsValidPath}</span>
      {isActive ? (
        <span className='py-1 sm:hidden sm:py-0'>{pathText(pathname)}</span>
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
