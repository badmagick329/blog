import { doc, p } from '../lib/lexical';
import { copyGlobal, meta, richText, text } from './shared';

export const Home = copyGlobal({
  slug: 'home',
  label: 'Home',
  path: '/',
  fields: [
    text('greeting', 'Lovely to see you.'),
    text('heading', 'I’m Krista, a freelance content and copywriter.'),
    richText(
      'intro',
      doc(
        p(
          'Give me a tricky topic, a complicated problem and a strong coffee, and I’m happy.'
        ),
        p(
          'I turn ideas, thoughts and data into content strategies, campaigns and words that give people a reason to pay attention.'
        )
      )
    ),
    text('aboutButton', 'About me', {
      description: 'Links to the About page.',
    }),
    text('contactLink', 'Let’s talk', {
      description: 'Links to the Contact page.',
    }),
    text('latestLabel', 'Latest entry', {
      description: 'Above the newest post’s title on its photo.',
    }),
    meta(
      'Home',
      'Explore the world of a professional freelance content and copywriter. Get in touch to transform your next writing or marketing project.'
    ),
  ],
});
