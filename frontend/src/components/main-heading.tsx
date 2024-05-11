export default function MainHeading({
  text,
  withProse,
}: {
  text: string;
  withProse?: boolean;
}) {
  if (withProse) {
    return (
      <div className='prose dark:prose-invert lg:prose-lg'>
        <h1 className='py-4 text-center text-4xl font-bold'>{text}</h1>
      </div>
    );
  }
  return <h1 className='py-4 text-center text-4xl font-bold'>{text}</h1>;
}
