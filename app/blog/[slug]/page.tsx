import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blog } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';
import { ButtonLink } from '@/components/ui/Button';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { BlogSeeAlso } from '@/components/blog/BlogSeeAlso';
import { getCoverImage } from '@/lib/blog-images';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<BlogPostPageProps>): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function BlogPostPage({
  params,
}: Readonly<BlogPostPageProps>) {
  const { slug } = await params;
  const post = blog.find((p) => p.slug === slug);
  if (!post) notFound();

  const coverImage = getCoverImage(post.coverImage);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="hero-grid-bg">
      <Container className="section-padding">
        <ButtonLink href="/blog" variant="ghost" size="sm" className="mb-8 px-0">
          back to notes
        </ButtonLink>

        <article className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-8">
            <h1 className="page-heading mb-4">{post.title}</h1>
            <p className="mb-8 text-sm text-muted">{formattedDate}</p>

            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden bg-muted-bg">
              <Image
                src={coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 896px"
                priority
              />
            </div>

            <p className="mb-10 max-w-[65ch] text-xl leading-relaxed text-muted">
              {post.description}
            </p>

            {post.code ? (
              <Prose>
                <MdxRenderer code={post.code} />
              </Prose>
            ) : null}

            <div className="mt-12">
              <ButtonLink href="/contact" variant="outline">
                say hello
                <ArrowUpRight size={16} weight="regular" aria-hidden />
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <BlogSeeAlso posts={blog} currentSlug={post.slug} />
          </div>
        </article>
      </Container>
    </div>
  );
}
