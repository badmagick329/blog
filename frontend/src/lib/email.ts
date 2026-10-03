import { resendAdapter } from '@payloadcms/email-resend';
import type { EmailAdapter } from 'payload';

// Emails need absolute links, and the request's Host header can't be trusted
// for them: anyone can send any Host, and a reset link pointing at their
// domain would hand them the reset token. A local `next start` gets
// production links too.
export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://kristalomu.com'
    : 'http://localhost:5000';

// Development prints whole emails, so flows like password reset can be
// followed without sending anything.
const logEmails: EmailAdapter = ({ payload }) => ({
  name: 'log',
  defaultFromAddress: 'dev@localhost',
  defaultFromName: 'Development',
  sendEmail: async (message) => {
    payload.logger.info(
      `Email to ${String(message.to)}: ${message.subject}\n${message.html}`
    );
  },
});

/**
 * Production sends through Resend with the contact form's key and its sender
 * on the verified domain. Without them Payload falls back to logging that an
 * email was attempted, and warns on start.
 */
export function emailAdapter(): EmailAdapter | undefined {
  if (process.env.NODE_ENV !== 'production') return logEmails;

  const apiKey = process.env.RESEND_API_KEY;
  // Resend takes "Name <address>" or a bare address, so the contact form's
  // sender can be either.
  const from = process.env.CONTACT_FROM_EMAIL?.trim().match(
    /^(?:(.+?)\s*<([^<>\s]+@[^<>\s]+)>|([^<>\s]+@[^<>\s]+))$/
  );
  if (!apiKey || !from) return undefined;

  return resendAdapter({
    apiKey,
    defaultFromName: from[1] ?? 'kristalomu.com',
    defaultFromAddress: from[2] ?? from[3],
  });
}
