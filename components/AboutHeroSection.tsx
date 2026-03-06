import Image from 'next/image';

const ABOUT_IMAGE = 'https://picsum.photos/seed/katana/800/1000';

const infoItems = [
  { label: '.experience', value: '6 years' },
  { label: '.location', value: 'Calgary, AB, Canada' },
  { label: '.freelance', value: 'Available' },
] as const;

export function AboutHeroSection() {
  return (
    <section className="section-breakout min-h-0 md:min-h-[70vh]">
      <div className="section-inner flex flex-col md:pb-10">
        {/* Top row - info panels */}
        <div className="flex flex-col flex-wrap justify-between gap-6 pb-8 md:flex-row md:gap-8 md:pb-12">
          {infoItems.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1 md:gap-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {label}
              </span>
              <span className="text-base font-semibold text-neutral-900 dark:text-white md:text-xl lg:text-2xl">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="section-padding flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
              .hello
            </span>
            <span
              className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600"
              aria-hidden
            />
          </div>
          {/* Bottom section - image + text */}
          <div className="grid min-h-0 grid-cols-1 items-center gap-8 md:min-h-[50vh] md:grid-cols-2 md:gap-16">
            {/* Left - profile image */}
            <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden sm:min-h-[320px] md:aspect-auto md:min-h-[500px]">
              <Image
                src={ABOUT_IMAGE}
                alt="Profile portrait"
                fill
                className="object-cover contrast-125 grayscale"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Right - intro text */}
            <div className="flex flex-col justify-center">
              <p className="max-w-xl text-base leading-relaxed text-neutral-900 dark:text-white md:text-lg lg:text-xl lg:leading-loose">
                my craft is building experiences that bring value to people and
                celebrate function over form. let&apos;s hide the ego and give
                some freedom to creativity and make the first small step
                changing the world to a better place
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
