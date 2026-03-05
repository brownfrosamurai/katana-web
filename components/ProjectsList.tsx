import type { Project } from '@/lib/velite';
import { cn } from '@/lib/utils';
import { ProjectCard } from './ProjectCard';

export interface ProjectsListProps {
  projects: Project[];
  className?: string;
}

export function ProjectsList({ projects, className }: Readonly<ProjectsListProps>) {
  return (
    <div className={cn('flex flex-col gap-8 md:gap-10', className)}>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
