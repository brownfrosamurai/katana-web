import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: Readonly<BadgeProps>) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium',
        'bg-muted-bg text-foreground ring-1 ring-inset ring-line',
        className
      )}
    >
      {children}
    </span>
  );
}
