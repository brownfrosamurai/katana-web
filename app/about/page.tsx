import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
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
        <PageHeader
          title="about"
          intro="coder, developer, and gamer, obsessed with building digital products."
        />
        <AboutHeroSection />
      </div>
      <WorkExperienceSection />
      <ContactSection />
    </Container>
  );
}
