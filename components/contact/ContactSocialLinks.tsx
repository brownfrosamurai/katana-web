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
            className="flex items-center gap-4 border border-line bg-background px-4 py-3 transition-colors hover:border-foreground"
          >
            <Icon className="h-6 w-6 shrink-0 text-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium lowercase text-foreground">
                {label}
              </span>
              <span className="text-xs text-muted">{handle}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
