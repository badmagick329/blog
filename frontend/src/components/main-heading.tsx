import clsx from 'clsx';

export default function MainHeading({
  text,
  className,
  withProse,
}: {
  text: string;
  className?: string;
  withProse?: boolean;
}) {
  const headingClass = clsx(
    'py-2 text-center text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl',
    withProse ? 'mx-auto max-w-[22ch] text-balance' : '',
    className || ''
  );

  if (withProse) {
    return (
      <h1 className={headingClass} aria-label='Main Heading'>
        {text}
      </h1>
    );
  }
  return (
    <h1 className={headingClass} aria-label='Main Heading'>
      {text}
    </h1>
  );
}
