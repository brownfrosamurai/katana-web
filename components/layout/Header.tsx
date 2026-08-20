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
    <header className="header-bar fixed left-0 right-0 top-0 z-50 w-full">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-base font-bold lowercase text-foreground transition-colors hover:text-muted"
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
