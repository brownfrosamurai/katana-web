'use client';

import { useState, useEffect, useRef } from 'react';

export const HEADER_OFFSET_PX = 56; // h-14

/**
 * Detects when an element is "stuck" (position: sticky) at the top.
 * Returns true when the element's top is at the sticky offset.
 */
export function useStickyState<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      setIsStuck(rect.top <= HEADER_OFFSET_PX + 4);
    };

    const onScroll = () => check();
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { ref, isStuck };
}
