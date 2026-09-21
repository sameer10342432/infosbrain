import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import {
  ShoppingBag,
  Cpu,
  Building,
  Activity,
  DollarSign,
  GraduationCap,
  Briefcase,
  Store,
  Compass,
  Rocket,
  Laptop,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export const IndustriesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<string>(siteConfig.industries[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Cpu':
        return Cpu;
      case 'Building':
        return Building;
      case 'Activity':
        return Activity;
      case 'DollarSign':
        return DollarSign;
      case 'GraduationCap':
        return GraduationCap;
      case 'Briefcase':
        return Briefcase;
      case 'Store':
        return Store;
      case 'Compass':
        return Compass;
      case 'Rocket':
        return Rocket;
      case 'Laptop':
        return Laptop;
      case 'Users':
        return Users;
      default:
        return Briefcase;
    }
  };

  const activeInd = siteConfig.industries.find((i) => i.id === selectedIndustry) || siteConfig.industries[0];
  const ActiveIcon = getIcon(activeInd.iconName);

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Industries We Serve"
        description="InfosBrain supports organizations across private, public, and mission-driven sectors with specialized digital transformation and technology solutions."
      />

      {/* Hero Banner Section with Enterprise Industry Architecture Imagery */}
      <PageHeroBanner
        badge="SECTOR PRACTICE & EXPERTISE"
        badgeIcon={<Building className="w-3.5 h-3.5 text-[#00C9A7]" />}
        title="Industries We"
        highlightText="Serve"
        description="InfosBrain supports organizations across private, public, and mission-driven sectors. We deliver tailored digital solutions architected around your industry's precise operational realities."
        image={{
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Enterprise Sector Architectures and Skyline',
          tag: '12 Sector Playbooks',
          statPill: {
            value: '12 Verticals',
            label: 'Engineered Solutions',
            subtext: 'FinTech, Health, E-Commerce, SaaS & More',
          },
          secondaryPill: {
            text: 'Domain Compliant',
            icon: <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        actions={
          <>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/contact')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Consult An Industry Specialist
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/case-studies')}
              icon={<Layers className="w-4 h-4 text-cyan-400" />}
            >
              View Proven Results
            </Button>
          </>
        }
        keyPoints={[
          'Custom Regulatory Compliance',
          'Tailored Conversion Funnels',
          'Vertical-Specific Stacks',
        ]}
      />

      {/* Interactive Industry Explorer */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Industry Selector Sidebar */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-3 px-3">
                SELECT INDUSTRY PRACTICE
              </div>
              <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-2 custom-scrollbar">
                {siteConfig.industries.map((ind) => {
                  const Icon = getIcon(ind.iconName);
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndustry(ind.id)}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {ind.imageUrl ? (
                          <img
                            src={ind.imageUrl}
                            alt=""
                            aria-hidden="true"
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-700"
                          />
                        ) : (
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`} />
                        )}
                        <span className="text-xs sm:text-sm font-semibold truncate">{ind.name}</span>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 ml-1 ${isSelected ? 'text-cyan-400' : 'opacity-0'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Industry Detail Pane */}
            <div className="lg:col-span-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#050816] border border-cyan-500/40 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                {/* Industry Hero Image */}
                {activeInd.imageUrl && (
                  <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden mb-8 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] group">
                    <img
                      src={activeInd.imageUrl}
                      alt={activeInd.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-lg backdrop-blur-md">
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-bold">
                          INFOSBRAIN SECTOR PRACTICE
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                          {activeInd.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {!activeInd.imageUrl && (
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg">
                      <ActiveIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                        {activeInd.name}
                      </h2>
                      <p className="text-sm text-cyan-300 font-medium">{activeInd.tagline}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      SECTOR DESCRIPTION
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {activeInd.description || activeInd.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-xs font-bold text-red-400 uppercase tracking-wide mb-1">
                        Frequent Industry Friction
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        High customer acquisition cost, fragmented tech ecosystems, slow page load velocities, and low post-click conversions.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-1">
                        InfosBrain Strategic Remedy
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Headless frontend architectures, targeted programmatic SEO capture, and predictive ROAS bid modeling.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                      PRIMARY RECOMMENDED SERVICE DISCIPLINES
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeInd.relevantServices.map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-400">
                      Custom sprint architectures available for this domain.
                    </span>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => navigate('/contact')}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Request {activeInd.name} Audit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom All Sectors Grid */}
      <section className="py-20 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="ALL PRACTICES"
            title="Complete Industry"
            highlightText="Coverage"
            description="Our engineers and strategists bring deep situational fluency across both B2B and B2C enterprise sectors."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.industries.map((ind) => {
              const Icon = getIcon(ind.iconName);
              return (
                <div
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className="p-6 rounded-2xl bg-[#070B1F] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-1">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{ind.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
