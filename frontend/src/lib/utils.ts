import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/London',
  });
}

/** `YYYY-MM-DD` for `date` on the London calendar, like `formatDate`. */
export function isoDay(date: string) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Europe/London',
  }).format(new Date(date));
}

export async function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'absolute';
  textArea.style.left = '-999999px';
  document.body.prepend(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  } finally {
    textArea.remove();
  }
  return Promise.resolve();
}
