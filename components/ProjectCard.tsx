'use client';

import Link from 'next/link';
import type { Project } from '@/lib/velite';
import { cn } from '@/lib/utils';
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { ProjectCardCover } from './ProjectCardCover';

const ACCENT_PALETTE = ['orange', 'blue', 'grey', 'yellow', 'grey-alt'] as const;
type AccentKey = (typeof ACCENT_PALETTE)[number];
const ACCENT_HEADER: Record<AccentKey, string> = {
  orange: 'bg-orange-500',
  blue: 'bg-blue-700',
  grey: 'bg-neutral-800',
  yellow: 'bg-amber-500',
  'grey-alt': 'bg-neutral-700',
};

function getAccentKey(project: Project, index: number): AccentKey {
  const projectAccent = 'accentColor' in project ? (project.accentColor as string) : undefined;
  const isValid = projectAccent && ACCENT_PALETTE.includes(projectAccent as AccentKey);
  return isValid ? (projectAccent as AccentKey) : ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}

function isLightAccent(accentKey: AccentKey): boolean {
  return accentKey === 'orange' || accentKey === 'yellow';
}

export interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
  /** Full-height panel for scroll reveal */
  variant?: 'default' | 'panel';
}

export function ProjectCard({
  project,
  index = 0,
  className,
  variant = 'default',
}: Readonly<ProjectCardProps>) {
  const { position, isPointerDevice, bind } = usePointerPosition<HTMLAnchorElement>();

  const accentKey = getAccentKey(project, index);
  const year = new Date(project.date).getFullYear().toString();
  const category = project.tags?.[0] ?? 'Project';

  if (variant === 'panel') {
    return (
      <article className={cn('relative z-10 flex min-h-0 flex-1 flex-col', className)}>
        <Link
          href={project.permalink}
          ref={bind.ref}
          onPointerMove={bind.onPointerMove}
          onPointerLeave={bind.onPointerLeave}
          className={cn(
            'group/card relative flex min-h-0 flex-1 flex-col overflow-hidden ',
            'ring-offset-2 ring-offset-white dark:ring-offset-neutral-950',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400'
          )}
        >
          {isPointerDevice && position && (
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
              aria-hidden
              style={{
                background: `radial-gradient(circle 120px at ${position.x}% ${position.y}%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
              }}
            />
          )}
          <div className="flex min-h-0 flex-1 flex-col justify-between gap-4">
            <ProjectCardCover
              coverImage={project.coverImage}
              coverImageDark={'coverImageDark' in project ? project.coverImageDark : undefined}
              title={project.title}
              accentKey={accentKey}
              compact
              className="min-h-0 min-w-0 max-h-[60svh] flex-1 overflow-hidden"
            />
            <div className="shrink-0 flex flex-col gap-1">
              <span className="text-xs font-medium tracking-wide opacity-90">
                {year} · {category}
              </span>
              <h3 className="text-2xl font-semibold lowercase tracking-tight text-neutral-900 dark:text-white drop-shadow-lg sm:text-3xl">
                {project.title}
              </h3>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn('relative', className)}>
      <Link
        href={project.permalink}
        ref={bind.ref}
        onPointerMove={bind.onPointerMove}
        onPointerLeave={bind.onPointerLeave}
        className={cn(
          'group/card relative flex flex-col overflow-hidden ',
          'ring-offset-2 ring-offset-neutral-950 dark:ring-offset-neutral-950',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400'
        )}
      >
        {isPointerDevice && position && (
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
            aria-hidden
            style={{
              background: `radial-gradient(circle 120px at ${position.x}% ${position.y}%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
            }}
          />
        )}

        <div
          className={cn(
            'relative flex flex-col overflow-hidden ',
            'border border-neutral-200 dark:border-neutral-700/40',
            'shadow-lg transition-shadow duration-200',
            'group-hover/card:border-neutral-300 group-hover/card:shadow-xl dark:group-hover/card:border-neutral-700/80 dark:group-hover/card:shadow-black/20',
            'group-focus-visible/card:border-neutral-300 dark:group-focus-visible/card:border-neutral-700/80 group-focus-visible/card:shadow-xl'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-4 px-5 py-3.5',
              ACCENT_HEADER[accentKey]
            )}
          >
            <span
              className={cn(
                'text-xs font-medium tracking-wide transition-colors duration-200',
                isLightAccent(accentKey)
                  ? 'text-black/80 group-hover/card:text-black'
                  : 'text-white/90 group-hover/card:text-white'
              )}
            >
              {year} · {category}
            </span>
            <span
              className={cn(
                'transition-transform duration-200 text-2xl group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-focus-visible/card:translate-x-0.5 group-focus-visible/card:-translate-y-0.5',
                isLightAccent(accentKey) ? 'text-black' : 'text-white'
              )}
              aria-hidden
            >
              <ArrowIcon />
            </span>
          </div>

          <ProjectCardCover
            coverImage={project.coverImage}
            coverImageDark={'coverImageDark' in project ? project.coverImageDark : undefined}
            title={project.title}
            accentKey={accentKey}
            compact={false}
          />

          <div className="border-t border-neutral-200 bg-neutral-50 px-5 py-3.5 dark:border-neutral-800 dark:bg-neutral-950/80">
            <h3
              className={cn(
                'text-lg font-semibold lowercase tracking-tight transition-colors duration-200',
                'text-neutral-700 group-hover/card:text-neutral-900 group-focus-visible/card:text-neutral-900',
                'dark:text-neutral-400 dark:group-hover/card:text-white dark:group-focus-visible/card:text-white'
              )}
            >
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
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
