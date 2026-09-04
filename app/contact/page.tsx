import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionRule } from '@/components/ui/SectionRule';
import { CopyEmail } from '@/components/contact/CopyEmail';
import { ContactSocialLinks } from '@/components/contact/ContactSocialLinks';
import { siteConfig } from '@/lib/site';

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
          intro="Have a question or want to work together? Copy the email below and reach out directly."
        />
        <section className="section-breakout relative bg-muted-bg py-16 md:py-24">
          <div className="section-inner flex flex-col gap-8">
            <SectionRule label=".contact" />
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-8">
                <CopyEmail email={siteConfig.contact.email} />
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
