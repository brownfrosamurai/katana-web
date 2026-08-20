'use client';

import { useState } from 'react';
import { Note } from '@phosphor-icons/react';
import type { Blog } from '@/lib/velite';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/Button';

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;

interface NotesListProps {
  posts: Blog[];
}

function NotesEmptyState() {
  return (
    <section
      className="mt-8 flex flex-col py-16"
      aria-label="No notes yet"
    >
      <Note size={32} weight="regular" className="text-muted" aria-hidden />
      <p className="mt-6 font-mono text-sm lowercase tracking-wide text-muted">
        .no notes yet
      </p>
      <p className="mt-3 max-w-sm text-base text-muted">
        Nothing here for now. Check back soon, I am usually brewing something.
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
        <div className="mb-20 md:mb-28">
          <PostCard post={heroPost} variant="hero" />
        </div>
      )}

      {visibleOthers.length > 0 && (
        <section className="flex flex-col gap-16 md:gap-20">
          {visibleOthers.map((post) => (
            <PostCard key={post.slug} post={post} variant="row" />
          ))}
        </section>
      )}

      {hasMore && (
        <div className="mt-12">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setDisplayCount((prev) =>
                Math.min(prev + LOAD_MORE_COUNT, otherPosts.length)
              )
            }
          >
            load more
            {remainingCount > 0 && (
              <span className="text-muted">({remainingCount} more)</span>
            )}
          </Button>
        </div>
      )}
    </>
  );
}
