'use client';

import { cn, copyToClipboard } from '@/lib/utils';
import { Share2 } from 'lucide-react';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

type ToastType = ReturnType<typeof useToast>['toast'];

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string> }
    ) => void;
  }
}

type ShareButtonsProps = {
  title: string;
};

export default function ShareButtons({ title }: ShareButtonsProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareURL = new URL(
      window.location.pathname,
      window.location.origin
    ).toString();

    if (navigator.share) {
      window.plausible?.('Share', { props: { method: 'native' } });
      try {
        await navigator.share({ title, url: shareURL });
      } catch {
        // The user may dismiss the native share sheet.
      }
      return;
    }

    await handleCopy(shareURL, toast);
  };

  return (
    <section
      className='not-prose mt-10 flex flex-col items-end gap-3'
      aria-label='Share post'
    >
      <Button onClick={handleShare} variant='outline'>
        <Share2 className='mr-2 h-4 w-4' aria-hidden='true' />
        Share
      </Button>
    </section>
  );
}

async function handleCopy(text: string, toast: ToastType) {
  try {
    await copyToClipboard(text);
    window.plausible?.('Share', { props: { method: 'copy' } });
    toast({
      className: cn(
        'fixed right-0 top-0 flex md:right-4 md:top-4 md:max-w-[420px]'
      ),
      variant: 'default',
      description: `Copied to clipboard`,
      duration: 1000,
    });
  } catch {
    toast({
      className: cn(
        'fixed right-0 top-0 flex md:right-4 md:top-4 md:max-w-[420px]'
      ),
      variant: 'default',
      description: `Failed to copy to clipboard`,
      duration: 1000,
    });
  }
}
