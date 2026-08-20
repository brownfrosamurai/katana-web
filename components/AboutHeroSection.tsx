import Image from 'next/image';

const ABOUT_IMAGE = '/about-portrait.png';

const infoItems = [
  { label: '.experience', value: '6 years' },
  { label: '.location', value: 'Calgary, AB, Canada' },
  { label: '.freelance', value: 'Available' },
] as const;

export function AboutHeroSection() {
  return (
    <section className="section-breakout min-h-0 md:min-h-[70vh]">
      <div className="section-inner flex flex-col md:pb-10">
        <div className="flex flex-col flex-wrap justify-between gap-6 pb-8 md:flex-row md:gap-8 md:pb-12">
          {infoItems.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1 md:gap-2">
              <span className="text-sm text-muted">{label}</span>
              <span className="text-base font-semibold text-foreground md:text-xl lg:text-2xl">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-10 grid min-h-0 grid-cols-1 items-center gap-8 md:min-h-[50vh] md:grid-cols-12 md:gap-16 md:pt-16">
          <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden sm:min-h-[320px] md:col-span-5 md:aspect-auto md:min-h-[500px]">
            <Image
              src={ABOUT_IMAGE}
              alt="Profile portrait"
              fill
              className="object-cover contrast-125 grayscale"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center md:col-span-7">
            <p className="max-w-xl text-base lowercase leading-relaxed text-foreground md:text-lg lg:text-xl lg:leading-relaxed">
              i build end-to-end products that earn their keep: clear interfaces,
              solid systems, and no extra ceremony for the people who have to live
              with the result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
