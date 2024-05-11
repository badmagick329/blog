import { posts } from '#site/content';
import PostItem from '@/components/post-item';

export default async function BlogPosts() {
  const displayPosts = posts;

  return (
    <section className='container mx-auto py-6'>
      <h1 className='flex justify-center text-4xl font-bold'>Blog Posts</h1>
      <article className='container gap-4'>
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
      </article>
    </section>
  );
}
