import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Prose } from '@/components/ui/Prose';
import { ButtonLink } from '@/components/ui/Button';
import { ProjectSeeAlso } from '@/components/project/ProjectSeeAlso';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

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
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-foreground">{display}</dd>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: Readonly<ProjectPageProps>) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container className="hero-grid-bg w-full">
      <div className="section-padding">
        <PageHeader title={project.title} intro={project.description} />

        <div className="relative mb-16 aspect-[4/3] w-full overflow-hidden bg-muted-bg md:mb-24">
          {project.coverImage &&
            'coverImageDark' in project &&
            project.coverImageDark && (
              <>
                <Image
                  src={project.coverImage}
                  alt={`${project.title} showcase`}
                  fill
                  className="block object-contain dark:hidden"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
                <Image
                  src={project.coverImageDark}
                  alt={`${project.title} showcase`}
                  fill
                  className="hidden object-contain dark:block"
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

        <section className="mb-16 grid gap-8 md:mb-28 md:grid-cols-12 md:gap-16">
          <div className="md:sticky md:top-24 md:col-span-4 md:self-start lg:col-span-4">
            <dl>
              <DetailRow label="Role" value={project.role} />
              <DetailRow label="Client" value={project.client} />
              <DetailRow label="Date" value={formattedDate} />
              <DetailRow label="Deliverables" value={project.deliverables} />
              <DetailRow label="Tools" value={project.tools} />
            </dl>
          </div>
          <div className="flex flex-col justify-center md:col-span-8">
            <p className="max-w-[65ch] text-lg leading-relaxed text-muted">
              {project.overview}
            </p>
            {project.approach ? (
              <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">
                {project.approach}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.repoUrl && (
                <ButtonLink
                  href={project.repoUrl}
                  variant="outline"
                  className="h-10"
                >
                  view repo
                  <ArrowUpRight size={16} weight="regular" aria-hidden />
                </ButtonLink>
              )}
              {project.liveUrl && (
                <ButtonLink
                  href={project.liveUrl}
                  variant="outline"
                  className="h-10"
                >
                  view live
                  <ArrowUpRight size={16} weight="regular" aria-hidden />
                </ButtonLink>
              )}
            </div>
          </div>
        </section>

        {project.code ? (
          <article className="mb-16 md:mb-28">
            <Prose>
              <MdxRenderer code={project.code} />
            </Prose>
          </article>
        ) : null}

        <ProjectSeeAlso projects={projects} currentSlug={project.slug} />

        <div className="mt-16 md:mt-28">
          <ButtonLink href="/contact" variant="outline">
            say hello
            <ArrowUpRight size={16} weight="regular" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
