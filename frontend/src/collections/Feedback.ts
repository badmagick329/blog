import type { CollectionAfterChangeHook, CollectionConfig } from 'payload';

import { SITE_URL } from '../lib/email';

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!
  );

/** Only web addresses become links; anything else is shown as typed. */
function pageHtml(page: string) {
  try {
    const url = new URL(page, SITE_URL);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      const href = escapeHtml(url.href);
      return `<a href="${href}">${href}</a>`;
    }
  } catch {}
  return escapeHtml(page);
}

// The developer hears about new feedback without watching the admin. A failed
// email is logged rather than thrown: this hook runs inside the save, and the
// client's feedback matters more than the notification.
const notify: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc;
  const to = process.env.FEEDBACK_TO_EMAIL;
  if (!to) {
    req.payload.logger.warn('FEEDBACK_TO_EMAIL is not set; feedback not sent');
    return doc;
  }
  const message: string = doc.message;
  const summary =
    message.length > 60 ? `${message.slice(0, 57).trimEnd()}…` : message;
  const rows = [
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    doc.page && `<p>Page: ${pageHtml(doc.page)}</p>`,
    req.user && `<p>From: ${escapeHtml(req.user.email)}</p>`,
    doc.screenshot && '<p>Has a screenshot.</p>',
    `<p><a href="${SITE_URL}/admin/collections/feedback/${doc.id}">Open in the admin</a></p>`,
  ];
  try {
    await req.payload.sendEmail({
      to,
      subject: `Site feedback: ${summary.replace(/\s+/g, ' ')}`,
      html: rows.filter(Boolean).join('\n'),
    });
  } catch (error) {
    req.payload.logger.error({ err: error, msg: 'Feedback email failed' });
  }
  return doc;
};

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  labels: { singular: 'Feedback', plural: 'Feedback' },
  admin: {
    group: 'Feedback',
    useAsTitle: 'message',
    defaultColumns: ['message', 'status', 'page', 'createdAt'],
    description:
      'Problems and ideas for the site. While you’re logged in, the Feedback button at the bottom right of every page on the site adds one with the page filled in.',
  },
  defaultSort: '-createdAt',
  hooks: {
    // Set by the server, and never changed afterwards, so an entry always
    // names who sent it.
    beforeChange: [
      ({ data, operation, originalDoc, req }) => {
        const original = originalDoc?.reporter;
        data.reporter =
          operation === 'create'
            ? req.user?.id
            : typeof original === 'object'
              ? original?.id
              : original;
        return data;
      },
    ],
    afterChange: [notify],
  },
  fields: [
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 5000,
      admin: { description: 'What’s wrong, or what you’d like changed.' },
    },
    {
      name: 'page',
      type: 'text',
      maxLength: 500,
      admin: {
        description:
          'The page it’s about, for example https://kristalomu.com/about.',
      },
    },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'feedback-screenshots',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Done', value: 'done' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'reporter',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
};
