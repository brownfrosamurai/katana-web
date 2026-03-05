'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: Readonly<ErrorBoundaryProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Something went wrong
        </h1>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </Container>
  );
}
