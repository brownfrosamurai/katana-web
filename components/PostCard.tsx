'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react';
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
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted-bg">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {post.title}
          </h2>
          <p className="mt-2 text-sm text-muted">{formatDate(post.date)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={post.permalink}
      className={cn(
        'group flex flex-col items-stretch gap-4 transition-opacity hover:opacity-90 sm:flex-row sm:items-center sm:gap-12 md:gap-16',
        className
      )}
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted-bg sm:h-56 sm:w-64 md:h-72 md:w-96">
        <Image
          src={coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 768px) 320px, 384px"
        />
      </div>
      <div className="min-w-0 flex-1 py-2">
        <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {post.title}
        </h3>
        <p className="mt-1 text-base text-muted">{formatDate(post.date)}</p>
      </div>
      <span
        className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      >
        <ArrowUpRight size={20} weight="regular" />
      </span>
    </Link>
  );
}
