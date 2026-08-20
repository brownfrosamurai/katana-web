import { blog, projects } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { Availability } from '@/components/Availability';
import { ProjectsScrollReveal } from '@/components/ProjectsScrollReveal';
import { AboutSection } from '@/components/AboutSection';
import { NotesSection } from '@/components/NotesSection';
import { ContactSection } from '@/components/ContactSection';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export default function HomePage() {
  const latestPosts = [...blog]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const displayProjects = projects.slice(0, 4);

  return (
    <Container className="hero-grid-bg w-full">
      <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center py-12 md:py-20">
        <div className="relative">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
            <p className="font-mono text-sm text-muted">
              hey, i&apos;m oluwafemi
            </p>
            <Availability />
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            a full-stack developer
            <br />
            building scalable products
          </h1>

          <p className="mt-6 max-w-[65ch] text-base lowercase leading-relaxed text-muted md:text-lg">
            i design and ship web products for startups, from interface to infrastructure.
          </p>

          <div className="mt-8">
            <ButtonLink href="/projects" variant="outline">
              projects
              <ArrowUpRight size={16} weight="regular" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>

      {displayProjects.length > 0 && (
        <div className="section-padding">
          <ProjectsScrollReveal projects={displayProjects} />
        </div>
      )}

      <AboutSection />
      <NotesSection posts={latestPosts} />
      <ContactSection />
    </Container>
  );
}
