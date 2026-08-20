import Link from 'next/link';
import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

const buttonVariants = {
  base: 'inline-flex items-center justify-center gap-2 rounded-none font-medium lowercase transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  variant: {
    primary:
      'bg-accent text-background hover:bg-accent-hover',
    secondary:
      'bg-muted-bg text-foreground hover:bg-line',
    ghost:
      'text-foreground hover:bg-muted-bg',
    outline:
      'border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background',
  },
  size: {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-sm',
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

function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: Readonly<ButtonLinkProps>) {
  const classes = cn(
    buttonVariants.base,
    buttonVariants.variant[variant],
    buttonVariants.size[size],
    className
  );
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export { Button, ButtonLink };
