import type { CollectionConfig } from 'payload';

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
  },
  fields: [],
};
