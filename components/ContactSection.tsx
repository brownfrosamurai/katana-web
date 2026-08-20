import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { ButtonLink } from '@/components/ui/Button';
import { SectionRule } from '@/components/ui/SectionRule';

export function ContactSection() {
  return (
    <section className="section-breakout section-padding relative bg-muted-bg">
      <div className="section-inner flex flex-col gap-6">
        <SectionRule label=".say hello" />

        <p className="max-w-2xl text-lg font-semibold leading-relaxed text-foreground md:text-2xl">
          open for freelance projects. email me if you want to collaborate.
        </p>

        <div>
          <ButtonLink href="/contact" variant="outline">
            say hello
            <ArrowUpRight size={16} weight="regular" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
