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
      <div className="flex min-h-[60vh] flex-col items-start justify-center py-16">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          something went wrong
        </h1>
        <p className="mb-8 text-muted">
          An unexpected error occurred. Please try again.
        </p>
        <Button onClick={() => reset()}>try again</Button>
      </div>
    </Container>
  );
}
