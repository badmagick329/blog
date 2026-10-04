import { copyGlobal, group, meta, text, textarea } from './shared';

const description =
  'Thoughts on words, creativity and the everyday moments that inspire my writing.';

export const Blog = copyGlobal({
  slug: 'blog',
  label: 'Blog',
  path: '/posts',
  description:
    'The blog page and the box at the end of every post. Posts themselves are under Posts.',
  fields: [
    text('heading', 'Blog Posts'),
    textarea(
      'intro',
      'A collection of things I’ve been thinking about, reading about or accidentally disappearing down a rabbit hole about. You’ll mostly find musings around creativity, words, work, and being human.'
    ),
    text('empty', 'No posts found', {
      description: 'Shown while there are no published posts.',
    }),
    group('coffee', 'Coffee machine', [
      text('title', 'Pour yourself a coffee'),
      text('empty', 'Your cup is empty. Pour one before you settle in.', {
        label: 'Empty cup',
      }),
      text('partFull', 'There’s some left from your last read. Top it up?', {
        label: 'Part-full cup',
      }),
      text('full', 'A full cup, still hot. Pick a post and settle in.', {
        label: 'Full cup',
      }),
      text('pouring', 'Pouring…'),
      text('pour', 'Pour a cup', { label: 'Button: empty cup' }),
      text('topUp', 'Top up', { label: 'Button: part-full cup' }),
      text('fullButton', 'Your cup is full', { label: 'Button: full cup' }),
    ]),
    group(
      'postEnd',
      'End of every post',
      [
        text('title', 'That’s the bottom of the cup'),
        text('text', 'Head back to the blog for a refill and another read.'),
        text('back', 'Back to the blog'),
        text('share', 'Share'),
      ],
      'The box readers reach as their coffee runs out.'
    ),
    meta('Blog Posts', description),
  ],
});
