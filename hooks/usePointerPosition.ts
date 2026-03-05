'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export interface PointerPosition {
  x: number;
  y: number;
}

/**
 * Tracks pointer position relative to a container element.
 * Returns { x, y } in percentage (0-100) of the element's bounds.
 * Disabled on touch devices (returns null).
 */
export function usePointerPosition<T extends HTMLElement>() {
  const [position, setPosition] = useState<PointerPosition | null>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const ref = useRef<T | null>(null);

  const updatePosition = useCallback((e: React.PointerEvent | PointerEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, []);

  const clearPosition = useCallback(() => setPosition(null), []);

  useEffect(() => {
    setIsPointerDevice(
      typeof globalThis.window !== 'undefined' && !globalThis.window.matchMedia('(hover: none)').matches
    );
  }, []);

  const bind = {
    ref: (node: T | null) => {
      ref.current = node;
    },
    onPointerMove: isPointerDevice ? updatePosition : undefined,
    onPointerLeave: isPointerDevice ? clearPosition : undefined,
  };

  return { position, isPointerDevice, bind, updatePosition, clearPosition };
}
