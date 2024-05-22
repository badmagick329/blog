import { Button } from '@/components/ui/button';
import { Home, Mail, NotebookPen, User } from 'lucide-react';
import Link from 'next/link';

type ValidPath = 'Home' | 'Blog' | 'About' | 'Contact';
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
  const isActive = pathIsActive(pathname, hrefAsValidPath);
  console.log(
    `pathname: ${pathname}, pathText: ${hrefAsValidPath} isActive: ${isActive}`
  );
  return (
    <Link className='flex hover:text-foreground/60' href={href}>
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
  console.log('Returning pathIsActive: ', pathText(path) === validPath);
  return pathText(path) === validPath;
}
