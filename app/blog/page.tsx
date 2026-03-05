import { blog } from '@/lib/velite';
import { Container } from '@/components/ui/Container';
import { NotesList } from '@/components/NotesList';
import { ContactSection } from '@/components/ContactSection';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and updates.',
};

export default function BlogPage() {
  const sortedPosts = [...blog].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Container className="w-full hero-grid-bg">
      <div className="section-padding flex flex-col">
        <h1 className="page-heading">notes</h1>
        <p className="page-intro">
          Thoughts on development, technology, and whatever catches my interest.
        </p>

        <NotesList posts={sortedPosts} />
      </div>
      <ContactSection />
    </Container>
  );
}
