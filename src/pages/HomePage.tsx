import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMetrics } from '../components/home/TrustMetrics';
import { ServicesSection } from '../components/home/ServicesSection';
import { AIToolsSection } from '../components/home/AIToolsSection';
import { GlobalPresenceSection } from '../components/home/GlobalPresenceSection';
import { FeaturedInnovationsSection } from '../components/home/FeaturedInnovationsSection';
import { IndustriesTeaser } from '../components/home/IndustriesTeaser';
import { CaseStudiesTeaser } from '../components/home/CaseStudiesTeaser';
import { LeadershipSection } from '../components/home/LeadershipSection';
import { InnovationCenterSection } from '../components/home/InnovationCenterSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PartnershipSection } from '../components/home/PartnershipSection';
import { CareersTeaserSection } from '../components/home/CareersTeaserSection';
import { ContactSection } from '../components/home/ContactSection';

interface HomePageProps {
  onOpenConsultation?: () => void;
  onOpenVideoModal?: (title?: string, videoUrl?: string) => void;
  onOpenChatbot?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenConsultation,
  onOpenVideoModal,
  onOpenChatbot,
}) => {
  return (
    <>
      <SEOHead
        title="Transforming Ideas into Intelligent Digital Solutions"
        description="InfosBrain is a technology-driven company that helps businesses, nonprofits, institutions, and public-sector organizations design, build, and scale practical digital solutions through software development, artificial intelligence, cloud technologies, cybersecurity, and digital transformation consulting."
      />
      <main className="w-full">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenConsultation={onOpenConsultation}
          onOpenVideoModal={onOpenVideoModal}
        />

        {/* 2. Trust & Credibility */}
        <TrustMetrics />

        {/* 3. Core Services */}
        <ServicesSection />

        {/* 4. AI-Powered Tools Showcase */}
        <AIToolsSection onOpenConsultation={onOpenConsultation} />

        {/* 5. Global Presence & Interactive Map */}
        <GlobalPresenceSection />

        {/* 6. Featured Innovations & AI Innovation Lab */}
        <FeaturedInnovationsSection />

        {/* 7. Industries We Serve */}
        <IndustriesTeaser />

        {/* 8. Client Success Stories */}
        <CaseStudiesTeaser />

        {/* 9. Leadership Section */}
        <LeadershipSection />

        {/* 10. Innovation Center (Thought Leadership Hub) */}
        <InnovationCenterSection />

        {/* 11. Client Testimonials */}
        <TestimonialsSection onOpenVideoModal={onOpenVideoModal} />

        {/* 12. Strategic Partnerships */}
        <PartnershipSection />

        {/* 13. Careers Section */}
        <CareersTeaserSection />

        {/* 14. Contact Section */}
        <ContactSection
          onOpenConsultation={onOpenConsultation}
          onOpenChatbot={onOpenChatbot}
        />
      </main>
    </>
  );
};
