'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function HamburgerIcon({ isOpen }: Readonly<{ isOpen: boolean }>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-transform"
      aria-hidden
    >
      {isOpen ? (
        <path d="M18 6L6 18M6 6l12 12" />
      ) : (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  );
}

interface MobileNavButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileNavButton({
  isOpen,
  onClick,
}: Readonly<MobileNavButtonProps>) {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-menu"
      onClick={onClick}
      className={cn(
        '-mr-2 inline-flex h-10 w-10 items-center justify-center rounded',
        'text-neutral-600 hover:text-neutral-900 dark:text-white/80 dark:hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2',
        'dark:focus-visible:ring-offset-neutral-950'
      )}
    >
      <HamburgerIcon isOpen={isOpen} />
    </button>
  );
}

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavMenu({
  isOpen,
  onClose,
}: Readonly<MobileNavMenuProps>) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Close when user navigates to a new page
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    globalThis.addEventListener('keydown', handleEscape);
    return () => globalThis.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <nav
      id="mobile-nav-menu"
      role="navigation"
      aria-label="Mobile navigation"
      className={cn(
        'fixed inset-0 z-50 flex flex-col',
        'bg-white dark:bg-neutral-950',
        'transition-opacity duration-200 ease-out'
      )}
    >
      {/* Header with cancel button */}
      <div className="flex items-center justify-end border-b border-neutral-200 p-4 dark:border-neutral-800">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className={cn(
            'rounded px-4 py-2 text-sm font-medium lowercase transition-colors',
            'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
            'dark:text-white/80 dark:hover:bg-neutral-900 dark:hover:text-white',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950'
          )}
        >
          cancel
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-6">
        {navItems.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'rounded-lg px-4 py-3 text-base font-medium lowercase transition-colors',
                'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                'dark:text-white/80 dark:hover:bg-neutral-900 dark:hover:text-white',
                isActive && 'text-neutral-900 dark:text-white'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          );
        })}

        <div className="mt-auto flex items-center gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
