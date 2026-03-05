'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/velite';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const ACCENT_PALETTE = ['orange', 'blue', 'grey', 'yellow', 'grey-alt'] as const;
type AccentKey = (typeof ACCENT_PALETTE)[number];

const PLACEHOLDER_BG: Record<string, string> = {
  orange: 'bg-orange-400 dark:bg-orange-800',
  blue: 'bg-blue-500 dark:bg-blue-700',
  grey: 'bg-neutral-500 dark:bg-neutral-600',
  yellow: 'bg-amber-400 dark:bg-amber-600',
  'grey-alt': 'bg-violet-500 dark:bg-violet-700',
};

/** Card background and text colors for "see also" horizontal strips - light & dark themes */
const SEE_ALSO_CARD: Record<
  AccentKey,
  { bg: string; category: string; title: string }
> = {
  orange: {
    bg: 'bg-white dark:bg-orange-950/80',
    category: 'text-orange-600 dark:text-orange-400',
    title: 'text-orange-800 dark:text-orange-200',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/80',
    category: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100',
  },
  grey: {
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    category: 'text-neutral-600 dark:text-neutral-400',
    title: 'text-neutral-900 dark:text-neutral-100',
  },
  yellow: {
    bg: 'bg-amber-50 dark:bg-amber-950/80',
    category: 'text-amber-700 dark:text-amber-400',
    title: 'text-amber-900 dark:text-amber-200',
  },
  'grey-alt': {
    bg: 'bg-violet-50 dark:bg-violet-950/80',
    category: 'text-violet-600 dark:text-violet-400',
    title: 'text-violet-900 dark:text-violet-100',
  },
};

function getAccentKey(project: Project, index: number): AccentKey {
  const projectAccent =
    'accentColor' in project ? (project.accentColor as string) : undefined;
  const isValid =
    projectAccent && ACCENT_PALETTE.includes(projectAccent as AccentKey);
  return isValid
    ? (projectAccent as AccentKey)
    : ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}

function ArrowIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

interface ProjectSeeAlsoProps {
  projects: Project[];
  currentSlug: string;
}

export function ProjectSeeAlso({
  projects,
  currentSlug,
}: Readonly<ProjectSeeAlsoProps>) {
  const otherProjects = projects
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (otherProjects.length === 0) return null;

  return (
    <section className="mt-12 md:mt-20">
       <div className="mb-6 flex items-center gap-4 md:mb-8">
          <span className="text-sm font-mono lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
            .see also
          </span>
          <span className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600" aria-hidden />
        </div>
      <motion.ul
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {otherProjects.map((otherProject, index) => {
          const accentKey = getAccentKey(otherProject, index);
          const styles = SEE_ALSO_CARD[accentKey] ?? SEE_ALSO_CARD.orange;
          const category = otherProject.tags?.[0] ?? 'Project';

          return (
            <motion.li key={otherProject.slug} variants={cardVariants}>
              <Link
                href={otherProject.permalink}
                className={cn(
                  'group flex items-center gap-3 overflow-hidden border border-neutral-200 transition-opacity hover:opacity-90 sm:gap-4 dark:border-neutral-700/50',
                  styles.bg
                )}
              >
                {/* Thumbnail */}
                <div className="relative h-16 w-20 shrink-0 overflow-hidden sm:h-20 sm:w-28 md:h-24 md:w-32">
                  {otherProject.coverImage ? (
                    <Image
                      src={otherProject.coverImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div
                      className={cn(
                        'h-full w-full',
                        PLACEHOLDER_BG[accentKey] ?? PLACEHOLDER_BG.grey
                      )}
                    />
                  )}
                </div>

                {/* Category + Title */}
                <div className="min-w-0 flex-1 py-3 pr-3 sm:py-4 sm:pr-4">
                  <p
                    className={cn(
                      'text-xs font-medium uppercase tracking-wider',
                      styles.category
                    )}
                  >
                    {category}
                  </p>
                  <h3
                    className={cn(
                      'text-lg font-semibold lowercase tracking-tight md:text-xl',
                      styles.title
                    )}
                  >
                    {otherProject.title}
                  </h3>
                </div>

                {/* Arrow icon */}
                <div
                  className={cn(
                    'shrink-0 pr-3 transition-transform duration-300 ease-in-out origin-center group-hover:-rotate-45 sm:pr-4',
                    styles.title
                  )}
                  aria-hidden
                >
                  <ArrowIcon />
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
      <Link
        href="/projects"
        className="mt-6 inline-block text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        View all projects →
      </Link>
    </section>
  );
}
