import RichText from '@/components/rich-text';
import { copyMetadata, getCopy } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return copyMetadata((await getCopy('terms')).meta);
}

export default async function TermsOfUse() {
  const copy = await getCopy('terms');
  return (
    <main id='main-content' tabIndex={-1} className='mx-auto w-full'>
      <article className='container prose pt-8 text-foreground lg:prose-lg'>
        <h1 className='pt-4 text-center'>{copy.heading}</h1>
        <p className='italic text-foreground/60'>
          Last updated: <span>{copy.lastUpdated}</span>
        </p>
        <RichText data={copy.body} />
      </article>
    </main>
  );
}
