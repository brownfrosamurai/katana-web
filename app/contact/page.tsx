import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionRule } from '@/components/ui/SectionRule';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactSocialLinks } from '@/components/contact/ContactSocialLinks';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with me.',
};

export default function ContactPage() {
  return (
    <Container className="hero-grid-bg w-full">
      <div className="section-padding">
        <PageHeader
          title="say hello"
          intro="Have a question or want to work together? Send me a message."
        />
        <section className="section-breakout relative bg-muted-bg py-16 md:py-24">
          <div className="section-inner flex flex-col gap-8">
            <SectionRule label=".contact" />
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="border border-line bg-background p-6 sm:p-8 lg:col-span-8">
                <ContactForm />
              </div>
              <div className="lg:col-span-4">
                <ContactSocialLinks />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
