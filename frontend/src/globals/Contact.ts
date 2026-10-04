import { doc, p } from '../lib/lexical';
import { copyGlobal, group, meta, richText, text, textarea } from './shared';

export const Contact = copyGlobal({
  slug: 'contact',
  label: 'Contact',
  path: '/contact',
  description:
    'The email address shown on this page is set by the developer; ask them to change it.',
  fields: [
    text('heading', 'Would I like to get in touch?'),
    richText(
      'intro',
      doc(
        p(
          'Thank you for asking and yes — I’m always ready for new connections and would love to hear from you!'
        ),
        p(
          'Whether you’re looking for a content writer for your business, want to collaborate on a project or just have a great (book) suggestion to share, leave me a message right here:'
        )
      )
    ),
    text('closing', 'I hope to hear from you!', {
      description: 'In handwriting, under the form.',
    }),
    group('form', 'Form', [
      text('name', 'Name'),
      text('email', 'Email'),
      text('message', 'Message'),
      text('send', 'Send message'),
      text('sending', 'Sending…'),
      textarea(
        'sent',
        'Thank you! Your message is on its way and I’ll get back to you soon.',
        { description: 'Replaces the form once a message is sent.' }
      ),
      text(
        'failed',
        'Sorry, your message couldn’t be sent. Please try again later',
        {
          description: 'Followed by the email fallback below.',
        }
      ),
      text(
        'rateLimited',
        'You’ve sent a few messages already. Please try again later',
        {
          description: 'Shown to someone who sent several messages in an hour.',
        }
      ),
      text('emailFallback', 'or email me at', {
        description: 'Followed by the email address.',
      }),
    ]),
    group('note', 'Sticky note', [
      text('title', 'Other ways to get in touch'),
      text('linkedinLink', 'Find me on LinkedIn'),
      text('linkedinUrl', 'https://www.linkedin.com/in/kristalomu', {
        label: 'LinkedIn address',
      }),
      text('linkedinText', 'Connect, have a nose around and say hello.'),
      text('emailHeading', 'Email me directly'),
      text('emailText', 'Not a form person? You can email me at', {
        description: 'Followed by the email address.',
      }),
      textarea(
        'footer',
        'I’m always up for a chat about interesting projects, content puzzles, and, of course, good book recommendations.'
      ),
    ]),
    meta(
      'Contact',
      'Need a content writer for business or personal projects? Contact a professional copywriter to get results with your blog, newsletters, emails and social media.'
    ),
  ],
});
