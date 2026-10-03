import type { CollectionConfig } from 'payload';

import { SITE_URL } from '../lib/email';

// Every user is an admin: the client and the developer.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    // The admin is on the public domain, so repeated wrong passwords lock
    // the account for a while.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    forgotPassword: {
      generateEmailSubject: () => 'Reset your kristalomu.com admin password',
      // Payload's own email links to `serverURL`, or to a relative path when
      // it isn't set; setting it would also change every API and media URL.
      generateEmailHTML: ({ token } = {}) => {
        const url = `${SITE_URL}/admin/reset/${token}`;
        return `<p>Someone asked to reset the password for your admin account at kristalomu.com.</p>
<p><a href="${url}">Choose a new password</a></p>
<p>The link works for one hour. If you didn't ask for this, ignore this email and your password stays the same.</p>`;
      },
    },
  },
  fields: [],
};
