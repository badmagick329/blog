import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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

export function postIsPublished(post: any): boolean {
  if (!post.publishedAt) {
    return false;
  }
  const today = new Date();
  const publishedAt = new Date(post.publishedAt);
  return publishedAt <= today;
}