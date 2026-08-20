'use client';

import { useState } from 'react';
import {
  buildContactPayload,
  detectEmailService,
  getComposeUrl,
  type EmailService,
} from '@/lib/contact';
import { Button } from '@/components/ui/Button';

const inputBase =
  'w-full rounded-none border border-line bg-background px-3 py-2 text-sm text-foreground placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50';

type ComposeState = {
  to: string;
  subject: string;
  body: string;
  service: EmailService;
};

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [lastCompose, setLastCompose] = useState<ComposeState | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('website')) return;

    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    const message = (formData.get('message') as string).trim();

    const { to, subject, body } = buildContactPayload(name, email, message);
    const service = detectEmailService();
    const url = getComposeUrl(service, to, subject, body);

    window.open(url, '_blank', 'noopener,noreferrer');
    setLastCompose({ to, subject, body, service });
    setStatus('success');
    form.reset();
  }

  function openOtherService() {
    if (!lastCompose) return;
    const other: EmailService =
      lastCompose.service === 'gmail' ? 'outlook' : 'gmail';
    const url = getComposeUrl(
      other,
      lastCompose.to,
      lastCompose.subject,
      lastCompose.body
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleReset() {
    setStatus('idle');
    setLastCompose(null);
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          disabled={status === 'success'}
          className={inputBase}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === 'success'}
          className={inputBase}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          disabled={status === 'success'}
          className={inputBase + ' min-h-[120px] resize-y'}
        />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'success' && lastCompose ? (
        <div className="space-y-3">
          <p className="text-sm text-muted">
            {lastCompose.service === 'outlook'
              ? 'Opened Outlook. Send the message when ready.'
              : 'Opened Gmail. Send the message when ready.'}
          </p>
          <button
            type="button"
            onClick={openOtherService}
            className="text-sm text-muted underline hover:text-foreground"
          >
            Use {lastCompose.service === 'gmail' ? 'Outlook' : 'Gmail'} instead
          </button>
          <div className="pt-2">
            <Button type="reset" variant="outline" size="lg">
              send another
            </Button>
          </div>
        </div>
      ) : (
        <div className="pt-2">
          <Button type="submit" variant="primary" size="lg">
            say hello
          </Button>
        </div>
      )}
    </form>
  );
}
