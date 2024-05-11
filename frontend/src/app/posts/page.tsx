import { posts } from '#site/content';
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
      <article className='flex w-full flex-col items-center'>
        <div className='prose dark:prose-invert lg:prose-lg'>
          <h1 className='py-4 text-center text-4xl font-bold'>Blog Posts</h1>
        </div>
        <section className='container'>
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
