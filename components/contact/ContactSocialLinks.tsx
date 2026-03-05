import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { GitHubIcon, LinkedInIcon, PlayStationIcon } from '@/components/icons/SocialIcons';

const socials = [
  {
    key: 'github',
    label: 'github',
    ...siteConfig.social.github,
    icon: GitHubIcon,
  },
  {
    key: 'linkedin',
    label: 'linkedin',
    ...siteConfig.social.linkedin,
    icon: LinkedInIcon,
  },
  {
    key: 'PSN',
    label: 'PSN',
    ...siteConfig.social.PSN,
    icon: PlayStationIcon,
  },
] as const;

export function ContactSocialLinks() {
  return (
    <ul className="flex flex-col gap-4" aria-label="Social links">
      {socials.map(({ key, label, url, handle, icon: Icon }) => (
        <li key={key}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-neutral-200 bg-white px-4 py-3 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80"
          >
            <Icon className="h-6 w-6 shrink-0 text-neutral-900 dark:text-white" />
            <div className="flex flex-col">
              <span className="text-sm font-medium lowercase text-neutral-900 dark:text-white">
                {label}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{handle}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
