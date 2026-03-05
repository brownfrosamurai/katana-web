import { cn } from '@/lib/utils';

interface CalloutProps extends React.HTMLAttributes<HTMLQuoteElement> {
  variant?: 'info' | 'warning' | 'note';
}

export function Callout({ children, className, variant = 'note', ...props }: Readonly<CalloutProps>) {
  return (
    <blockquote
      role="note"
      className={cn(
        'my-4 border-l-4 p-4',
        {
          'border-blue-500 bg-blue-50 dark:bg-blue-950/30': variant === 'info',
          'border-amber-500 bg-amber-50 dark:bg-amber-950/30': variant === 'warning',
          'border-neutral-400 bg-neutral-50 dark:bg-neutral-900/50': variant === 'note',
        },
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}
