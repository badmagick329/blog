export default function MainHeading({
  text,
  withProse,
}: {
  text: string;
  withProse?: boolean;
}) {
  if (withProse) {
    return (
      <h1
        className='prose py-4 text-center text-4xl font-bold dark:prose-invert lg:prose-lg'
        aria-label='Main Heading'
      >
        {text}
      </h1>
    );
  }
  return (
    <h1
      className='py-4 text-center text-4xl font-bold'
      aria-label='Main Heading'
    >
      {text}
    </h1>
  );
}
