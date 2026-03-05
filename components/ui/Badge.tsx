import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: Readonly<BadgeProps>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-white/90',
        'ring-1 ring-inset ring-neutral-200 dark:ring-neutral-600',
        className
      )}
    >
      {children}
    </span>
  );
}
