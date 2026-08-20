import Link from 'next/link';

interface MdxLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export function MdxLink({ href, children, className }: Readonly<MdxLinkProps>) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const linkClass = 'text-accent underline-offset-4 hover:underline';

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
