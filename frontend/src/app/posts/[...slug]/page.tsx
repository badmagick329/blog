import { posts } from '#site/content';
import type { Metadata } from 'next';
import MainHeading from '@/components/main-heading';
import BlogCoverImage from '@/components/blog-cover-image';
import CoffeeDock from '@/components/coffee-dock';
import { MDXContent } from '@/components/mdx-components';
import PostDate from '@/components/post-date';
import ShareButtons from '@/components/share-buttons';
import { postIsPublished } from '@/lib/utils';
import '@/styles/mdx.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const siteUrl = 'https://kristalomu.com';

type PostSlugProps = {
  params: {
    slug: string[];
  };
};

export const revalidate = 60;

async function getPostFromParams(params: PostSlugProps['params']) {
  const slug = params?.slug?.join('/');
  const post = posts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateMetadata({
  params,
}: PostSlugProps): Promise<Metadata> {
  const post = await getPostFromParams(params);
  if (!post || !postIsPublished(post)) {
    return {};
  }

  const postUrl = `${siteUrl}/posts/${post.slugAsParams}`;
  const description = post.description === 'none' ? undefined : post.description;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      siteName: 'Krista Lomu',
      url: postUrl,
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: post.coverImage, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export async function generateStaticParams(): Promise<
  PostSlugProps['params'][]
> {
  return posts
    .filter((post) => postIsPublished(post))
    .map((post) => ({
      slug: post.slugAsParams.split('/'),
    }));
}

export default async function PostSlug({ params }: PostSlugProps) {
  const post = await getPostFromParams(params);
  if (!post || !postIsPublished(post)) {
    return notFound();
  }

  return (
    <main id='main-content' tabIndex={-1}>
      <article className='container prose mx-auto max-w-3xl py-6 text-justify lg:prose-xl'>
        <div className='flex w-full justify-center'>
          <BlogCoverImage
            src={post.coverImage || ''}
            alt={post.title}
            width={800}
            height={800}
            seed={post.slugAsParams}
            priority
          />
        </div>
        <MainHeading
          text={post.title}
          className='!mb-0 text-start font-normal tracking-tight'
        />
        <PostDate date={post.publishedAt.split('T')[0]} />
        <MDXContent code={post.body} />
        <ShareButtons title={post.title} />
      </article>
      {/* The reader reaches this as the cup runs dry, so it sends them back
          to /posts, where the refill is. */}
      <div className='mx-auto w-full max-w-3xl pb-8 pt-8'>
        <section className='post-end flex flex-col items-center gap-3 rounded-2xl bg-secondary px-6 py-7 text-center text-secondary-foreground'>
          <h2 className='post-end-title text-3xl font-semibold leading-tight sm:text-4xl'>
            That’s the bottom of the cup
          </h2>
          <p className='text-lg'>
            Head back to the blog for a refill and another read.
          </p>
          <Link
            href='/posts'
            className='motion-lift rounded-full bg-accent px-6 py-2.5 text-lg text-accent-foreground hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            Back to the blog
          </Link>
        </section>
      </div>
      {/* Keyed by post, so moving between posts starts a fresh drain. */}
      <CoffeeDock key={post.slugAsParams} />
    </main>
  );
}
