/** Shared by the form's maxLength attributes and the server-side checks. */
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

export type ContactField = keyof typeof CONTACT_LIMITS;

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'invalid'; fieldErrors: Partial<Record<ContactField, string>> }
  | { status: 'failed'; reason: 'rate-limited' | 'unavailable' };
