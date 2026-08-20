'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav';

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
        '-mr-2 inline-flex h-11 w-11 items-center justify-center',
        'text-muted hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'focus-visible:ring-offset-background'
      )}
    >
      {isOpen ? (
        <X size={20} weight="regular" aria-hidden />
      ) : (
        <List size={20} weight="regular" aria-hidden />
      )}
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
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
      aria-label="Mobile navigation"
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <div className="flex items-center justify-end border-b border-line p-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className={cn(
            'px-4 py-2 text-sm font-medium lowercase transition-colors',
            'text-muted hover:bg-muted-bg hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          )}
        >
          cancel
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-6">
        {navItems.map(({ href, label }, index) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={onClose}
              className={cn(
                'px-4 py-3 text-base font-medium lowercase transition-colors',
                'text-muted hover:bg-muted-bg hover:text-foreground',
                isActive && 'text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
