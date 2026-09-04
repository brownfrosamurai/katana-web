import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function ContactSection() {
  return (
    <section className="section-breakout relative border-y border-line bg-background">
      <div className="section-inner grid gap-8 py-12 md:min-h-[640px] md:grid-cols-12 md:items-center md:gap-16 md:py-16">
        <div className="flex items-center justify-between md:col-span-4 md:h-full md:flex-col md:items-start md:justify-between md:py-6">
          <SectionLabel label=".say hello" />
          <ButtonLink href="/contact" variant="outline">
            say hello
            <ArrowUpRightIcon size={16} weight="regular" aria-hidden />
          </ButtonLink>
        </div>

        <div className="flex flex-col gap-5 md:col-span-8">
          <h2 className="max-w-[32ch] text-4xl font-bold lowercase leading-tight tracking-tight text-foreground md:text-5xl lg:text-[56px]">
            open for freelance projects.
          </h2>
          <p className="max-w-2xl text-lg lowercase leading-relaxed text-muted md:text-xl">
            email me if you want to collaborate.
          </p>
        </div>
      </div>
    </section>
  );
}
