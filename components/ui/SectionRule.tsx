import { cn } from '@/lib/utils';

interface SectionRuleProps {
  label: string;
  className?: string;
}

export function SectionRule({ label, className }: Readonly<SectionRuleProps>) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="font-mono text-sm lowercase tracking-wide text-muted">
        {label}
      </span>
      <span className="h-px max-w-full flex-1 bg-line" aria-hidden />
    </div>
  );
}
