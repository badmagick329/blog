'use server';

import crypto from 'crypto';
import { headers } from 'next/headers';

export async function registerView({
  route,
  duration,
}: {
  route: string;
  duration: number;
}) {
  const ip = headers().get('x-forwarded-for');
  const viewer = ip
    ? crypto.createHash('sha256').update(ip).digest('hex')
    : 'N/A';
  console.log('ip', ip, ' was hashed to', viewer);
  console.log('viewed', route, 'for', duration, 'seconds');
}
