import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  TrendingUp,
  Users,
  Cpu,
  Sparkles,
  MessageSquare,
  BarChart2,
  ShieldCheck,
  Repeat,
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp':
        return TrendingUp;
      case 'Users':
        return Users;
      case 'Cpu':
        return Cpu;
      case 'Sparkles':
        return Sparkles;
      case 'MessageSquare':
        return MessageSquare;
      case 'BarChart2':
        return BarChart2;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Repeat':
        return Repeat;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="why-us" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background cyber pattern */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="THE INFOSBRAIN ADVANTAGE"
          title="Why Businesses"
          highlightText="Choose InfosBrain"
          description="We combine engineering precision with market-making growth strategies to ensure your digital investment drives measurable business velocity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.whyChooseUs.map((card, idx) => {
            const Icon = getIcon(card.icon);
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-6 bg-[#070B1F]/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-[#070B1F]/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400/60 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-500 transition-all mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-2">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
