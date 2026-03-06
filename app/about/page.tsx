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
    <Container className="hero-grid-bg w-full">
      <div className="section-padding">
        <h1 className="page-heading">About Me</h1>
        <p className="page-intro">
          I&apos;m a coder, developer, and gamer, obsessed with the world of
          digital.
        </p>

        <AboutHeroSection />
        <WorkExperienceSection />
        <ContactSection />
      </div>
    </Container>
  );
}
