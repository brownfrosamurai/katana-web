interface AvailabilityProps {
  label?: string;
}

export function Availability({
  label = 'available for new projects',
}: Readonly<AvailabilityProps>) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-status" aria-hidden />
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
