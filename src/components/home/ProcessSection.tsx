import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { Search, Compass, Code2, TrendingUp, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const stepIcons = [Search, Compass, Code2, TrendingUp];

  return (
    <section id="approach" className="relative py-24 bg-[#071A35] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[#6C4DFF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="DELIVERY METHODOLOGY"
          title="Our"
          highlightText="Approach"
          description="A disciplined, transparent 4-stage implementation framework designed to turn complex challenges into scalable, future-ready digital solutions."
        />

        {/* 4 Steps Grid with Horizontal Connector */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-[#0078FF]/30 via-[#6C4DFF]/40 to-[#00C9A7]/40 -translate-y-1/2 pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {siteConfig.processSteps.map((step, idx) => {
              const StepIcon = stepIcons[idx] || Search;
              return (
                <div
                  key={idx}
                  className="group relative rounded-3xl p-7 bg-[#050816]/90 border border-slate-800 hover:border-[#0078FF]/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(0,120,255,0.2)] transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    {/* Step Header with Node Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-[#00C9A7] group-hover:bg-gradient-to-tr group-hover:from-[#0078FF] group-hover:to-[#00C9A7] flex items-center justify-center text-[#00C9A7] group-hover:text-white transition-all shadow-md group-hover:scale-105">
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <span className="font-display font-black text-3xl text-slate-700 group-hover:text-[#00C9A7] transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#00C9A7] transition-colors font-display mb-1">
                      {step.number} — {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#0078FF] mb-3">
                      {step.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Progress Node Indicator */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>STAGE 0{idx + 1} OF 04</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0078FF]/40 group-hover:bg-[#00C9A7] group-hover:shadow-[0_0_10px_rgba(0,201,167,0.8)] transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
