import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: Readonly<ContainerProps>) {
  return (
    <div className={cn('mx-auto min-w-0 w-full max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
