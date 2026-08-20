import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-start justify-center py-16">
        <h1 className="mb-2 text-4xl font-bold text-foreground md:text-6xl">404</h1>
        <p className="mb-8 max-w-[65ch] text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <ButtonLink href="/">back home</ButtonLink>
      </div>
    </Container>
  );
}
