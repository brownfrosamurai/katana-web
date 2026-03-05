'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  if (data.website && data.website.length > 0) {
    return { success: false, error: 'Invalid submission.' };
  }

  const limited = rateLimit('contact-form');
  if (!limited.success) {
    console.warn('[Contact] Rate limit exceeded for contact form');
    return { success: false, error: 'Too many requests. Please try again later.' };
  }

  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.flatten().fieldErrors;
    const message = Object.values(firstError).flat()[0] ?? 'Validation failed.';
    return { success: false, error: message };
  }

  const { name, email, message } = parsed.data;
  console.log('[Contact] New message:', { name, email, message });
  return { success: true };
}
