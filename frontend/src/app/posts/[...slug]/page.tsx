import { posts } from '#site/content';
import type { Metadata } from 'next';
import MainHeading from '@/components/main-heading';
import BlogCoverImage from '@/components/blog-cover-image';
import CoffeeDock from '@/components/coffee-dock';
import { MDXContent } from '@/components/mdx-components';
import PostDate from '@/components/post-date';
import ShareButtons from '@/components/share-buttons';
import { cn, postIsPublished } from '@/lib/utils';
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

  const pill =
    'motion-lift inline-flex items-center rounded-full px-6 py-2.5 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  return (
    <main id='main-content' tabIndex={-1} className='page-shell'>
      {/* The post is written on notebook paper. From lg its cover photo sits
          beside the sheet in a sticky column as tall as the screen, photo at
          the top and the coffee cup in the column's bottom-right corner. On
          smaller screens the photo goes above the sheet, where the column
          would get too narrow, and the cup docks in the screen corner. The fade sits
          on the children, not this row: an animating transform here would
          briefly pin the fixed cup to the row instead of the screen. */}
      <div className='content-shell flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-12'>
        <article className='section-card notebook-page notebook-page--long motion-fade-in prose readable-prose w-full min-w-0 px-6 py-8 text-foreground sm:px-8 lg:prose-lg'>
          <header className='not-prose flex flex-col gap-1'>
            <MainHeading
              text={post.title}
              className='text-start font-normal tracking-tight'
            />
            <PostDate date={post.publishedAt.split('T')[0]} />
          </header>
          <div className='notebook-lines text-justify'>
            <MDXContent code={post.body} />
          </div>
        </article>
        <div
          className={cn(
            'order-first w-full max-w-md lg:sticky lg:top-28 lg:order-none lg:flex lg:h-[calc(100dvh-8.5rem)] lg:w-80 lg:shrink-0 lg:flex-col lg:gap-6 xl:w-96',
            // Without a photo the column holds only the fixed cup on small
            // screens, so it must not take up a row and a gap.
            !post.coverImage && 'max-lg:contents'
          )}
        >
          {post.coverImage && (
            <div className='motion-fade-in'>
              <BlogCoverImage
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={800}
                seed={post.slugAsParams}
                priority
              />
            </div>
          )}
          {/* Keyed by post, so moving between posts starts a fresh drain. */}
          <CoffeeDock key={post.slugAsParams} />
        </div>
      </div>
      {/* The reader reaches this as the cup runs dry, so it sends them back
          to /posts, where the refill is. Sharing lives here too, off the
          paper. */}
      <div className='content-shell pt-10'>
        <section className='post-end mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl bg-secondary px-6 py-7 text-center text-secondary-foreground'>
          <h2 className='post-end-title text-3xl font-semibold leading-tight sm:text-4xl'>
            That’s the bottom of the cup
          </h2>
          <p className='text-lg'>
            Head back to the blog for a refill and another read.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3 pt-1'>
            <Link
              href='/posts'
              className={`${pill} bg-accent text-accent-foreground hover:bg-accent/90`}
            >
              Back to the blog
            </Link>
            <ShareButtons
              title={post.title}
              className={`${pill} border-2 border-accent text-foreground hover:bg-accent/10`}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
