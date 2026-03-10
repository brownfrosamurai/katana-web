'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { Project } from '@/lib/velite';
import { cn } from '@/lib/utils';
import { ProjectCard } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACCENT_PANEL: Record<string, string> = {
  orange: 'bg-orange-500',
  blue: 'bg-blue-700',
  grey: 'bg-neutral-800',
  yellow: 'bg-amber-500',
  'grey-alt': 'bg-violet-600',
};

const ACCENT_PALETTE = [
  'orange',
  'blue',
  'grey',
  'yellow',
  'grey-alt',
] as const;
type AccentKey = (typeof ACCENT_PALETTE)[number];

function getAccentKey(project: Project, index: number): AccentKey {
  const projectAccent =
    'accentColor' in project ? (project.accentColor as string) : undefined;
  const isValid =
    projectAccent && ACCENT_PALETTE.includes(projectAccent as AccentKey);
  return isValid
    ? (projectAccent as AccentKey)
    : ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}

export interface ProjectsScrollRevealProps {
  projects: Project[];
  className?: string;
}

export function ProjectsScrollReveal({
  projects,
  className,
}: Readonly<ProjectsScrollRevealProps>) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = cardsRef.current;
      if (!section || !cards || projects.length === 0) return;

      const cardElements = cards.querySelectorAll<HTMLElement>(
        '.project-card-panel'
      );
      if (cardElements.length === 0) return;

      const vh =
        globalThis.window === undefined ? 800 : globalThis.window.innerHeight;
      const scrollDistance = vh * Math.max(2.5, projects.length * 2);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `${scrollDistance} top`,
          scrub: true,
          pin: true,
        },
      });

      tl.from(
        '.project-card-panel:not(:first-child)',
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: 1,
          stagger: 2,
        },
        0
      );

      tl.to(
        '.project-card-panel:not(:last-child)',
        {
          y: -vh,
          duration: 1,
          stagger: 2,
        },
        '<'
      );

      // Refresh ScrollTrigger after layout/paint so measurements are correct when
      // navigating back to the page (handles Next.js client-side navigation)
      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      // Fallback refresh for async scroll restoration after navigation
      const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 150);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timeoutId);
      };
    },
    {
      scope: sectionRef,
      dependencies: [projects.length],
    }
  );

  if (projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-x-hidden', className)}
    >
      <ul
        ref={cardsRef}
        className="m-0 mx-auto grid w-full max-w-7xl list-none p-0"
        style={{
          gridTemplateAreas: '"stack"',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
        }}
      >
        {projects.map((project, index) => {
          const accentKey = getAccentKey(project, index);
          const panelClass = ACCENT_PANEL[accentKey] ?? ACCENT_PANEL.grey;
          project.coverImage = undefined;
          project.coverImageDark = undefined;
          return (
            <li
              key={project.slug}
              className={cn(
                'project-card-panel relative h-[70svh] min-h-0 overflow-hidden rounded-xl p-6 sm:p-8',
                'flex flex-col justify-between',
                panelClass
              )}
              style={{
                gridArea: 'stack',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                zIndex: index,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                aria-hidden
              >
                <div
                  className="absolute -right-1/2 -top-1/2 h-full w-full rounded-full bg-white/30 blur-3xl"
                  style={{ transform: 'scale(1.5)' }}
                />
              </div>
              <ProjectCard project={project} index={index} variant="panel" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
