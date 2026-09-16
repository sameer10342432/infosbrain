import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Mail,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
        <p className="text-slate-400 mb-6">The requested service page does not exist.</p>
        <Button variant="primary" onClick={() => navigate('/services')}>
          Back to All Services
        </Button>
      </div>
    );
  }

  // Fallback defaults for rich details
  const heroSubtitle = service.heroSubtitle || service.shortDescription;
  const fullDesc =
    service.fullDescription ||
    `${service.shortDescription} At InfosBrain, we engineer solutions designed to maximize ROI, reduce latency, and scale seamlessly with your organizational growth.`;
  const deliverables =
    service.deliverables && service.deliverables.length > 0
      ? service.deliverables
      : [
          'Full-scale strategic assessment & roadmap',
          'High-performance production execution',
          'Comprehensive quality assurance & testing',
          'Bi-weekly performance & KPI tracking reviews',
        ];
  const tools =
    service.tools && service.tools.length > 0
      ? service.tools
      : service.technologies && service.technologies.length > 0
      ? service.technologies
      : ['Google Analytics 4', 'Next.js', 'Tailwind CSS', 'Figma', 'GitHub CI/CD'];
  const processSteps =
    service.process && service.process.length > 0
      ? service.process
      : [
          { phase: 'Discovery & Audit', description: 'Deep-dive architectural review and baseline metrics analysis.' },
          { phase: 'Solution Architecture', description: 'Technical blueprinting, sprint planning, and KPI benchmark alignment.' },
          { phase: 'Engineering & Execution', description: 'Rapid sprint development with continuous test coverage and review.' },
          { phase: 'Optimization & Scale', description: 'Ongoing multivariate experimentation and scale acceleration.' },
        ];
  const faqs =
    service.faqs && service.faqs.length > 0
      ? service.faqs
      : [
          { q: `How quickly can InfosBrain initiate ${service.title}?`, a: 'Typical onboarding commences within 3-5 business days following technical discovery and agreement execution.' },
          { q: 'Who retains ownership of assets and accounts?', a: 'You retain 100% intellectual property ownership of all custom code, assets, and advertising accounts created during our engagement.' },
          { q: 'How do you measure service success?', a: 'Every engagement tracks explicit KPIs—ranging from Core Web Vitals to qualified pipeline generation and verified ROAS.' },
        ];

  const relatedServices = siteConfig.services
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, 3);

  const fallbackRelated =
    relatedServices.length > 0
      ? relatedServices
      : siteConfig.services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title={`${service.title} - InfosBrain Agency`}
        description={service.shortDescription}
      />

      {/* Hero Banner Section with Service Thematic Image */}
      <PageHeroBanner
        breadcrumbs={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'Services', onClick: () => navigate('/services') },
          { label: service.title },
        ]}
        badge={`${service.category} Practice`}
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
        title={service.title}
        description={heroSubtitle}
        image={{
          src: service.imageUrl,
          alt: `${service.title} - InfosBrain Practice`,
          tag: `InfosBrain ${service.category}`,
          statPill: {
            value: 'Enterprise Grade',
            label: `${service.category} Delivery`,
            subtext: 'Turnkey Execution & Sprints',
          },
          secondaryPill: {
            text: 'Production Verified',
            icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        actions={
          <>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/contact')}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get a Free Consultation
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/services')}
            >
              Explore Other Services
            </Button>
          </>
        }
        keyPoints={service.features.slice(0, 3)}
      />

      {/* Overview & Why It Matters */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                // COMPREHENSIVE OVERVIEW
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                Strategic Scope & Capabilities
              </h2>

              {/* Service Hero Showcase Image */}
              {service.imageUrl && (
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-transparent to-black/30" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/40 backdrop-blur-md">
                      InfosBrain {service.category} Practice
                    </span>
                    <span className="text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
                      Production Stack
                    </span>
                  </div>
                </div>
              )}

              <p className="text-base text-slate-300 leading-relaxed">
                {fullDesc}
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="text-base font-bold text-white">Why This Service Drives Valuation:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables Checklist Card */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                    KEY DELIVERABLES INCLUDED
                  </span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="space-y-3">
                  {deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400 text-[10px]">
                        ✓
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400 mb-2">Technologies & Tooling:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Methodology / Steps */}
      <section className="py-20 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-3">
              <span>EXECUTION PROTOCOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              How We Execute {service.title}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Our 4-stage engineering and optimization cadence ensures predictable velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl bg-[#070B1F] border border-slate-800 hover:border-cyan-500/50 transition-all group"
              >
                <div className="font-display font-black text-2xl text-cyan-400/80 mb-3">
                  0{sIdx + 1}
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                  {step.phase}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {service.title} FAQs
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Common client questions regarding timelines, scopes, and benchmarks.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-xl bg-[#050816] border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Services Navigation */}
      <section className="py-16 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-white font-display mb-6">
            Complementary Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackRelated.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/services/${rel.slug}`)}
                className="p-5 rounded-2xl bg-[#070B1F] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
              >
                <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-1">
                  {rel.title}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {rel.shortDescription}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Direct CTA */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-display mb-4">
            Accelerate With {service.title}
          </h2>
          <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto">
            Speak directly with our practice directors. Email{' '}
            <span className="text-cyan-300 font-mono">info@infosbrain.com</span> or submit your project details.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/contact')}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Schedule Discovery Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};
