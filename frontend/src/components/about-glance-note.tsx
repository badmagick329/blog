import Image from 'next/image';

const facts: [label: string, value: string][] = [
  ['Name', 'Krista'],
  ['Role', 'Content writer + strategist'],
  ['Based in', 'London'],
  ['Best at', 'Turning ideas into clear content plans and copy'],
  ['Often working on', 'Campaigns, content calendars, blogs, emails'],
  ['Favourite kind of problem', '“We know we need content, but…”'],
  ['Pet peeve', 'Content for content’s sake'],
  ['Powered by', 'Coffee and curiosity'],
  ['Current side quest', 'Learning Korean'],
  ['Say hello if', 'You’ve got a tricky content problem'],
];

// A note pinned beside the About page. The doodles are decoration, so they
// carry empty alt text; their canvases keep transparent padding, so the boxes
// below are larger than the visible artwork. They turn with the note, but the
// note's tilt is too slight to show on the upright cup, so it leans further on
// its own; the user found the same on the star too much.
export default function AboutGlanceNote() {
  return (
    <aside
      aria-labelledby='glance-title'
      className='section-card glance-note relative px-6 pb-20 pt-9'
    >
      {/* Needle tip sits at about (31%, 85%) of the canvas; it lands just
          inside the top edge. */}
      <Image
        src='/images/about/push-pin.webp'
        alt=''
        width={1254}
        height={1254}
        className='pointer-events-none absolute -top-11 left-[calc(50%-1.75rem)] h-[4.5rem] w-[4.5rem] select-none'
      />
      <Image
        src='/images/about/star.webp'
        alt=''
        width={1374}
        height={1145}
        className='pointer-events-none absolute right-1 top-[5.25rem] h-auto w-14 select-none'
      />
      <h2
        id='glance-title'
        className='glance-note-title text-4xl font-semibold leading-tight'
      >
        Krista, <br />
        at a glance
      </h2>
      <dl className='mt-5 flex flex-col gap-3 text-base leading-snug'>
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className='glance-note-label mr-1.5 inline font-semibold'>
              {label}:
            </dt>
            <dd className='inline'>{value}</dd>
          </div>
        ))}
      </dl>
      <Image
        src='/images/about/coffee-cup.webp'
        alt=''
        width={1254}
        height={1254}
        className='pointer-events-none absolute bottom-1 right-2 h-20 w-20 rotate-[4deg] select-none'
      />
    </aside>
  );
}
