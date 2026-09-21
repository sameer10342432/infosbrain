import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Lightbulb,
  Cpu,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Lightbulb':
        return Lightbulb;
      case 'Cpu':
        return Cpu;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Lightbulb;
    }
  };

  const cardAccents = [
    { border: 'hover:border-[#0078FF]/60', shadow: 'hover:shadow-[0_15px_35px_rgba(0,120,255,0.2)]', iconBg: 'group-hover:bg-[#0078FF]', textGrad: 'from-[#0078FF] to-cyan-400' },
    { border: 'hover:border-[#6C4DFF]/60', shadow: 'hover:shadow-[0_15px_35px_rgba(108,77,255,0.2)]', iconBg: 'group-hover:bg-[#6C4DFF]', textGrad: 'from-[#6C4DFF] to-indigo-400' },
    { border: 'hover:border-[#00C9A7]/60', shadow: 'hover:shadow-[0_15px_35px_rgba(0,201,167,0.2)]', iconBg: 'group-hover:bg-[#00C9A7]', textGrad: 'from-[#00C9A7] to-emerald-400' },
    { border: 'hover:border-[#0078FF]/60', shadow: 'hover:shadow-[0_15px_35px_rgba(0,120,255,0.2)]', iconBg: 'group-hover:bg-[#0078FF]', textGrad: 'from-[#0078FF] to-[#00C9A7]' },
  ];

  return (
    <section id="why-choose-us" className="relative py-24 bg-[#050816] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#0078FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="THE INFOSBRAIN ADVANTAGE"
          title="Why Choose"
          highlightText="InfosBrain"
          description="We align engineering precision with strategic consulting to deliver scalable, secure solutions that produce verifiable business velocity."
        />

        {/* 4 Visually Balanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.whyChooseUs.map((card, idx) => {
            const Icon = getIcon(card.icon);
            const accent = cardAccents[idx] || cardAccents[0];

            return (
              <div
                key={idx}
                className={`group relative rounded-3xl p-7 bg-[#071A35]/85 border border-slate-800 ${accent.border} ${accent.shadow} transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-md flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00C9A7] ${accent.iconBg} group-hover:text-white transition-all duration-300 mb-6 shadow-md`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-[#00C9A7] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9A7]" /> Verified
                  </span>
                  <span className="text-[#0078FF] group-hover:translate-x-1 transition-transform">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
