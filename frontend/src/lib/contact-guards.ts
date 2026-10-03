import { createHash } from 'node:crypto';

// Server-side spam guards for the contact form, kept apart from the server
// action so they can be tested on their own. State lives in process memory:
// production runs a single Next.js container, and a restart only forgives a
// few senders.

/** More links than this reads as link spam; a real enquiry rarely has any. */
const MAX_LINKS = 2;
const LINK_PATTERN = /https?:\/\/|www\./gi;
// Anchor tags and forum link codes: nobody writes these in a plain text box.
const LINK_MARKUP_PATTERN = /<a\s|\[url[=\]]|\[link[=\]]/i;

/**
 * True for the usual shape of spam: a link in the name, link markup, or a
 * message stuffed with links. Callers answer with a fake success.
 */
export function looksLikeSpam(name: string, message: string) {
  // match() rather than test(): test() on a global regex resumes from the
  // previous call's position.
  if (name.match(LINK_PATTERN)) return true;
  if (LINK_MARKUP_PATTERN.test(message)) return true;
  return (message.match(LINK_PATTERN)?.length ?? 0) > MAX_LINKS;
}

const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;
const sentMessages = new Map<string, number>();

// Case and spacing are ignored, so trivially varied copies still match.
function messageKey(message: string) {
  const normalised = message.toLowerCase().replace(/\s+/g, ' ').trim();
  return createHash('sha256').update(normalised).digest('hex');
}

/**
 * True if the same message was sent in the last 24 hours, from any address:
 * spam runs repeat one body across many IPs.
 */
export function isRepeatMessage(message: string, now = Date.now()) {
  const sentAt = sentMessages.get(messageKey(message));
  return sentAt !== undefined && now - sentAt < DUPLICATE_WINDOW_MS;
}

/**
 * Called only after a successful send, so a visitor whose send failed can
 * retry the same message.
 */
export function rememberMessage(message: string, now = Date.now()) {
  sentMessages.set(messageKey(message), now);
  if (sentMessages.size > 1000) {
    sentMessages.forEach((sentAt, key) => {
      if (now - sentAt >= DUPLICATE_WINDOW_MS) sentMessages.delete(key);
    });
  }
}

/**
 * Caps sends across all visitors. The per-IP limit doesn't stop bots spread
 * over many addresses, and the Resend free plan's 100-a-day quota is shared
 * by the whole account, so this keeps most of it free for other senders.
 */
export const DAILY_SEND_CAP = 30;
let daily = { day: '', count: 0 };

// Resend's daily quota resets at midnight UTC, so this cap does too.
function utcDay(now: number) {
  return new Date(now).toISOString().slice(0, 10);
}

export function dailyCapReached(now = Date.now()) {
  return daily.day === utcDay(now) && daily.count >= DAILY_SEND_CAP;
}

export function countDailySend(now = Date.now()) {
  const day = utcDay(now);
  daily = daily.day === day ? { day, count: daily.count + 1 } : { day, count: 1 };
}
