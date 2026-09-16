import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { ArrowRight, TrendingUp, CheckCircle2, Quote } from 'lucide-react';

export const CaseStudiesTeaser: React.FC = () => {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Nonprofits & NGOs', 'Retail & E-Commerce', 'Education & Institutions', 'SaaS / Enterprise Software'];

  const filtered =
    filter === 'All'
      ? siteConfig.caseStudies.slice(0, 4)
      : siteConfig.caseStudies.filter((c) => c.industry.includes(filter) || filter === 'All');

  return (
    <section id="work" className="relative py-24 bg-[#050816] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#0078FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00C9A7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#0078FF]/15 text-[#0078FF] border border-[#0078FF]/30 mb-3">
              <span>PROVEN CLIENT SUCCESS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display">
              Real Results.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7]">
                Measurable Impact.
              </span>
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              We replace fictional claims with verified client engagements. Every milestone is evaluated by tangible operational velocity, adoption, and measurable return.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#0078FF] text-white shadow-md'
                    : 'bg-[#071A35] text-slate-400 border border-slate-800 hover:text-white'
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
              className="group rounded-3xl p-6 sm:p-8 bg-[#071A35]/80 border border-slate-800 hover:border-[#0078FF]/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,120,255,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-md overflow-hidden"
            >
              <div>
                {/* Case Study Image Banner */}
                {cs.imageUrl && (
                  <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-6 border border-slate-800 group-hover:border-[#0078FF]/40 transition-all">
                    <img
                      src={cs.imageUrl}
                      alt={cs.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-[#071A35]/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#050816]/90 text-[#00C9A7] border border-[#00C9A7]/40 backdrop-blur-md font-semibold">
                        {cs.industry}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#050816]/90 text-slate-200 border border-slate-700 backdrop-blur-md">
                        {cs.client}
                      </span>
                    </div>
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00C9A7] transition-colors font-display mb-3">
                  {cs.title}
                </h3>

                {/* Challenge & Solution Summary */}
                <div className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                  <p>
                    <span className="font-bold text-[#0078FF]">Challenge: </span>
                    {cs.challenge}
                  </p>
                  <p>
                    <span className="font-bold text-[#00C9A7]">Solution: </span>
                    {cs.solution}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 my-4 border-y border-slate-800 bg-[#050816]/60 rounded-xl px-4">
                  {cs.results.map((res, rIdx) => (
                    <div key={rIdx} className="text-center sm:text-left">
                      <div className="text-lg sm:text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#0078FF]">
                        {res.value}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{res.label}</div>
                    </div>
                  ))}
                </div>

                {/* Client Quote */}
                {cs.testimonial && (
                  <div className="p-3 rounded-xl bg-[#050816]/70 border border-slate-800/80 my-4 text-xs italic text-slate-300 flex items-start gap-2">
                    <Quote className="w-3.5 h-3.5 text-[#0078FF] flex-shrink-0 mt-0.5" />
                    <div>
                      "{cs.testimonial.quote}"
                      <div className="text-[11px] font-semibold text-white mt-1 not-italic font-mono">
                        — {cs.testimonial.author}, {cs.testimonial.role}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#0078FF] group-hover:text-[#00C9A7]">
                <span>View Full Case Breakdown</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/case-studies')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#071A35] hover:bg-[#071A35]/90 text-sm font-bold text-white border border-[#0078FF]/40 hover:border-[#0078FF] transition-all cursor-pointer shadow-lg"
          >
            <span>Explore All Client Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#0078FF]" />
          </button>
        </div>
      </div>
    </section>
  );
};
