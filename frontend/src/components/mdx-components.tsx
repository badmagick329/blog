import { cn } from '@/lib/utils';
import Image from 'next/image';
import * as runtime from 'react/jsx-runtime';

import PostDate from './post-date';
import ShareButtons from './share-buttons';

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  ShareButtons,
  PostDate,
  h1: ({ className, ...props }: { className: string }) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
};

type MDXProps = {
  code: string;
};

export function MDXContent({ code }: MDXProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
