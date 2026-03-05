'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Blog } from '@/lib/velite';
import { cn } from '@/lib/utils';

import { getCoverImage } from '@/lib/blog-images';

interface PostCardProps {
  post: Blog;
  variant?: 'hero' | 'row';
  className?: string;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Hero variant: full-width article with large image, title and date below */
export function PostCard({
  post,
  variant = 'row',
  className,
}: Readonly<PostCardProps>) {
  const coverImage = getCoverImage(post.coverImage);

  if (variant === 'hero') {
    return (
      <Link
        href={post.permalink}
        className={cn(
          'group block w-full transition-opacity hover:opacity-90',
          className
        )}
      >
        <div className="overflow-hidden">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            <Image
              src={coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-3xl">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {formatDate(post.date)}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  /** Row variant: image left, title + date right (two-column horizontal layout) */
  return (
    <Link
      href={post.permalink}
      className={cn(
        'group flex flex-col items-stretch gap-4 transition-opacity hover:opacity-90 sm:flex-row sm:items-center sm:gap-12 md:gap-16',
        className
      )}
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-neutral-200 dark:bg-neutral-800 sm:h-56 sm:w-64 md:h-72 md:w-96">
        <Image
          src={coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 320px, 384px"
        />
      </div>
      <div className="min-w-0 flex-1 py-2">
        <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-2xl">
          {post.title}
        </h3>
        <p className="mt-1 text-base text-neutral-500 dark:text-neutral-400">
          {formatDate(post.date)}
        </p>
      </div>
      <span
        className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-500"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}
