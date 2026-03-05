import type { Project } from '@/lib/velite';
import { projects } from '@/lib/velite';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { ContactSection } from '@/components/ContactSection';
import { ProjectCard } from '@/components/ProjectCard';

const ACCENT_PALETTE = ['orange', 'blue', 'grey', 'yellow', 'grey-alt'] as const;
type AccentKey = (typeof ACCENT_PALETTE)[number];

const ACCENT_TEXT: Record<AccentKey, string> = {
  orange: 'text-accent-orange dark:text-orange-400',
  blue: 'text-accent-blue dark:text-blue-400',
  grey: 'text-accent-grey dark:text-neutral-400',
  yellow: 'text-accent-yellow dark:text-amber-400',
  'grey-alt': 'text-accent-grey-alt dark:text-neutral-400',
};

function getAccentKey(project: Project, index: number): AccentKey {
  const projectAccent = 'accentColor' in project ? (project.accentColor as string) : undefined;
  const isValid = projectAccent && ACCENT_PALETTE.includes(projectAccent as AccentKey);
  return isValid ? (projectAccent as AccentKey) : ACCENT_PALETTE[index % ACCENT_PALETTE.length];
}

export const metadata = {
  title: 'Projects',
  description: 'A collection of projects I have built.',
};

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Container className="w-full hero-grid-bg">
      <div className="section-padding">
        <h1 className="mb-8 text-3xl font-bold tracking-tight lowercase text-neutral-900 dark:text-white md:mb-12 md:text-4xl">
          Projects
        </h1>
        <p className="mb-8 text-center text-lg text-neutral-600 dark:text-neutral-400 md:mb-10 md:text-xl">
          I help start-ups and businesses build end to end experiences for their users.
        </p>

        <div className="mt-8 mb-6 flex items-center gap-4 md:mt-12 md:mb-8">
          <span className="text-sm font-mono lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
            .work
          </span>
          <span className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600" aria-hidden />
        </div>

        <section className="flex flex-col space-y-10 md:space-y-16">
          {sortedProjects.map((project, index) => {
            const accentKey = getAccentKey(project, index);
            return (
              <div
                key={project.slug}
                className="flex flex-col gap-4 md:flex-row md:gap-8"
              >
                <div className="w-full md:w-3/4">
                  <ProjectCard project={project} index={index} variant="panel" />
                </div>
                <div className="w-full shrink-0 md:w-1/4">
                  <div className="md:sticky md:top-[100px]">
                    <div
                      className={cn(
                        'text-sm font-semibold',
                        ACCENT_TEXT[accentKey]
                      )}
                    >
                      {project.description}
                      <p className="mt-1 text-sm font-mono uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <ContactSection />
    </Container>
  );
}
