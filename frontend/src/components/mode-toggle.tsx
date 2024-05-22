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

  return (
    <Button
      size='icon'
      onClick={() => (isDark ? setTheme('light') : setTheme('dark'))}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
}
