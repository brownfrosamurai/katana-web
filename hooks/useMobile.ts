'use client';

import { useState, useEffect } from 'react';

/** Tailwind md breakpoint: 768px. Below this is considered mobile. */
const MOBILE_BREAKPOINT = 768;

const mobileQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

/**
 * Detects when the application is viewed on a mobile viewport.
 * Uses window.matchMedia with the Tailwind `md` breakpoint (768px).
 * Returns true when viewport width is below 768px.
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(mobileQuery);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}
