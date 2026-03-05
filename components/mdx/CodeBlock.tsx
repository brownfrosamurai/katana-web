'use client';

import { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: Readonly<CodeBlockProps>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(async () => {
    const text = preRef.current?.querySelector('code')?.textContent ?? '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group relative max-w-full overflow-x-auto">
      <pre
        ref={preRef}
        className={cn(
          'overflow-x-auto border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900',
          className
        )}
        {...props}
      >
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 px-2 py-1 text-xs opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
