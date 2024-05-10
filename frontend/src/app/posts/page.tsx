import { posts } from '#site/content';
import PostItem from '@/components/post-item';

export default async function BlogPosts() {
  const displayPosts = posts;

  return (
    <div className='container mx-auto'>
      <h1 className='text-4xl font-bold'>Blog Posts</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
      </div>
    </div>
  );
}
