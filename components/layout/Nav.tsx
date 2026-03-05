'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav';

export function Nav() {
  const pathname = usePathname();

  return React.createElement(
    'nav',
    { 'aria-label': 'Main navigation' },
    React.createElement(
      'ul',
      { className: 'flex flex-wrap items-center gap-5' },
      navItems.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return React.createElement(
          'li',
          { key: href },
          React.createElement(
            Link,
            {
              href,
              className: cn(
                'text-xs font-medium lowercase transition-colors',
                'text-neutral-600 hover:text-neutral-900 dark:text-white/80 dark:hover:text-white',
                isActive && 'text-neutral-900 dark:text-white'
              ),
              'aria-current': isActive ? 'page' : undefined,
            },
            label
          )
        );
      })
    )
  );
}
