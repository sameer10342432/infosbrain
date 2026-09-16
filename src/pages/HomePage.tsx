import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMetrics } from '../components/home/TrustMetrics';
import { ServicesSection } from '../components/home/ServicesSection';
import { AboutTeaserSection } from '../components/home/AboutTeaserSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TechnologiesSection } from '../components/home/TechnologiesSection';
import { CaseStudiesTeaser } from '../components/home/CaseStudiesTeaser';
import { IndustriesTeaser } from '../components/home/IndustriesTeaser';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { InsightsTeaser } from '../components/home/InsightsTeaser';
import { FAQSection } from '../components/home/FAQSection';
import { GrandCTASection } from '../components/home/GrandCTASection';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Transforming Ideas Into Digital Growth"
        description="InfosBrain is a modern digital agency providing technology, web development, digital marketing, SEO, design, and growth solutions for businesses worldwide."
      />
      <main className="w-full">
        <HeroSection />
        <TrustMetrics />
        <ServicesSection />
        <AboutTeaserSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <TechnologiesSection />
        <CaseStudiesTeaser />
        <IndustriesTeaser />
        <TestimonialsSection />
        <InsightsTeaser />
        <FAQSection />
        <GrandCTASection />
      </main>
    </>
  );
};
