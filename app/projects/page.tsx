import { projects } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionRule } from '@/components/ui/SectionRule';
import { ProjectCard } from '@/components/ProjectCard';

export const metadata = {
  title: 'Projects',
  description: 'A collection of projects I have built.',
};

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Container className="hero-grid-bg w-full">
      <div className="section-padding">
        <PageHeader
          title="projects"
          intro="I help start-ups and businesses build end-to-end experiences for their users."
        />
        <div className="flex flex-col gap-12 md:gap-16">
          <SectionRule label=".work" />

          <section className="flex flex-col space-y-16 md:space-y-24 lg:space-y-32">
            {sortedProjects.map((project, index) => (
              <div
                key={project.slug}
                className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-9">
                  <ProjectCard project={project} index={index} />
                </div>
                <div className="sticky top-[100px] self-start md:col-span-3">
                  <p className="text-sm text-muted">{project.description}</p>
                  <p className="mt-1 font-mono text-sm text-muted">
                    {new Date(project.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </Container>
  );
}
