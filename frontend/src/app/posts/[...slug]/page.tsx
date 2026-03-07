import { posts } from '#site/content';
import MainHeading from '@/components/main-heading';
import BlogCoverImage from '@/components/blog-cover-image';
import { MDXContent } from '@/components/mdx-components';
import PostDate from '@/components/post-date';
import { postIsPublished } from '@/lib/utils';
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
  if (!post || !postIsPublished(post)) {
    return notFound();
  }

  return (
    <article className='container prose mx-auto max-w-3xl py-6 text-justify dark:prose-invert lg:prose-xl'>
      <div className='flex w-full justify-center'>
        <BlogCoverImage
          src={post.coverImage || ''}
          alt={post.title}
          width={800}
          height={800}
          priority
        />
      </div>
      <MainHeading
        text={post.title}
        className='!mb-0 text-start font-normal tracking-tight'
      />
      <PostDate date={post.publishedAt.split('T')[0]} />
      <MDXContent code={post.body} />
    </article>
  );
}
