'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

const ACCENT_GRADIENT: Record<string, string> = {
  orange: 'from-orange-500 to-orange-800',
  blue: 'from-blue-700 to-blue-950',
  grey: 'from-neutral-800 to-neutral-950',
  yellow: 'from-amber-500 to-amber-900',
  'grey-alt': 'from-neutral-700 to-neutral-900',
};

/** Bright solid backgrounds for projects without a cover image */
const PLACEHOLDER_BG: Record<string, string> = {
  orange: 'bg-orange-500',
  blue: 'bg-blue-600',
  grey: 'bg-neutral-700',
  yellow: 'bg-amber-400',
  'grey-alt': 'bg-violet-600',
};

interface ProjectCardCoverProps {
  coverImage?: string;
  coverImageDark?: string;
  title: string;
  accentKey: string;
  /** Reduced height for sticky/compact state */
  compact?: boolean;
  className?: string;
}

export function ProjectCardCover({
  coverImage,
  coverImageDark,
  title,
  accentKey,
  compact = false,
  className,
}: Readonly<ProjectCardCoverProps>) {
  const gradientClass = ACCENT_GRADIENT[accentKey] ?? ACCENT_GRADIENT.grey;
  const aspectClass = compact ? 'aspect-[16/9] min-h-[100px]' : 'aspect-[4/3] min-h-[200px]';

  if (!coverImage) {
    const placeholderClass = PLACEHOLDER_BG[accentKey] ?? PLACEHOLDER_BG.grey;
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden',
          aspectClass,
          placeholderClass,
          className
        )}
      />
    );
  }

  const imageClass = 'object-contain object-top';
  const sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px';

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-gradient-to-b',
        aspectClass,
        gradientClass,
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        {coverImageDark ? (
          <>
            <Image
              src={coverImage}
              alt={title}
              fill
              className={cn(imageClass, 'block dark:hidden')}
              sizes={sizes}
            />
            <Image
              src={coverImageDark}
              alt={title}
              fill
              className={cn(imageClass, 'hidden dark:block')}
              sizes={sizes}
            />
          </>
        ) : (
          <Image
            src={coverImage}
            alt={title}
            fill
            className={imageClass}
            sizes={sizes}
          />
        )}
      </div>
    </div>
  );
}
