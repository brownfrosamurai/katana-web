import Link from 'next/link';

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M17 7H7" />
      <path d="M17 7V17" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section className="relative section-breakout section-padding bg-neutral-100 dark:bg-neutral-900">
      <div className="section-inner">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-sm font-mono lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
            .say hello
          </span>
          <span className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600" aria-hidden />
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <p className="max-w-2xl text-lg font-semibold leading-relaxed text-neutral-900 dark:text-white md:text-2xl lg:text-3xl lg:leading-loose">
            i&apos;m open for freelance projects,
            <br />
            feel free to email me to see how
            <br />
            we can collaborate
          </p>

          <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-neutral-900 px-6 py-3 text-sm font-medium lowercase text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            contact me
            <span aria-hidden>
              <ArrowIcon />
            </span>
          </Link>
          </div>
        </div>
      </div>

      {/* Decorative circle */}
      <div className="absolute bottom-8 right-8 hidden md:block" aria-hidden>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-400 dark:text-neutral-500"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>
    </section>
  );
}
