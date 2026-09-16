import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export const TrustMetrics: React.FC = () => {
  return (
    <section className="relative py-12 bg-[#070B1F] border-y border-cyan-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Statement */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-cyan-400/90 font-mono">
            // {siteConfig.trustStatement} //
          </p>
          <div className="mt-1 text-[11px] text-slate-500">
            *Performance benchmarks configured for demonstration and scalable growth baseline.
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {siteConfig.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all text-center group backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
