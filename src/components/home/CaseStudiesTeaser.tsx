import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { ArrowRight, ExternalLink, TrendingUp, Layers } from 'lucide-react';

export const CaseStudiesTeaser: React.FC = () => {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Web Development', 'SEO', 'E-commerce', 'Branding'];

  const filtered =
    filter === 'All'
      ? siteConfig.caseStudies
      : siteConfig.caseStudies.filter((c) => c.category === filter);

  return (
    <section id="work" className="relative py-24 bg-[#070B1F] border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-3">
              <span>FEATURED IMPACT CASES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display">
              Measurable Results For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                Ambitious Brands
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              *Clearly marked demo case studies illustrating our analytical framework and technical executions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((cs) => (
            <div
              key={cs.id}
              onClick={() => navigate('/case-studies')}
              className="group rounded-3xl p-6 sm:p-8 bg-[#050816]/90 border border-slate-800/90 hover:border-cyan-500/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-md overflow-hidden"
            >
              <div>
                {/* Case Study Image Header */}
                {cs.imageUrl && (
                  <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-6 border border-slate-800 group-hover:border-cyan-500/40 transition-all">
                    <img
                      src={cs.imageUrl}
                      alt={cs.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />
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
                    <span className="text-xs font-semibold text-slate-500">{cs.client}</span>
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-3">
                  {cs.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {cs.challenge}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-4 border-y border-slate-800/80 bg-slate-950/40 rounded-xl px-4">
                  {cs.results.map((res, rIdx) => (
                    <div key={rIdx} className="text-center sm:text-left">
                      <div className="text-lg sm:text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                        {res.value}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{res.label}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies used pills */}
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

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                <span>View Full Case Breakdown</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/case-studies')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white border border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer shadow-lg"
          >
            <span>Explore All Client Case Studies</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
