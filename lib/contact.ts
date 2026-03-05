import { siteConfig } from '@/lib/site';

export const CONTACT_SUBJECT = 'Portfolio inquiry';

export type EmailService = 'gmail' | 'outlook';

export function detectEmailService(): EmailService {
  if (typeof navigator === 'undefined') return 'gmail';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('edg/') || ua.includes('msie') || ua.includes('trident')) {
    return 'outlook';
  }
  return 'gmail';
}

export function getComposeUrl(
  service: EmailService,
  to: string,
  subject: string,
  body: string
): string {
  if (service === 'outlook') {
    const params = new URLSearchParams({ to, subject, body });
    return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
  }
  const params = new URLSearchParams({ to, su: subject, body, tf: 'cm' });
  return `https://mail.google.com/mail/u/0/?${params.toString()}`;
}

export function buildContactPayload(name: string, email: string, message: string) {
  const body = `${message}\n\n---\n${name} <${email}>`;
  return {
    to: siteConfig.contact.email,
    subject: CONTACT_SUBJECT,
    body,
  };
}
