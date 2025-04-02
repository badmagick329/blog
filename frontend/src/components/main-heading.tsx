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
  if (withProse) {
    return (
      <h1
        className={clsx(
          'prose py-4 text-center text-4xl font-bold dark:prose-invert lg:prose-lg',
          className || ''
        )}
        aria-label='Main Heading'
      >
        {text}
      </h1>
    );
  }
  return (
    <h1
      className={clsx(
        'prose py-4 text-center text-4xl font-bold dark:prose-invert lg:prose-lg',
        className || ''
      )}
      aria-label='Main Heading'
    >
      {text}
    </h1>
  );
}
