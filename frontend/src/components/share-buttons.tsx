'use client';

import { ICON_MD } from '@/lib/consts';
import { cn, copyToClipboard } from '@/lib/utils';
import { Clipboard } from 'lucide-react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'next-share';
import { usePathname } from 'next/navigation';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type ToastType = ReturnType<typeof useToast>['toast'];

export default function ShareButtons() {
  const pathname = usePathname();
  const shareURL = `${BASE_URL}${pathname}`;
  const { toast } = useToast();

  return (
    <article className='flex flex-col items-center'>
      <p>Share this post:</p>
      <section className='flex gap-4'>
        <FacebookShareButton url={shareURL}>
          <FacebookIcon size={ICON_MD} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareURL}>
          <TwitterIcon size={ICON_MD} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareURL}>
          <LinkedinIcon size={ICON_MD} round />
        </LinkedinShareButton>
        <Button
          onClick={() => handleCopy(shareURL, toast)}
          className={cn(
            'h-[32px] w-[32px] rounded-full',
            'hover:bg-accent hover:text-accent-foreground'
          )}
          size='icon'
        >
          <Clipboard size={18} />
        </Button>
      </section>
    </article>
  );
}

async function handleCopy(text: string, toast: ToastType) {
  try {
    await copyToClipboard(text);
    toast({
      className: cn(
        'fixed right-0 top-0 flex md:right-4 md:top-4 md:max-w-[420px]'
      ),
      variant: 'default',
      description: `Copied to clipboard`,
      duration: 1000,
    });
  } catch (error) {
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
