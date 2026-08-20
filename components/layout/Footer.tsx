import Link from 'next/link';
import { SocialLinks } from '@/components/SocialLinks';
import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row md:py-12">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xs font-medium lowercase text-muted transition-colors hover:text-foreground"
            >
              .katana
            </Link>
            <Link
              href="/uses"
              className="text-xs font-medium lowercase text-muted transition-colors hover:text-foreground"
            >
              uses
            </Link>
          </div>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
}
