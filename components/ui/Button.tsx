import Link from 'next/link';
import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

const buttonVariants = {
  base: 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-black',
  variant: {
    primary:
      'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200',
    accent:
      'bg-accent-green text-white hover:bg-green-600 dark:bg-accent-green dark:text-white dark:hover:bg-green-600',
    secondary:
      'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700',
    ghost:
      'text-neutral-900 hover:bg-neutral-100 dark:text-white/90 dark:hover:bg-neutral-800 dark:hover:text-white',
    outline:
      'border border-neutral-300 bg-transparent hover:bg-neutral-100 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/10',
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  },
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
}

const Button = forwardRef<HTMLButtonElement, Readonly<ButtonProps>>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants.base,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  className?: string;
  children: React.ReactNode;
}

function ButtonLink({ href, variant = 'primary', size = 'md', className, children }: Readonly<ButtonLinkProps>) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants.base,
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
    >
      {children}
    </Link>
  );
}

export { Button, ButtonLink };
