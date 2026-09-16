import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { Star, Play, Quote, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenVideoModal?: (title?: string, videoUrl?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenVideoModal,
}) => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(siteConfig.testimonials.length / itemsPerPage);

  const currentTestimonials = siteConfig.testimonials.slice(
    activePageIndex * itemsPerPage,
    (activePageIndex + 1) * itemsPerPage
  );

  return (
    <section id="testimonials" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#0078FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="GLOBAL SOCIAL PROOF"
          title="Trusted by Organizations"
          highlightText="Across Continents"
          description="At InfosBrain, our greatest achievement is the measurable success of our clients. From startups and NGOs to educational institutions and enterprise leaders worldwide."
        />

        {/* Video Testimonial Spotlight Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#071A35] via-[#050816] to-[#071A35] border border-[#0078FF]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative aspect-video w-full lg:w-[420px] rounded-2xl overflow-hidden border border-slate-700/80 group flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
              alt="Client Video Testimonial Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              {onOpenVideoModal && (
                <button
                  onClick={() =>
                    onOpenVideoModal(
                      'Executive Client Testimonial: Global Technology Transformation',
                      ''
                    )
                  }
                  className="w-16 h-16 rounded-full bg-[#0078FF] hover:bg-[#0078FF]/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,120,255,0.7)] group-hover:scale-110 transition-transform cursor-pointer"
                  aria-label="Play client video testimonial"
                >
                  <Play className="w-7 h-7 translate-x-0.5 fill-white" />
                </button>
              )}
            </div>
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-black/80 text-white">
              📹 Video Case: Executive Interview (3:12)
            </div>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-1.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <blockquote className="text-base sm:text-lg text-slate-200 leading-relaxed italic">
              "InfosBrain helped us modernize our operations and accelerate growth through innovative technology solutions. Their team combined technical depth with genuine business acumen."
            </blockquote>
            <div>
              <div className="text-sm font-bold text-white font-display">
                Chief Executive Officer
              </div>
              <div className="text-xs text-[#00C9A7] font-mono">Global Technology & Logistics Enterprise</div>
            </div>
          </div>
        </div>

        {/* 10 Verified Testimonials Grid / Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTestimonials.map((t) => (
            <div
              key={t.id}
              className="group p-6 rounded-3xl bg-[#071A35]/80 border border-slate-800 hover:border-[#0078FF]/50 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[#050816] text-slate-300 border border-slate-800 flex items-center gap-1">
                    <span>{t.flag}</span>
                    <span>{t.country}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.testimonial}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{t.clientName}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                  <p className="text-[11px] text-[#0078FF] font-mono">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setActivePageIndex((prev) => Math.max(0, prev - 1))}
            disabled={activePageIndex === 0}
            className="p-2.5 rounded-xl bg-[#071A35] border border-slate-800 hover:border-[#0078FF] text-slate-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePageIndex(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activePageIndex === i ? 'w-8 bg-[#0078FF]' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActivePageIndex((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={activePageIndex === totalPages - 1}
            className="p-2.5 rounded-xl bg-[#071A35] border border-slate-800 hover:border-[#0078FF] text-slate-300 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* What Clients Value Most About InfosBrain */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#071A35]/60 border border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold text-[#00C9A7] uppercase tracking-wider">
              CLIENT VALUE PROPOSITION
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-1">
              What Clients Value Most About InfosBrain
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.clientValuePoints.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#050816]/70 border border-slate-800/80 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#00C9A7] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
