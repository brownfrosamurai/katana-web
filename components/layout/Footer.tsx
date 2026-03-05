import Link from 'next/link';
import { SocialLinks } from '@/components/SocialLinks';
import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-6 sm:flex-row">
          <Link
            href="/"
            className="text-xs font-medium lowercase text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            .katana
          </Link>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
}
