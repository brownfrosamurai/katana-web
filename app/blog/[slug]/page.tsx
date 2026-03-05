import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blog } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ContactSection } from '@/components/ContactSection';
import { getCoverImage } from '@/lib/blog-images';

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

  return (
    <div className="hero-grid-bg">
      <Container className="py-16 md:py-24">
        <article className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Main content column */}
          <div className="min-w-0 flex-1">
            <Link
              href="/blog"
              className="mb-8 inline-block text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              ← Back to notes
            </Link>

            <h1 className="page-heading mb-8 font-bold tracking-tight text-neutral-900 dark:text-white">
              {post.title}
            </h1>

            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
              <Image
                src={coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 896px"
                priority
              />
            </div>

            <p className="mb-10 text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
              {post.description}
            </p>

            <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:text-neutral-900 prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-2xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-neutral-600 prose-img:w-full prose-img:max-w-none dark:prose-headings:text-white dark:prose-p:text-neutral-300">
              {/* <MdxRenderer code={post.code} /> */}
            </div>

            <ContactSection />
          </div>
        </article>
      </Container>
    </div>
  );
}
