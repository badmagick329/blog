'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const inputClass =
  'w-full rounded-md border border-input bg-white/70 px-3 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

/** Payload's REST errors carry readable messages, such as a file too large. */
async function send(path: string, init: RequestInit) {
  const response = await fetch(path, init);
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.errors?.[0]?.message ?? `HTTP ${response.status}`);
  }
  return body.doc as { id: number };
}

// Rendered only for logged-in admins. It posts straight to Payload's REST API
// with the admin's session cookie, so the collection's access rules and
// hooks apply as they do in the admin.
export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get('screenshot');
    setStatus('sending');
    try {
      let screenshot: number | undefined;
      if (file instanceof File && file.size > 0) {
        const upload = new FormData();
        upload.append('file', file);
        screenshot = (
          await send('/api/feedback-screenshots', {
            method: 'POST',
            body: upload,
          })
        ).id;
      }
      await send('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: form.get('message'),
          page: window.location.href,
          screenshot,
        }),
      });
      setStatus('sent');
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : String(failure));
      setStatus('failed');
    }
  }

  function close() {
    setOpen(false);
    setStatus('idle');
    setError('');
  }

  if (!open) {
    return (
      <Button
        type='button'
        onClick={() => setOpen(true)}
        className='fixed bottom-4 right-4 z-50 shadow-lg'
      >
        Feedback
      </Button>
    );
  }

  return (
    <section
      aria-labelledby='feedback-title'
      className='fixed bottom-4 right-4 z-50 w-[min(24rem,calc(100vw-2rem))] rounded-md border border-input bg-background p-4 shadow-lg'
    >
      <h2 id='feedback-title' className='text-xl font-semibold'>
        Feedback on this page
      </h2>
      {status === 'sent' ? (
        <>
          <p role='status' className='mt-3'>
            Thanks, it’s in the admin under Feedback.
          </p>
          <Button type='button' onClick={close} className='mt-4'>
            Close
          </Button>
        </>
      ) : (
        <form onSubmit={submit} className='mt-3 flex flex-col gap-3'>
          <label className='flex flex-col gap-1'>
            What’s wrong, or what would you like changed?
            <textarea
              name='message'
              required
              maxLength={5000}
              rows={4}
              className={inputClass}
            />
          </label>
          <label className='flex flex-col gap-1'>
            Screenshot (optional)
            <input
              name='screenshot'
              type='file'
              accept='image/jpeg,image/png,image/webp,image/avif'
              className='text-sm'
            />
          </label>
          {status === 'failed' && (
            <p role='alert' className='text-destructive'>
              Couldn’t send: {error}
            </p>
          )}
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='ghost' onClick={close}>
              Cancel
            </Button>
            <Button type='submit' disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
