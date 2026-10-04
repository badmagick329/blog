import { doc, p } from '../lib/lexical';
import { copyGlobal, group, meta, richText, text, textarea } from './shared';

const facts: [label: string, value: string][] = [
  ['Name', 'Krista'],
  ['Role', 'Content writer + strategist'],
  ['Based in', 'London'],
  ['Best at', 'Turning ideas into clear content plans and copy'],
  ['Often working on', 'Campaigns, content calendars, blogs, emails'],
  ['Favourite kind of problem', '“We know we need content, but…”'],
  ['Pet peeve', 'Content for content’s sake'],
  ['Powered by', 'Coffee and curiosity'],
  ['Current side quest', 'Learning Korean'],
  ['Say hello if', 'You’ve got a tricky content problem'],
];

export const About = copyGlobal({
  slug: 'about',
  label: 'About',
  path: '/about',
  fields: [
    text('heading', 'About'),
    text('greeting', 'Hi.', { description: 'In handwriting, above the text.' }),
    richText(
      'body',
      doc(
        p('I’m happy to see you find your way to my little website.'),
        p(
          'I’m Krista, a copywriter based in the vibrant city of London. For years now, I’ve been freelancing as a content writer, fueled by copious amounts of coffee and an unending love for words.'
        ),
        p(
          'Through my professional writing, I’ve worked with fantastic companies, from multinationals to smaller startups and solo entrepreneurs. My work has allowed me to explore a diverse range of topics, from finance and HR to travel and personal development. I’ve written blogs, newsletters, white papers, emails and social media content — all sorts of materials to support business growth.'
        ),
        p(
          'What drives me most is my curiosity — I love exploring new projects and ideas and supporting remarkable people and teams in achieving their goals. I’ve connected with wonderful people and am excited about the new experiences I’ve yet to discover.'
        ),
        p(
          'Thank you for visiting my website and spending a few of your precious moments with me. I hope you enjoy what you find and come visit again.'
        ),
        p('Until next time,')
      )
    ),
    text('signature', 'Krista', { description: 'In handwriting.' }),
    group(
      'postscript',
      'Postscript',
      [
        text('text', 'Psst. Check out'),
        text('link', 'my contact details', {
          description: 'Links to the Contact page.',
        }),
      ],
      'The handwritten line under the signature.'
    ),
    group('glance', 'At-a-glance note', [
      textarea('title', 'Krista,\nat a glance', {
        description: 'Each line of the box is a line on the note.',
      }),
      {
        name: 'facts',
        type: 'array',
        labels: { singular: 'Fact', plural: 'Facts' },
        defaultValue: facts.map(([label, value]) => ({ label, value })),
        fields: [
          { name: 'label', type: 'text', required: true },
          { name: 'value', type: 'text', required: true },
        ],
      },
    ]),
    meta(
      'About',
      'A professional content and copywriter from London, with experience in finance, Human Resources, taxation, investing, personal development and travel.'
    ),
  ],
});
