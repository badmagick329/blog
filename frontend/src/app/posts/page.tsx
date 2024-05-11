import { posts } from '#site/content';
import MainHeading from '@/components/main-heading';
import PostItem from '@/components/post-item';

export const revalidate = 60;

export default async function BlogPosts() {
  const displayPosts = posts
    .filter((post) => {
      const today = new Date();
      const publishedAt = new Date(post.publishedAt);
      return publishedAt <= today;
    })
    .toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <main className='flex flex-1 flex-col'>
      <article className='flex w-full flex-col items-center gap-12 pt-8'>
        <MainHeading text='Blog Posts' withProse />
        <section className='flex flex-col items-center gap-12'>
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => {
              const { slug, title, description, publishedAt } = post;
              return (
                <PostItem
                  key={slug}
                  slug={slug}
                  title={title}
                  description={description}
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
