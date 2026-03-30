'use client';

import { type NavLabel, navIconConfig } from '@/lib/nav-icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const pathToPathName = new Map<string, NavLabel>([
  ['/', 'Home'],
  ['/posts', 'Blog'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
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
        <LinkContent href={href} hrefAsValidPath={hrefAsValidPath} isActive />
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
  return (
    <Link
      className={cn(
        'relative flex items-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive ? 'text-foreground' : 'text-foreground/75 hover:text-accent'
      )}
      href={href}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && (
        <span
          aria-hidden='true'
          className='absolute -bottom-2 left-1/2 hidden h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent sm:block'
        />
      )}
      {children}
    </Link>
  );
}

function LinkContent({
  isActive,
  href,
  hrefAsValidPath,
}: {
  isActive: boolean;
  href: string;
  hrefAsValidPath: NavLabel | undefined;
}) {
  return (
    <>
      <span className='relative block sm:hidden'>
        <span
          className={cn(
            'motion-lift inline-flex h-9 w-9 items-center justify-center rounded-md font-semibold',
            isActive
              ? 'text-foreground hover:bg-transparent dark:hover:bg-transparent'
              : 'hover:bg-foreground/1 dark:hover:bg-foreground/1 hover:text-accent'
          )}
        >
          <MobileNavIcon path={href} isActive={isActive} />
          <span className='sr-only'>{hrefAsValidPath}</span>
        </span>
      </span>
      <span className='hidden text-center font-semibold tracking-wide sm:block sm:px-4'>
        {hrefAsValidPath}
      </span>
    </>
  );
}

function pathText(path: string): NavLabel | undefined {
  return pathToPathName.get(path);
}

function MobileNavIcon({
  path,
  isActive,
}: {
  path: string;
  isActive: boolean;
}) {
  const label = pathText(path);

  if (!label) {
    return null;
  }

  const icon = navIconConfig[label];

  return (
    <span className='flex h-6 w-6 items-center justify-center'>
      <Image
        className={cn(
          'h-auto w-auto object-contain transition-transform dark:invert',
          isActive ? 'scale-150' : 'scale-100',
          icon.mobileSizeClassName
        )}
        src={icon.image}
        width={24}
        height={24}
        alt=''
        aria-hidden='true'
        unoptimized
      />
    </span>
  );
}

function pathIsActive(path: string, validPath: NavLabel): boolean {
  return pathText(path) === validPath;
}
