'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import type { Project } from '@/lib/velite';
import { SectionRule } from '@/components/ui/SectionRule';
import { ButtonLink } from '@/components/ui/Button';

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

function ProjectThumbnail({
  project,
}: Readonly<{
  project: Project;
}>) {
  const hasCoverImageDark =
    'coverImageDark' in project && Boolean(project.coverImageDark);

  if (!project.coverImage) {
    return <div className="h-full w-full bg-muted-bg" />;
  }

  if (hasCoverImageDark) {
    return (
      <>
        <Image
          src={project.coverImage}
          alt=""
          fill
          className="block object-contain dark:hidden"
          sizes="128px"
        />
        <Image
          src={project.coverImageDark!}
          alt=""
          fill
          className="hidden object-contain dark:block"
          sizes="128px"
        />
      </>
    );
  }

  return (
    <Image
      src={project.coverImage}
      alt=""
      fill
      className="object-contain"
      sizes="128px"
    />
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
  const reduce = useReducedMotion();
  const otherProjects = projects
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 2);

  if (otherProjects.length === 0) return null;

  return (
    <section className="mt-16 md:mt-28">
      <SectionRule label=".see also" className="mb-6 md:mb-8" />
      <motion.ul
        className="flex flex-col gap-4"
        variants={reduce ? undefined : containerVariants}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
      >
        {otherProjects.map((otherProject) => {
          const category = otherProject.tags?.[0] ?? 'Project';

          return (
            <motion.li key={otherProject.slug} variants={reduce ? undefined : cardVariants}>
              <Link
                href={otherProject.permalink}
                className="group flex items-center gap-3 overflow-hidden border border-line bg-background transition-opacity hover:opacity-90 sm:gap-4"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-muted-bg sm:h-20 sm:w-28 md:h-24 md:w-32">
                  <ProjectThumbnail project={otherProject} />
                </div>

                <div className="min-w-0 flex-1 py-3 pr-3 sm:py-4 sm:pr-4">
                  <p className="text-xs font-medium tracking-wide text-muted">
                    {category}
                  </p>
                  <h3 className="text-lg font-semibold lowercase tracking-tight text-foreground md:text-xl">
                    {otherProject.title}
                  </h3>
                </div>

                <div
                  className="shrink-0 origin-center pr-3 text-foreground transition-transform duration-300 ease-in-out group-hover:-rotate-45 sm:pr-4"
                  aria-hidden
                >
                  <ArrowUpRight size={20} weight="regular" />
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
      <ButtonLink href="/projects" variant="ghost" size="sm" className="mt-6 px-0">
        view all projects
      </ButtonLink>
    </section>
  );
}
