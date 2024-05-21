import { posts } from '#site/content';
import { MDXContent } from '@/components/mdx-components';
import { postIsPublished } from '@/lib/utils';
import '@/styles/mdx.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type PostSlugProps = {
  params: {
    slug: string[];
  };
};

async function getPostFromParams(params: PostSlugProps['params']) {
  const slug = params?.slug?.join('/');
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateStaticParams(): Promise<
  PostSlugProps['params'][]
> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default async function PostSlug({ params }: PostSlugProps) {
  const post = await getPostFromParams(params);
  if (!post || !postIsPublished(post)) {
    return notFound();
  }

  return (
    <article className='prose dark:prose-invert lg:prose-xl container mx-auto max-w-3xl py-6'>
      <Image
        src={post.coverImage || ''}
        alt='coverImage'
        width={600}
        height={600}
      />
      <MDXContent code={post.body} />
    </article>
  );
}
