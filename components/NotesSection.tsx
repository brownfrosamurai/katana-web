import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import type { Blog } from '@/lib/velite';
import { SectionLabel } from '@/components/ui/SectionLabel';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export interface NotesSectionProps {
  posts: Blog[];
}

export function NotesSection({ posts }: Readonly<NotesSectionProps>) {
  if (posts.length === 0) return null;

  return (
    <section className="relative section-breakout border-t border-line bg-background">
      <div className="section-inner flex min-h-0 flex-col justify-center gap-10 py-12 md:min-h-[640px] md:gap-12 md:py-16">
        <SectionLabel label=".notes" />

        <ul className="flex flex-col">
          {posts.map((post, index) => (
            <li key={post.slug} className="border-b border-line">
              <Link
                href={post.permalink}
                className="group flex items-baseline gap-6 py-6 transition-colors hover:text-foreground sm:gap-8"
              >
                <span className="w-7 shrink-0 font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1 text-xl font-bold leading-snug text-foreground sm:text-2xl">
                  {post.title}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {formatDate(post.date)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 self-end text-sm underline decoration-line underline-offset-4 transition-colors hover:text-foreground"
        >
          visit notes
          <ArrowUpRight
            size={16}
            weight="regular"
            aria-hidden
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
