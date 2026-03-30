'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { setTheme, resolvedTheme } = useTheme();

  const buttonClasses =
    'bg-background-dark text-foreground-dark hover:bg-accent dark:bg-background-light dark:text-foreground-light dark:hover:bg-accent';

  if (!mounted) {
    return (
      <span aria-hidden='true'>
        <Button
          className={buttonClasses}
          size='icon'
          disabled
          tabIndex={-1}
        >
          ...
        </Button>
      </span>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      type='button'
      size='icon'
      className={buttonClasses}
      onClick={() => (isDark ? setTheme('light') : setTheme('dark'))}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Moon aria-hidden='true' /> : <Sun aria-hidden='true' />}
    </Button>
  );
}
