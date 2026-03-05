import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { GitHubIcon, LinkedInIcon, PlayStationIcon } from '@/components/icons/SocialIcons';

const socials = [
  { href: siteConfig.social.github.url, label: 'GitHub', icon: GitHubIcon },
  { href: siteConfig.social.linkedin.url, label: 'LinkedIn', icon: LinkedInIcon },
  { href: siteConfig.social.PSN.url, label: 'PSN', icon: PlayStationIcon },
] as const;

export function SocialLinks() {
  return (
    <ul className="flex gap-4" aria-label="Social links">
      {socials.map(({ href, label, icon: Icon }) => (
        <li key={href}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            aria-label={label}
          >
            <Icon className="h-5 w-5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
