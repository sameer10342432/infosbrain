import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Code2,
  Sparkles,
  Cloud,
  ShieldCheck,
  TrendingUp,
  Layers,
  ArrowRight,
  Globe,
  Smartphone,
  BarChart3,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { navigate } = useRouter();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return Code2;
      case 'Sparkles':
        return Sparkles;
      case 'Cloud':
        return Cloud;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'TrendingUp':
        return TrendingUp;
      case 'Layers':
        return Layers;
      case 'Globe':
        return Globe;
      case 'Smartphone':
        return Smartphone;
      case 'BarChart3':
        return BarChart3;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#071A35] overflow-hidden">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0078FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="CAPABILITIES & PRACTICES"
          title="Our"
          highlightText="Services"
          description="We deliver high-impact digital solutions across software development, artificial intelligence, cloud infrastructure, cybersecurity, and strategic growth."
        />

        {/* 6 Core Services Balanced Grid: 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {siteConfig.coreServices.map((service) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                onClick={() => navigate(service.path)}
                className="group relative rounded-3xl p-7 bg-[#050816]/90 border border-slate-800 hover:border-[#0078FF]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(0,120,255,0.2)] backdrop-blur-md cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle corner glow effect on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0078FF]/5 rounded-full blur-2xl group-hover:bg-[#0078FF]/20 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Animated icon container */}
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-[#0078FF] group-hover:bg-gradient-to-tr group-hover:from-[#0078FF] group-hover:to-[#6C4DFF] flex items-center justify-center text-[#0078FF] group-hover:text-white transition-all duration-300 shadow-md group-hover:scale-105">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#071A35] text-slate-300 border border-slate-800">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#00C9A7] transition-colors font-display mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Sub Pillars Pills */}
                  <div className="space-y-2 mb-6">
                    {service.subPillars.map((pillar, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A7]" />
                        <span>{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learn More Button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#0078FF] group-hover:text-[#00C9A7] transition-colors">
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Hub Link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#050816] hover:bg-slate-900 text-sm font-bold text-white border border-[#0078FF]/30 hover:border-[#0078FF] transition-all cursor-pointer shadow-lg"
          >
            <span>Explore All Capabilities & Roadmaps</span>
            <ArrowRight className="w-4 h-4 text-[#0078FF]" />
          </button>
        </div>
      </div>
    </section>
  );
};
