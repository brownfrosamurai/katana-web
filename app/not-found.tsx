import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="mb-2 text-6xl font-bold text-neutral-900 dark:text-neutral-100">404</h1>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <ButtonLink href="/">Back to Home</ButtonLink>
      </div>
    </Container>
  );
}
