'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ABOUT_IMAGE =
  'https://picsum.photos/seed/katana/400/533';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function AboutSection() {
  return (
    <section className="relative section-breakout section-padding bg-neutral-100 dark:bg-neutral-900">
      <motion.div
        className="section-inner grid min-h-0 w-full items-center gap-8 md:min-h-[70vh] md:grid-cols-2 md:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="flex flex-col gap-5 md:gap-8" variants={fadeInVariants}>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
              .about
            </span>
            <span className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600" aria-hidden />
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-neutral-900 dark:text-white md:text-xl md:leading-loose">
            my craft is building experiences that bring value to people and celebrate function over
            form. let&apos;s hide the ego and give some freedom to creativity and make the first
            small step changing the world to a better place.
          </p>
        </motion.div>

        {/* Right section: fades into view */}
        <motion.div
          className="relative aspect-[3/4] overflow-hidden"
          variants={fadeInVariants}
        >
          <Image
            src={ABOUT_IMAGE}
            alt="Portrait"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          className="col-span-full flex justify-center pt-5 md:pt-8"
          variants={fadeInVariants}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            about me
            <span aria-hidden>
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
            </span>
          </Link>
        </motion.div>
      </motion.div>

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
