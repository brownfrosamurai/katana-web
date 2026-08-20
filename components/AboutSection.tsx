'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { ButtonLink } from '@/components/ui/Button';

const ABOUT_IMAGE = '/about-portrait.png';

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
    <section className="section-breakout section-padding relative bg-muted-bg">
      <motion.div
        className="section-inner grid min-h-0 w-full items-center gap-8 md:grid-cols-12 md:gap-16"
        variants={reduce ? undefined : containerVariants}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="flex flex-col gap-6 md:col-span-7"
          variants={reduce ? undefined : fadeInVariants}
        >
          <p className="max-w-xl text-lg lowercase leading-relaxed text-foreground md:text-xl md:leading-relaxed">
            i build end-to-end products that earn their keep: clear interfaces,
            solid systems, and no extra ceremony for the people who have to live
            with the result.
          </p>
          <div>
            <ButtonLink href="/about" variant="outline">
              about me
              <ArrowUpRight size={16} weight="regular" aria-hidden />
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-[3/4] overflow-hidden md:col-span-5"
          variants={reduce ? undefined : fadeInVariants}
        >
          <Image
            src={ABOUT_IMAGE}
            alt="Portrait"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
