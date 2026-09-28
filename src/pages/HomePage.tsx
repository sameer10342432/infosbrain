import React from 'react';
import { useCms } from '../context/CmsContext';
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
  const { isSectionVisible } = useCms();

  return (
    <>
      <SEOHead
        title="Digital Transformation & Technology Solutions"
        description="InfosBrain delivers digital transformation solutions for organizations ready to scale, innovate, and lead. Turning complex challenges into practical, measurable digital solutions through software development, AI, cloud solutions, cybersecurity, and digital growth."
      />
      <main className="w-full">
        {/* 1. Hero Section */}
        {isSectionVisible('home_hero') && (
          <HeroSection
            onOpenConsultation={onOpenConsultation}
            onOpenVideoModal={onOpenVideoModal}
          />
        )}

        {/* 2. Trust Metrics Bar */}
        {isSectionVisible('home_metrics') && <TrustMetrics />}

        {/* 3. Who We Are (About Teaser) */}
        {isSectionVisible('home_about') && <AboutTeaserSection />}

        {/* 4. Our Services (6 Core Practices) */}
        {isSectionVisible('home_services') && <ServicesSection />}

        {/* 5. Why Choose InfosBrain (4 Cards) */}
        {isSectionVisible('home_why_us') && <WhyChooseUsSection />}

        {/* 6. Our Approach (4-Stage Process Timeline) */}
        {isSectionVisible('home_process') && <ProcessSection />}

        {/* 7. Industries We Serve (8 Sectors) */}
        {isSectionVisible('home_industries') && <IndustriesTeaser />}

        {/* 8. Case Studies & Proven Business Outcomes */}
        {isSectionVisible('home_case_studies') && <CaseStudiesTeaser />}

        {/* 9. Your Trusted Partner in Digital Innovation */}
        {isSectionVisible('home_partnerships') && <PartnershipSection />}

        {/* 10. AI Tools & Interactive Demos */}
        {isSectionVisible('home_ai_tools') && (
          <AIToolsSection onOpenConsultation={onOpenConsultation} />
        )}

        {/* 11. Global Presence Hubs */}
        {isSectionVisible('home_global_presence') && <GlobalPresenceSection />}

        {/* 12. Featured Innovations Lab */}
        {isSectionVisible('home_innovations') && <FeaturedInnovationsSection />}

        {/* 13. Leadership Advisory */}
        {isSectionVisible('home_leadership') && <LeadershipSection />}

        {/* 14. Innovation Center & Thought Leadership */}
        {isSectionVisible('home_thought_leadership') && <InnovationCenterSection />}

        {/* 15. Client Testimonials */}
        {isSectionVisible('home_testimonials') && (
          <TestimonialsSection onOpenVideoModal={onOpenVideoModal} />
        )}

        {/* 16. Careers & Culture */}
        {isSectionVisible('home_careers') && <CareersTeaserSection />}

        {/* 17. Grand CTA: Let's Build Something Extraordinary Together */}
        {isSectionVisible('home_cta') && (
          <GrandCTASection onOpenConsultation={onOpenConsultation} />
        )}

        {/* 18. Contact Section & Inquiries */}
        {isSectionVisible('home_contact') && (
          <ContactSection
            onOpenConsultation={onOpenConsultation}
            onOpenChatbot={onOpenChatbot}
          />
        )}
      </main>
    </>
  );
};
