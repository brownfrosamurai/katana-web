import { Container } from '@/components/ui/Container';
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
        <h1 className="page-heading">Say Hello</h1>
        <p className="page-intro">
          Have a question or want to work together? Send me a message.
        </p>
        <section className="section-breakout section-padding relative bg-neutral-100 dark:bg-neutral-900">
          <div className="section-inner flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm lowercase tracking-wide text-neutral-600 dark:text-neutral-400">
                .get in touch
              </span>
              <span
                className="h-px max-w-full flex-1 bg-neutral-400 dark:bg-neutral-600"
                aria-hidden
              />
            </div>
            <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
              <div className="border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50 sm:p-8">
                <ContactForm />
              </div>
              <div className="lg:pt-0">
                <ContactSocialLinks />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-8 right-8 hidden md:block"
            aria-hidden
          >
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
      </div>
    </Container>
  );
}
