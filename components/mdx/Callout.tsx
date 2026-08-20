import { cn } from '@/lib/utils';

interface CalloutProps extends React.HTMLAttributes<HTMLQuoteElement> {
  variant?: 'info' | 'warning' | 'note';
}

export function Callout({
  children,
  className,
  variant = 'note',
  ...props
}: Readonly<CalloutProps>) {
  return (
    <blockquote
      role="note"
      className={cn(
        'my-4 border-l-4 p-4',
        {
          'border-accent bg-muted-bg': variant === 'info',
          'border-foreground bg-muted-bg': variant === 'warning',
          'border-line bg-muted-bg': variant === 'note',
        },
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}
