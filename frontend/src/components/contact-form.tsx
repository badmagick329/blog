'use client';

import { sendContactMessage } from '@/actions/contact';
import { Button } from '@/components/ui/button';
import {
  CONTACT_LIMITS,
  type ContactField,
  type ContactFormState,
} from '@/lib/contact';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
const initialState: ContactFormState = { status: 'idle' };

type Draft = Record<ContactField, string>;
const emptyDraft: Draft = { name: '', email: '', message: '' };

const inputClass =
  'w-full rounded-md border border-input bg-white/70 px-3 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-[invalid=true]:border-destructive';

export default function ContactForm() {
  // React resets the form's fields after every action, so the submitted
  // values become the fields' defaults; otherwise a visitor shown a
  // validation error would lose what they typed.
  const [draft, setDraft] = useState(emptyDraft);
  const [state, formAction] = useActionState(
    (previous: ContactFormState, formData: FormData) => {
      setDraft({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        message: String(formData.get('message') ?? ''),
      });
      return sendContactMessage(previous, formData);
    },
    initialState
  );
  // Set once hydrated; the server drops submissions sent too soon after this,
  // which catches bots that post without loading the page.
  const [startedAt, setStartedAt] = useState('');
  useEffect(() => setStartedAt(String(Date.now())), []);

  if (state.status === 'sent') {
    return (
      <p role='status' className='text-center'>
        Thank you! Your message is on its way and I’ll get back to you soon.
      </p>
    );
  }

  const errors = state.status === 'invalid' ? state.fieldErrors : {};

  return (
    <form action={formAction} noValidate className='not-prose space-y-4'>
      <Field id='name' label='Name' error={errors.name}>
        <input
          id='name'
          name='name'
          autoComplete='name'
          defaultValue={draft.name}
          required
          maxLength={CONTACT_LIMITS.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={inputClass}
        />
      </Field>
      <Field id='email' label='Email' error={errors.email}>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          defaultValue={draft.email}
          required
          maxLength={CONTACT_LIMITS.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass}
        />
      </Field>
      <Field id='message' label='Message' error={errors.message}>
        <textarea
          id='message'
          name='message'
          rows={6}
          defaultValue={draft.message}
          required
          maxLength={CONTACT_LIMITS.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={inputClass}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers, filled by bots. */}
      <div aria-hidden='true' className='absolute -left-[9999px]'>
        <label>
          Website
          <input name='website' tabIndex={-1} autoComplete='off' />
        </label>
      </div>
      <input type='hidden' name='startedAt' value={startedAt} />

      <div aria-live='polite'>
        {state.status === 'failed' && (
          <p className='text-sm text-destructive'>
            {state.reason === 'rate-limited'
              ? 'You’ve sent a few messages already. Please try again later'
              : 'Sorry, your message couldn’t be sent. Please try again later'}{' '}
            or email me at{' '}
            <a href={`mailto:${EMAIL_ADDRESS}`} className='underline'>
              {EMAIL_ADDRESS}
            </a>
            .
          </p>
        )}
      </div>

      <div className='flex justify-end'>
        <SubmitButton ready={startedAt !== ''} />
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='block font-medium'>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className='text-sm text-destructive'>
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton({ ready }: { ready: boolean }) {
  const { pending } = useFormStatus();
  return (
    // Styled like the header's Contact button; the default variant's
    // `primary` token is pale blue in this design.
    <Button
      type='submit'
      disabled={!ready || pending}
      className='site-cta motion-lift bg-accent px-6 text-lg font-semibold text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md'
    >
      {pending ? 'Sending…' : 'Send message'}
    </Button>
  );
}
