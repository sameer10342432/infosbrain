import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { Globe, Rocket, Handshake, Star, ShieldCheck, Headphones } from 'lucide-react';

export const TrustMetrics: React.FC = () => {
  const icons = [Globe, Rocket, Star, Handshake, ShieldCheck, Headphones];

  return (
    <section className="relative py-10 bg-[#050816] border-y border-[#0078FF]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Statement */}
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#00C9A7] font-mono">
            // TRUST & CREDIBILITY //
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Proven engineering delivery across continents with enterprise SLAs and verified client outcomes.
          </p>
        </div>

        {/* Horizontal scroll on mobile, responsive grid on sm+ */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {siteConfig.stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="flex-shrink-0 min-w-[150px] sm:min-w-0 p-4 rounded-2xl bg-[#071A35]/80 border border-slate-800 hover:border-[#0078FF]/50 hover:shadow-[0_0_20px_rgba(0,120,255,0.2)] transition-all text-center group backdrop-blur-md"
              >
                <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-[#0078FF]/10 border border-[#0078FF]/30 flex items-center justify-center text-[#0078FF] group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#0078FF]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

