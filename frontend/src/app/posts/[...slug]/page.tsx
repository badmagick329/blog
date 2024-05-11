import { posts } from '#site/content';
import { MDXContent } from '@/components/mdx-components';
import '@/styles/mdx.css';
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
  // TODO: Add logic for handling publishedAt
  if (!post || !post.publishedAt) {
    return notFound();
  }

  return (
    <article className='prose dark:prose-invert lg:prose-xl container mx-auto max-w-3xl py-6'>
      <h1 className='mb-2 text-2xl font-semibold'>{post.title}</h1>
      <p className='text-foreground'>{post.publishedAt}</p>
      {post.description ? (
        <p className='text-muted-foreground mt-0 text-xl'>{post.description}</p>
      ) : null}
      <hr className='my-4' />
      <MDXContent code={post.body} />
    </article>
  );
}
