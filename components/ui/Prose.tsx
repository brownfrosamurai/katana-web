import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export function Prose({ children, className }: Readonly<ProseProps>) {
  return (
    <div
      className={cn(
        'prose prose-neutral max-w-none dark:prose-invert',
        'prose-headings:font-semibold prose-headings:text-foreground',
        'prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-2xl',
        'prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-lg',
        'prose-p:leading-relaxed prose-p:text-muted',
        'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-foreground',
        'prose-li:text-muted',
        'prose-img:w-full prose-img:max-w-none',
        className
      )}
    >
      {children}
    </div>
  );
}
