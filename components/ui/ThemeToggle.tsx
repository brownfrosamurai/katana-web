'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: Readonly<{ className?: string }>) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={cn(
          'inline-flex h-9 w-9 items-center justify-end text-foreground',
          className
        )}
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-end text-foreground transition-colors hover:text-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      {isDark ? (
        <Sun size={16} weight="regular" aria-hidden />
      ) : (
        <Moon size={16} weight="regular" aria-hidden />
      )}
    </button>
  );
}
