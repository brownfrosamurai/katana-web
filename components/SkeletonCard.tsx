import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  hasImage?: boolean;
}

export function SkeletonCard({ className, hasImage = true }: Readonly<SkeletonCardProps>) {
  return (
    <Card className={cn('h-full overflow-hidden', className)}>
      {hasImage && (
        <div className="aspect-video w-full animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      )}
      <CardContent className="p-4">
        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mb-3 flex gap-1">
          <div className="h-3 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-3 h-3 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </CardContent>
    </Card>
  );
}
