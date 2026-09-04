'use client';

import { useCallback, useState } from 'react';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';

interface CopyEmailProps {
  email: string;
}

export function CopyEmail({ email }: Readonly<CopyEmailProps>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex w-full items-center justify-between gap-4 border border-line bg-background px-4 py-3 text-left transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:py-5"
      aria-label={copied ? 'Email copied to clipboard' : `Copy ${email} to clipboard`}
    >
      <span className="truncate text-lg font-medium text-foreground sm:text-xl md:text-2xl">
        {email}
      </span>
      <span className="flex shrink-0 items-center gap-2 text-sm text-muted transition-colors group-hover:text-foreground">
        {copied ? (
          <>
            <CheckIcon size={18} weight="regular" aria-hidden />
            copied
          </>
        ) : (
          <>
            <CopyIcon size={18} weight="regular" aria-hidden />
            copy
          </>
        )}
      </span>
    </button>
  );
}
