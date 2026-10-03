import type { Metadata } from 'next';
import CoffeeStation from '@/components/coffee-station';
import MainHeading from '@/components/main-heading';
import PostItem from '@/components/post-item';
import { getVisiblePosts } from '@/lib/posts';

// Rendered per request from the database: images are built without database
// access, and new or scheduled posts then show up at once.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog Posts',
  description:
    'Thoughts on words, creativity and the everyday moments that inspire my writing.',
  alternates: {
    canonical: 'https://kristalomu.com/posts',
  },
  openGraph: {
    type: 'website',
    siteName: 'Krista Lomu',
    url: 'https://kristalomu.com/posts',
    title: 'Blog Posts',
    description:
      'Thoughts on words, creativity and the everyday moments that inspire my writing.',
  },
};

export default async function BlogPosts() {
  const displayPosts = await getVisiblePosts();

  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='container flex flex-1 flex-col items-center px-4 sm:px-6 md:px-8'
    >
      <div className='motion-fade-in w-full pt-8'>
        {/* Spacing goes on this wrapper: margins on the intro itself lose to
            lg:prose-lg, which zeroes the last paragraph's bottom margin. */}
        <div className='prose mx-auto mb-10 text-foreground lg:prose-lg'>
          <MainHeading text='Blog Posts' />
          <p className='text-center text-foreground/85'>
            A collection of things I’ve been thinking about, reading about or
            accidentally disappearing down a rabbit hole about. You’ll mostly
            find musings around creativity, words, work, and being human.
          </p>
        </div>
        {/* Posts beside a sticky coffee station from lg; on phones the
            station comes first so the reader can pour before picking. */}
        <div className='flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-12'>
          <article className='prose w-full text-foreground lg:prose-lg'>
            <section className='flex flex-col items-start gap-12 font-normal'>
              {displayPosts.length > 0 ? (
                displayPosts.map(({ id, slug, title, publishedAt, body }) => (
                  <PostItem
                    key={id}
                    slug={slug}
                    title={title}
                    body={body}
                    publishedAt={publishedAt}
                  />
                ))
              ) : (
                <p>No posts found</p>
              )}
            </section>
          </article>
          <div className='order-first w-full max-w-md lg:sticky lg:top-28 lg:order-none lg:w-72 lg:shrink-0'>
            <CoffeeStation />
          </div>
        </div>
      </div>
    </main>
  );
}
