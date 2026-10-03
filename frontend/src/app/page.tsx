import { posts } from '#site/content';
import BlogCoverImage from '@/components/blog-cover-image';
import { cn, postIsPublished } from '@/lib/utils';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';

// The latest post depends on today's date (scheduled posts), so re-render
// periodically like the posts list does.
export const revalidate = 60;

const euphoria_script = localFont({
  src: '../fonts/EuphoriaScript-Regular.ttf',
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Explore the world of a professional freelance content and copywriter. Get in touch to transform your next writing or marketing project.',
};

export default function Home() {
  // Newest published post that has a cover; the hero shows it as a polaroid.
  const latestPost = posts
    .filter((post) => postIsPublished(post) && post.coverImage)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];

  // main fills the space between header and footer; the article centres the
  // hero in it vertically.
  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='page-shell flex flex-col'
    >
      <article className='content-shell motion-fade-in flex w-full flex-1 flex-col items-center justify-center gap-12'>
        {/* Intro left, latest post right; stacks intro-first below md. */}
        <section className='home-hero grid w-full items-center gap-12 py-2 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,27rem)]'>
          <div className='home-intro flex flex-col items-start gap-4'>
            <p
              className={cn(
                'text-3xl sm:text-4xl',
                euphoria_script.className,
                'display-script'
              )}
            >
              Lovely to see you.
            </p>
            <h1 className='max-w-[16ch] text-balance py-2 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl'>
              I’m Krista, a freelance content and copywriter.
            </h1>
            <p className='readable-prose text-base text-foreground/85 sm:text-lg'>
              Go ahead and explore my little website.
            </p>
          </div>
          {latestPost && (
            <div className='relative mx-auto w-full max-w-xs px-4 pt-6 md:max-w-none md:px-0'>
              <Link
                href={`/posts/${latestPost.slugAsParams}`}
                className='home-latest motion-lift relative block rounded-sm hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4'
              >
                <BlogCoverImage
                  src={latestPost.coverImage}
                  alt=''
                  width={800}
                  height={560}
                  seed={latestPost.slugAsParams}
                  priority
                  compact
                  rotate={3.5}
                  caption={
                    <>
                      <span className='block text-xs uppercase tracking-[0.2em] text-foreground/60'>
                        Latest entry
                      </span>
                      <span
                        className={cn(
                          'block text-2xl sm:text-3xl',
                          euphoria_script.className,
                          'display-script'
                        )}
                      >
                        {latestPost.title}&nbsp;→
                      </span>
                    </>
                  }
                />
              </Link>
            </div>
          )}
        </section>
      </article>
    </main>
  );
}
