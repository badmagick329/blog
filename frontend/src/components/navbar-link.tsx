import { Button } from '@/components/ui/button';
import { Home, Mail, User } from 'lucide-react';
import Link from 'next/link';

// type ValidPath = 'Home' | 'Blog' | 'About' | 'Contact';
type ValidPath = 'Home' | 'About' | 'Contact';
const pathToPathName = new Map<string, ValidPath>([
  ['/', 'Home'],
  // ['/posts', 'Blog'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]);

const pathToIcon = new Map<ValidPath, JSX.Element>([
  ['Home', <Home />],
  // ['Blog', <NotebookPen />],
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
  const isActive = pathIsActive(pathname, hrefAsValidPath);
  return (
    <Link className='flex items-center hover:text-accent' href={href}>
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
    </Link>
  );
}

function pathText(path: string): ValidPath {
  return pathToPathName.get(path) ?? 'Home';
}

function ValidIcon(path: string): JSX.Element {
  return pathToIcon.get(pathText(path)) ?? <Home />;
}

function pathIsActive(path: string, validPath: ValidPath): boolean {
  return pathText(path) === validPath;
}
