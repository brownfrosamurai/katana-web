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
        <div className="aspect-video w-full animate-pulse bg-muted-bg" />
      )}
      <CardContent className="p-4">
        <div className="mb-2 h-4 w-3/4 animate-pulse bg-muted-bg" />
        <div className="mb-3 flex gap-1">
          <div className="h-3 w-16 animate-pulse bg-muted-bg" />
          <div className="h-3 w-20 animate-pulse bg-muted-bg" />
        </div>
        <div className="h-3 w-full animate-pulse bg-muted-bg" />
        <div className="mt-3 h-3 w-24 animate-pulse bg-muted-bg" />
      </CardContent>
    </Card>
  );
}
