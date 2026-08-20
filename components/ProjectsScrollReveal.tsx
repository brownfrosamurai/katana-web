'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { Project } from '@/lib/velite';
import { cn } from '@/lib/utils';
import { ProjectCard } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

      const reduceMotion = globalThis.window?.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (reduceMotion) return;

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
          start: 'top 80px',
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

      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
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
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="project-card-panel relative flex h-[70svh] min-h-0 flex-col justify-between overflow-hidden bg-foreground p-6 text-background sm:p-8"
            style={{
              gridArea: 'stack',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              zIndex: index,
            }}
          >
            <ProjectCard project={project} index={index} variant="panel" />
          </li>
        ))}
      </ul>
    </section>
  );
}
