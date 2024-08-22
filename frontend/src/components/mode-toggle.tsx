'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted) {
    return <Button size='icon'>...</Button>;
  }

  const isDark = resolvedTheme === 'dark';
  const buttonBgColor = isDark ? 'bg-background-light' : 'bg-background-dark';
  const buttonForegroundColor = isDark
    ? 'text-foreground-light'
    : 'text-foreground-dark';
  const hoverColor = isDark
    ? 'hover:bg-background-light/80'
    : 'hover:bg-background-dark/80';

  return (
    <Button
      size='icon'
      className={`${buttonBgColor} ${buttonForegroundColor} ${hoverColor}`}
      onClick={() => (isDark ? setTheme('light') : setTheme('dark'))}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
}
