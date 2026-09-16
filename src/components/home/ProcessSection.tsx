import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { Search, Compass, Palette, Code2, Rocket, TrendingUp } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const stepIcons = [Search, Compass, Palette, Code2, Rocket, TrendingUp];

  return (
    <section id="process" className="relative py-24 bg-[#070B1F] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-spotlight-purple pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR METHODOLOGY"
          title="How We Work:"
          highlightText="From Concept to Velocity"
          description="A disciplined 6-phase engineering and growth framework designed to eliminate friction, de-risk deployments, and compound digital return."
        />

        {/* 6 Steps Grid with Connecting Nodes */}
        <div className="relative">
          {/* Subtle horizontal glowing connecting line visible on large screens */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-violet-500/20 -translate-y-1/2 pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {siteConfig.processSteps.map((step, idx) => {
              const StepIcon = stepIcons[idx] || Search;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl p-7 bg-[#050816]/90 border border-slate-800/80 hover:border-cyan-500/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    {/* Step Header with Node Number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-400 group-hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className="font-display font-black text-2xl sm:text-3xl text-slate-700 group-hover:text-cyan-400/80 transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-cyan-400/90 mb-3">
                      {step.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Progress Node Indicator */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>PHASE 0{idx + 1} OF 06</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />
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
