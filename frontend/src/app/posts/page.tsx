import { posts } from '#site/content';
import MainHeading from '@/components/main-heading';
import PostItem from '@/components/post-item';
import { postIsPublished } from '@/lib/utils';

export const revalidate = 60;

export default async function BlogPosts() {
  const displayPosts = posts
    .filter((post) => postIsPublished(post))
    .toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <main className='flex flex-1 flex-col'>
      <article className='container prose pt-8 text-foreground dark:prose-invert lg:prose-lg'>
        <MainHeading text='Blog Posts' />
        <section className='flex flex-col items-start gap-12 font-normal'>
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => {
              const { slug, title, publishedAt, body } = post;
              return (
                <PostItem
                  key={slug}
                  slug={slug}
                  title={title}
                  description={body}
                  publishedAt={publishedAt}
                />
              );
            })
          ) : (
            <p>No posts found</p>
          )}
        </section>
      </article>
    </main>
  );
}
