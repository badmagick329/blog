import { doc, link, p } from '../lib/lexical';
import { copyGlobal, group, richText, text } from './shared';

// Copy shared by every page. The developer credit and the Flaticon
// attribution (a licence condition) stay in code, as does the error page:
// it shows when the server or database is failing, so it can't depend on
// them.
export const Site = copyGlobal({
  slug: 'site',
  label: 'Header, footer and 404',
  path: '/',
  fields: [
    text('name', 'Krista Lomu', {
      description:
        'The name in the header, the footer copyright and link previews.',
    }),
    group('nav', 'Menu', [
      text('home', 'Home'),
      text('about', 'About'),
      text('blog', 'Blog'),
      text('contact', 'Contact'),
    ]),
    group('footer', 'Footer', [text('terms', 'Terms of Use')]),
    group(
      'notFound',
      'Page not found (404)',
      [
        text('heading', 'You did it!'),
        text('subheading', 'You found the 404 page.'),
        richText(
          'body',
          doc(
            p(
              'If this wasn’t intentional, please return to the ',
              link('home page', '/'),
              ' and try again.'
            )
          )
        ),
      ],
      'Shown for addresses that don’t exist, such as a mistyped link.'
    ),
  ],
});
