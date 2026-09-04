import { cn } from '@/lib/utils';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: Readonly<SectionLabelProps>) {
  return (
    <div className={cn('flex items-baseline gap-2.5', className)}>
      <span className="font-mono text-sm font-bold text-accent" aria-hidden>
        &middot;
      </span>
      <span className="font-mono text-xs lowercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}
