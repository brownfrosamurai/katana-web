'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectCardCoverProps {
  coverImage?: string;
  coverImageDark?: string;
  title: string;
  compact?: boolean;
  className?: string;
}

export function ProjectCardCover({
  coverImage,
  coverImageDark,
  title,
  compact = false,
  className,
}: Readonly<ProjectCardCoverProps>) {
  const aspectClass = compact
    ? 'aspect-[16/9] min-h-[100px]'
    : 'aspect-[4/3] min-h-[200px]';

  if (!coverImage) {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden bg-muted-bg',
          aspectClass,
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
        'relative w-full overflow-hidden bg-muted-bg',
        aspectClass,
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
