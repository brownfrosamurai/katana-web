import Link from 'next/link';
import type { Blog } from '@/lib/velite';

interface BlogSeeAlsoProps {
  posts: Blog[];
  currentSlug: string;
}

/** Related posts as simple text links for blog sidebar */
export function BlogSeeAlso({ posts, currentSlug }: Readonly<BlogSeeAlsoProps>) {
  const relatedPosts = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <aside className="shrink-0 lg:w-48">
      <div className="sticky top-8">
        <p className="text-xs font-mono lowercase tracking-wide text-neutral-500 dark:text-neutral-500">
          See also
        </p>
        <ul className="mt-4 space-y-3">
          {relatedPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.permalink}
                className="block text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {post.title}
                {post.metadata?.readingTime && (
                  <span className="ml-1 text-neutral-400 dark:text-neutral-500">
                    {post.metadata.readingTime}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
