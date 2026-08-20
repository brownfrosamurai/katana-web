import { blog } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { NotesList } from '@/components/NotesList';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and updates.',
};

export default function BlogPage() {
  const sortedPosts = [...blog].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Container className="hero-grid-bg w-full">
      <div className="section-padding flex flex-col">
        <PageHeader
          title="notes"
          intro="Thoughts on development, technology, and whatever catches my interest."
        />
        <NotesList posts={sortedPosts} />
      </div>
    </Container>
  );
}
