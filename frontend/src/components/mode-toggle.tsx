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
    'bg-background-dark text-foreground-dark hover:bg-accent dark:bg-background-light dark:text-foreground-light';

  if (!mounted) {
    return (
      <Button className={buttonClasses} size='icon'>
        ...
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      size='icon'
      className={buttonClasses}
      onClick={() => (isDark ? setTheme('light') : setTheme('dark'))}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
}
