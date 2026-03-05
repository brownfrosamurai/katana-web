'use client';

import { useState } from 'react';
import type { Blog } from '@/lib/velite';
import { PostCard } from '@/components/PostCard';

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;

interface NotesListProps {
  posts: Blog[];
}

function NotesEmptyState() {
  return (
    <section
      className="mt-16 flex flex-col items-center justify-center py-24 text-center"
      aria-label="No notes yet"
    >
      <div className="mb-8">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-neutral-300 dark:text-neutral-600"
          aria-hidden
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <span className="text-sm font-mono lowercase tracking-wide text-neutral-500 dark:text-neutral-400">
        .no notes yet
      </span>
      <p className="mt-4 max-w-sm text-base text-neutral-600 dark:text-neutral-400">
        Nothing here for now. Check back soon—I&apos;m usually brewing something.
      </p>
    </section>
  );
}

export function NotesList({ posts }: Readonly<NotesListProps>) {
  const [displayCount, setDisplayCount] = useState(INITIAL_COUNT);

  if (posts.length === 0) {
    return <NotesEmptyState />;
  }

  const [heroPost, ...otherPosts] = posts;
  const visibleOthers = otherPosts.slice(0, displayCount);
  const hasMore = otherPosts.length > displayCount;
  const remainingCount = otherPosts.length - displayCount;

  return (
    <>
      {heroPost && (
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="w-full sm:w-3/4 sm:shrink-0">
            <PostCard post={heroPost} variant="hero" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-4">  
            <span
              className="h-px min-w-[60px] flex-1 bg-neutral-400 dark:bg-neutral-600"
              aria-hidden
            />
            <span className="shrink-0 text-sm font-mono lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
              .latest
            </span>
          
          </div>
        </div>
      )}

      {visibleOthers.length > 0 && (
        <section className="flex flex-col gap-12">
          {visibleOthers.map((post) => (
            <PostCard key={post.slug} post={post} variant="row" />
          ))}
        </section>
      )}

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setDisplayCount((prev) =>
                Math.min(prev + LOAD_MORE_COUNT, otherPosts.length)
              )
            }
            className="border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-600 dark:text-white dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
          >
            Load more
            {remainingCount > 0 && (
              <span className="ml-2 text-neutral-500 dark:text-neutral-400">
                ({remainingCount} more)
              </span>
            )}
          </button>
        </div>
      )}
    </>
  );
}
