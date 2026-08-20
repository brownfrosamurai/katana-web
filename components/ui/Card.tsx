import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'minimal';
}

export function Card({ children, className, variant = 'default' }: Readonly<CardProps>) {
  return (
    <div
      className={cn(
        variant === 'default' && 'border border-line bg-background',
        variant === 'minimal' && 'border border-line bg-transparent',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: Readonly<CardHeaderProps>) {
  return <div className={cn('border-b border-line p-4', className)}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: Readonly<CardContentProps>) {
  return <div className={cn('p-4', className)}>{children}</div>;
}
