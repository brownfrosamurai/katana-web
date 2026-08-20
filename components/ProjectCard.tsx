'use client';

import Link from 'next/link';
import type { Project } from '@/lib/velite';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from '@phosphor-icons/react';
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { ProjectCardCover } from './ProjectCardCover';

export interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
  variant?: 'default' | 'panel';
}

export function ProjectCard({
  project,
  className,
  variant = 'default',
}: Readonly<ProjectCardProps>) {
  const { position, isPointerDevice, bind } =
    usePointerPosition<HTMLAnchorElement>();

  const year = new Date(project.date).getFullYear().toString();
  const category = project.tags?.[0] ?? 'Project';
  const meta = `${year} - ${category}`;

  const spotlight =
    isPointerDevice && position ? (
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
        aria-hidden
        style={{
          background: `radial-gradient(circle 120px at ${position.x}% ${position.y}%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
        }}
      />
    ) : null;

  if (variant === 'panel') {
    return (
      <article className={cn('relative z-10 flex min-h-0 flex-1 flex-col', className)}>
        <Link
          href={project.permalink}
          ref={bind.ref}
          onPointerMove={bind.onPointerMove}
          onPointerLeave={bind.onPointerLeave}
          className={cn(
            'group/card relative flex min-h-0 flex-1 flex-col overflow-hidden',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground'
          )}
        >
          {spotlight}
          <div className="flex min-h-0 flex-1 flex-col justify-between gap-4">
            <ProjectCardCover
              coverImage={project.coverImage}
              coverImageDark={
                'coverImageDark' in project ? project.coverImageDark : undefined
              }
              title={project.title}
              compact
              className="min-h-0 min-w-0 max-h-[60svh] flex-1 overflow-hidden"
            />
            <div className="flex shrink-0 flex-col gap-1">
              <span className="text-xs font-medium tracking-wide opacity-90">
                {meta}
              </span>
              <h3 className="text-2xl font-semibold lowercase tracking-tight text-inherit sm:text-3xl">
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
          'group/card relative flex flex-col overflow-hidden',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        )}
      >
        {spotlight}
        <ProjectCardCover
          coverImage={project.coverImage}
          coverImageDark={
            'coverImageDark' in project ? project.coverImageDark : undefined
          }
          title={project.title}
          compact={false}
        />
        <div className="flex items-start justify-between gap-4 border-t border-line bg-background py-3.5">
          <div>
            <span className="text-xs font-medium tracking-wide text-muted">
              {meta}
            </span>
            <h3 className="text-lg font-semibold lowercase tracking-tight text-foreground">
              {project.title}
            </h3>
          </div>
          <span className="mt-1 text-muted transition-transform duration-200 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5">
            <ArrowUpRight size={20} weight="regular" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}
