import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMetrics } from '../components/home/TrustMetrics';
import { AboutTeaserSection } from '../components/home/AboutTeaserSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { IndustriesTeaser } from '../components/home/IndustriesTeaser';
import { CaseStudiesTeaser } from '../components/home/CaseStudiesTeaser';
import { PartnershipSection } from '../components/home/PartnershipSection';
import { GrandCTASection } from '../components/home/GrandCTASection';
import { AIToolsSection } from '../components/home/AIToolsSection';
import { GlobalPresenceSection } from '../components/home/GlobalPresenceSection';
import { FeaturedInnovationsSection } from '../components/home/FeaturedInnovationsSection';
import { LeadershipSection } from '../components/home/LeadershipSection';
import { InnovationCenterSection } from '../components/home/InnovationCenterSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
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
        title="Digital Transformation & Technology Solutions"
        description="InfosBrain delivers digital transformation solutions for organizations ready to scale, innovate, and lead. Turning complex challenges into practical, measurable digital solutions through software development, AI, cloud solutions, cybersecurity, and digital growth."
      />
      <main className="w-full">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenConsultation={onOpenConsultation}
          onOpenVideoModal={onOpenVideoModal}
        />

        {/* 2. Trust Metrics Bar */}
        <TrustMetrics />

        {/* 3. Who We Are (About Teaser) */}
        <AboutTeaserSection />

        {/* 4. Our Services (6 Core Practices) */}
        <ServicesSection />

        {/* 5. Why Choose InfosBrain (4 Cards) */}
        <WhyChooseUsSection />

        {/* 6. Our Approach (4-Stage Process Timeline) */}
        <ProcessSection />

        {/* 7. Industries We Serve (8 Sectors) */}
        <IndustriesTeaser />

        {/* 8. Case Studies & Proven Business Outcomes */}
        <CaseStudiesTeaser />

        {/* 9. Your Trusted Partner in Digital Innovation */}
        <PartnershipSection />

        {/* 10. AI Tools & Interactive Demos */}
        <AIToolsSection onOpenConsultation={onOpenConsultation} />

        {/* 11. Global Presence Hubs */}
        <GlobalPresenceSection />

        {/* 12. Featured Innovations Lab */}
        <FeaturedInnovationsSection />

        {/* 13. Leadership Advisory */}
        <LeadershipSection />

        {/* 14. Innovation Center & Thought Leadership */}
        <InnovationCenterSection />

        {/* 15. Client Testimonials */}
        <TestimonialsSection onOpenVideoModal={onOpenVideoModal} />

        {/* 16. Careers & Culture */}
        <CareersTeaserSection />

        {/* 17. Grand CTA: Let's Build Something Extraordinary Together */}
        <GrandCTASection onOpenConsultation={onOpenConsultation} />

        {/* 18. Contact Section & Inquiries */}
        <ContactSection
          onOpenConsultation={onOpenConsultation}
          onOpenChatbot={onOpenChatbot}
        />
      </main>
    </>
  );
};
