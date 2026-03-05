'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Nav } from './Nav';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Container } from '@/components/ui/Container';
import { useMobile } from '@/hooks/useMobile';
import { MobileNavButton, MobileNavMenu } from '@/components/layout/MobileNav';

export function Header() {
  const isMobile = useMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-neutral-200 bg-white shadow-sm shadow-black/5 dark:border-neutral-800 dark:bg-neutral-950 md:border-white/20 md:bg-white/70 md:backdrop-blur-md md:backdrop-saturate-150 md:dark:border-white/10 md:dark:bg-neutral-950/70">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-base font-bold lowercase text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white/90 dark:hover:text-white"
          >
            .katana
          </Link>
          <div className="flex items-center gap-6">
            {isMobile ? (
              <>
                <MobileNavButton
                  isOpen={mobileNavOpen}
                  onClick={() => setMobileNavOpen((o) => !o)}
                />
                <ThemeToggle />
                <MobileNavMenu
                  isOpen={mobileNavOpen}
                  onClose={closeMobileNav}
                />
              </>
            ) : (
              <>
                <Nav />
                <ThemeToggle />
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
