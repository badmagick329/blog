'use server';

import {
  CONTACT_LIMITS,
  type ContactField,
  type ContactFormState,
} from '@/lib/contact';
import {
  countDailySend,
  dailyCapReached,
  isRepeatMessage,
  looksLikeSpam,
  rememberMessage,
} from '@/lib/contact-guards';
import { headers } from 'next/headers';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** People take longer than this to fill in the form; naive bots don't. */
const MIN_FILL_MS = 3_000;
const SENDS_PER_WINDOW = 5;
const WINDOW_MS = 60 * 60 * 1000;

// In-process memory is enough: production runs a single Next.js container,
// and losing the counts on restart only forgives a few senders.
const sendsByIp = new Map<string, number[]>();

/**
 * Runs on the server only: the browser posts the form here, and only this
 * code holds the Resend key and talks to Resend.
 */
export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Likely bots get a fake success, so they have nothing to adapt to.
  const startedAt = Number(formData.get('startedAt'));
  if (
    formData.get('website') ||
    !startedAt ||
    Date.now() - startedAt < MIN_FILL_MS
  ) {
    console.warn('contact: dropped a likely bot submission');
    return { status: 'sent' };
  }

  const name = field(formData, 'name').replace(/\s+/g, ' ');
  const email = field(formData, 'email');
  const message = field(formData, 'message');

  const fieldErrors = validate({ name, email, message });
  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'invalid', fieldErrors };
  }

  // Checked after validation, so a person who mistyped still sees their
  // errors; spam and repeats get the same fake success as bots.
  if (looksLikeSpam(name, message)) {
    console.warn('contact: dropped a message that looks like link spam');
    return { status: 'sent' };
  }
  if (isRepeatMessage(message)) {
    console.warn('contact: dropped a repeat of a recent message');
    return { status: 'sent' };
  }

  // Checked before taking an IP slot, so a full day doesn't also use up the
  // visitor's own allowance.
  if (dailyCapReached()) {
    console.error('contact: daily send cap reached');
    return { status: 'failed', reason: 'unavailable' };
  }
  const ip = clientIp();
  if (!takeSendSlot(ip)) {
    console.warn('contact: rate limited', ip);
    return { status: 'failed', reason: 'rate-limited' };
  }
  countDailySend();

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      'contact: RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must all be set'
    );
    return { status: 'failed', reason: 'unavailable' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // The visitor's address goes in reply_to, never from: sending as
        // their domain would fail DMARC and land in spam.
        reply_to: email,
        subject: `Website message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });
    if (!response.ok) {
      console.error(
        'contact: Resend rejected the message',
        response.status,
        await response.text()
      );
      return { status: 'failed', reason: 'unavailable' };
    }
  } catch (error) {
    console.error('contact: could not reach Resend', error);
    return { status: 'failed', reason: 'unavailable' };
  }

  rememberMessage(message);
  return { status: 'sent' };
}

function field(formData: FormData, key: ContactField) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function validate(values: Record<ContactField, string>) {
  const errors: Partial<Record<ContactField, string>> = {};
  if (!values.name) errors.name = 'Please tell me your name.';
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.message) errors.message = 'Please write a message.';
  for (const key of Object.keys(CONTACT_LIMITS) as ContactField[]) {
    if (values[key].length > CONTACT_LIMITS[key]) {
      errors[key] = `Please keep this under ${CONTACT_LIMITS[key]} characters.`;
    }
  }
  return errors;
}

// nginx sets X-Real-IP from the connection itself. X-Forwarded-For is not
// used because its leading entries come from the client and can be forged.
function clientIp() {
  return headers().get('x-real-ip') ?? 'unknown';
}

/** Records a send for `ip` unless it has used up its slots in the window. */
function takeSendSlot(ip: string) {
  const now = Date.now();
  const recent = (sendsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= SENDS_PER_WINDOW) return false;
  recent.push(now);
  sendsByIp.set(ip, recent);

  // Drop stale IPs now and then so the map cannot grow without bound.
  if (sendsByIp.size > 1000) {
    sendsByIp.forEach((times, key) => {
      if (times.every((t) => now - t >= WINDOW_MS)) sendsByIp.delete(key);
    });
  }
  return true;
}
