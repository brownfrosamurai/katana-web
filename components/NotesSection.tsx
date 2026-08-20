import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import type { Blog } from '@/lib/velite';
import { ButtonLink } from '@/components/ui/Button';

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
    <section className="relative section-breakout section-padding">
      <div className="section-inner">
        <ul className="flex flex-col gap-8 md:gap-12">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.permalink}
                className="group flex items-start justify-between gap-6 transition-colors hover:text-foreground"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{formatDate(post.date)}</p>
                </div>
                <span
                  className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <ArrowUpRight size={16} weight="regular" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 md:mt-16">
          <ButtonLink href="/blog" variant="outline">
            visit notes
            <ArrowUpRight size={16} weight="regular" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
