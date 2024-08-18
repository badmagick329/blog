import MainHeading from '@/components/main-heading';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center'>
      <div className='prose text-foreground dark:prose-invert lg:prose-lg'>
        <article className='flex h-full w-full flex-col items-center gap-16 pt-8'>
          <section className='flex flex-col items-center justify-center'>
            <p className='text-4xl'>Lovely to see you.</p>
            <MainHeading
              text='Welcome to my corner of the universe.'
              withProse
            />
            <p>
              I’m Krista, a copywriter and coffee aficionado. Go ahead and
              explore my little website.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
