import { defineCollection, defineConfig, s } from 'velite';

const blog = defineCollection({
  name: 'Blog',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('blog'),
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      tags: s.array(s.string()).optional(),
      coverImage: s.string().optional(),
      featured: s.boolean().optional(),
      toc: s.toc(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      code: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
});

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('project'),
      title: s.string(),
      description: s.string(),
      overview: s.string().optional(),
      approach: s.string().optional(),
      date: s.isodate(),
      tags: s.array(s.string()).optional(),
      coverImage: s.string().optional(),
      coverImageDark: s.string().optional(),
      accentColor: s.string().optional(),
      featured: s.boolean().optional(),
      repoUrl: s.string().optional(),
      liveUrl: s.string().optional(),
      role: s.string().optional(),
      client: s.string().optional(),
      deliverables: s.array(s.string()).optional(),
      tools: s.array(s.string()).optional(),
      toc: s.toc(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      code: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/projects/${data.slug}` })),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { blog, projects },
});
