'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

const ABOUT_IMAGE = '/about-portrait.png';
const ABOUT_TAGS = ['full-stack', 'product engineering', 'design systems'];

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section className="section-breakout relative border-t border-line bg-background">
      <motion.div
        className="section-inner grid min-h-0 w-full md:grid-cols-12"
        variants={reduce ? undefined : containerVariants}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="relative aspect-[4/3] overflow-hidden md:col-span-5 md:aspect-auto md:h-full md:min-h-[640px]"
          variants={reduce ? undefined : fadeInVariants}
        >
          <Image
            src={ABOUT_IMAGE}
            alt="Portrait"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center gap-6 py-12 md:col-span-7 md:min-h-[640px] md:py-16 md:pl-16 lg:pl-20"
          variants={reduce ? undefined : fadeInVariants}
        >
          <SectionLabel label=".about" />

          <p className="max-w-[30ch] text-2xl lowercase leading-relaxed text-foreground md:text-[28px]">
            i build end-to-end products that earn their keep: clear interfaces,
            solid systems, and no extra ceremony for the people who have to live
            with the result.
          </p>

          <div className="flex flex-wrap gap-2">
            {ABOUT_TAGS.map((tag) => (
              <span
                key={tag}
                className="border border-line px-3 py-1 text-xs lowercase text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <ButtonLink href="/about" variant="outline">
              about me
              <ArrowUpRight size={16} weight="regular" aria-hidden />
            </ButtonLink>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
