import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = siteConfig.testimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-24 bg-[#070B1F] border-t border-slate-800/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="CLIENT PERSPECTIVES"
          title="What Partners Say"
          highlightText="About Our Impact"
          description="*Clearly marked demo testimonials demonstrating client satisfaction benchmarks. Ready to be populated with your verified reviews."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-[#050816]/90 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl">
            <Quote className="w-12 h-12 text-cyan-500/20 absolute top-8 right-8" />

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-lg sm:text-2xl text-slate-200 font-normal leading-relaxed italic mb-8">
              "{current.testimonial}"
            </p>

            {/* Author info & controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-4">
                {current.avatarUrl ? (
                  <img
                    src={current.avatarUrl}
                    alt={current.clientName}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-display font-bold text-white shadow-md text-lg">
                    {current.avatarText}
                  </div>
                )}
                <div>
                  <div className="text-base font-bold text-white font-display">
                    {current.clientName}
                  </div>
                  <div className="text-xs text-slate-400">
                    {current.role} • <span className="text-cyan-400 font-semibold">{current.company}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Carousel Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
