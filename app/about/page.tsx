import { Container } from '@/components/ui/Container';
import { AboutHeroSection } from '@/components/AboutHeroSection';
import { WorkExperienceSection } from '@/components/WorkExperienceSection';
import { ContactSection } from '@/components/ContactSection';

export const metadata = {
  title: 'About',
  description: 'Learn more about me and my background.',
};

export default function AboutPage() {
  return (
    <Container className="w-full hero-grid-bg">
        <div className="section-padding">
          <h1 className="mb-8 text-3xl font-bold tracking-tight lowercase text-neutral-900 dark:text-white md:mb-12 md:text-4xl">
            About Me
          </h1>
          <p className="mb-8 text-center text-lg text-neutral-600 dark:text-neutral-400 md:mb-10 md:text-xl">
            I&apos;m a coder, developer, and gamer, obsessed with the world of digital.
          </p>
        
        <AboutHeroSection />
        <WorkExperienceSection />
        <ContactSection />
        </div>
    </Container>
  );
}
