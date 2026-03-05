import Link from 'next/link';

interface MdxLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export function MdxLink({ href, children, className }: Readonly<MdxLinkProps>) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const linkClass =
    'text-neutral-600 underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100';

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className ?? linkClass}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className ?? linkClass}>
      {children}
    </Link>
  );
}
