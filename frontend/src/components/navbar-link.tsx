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
  label,
  pathname,
  variant = 'link',
}: {
  href: string;
  /** Editable copy; the icon and active state still key off `href`. */
  label: string;
  pathname: string;
  /** The filled call-to-action follows the mobile icon / desktop label layout. */
  variant?: 'link' | 'button';
}) {
  const hrefAsValidPath = pathText(href);

  if (variant === 'button') {
    const isActive =
      hrefAsValidPath !== undefined && pathIsActive(pathname, hrefAsValidPath);
    return (
      <Link
        className='site-nav-cta motion-lift ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent font-semibold text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:ml-2 sm:h-auto sm:w-auto sm:px-5 sm:py-1.5'
        href={href}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className='sm:hidden'>
          <MobileNavIcon
            path={href}
            isActive={isActive}
            className='brightness-0 drop-shadow-[0.3px_0_0_hsl(var(--accent-foreground))] invert'
          />
        </span>
        <span className='sr-only sm:not-sr-only'>{label}</span>
      </Link>
    );
  }

  if (hrefAsValidPath === undefined) {
    return (
      <LinkWrapper href={href} isActive>
        <LinkContent href={href} label={label} isActive />
      </LinkWrapper>
    );
  }

  const isActive = pathIsActive(pathname, hrefAsValidPath);

  return (
    <LinkWrapper isActive={isActive} href={href}>
      <LinkContent isActive={isActive} href={href} label={label} />
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
  label,
}: {
  isActive: boolean;
  href: string;
  label: string;
}) {
  return (
    <>
      <span className='relative block sm:hidden'>
        <span
          className={cn(
            'motion-lift inline-flex h-9 w-9 items-center justify-center rounded-md font-semibold',
            isActive
              ? 'text-foreground hover:bg-transparent'
              : 'hover:bg-foreground/1 hover:text-accent'
          )}
        >
          <MobileNavIcon path={href} isActive={isActive} />
          <span className='sr-only'>{label}</span>
        </span>
      </span>
      <span className='hidden text-center font-semibold tracking-wide sm:block sm:px-4'>
        {label}
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
  className,
}: {
  path: string;
  isActive: boolean;
  className?: string;
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
          'h-auto w-auto object-contain transition-transform',
          isActive ? 'scale-150' : 'scale-100',
          icon.mobileSizeClassName,
          className
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
