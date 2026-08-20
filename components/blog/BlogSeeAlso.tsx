import Link from 'next/link';
import type { Blog } from '@/lib/velite';

interface BlogSeeAlsoProps {
  posts: Blog[];
  currentSlug: string;
}

export function BlogSeeAlso({ posts, currentSlug }: Readonly<BlogSeeAlsoProps>) {
  const relatedPosts = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <aside className="shrink-0">
      <div className="lg:sticky lg:top-24">
        <p className="font-mono text-sm lowercase tracking-wide text-muted">
          .see also
        </p>
        <ul className="mt-4 space-y-3">
          {relatedPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.permalink}
                className="block text-sm text-muted transition-colors hover:text-foreground"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
