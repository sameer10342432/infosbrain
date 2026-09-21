import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { CaseStudyItem } from '../types';
import {
  ArrowRight,
  TrendingUp,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
} from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<CaseStudyItem | null>(null);

  const categories = ['All', 'Web Development', 'SEO', 'E-commerce', 'Branding'];

  const filtered =
    activeFilter === 'All'
      ? siteConfig.caseStudies
      : siteConfig.caseStudies.filter((c) => c.category === activeFilter);

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Case Studies & Proven Business Outcomes"
        description="See how we transform challenges into opportunities by removing technical barriers, optimizing conversion performance, and driving scalable growth through advanced technology, intelligent automation, and results-focused digital strategies."
      />

      {/* Hero Banner Section with Analytics & Business Growth Imagery */}
      <PageHeroBanner
        badge="PROVEN CLIENT ENGAGEMENTS"
        badgeIcon={<TrendingUp className="w-3.5 h-3.5 text-[#00C9A7]" />}
        title="Case Studies & Proven"
        highlightText="Business Outcomes"
        description="See how we transform challenges into opportunities by removing technical barriers, optimizing conversion performance, and driving scalable growth through advanced technology, intelligent automation, and results-focused digital strategies."
        image={{
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Verified Client Outcomes and Performance Dashboard',
          tag: 'Verified Client Deployments',
          statPill: {
            value: '340%+',
            label: 'Average Pipeline Lift',
            subtext: 'Demonstrated Across 150+ Digital Deployments',
          },
          secondaryPill: {
            text: 'Audit-Ready Analytics',
            icon: <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />,
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
              Request Performance Audit
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/services')}
              icon={<Layers className="w-4 h-4 text-cyan-400" />}
            >
              Explore All Services
            </Button>
          </>
        }
        keyPoints={[
          'Verified Production Benchmarks',
          'Core Web Vitals 95+ Standard',
          'Attribution Model Integrity',
        ]}
      />

      {/* Filter Tabs */}
      <section className="py-8 bg-[#070B1F] border-y border-slate-800 sticky top-[68px] z-30 backdrop-blur-xl bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Case Studies */}
      <section className="py-16 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((cs) => (
              <div
                key={cs.id}
                className="group rounded-3xl p-6 sm:p-8 bg-[#070B1F]/90 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Case Study Cover Image */}
                  {cs.imageUrl && (
                    <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-6 border border-slate-800 group-hover:border-cyan-500/40 transition-all">
                      <img
                        src={cs.imageUrl}
                        alt={cs.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-[#070B1F]/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md font-semibold">
                          {cs.industry}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950/80 text-slate-300 border border-slate-800 backdrop-blur-md">
                          {cs.client}
                        </span>
                      </div>
                    </div>
                  )}

                  {!cs.imageUrl && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900 text-cyan-300 border border-slate-800">
                        {cs.industry}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{cs.client}</span>
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-3">
                    {cs.title}
                  </h2>

                  <div className="space-y-4 my-6">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        The Core Challenge
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{cs.challenge}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                        The InfosBrain Solution
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Results Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-4 border-y border-slate-800/80 bg-slate-950/40 rounded-xl px-4">
                    {cs.results.map((res, rIdx) => (
                      <div key={rIdx} className="text-center sm:text-left">
                        <div className="text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                          {res.value}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {cs.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalItem(cs)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Technical Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate('/contact')}
                    className="text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Get Similar Results →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#070B1F] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {activeModalItem.imageUrl && (
                <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden border border-cyan-500/30">
                  <img
                    src={activeModalItem.imageUrl}
                    alt={activeModalItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30">
                      {activeModalItem.industry}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  {activeModalItem.industry} • {activeModalItem.client}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">
                  {activeModalItem.title}
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-slate-300 uppercase mb-1">
                  Business Challenge
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {activeModalItem.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-cyan-300 uppercase mb-1">
                  InfosBrain Technical Strategy
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {activeModalItem.solution}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-300 uppercase mb-3">
                  Verified Outcome Benchmarks
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeModalItem.results.map((res, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-xl font-bold font-display text-cyan-400">
                        {res.value}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-300 uppercase mb-2">
                  Deployed Architecture Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setActiveModalItem(null);
                    navigate('/contact');
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Similar Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Consultation Banner */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-display mb-4">
            Ready For Measurable Outcomes?
          </h2>
          <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto">
            Review your website code, search rankings, or ad performance with our senior architects.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/contact')}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Request Strategic Growth Audit
          </Button>
        </div>
      </section>
    </div>
  );
};
