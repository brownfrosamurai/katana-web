import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { ContactSection } from '@/components/ContactSection';
import { ProjectSeeAlso } from '@/components/project/ProjectSeeAlso';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

const ACCENT_GRADIENT: Record<string, string> = {
  orange: 'from-orange-500 to-orange-800',
  blue: 'from-blue-700 to-blue-950',
  grey: 'from-neutral-800 to-neutral-950',
  yellow: 'from-amber-500 to-amber-900',
  'grey-alt': 'from-neutral-700 to-neutral-900',
};

function getAccentStyles(accentColor?: string) {
  const key =
    accentColor && ACCENT_GRADIENT[accentColor] ? accentColor : 'orange';
  return {
    gradient: ACCENT_GRADIENT[key] ?? ACCENT_GRADIENT.orange,
  };
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<ProjectPageProps>): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

function DetailRow({
  label,
  value,
}: Readonly<{
  label: string;
  value: string | string[] | undefined;
}>) {
  if (!value) return null;
  const display = Array.isArray(value) ? value.join(', ') : value;
  return (
    <div className="py-3 md:py-4">
      <dt className="text-sm text-neutral-500 dark:text-neutral-400">
        {label}
      </dt>
      <dd className="mt-1 text-neutral-900 dark:text-white">{display}</dd>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: Readonly<ProjectPageProps>) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { gradient } = getAccentStyles(project.accentColor);
  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container className="hero-grid-bg w-full">
      <div className="section-padding">
        {/* Hero Section */}
        <h1 className="page-heading">{project.title}</h1>
        <p className="page-intro">{project.description}</p>

        {/* Hero Image - accent color fallback when no coverImage */}
        <div className="relative mb-24 aspect-[4/3] w-full overflow-hidden">
          {!project.coverImage && (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-gradient-to-br',
                gradient
              )}
            />
          )}
          {project.coverImage &&
            'coverImageDark' in project &&
            project.coverImageDark && (
              <>
                <Image
                  src={project.coverImage}
                  alt={`${project.title} showcase`}
                  fill
                  className="object-contain block dark:hidden"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
                <Image
                  src={project.coverImageDark}
                  alt={`${project.title} showcase`}
                  fill
                  className="object-contain hidden dark:block"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              </>
            )}
          {project.coverImage &&
            !('coverImageDark' in project && project.coverImageDark) && (
              <Image
                src={project.coverImage}
                alt={`${project.title} showcase`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            )}
        </div>

        {/* Project Details - Two Columns */}
        <section className="mb-12 grid gap-8 dark:border-white/10 md:mb-20 md:grid-cols-[minmax(200px,280px)_1fr] md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <dl className="space-y-0">
              <DetailRow label="Role" value={project.role} />
              <DetailRow label="Client" value={project.client} />
              <DetailRow label="Date" value={formattedDate} />
              <DetailRow label="Deliverables" value={project.deliverables} />
              <DetailRow label="Tools" value={project.tools} />
            </dl>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              <span>{project.overview}</span>
              <br />
              <br />
              <span>{project.approach}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center border border-neutral-300 px-4 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Body Content - MDX
        <article className="prose prose-neutral max-w-none dark:prose-invert prose-img:w-full prose-img:max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-600 dark:prose-headings:text-white dark:prose-p:text-neutral-300 prose-a:text-accent-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 dark:prose-strong:text-white prose-li:text-neutral-600 dark:prose-li:text-neutral-300">
          <MdxRenderer code={project.code} />
        </article> */}

        <ProjectSeeAlso projects={projects} currentSlug={project.slug} />
      </div>

      <ContactSection />
    </Container>
  );
}
