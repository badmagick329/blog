export default function Footer() {
  return (
    <footer className='flex justify-center bg-background pb-4 pt-8'>
      <p>
        © Krista Lomu, {currentYear()} - Made by{' '}
        <a
          className='underline hover:text-accent'
          href='https://github.com/badmagick329'
          target='_blank'
        >
          badmagick
        </a>
      </p>
    </footer>
  );
}

function currentYear(): number {
  return new Date().getFullYear();
}
