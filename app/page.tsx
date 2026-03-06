import { blog, projects } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { ProjectsScrollReveal } from '@/components/ProjectsScrollReveal';
import { AboutSection } from '@/components/AboutSection';
import { NotesSection } from '@/components/NotesSection';
import { ContactSection } from '@/components/ContactSection';

export default function HomePage() {
  const latestPosts = [...blog]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const displayProjects = projects.slice(0, 4);

  return (
    <Container className="hero-grid-bg w-full">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] flex-col justify-center py-12 md:min-h-[70vh] md:py-20 lg:py-28">
        <div className="relative">
          {/* Greeting + Availability row */}
          <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
            <p className="font-mono text-sm text-neutral-600 dark:text-neutral-400">
              Hey, I&apos;m Oluwafemi
            </p>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_6px_2px_rgba(34,197,94,0.8),0_0_12px_4px_rgba(34,197,94,0.4)] animate-glow-pulse"
                aria-hidden
              />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                available for new projects
              </span>
            </div>
          </div>

          {/* Large headline */}
          <h1 className="max-w-4xl text-2xl font-bold leading-[1.15] tracking-tight text-neutral-900 dark:text-white md:text-5xl md:leading-[1.2] lg:text-6xl lg:leading-[1.15]">
            a full-stack developer
            <br />
            with strong expertise in
            <br />
            building scalable and efficient solutions
          </h1>

          {/* Subtle crosshair/target graphic */}
          <div className="absolute -bottom-8 right-0 hidden opacity-20 md:block lg:right-8">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-400 dark:text-white"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
            </svg>
          </div>
        </div>
      </section>

      {/* Projects Section - scroll reveal */}
      {displayProjects.length > 0 && (
        <div className="py-12 md:py-20 lg:py-28">
          <ProjectsScrollReveal projects={displayProjects} />
        </div>
      )}

      {/* About Section */}
      <AboutSection />

      {/* Notes / Blog Section */}
      <NotesSection posts={latestPosts} />

      {/* Contact Section */}
      <ContactSection />
    </Container>
  );
}
