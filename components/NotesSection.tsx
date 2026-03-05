import Link from 'next/link';
import type { Blog } from '@/lib/velite';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M17 7H7" />
      <path d="M17 7V17" />
    </svg>
  );
}

export interface NotesSectionProps {
  posts: Blog[];
}

export function NotesSection({ posts }: Readonly<NotesSectionProps>) {
  if (posts.length === 0) return null;

  return (
    <section className="relative section-breakout section-padding bg-neutral-100 dark:bg-neutral-900">
      <div className="section-inner">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-sm font-mono lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
            .latest notes
          </span>
          <span className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600" aria-hidden />
        </div>
        <h2 className="mb-8 text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 md:mb-12">
          three latest notes
        </h2>

        <ul className="flex flex-col gap-8 md:gap-12">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.permalink}
                className="group flex items-start justify-between gap-6 transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold leading-snug text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">
                    {formatDate(post.date)}
                  </p>
                </div>
                <span
                  className="mt-1 shrink-0 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-500 dark:group-hover:text-neutral-400"
                  aria-hidden
                >
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center md:mt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-neutral-700 px-5 py-2.5 text-sm font-medium lowercase text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-500 dark:text-neutral-400 dark:hover:border-white dark:hover:text-white"
          >
            visit blog
            <ArrowIcon />
          </Link>
        </div>
      </div>

      {/* Decorative circle */}
      <div className="absolute bottom-8 right-8 hidden md:block" aria-hidden>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-400 dark:text-neutral-500"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>
    </section>
  );
}
