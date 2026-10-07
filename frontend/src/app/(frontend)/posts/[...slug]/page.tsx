import BlogCoverImage from '@/components/blog-cover-image';
import CoffeeDock from '@/components/coffee-dock';
import MainHeading from '@/components/main-heading';
import PostDate from '@/components/post-date';
import RichText from '@/components/rich-text';
import ShareButtons from '@/components/share-buttons';
import { getCopy } from '@/lib/content';
import { coverOf, getPost } from '@/lib/posts';
import { cn, isoDay } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const siteUrl = 'https://kristalomu.com';

type PostSlugProps = {
  params: Promise<{ slug: string[] }>;
};

// Rendered per request from the database: images are built without database
// access, and publishing, unpublishing or a scheduled day arriving then shows
// up at once.
export const dynamic = 'force-dynamic';

async function getPostFromParams(params: PostSlugProps['params']) {
  return getPost(decodeURIComponent((await params).slug.join('/')));
}

export async function generateMetadata({
  params,
}: PostSlugProps): Promise<Metadata> {
  const [post, site] = await Promise.all([
    getPostFromParams(params),
    getCopy('site'),
  ]);
  if (!post) {
    return {};
  }

  const postUrl = `${siteUrl}/posts/${post.slug}`;
  const description = post.description ?? undefined;
  const cover = coverOf(post);
  const coverUrl = cover && `${siteUrl}${cover.url}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      siteName: site.name,
      url: postUrl,
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      images: coverUrl ? [{ url: coverUrl, alt: cover.alt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: coverUrl ? [coverUrl] : undefined,
    },
  };
}

export default async function PostSlug({ params }: PostSlugProps) {
  const post = await getPostFromParams(params);
  if (!post) {
    return notFound();
  }
  const cover = coverOf(post);
  const { postEnd } = await getCopy('blog');

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
        <article className='section-card notebook-page notebook-page--long motion-fade-in readable-prose prose w-full min-w-0 px-6 py-8 text-foreground lg:prose-lg sm:px-8'>
          <header className='not-prose flex flex-col gap-1'>
            <MainHeading
              text={post.title}
              className='text-start font-normal tracking-tight'
            />
            <PostDate date={isoDay(post.publishedAt)} />
          </header>
          <div className='notebook-lines text-justify'>
            <RichText data={post.body} />
          </div>
        </article>
        <div
          className={cn(
            'order-first w-full max-w-md lg:sticky lg:top-28 lg:order-none lg:flex lg:h-[calc(100dvh-8.5rem)] lg:w-80 lg:shrink-0 lg:flex-col lg:gap-6 xl:w-96',
            // Without a photo the column holds only the fixed cup on small
            // screens, so it must not take up a row and a gap.
            !cover && 'max-lg:contents'
          )}
        >
          {cover && (
            <div className='motion-fade-in'>
              <BlogCoverImage
                src={cover.url}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                seed={post.slug}
                priority
              />
            </div>
          )}
          {/* Keyed by post, so moving between posts starts a fresh drain. */}
          <CoffeeDock key={post.slug} />
        </div>
      </div>
      {/* The visitor reaches this as the cup runs dry, so it sends them back
          to /posts, where the refill is. Sharing lives here too, off the
          paper. */}
      <div className='content-shell pt-10'>
        <section className='post-end mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl bg-secondary px-6 py-7 text-center text-secondary-foreground'>
          <h2 className='post-end-title text-3xl font-semibold leading-tight sm:text-4xl'>
            {postEnd.title}
          </h2>
          <p className='text-lg'>{postEnd.text}</p>
          <div className='flex flex-wrap items-center justify-center gap-3 pt-1'>
            <Link
              href='/posts'
              className={`${pill} bg-accent text-accent-foreground hover:bg-accent/90`}
            >
              {postEnd.back}
            </Link>
            <ShareButtons
              title={post.title}
              label={postEnd.share}
              className={`${pill} border-2 border-accent text-foreground hover:bg-accent/10`}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
