import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Building,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Cpu,
  Rocket,
  ArrowRight,
  Handshake,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const PartnershipSection: React.FC = () => {
  const { navigate } = useRouter();

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Building':
        return Building;
      case 'GraduationCap':
        return GraduationCap;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'Landmark':
        return Landmark;
      case 'Cpu':
        return Cpu;
      case 'Rocket':
        return Rocket;
      default:
        return Handshake;
    }
  };

  return (
    <section id="partnerships" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#00C9A7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="STRATEGIC ALLIANCES & ECOSYSTEM"
          title="Building Strategic"
          highlightText="Global Alliances"
          description="InfosBrain collaborates with enterprises, governments, academic institutions, and investors to co-create scalable solutions, foster digital capacity, and deploy transformative technologies worldwide."
        />

        {/* 6 Partner Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {siteConfig.partnerships.categories.map((cat, idx) => {
            const Icon = getCategoryIcon(cat.iconName);
            return (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-[#071A35]/80 border border-slate-800 hover:border-[#00C9A7]/50 hover:shadow-[0_0_30px_rgba(0,201,167,0.15)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-[#00C9A7]/40 group-hover:bg-[#00C9A7]/10 flex items-center justify-center text-[#00C9A7] transition-all mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{cat.desc}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9A7]" /> Active Collaboration
                  </span>
                  <span className="text-[#0078FF] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grand Invitation Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#071A35] via-[#050816] to-[#071A35] border border-[#0078FF]/30 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-[#0078FF] uppercase tracking-wider">
              CO-CREATE THE FUTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Join InfosBrain as an Institutional or Technology Partner
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you are an enterprise seeking technical modernization, an NGO pursuing donor engagement automation, or a university advancing responsible AI research, we invite your collaboration.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] hover:opacity-95 text-white font-bold text-sm shadow-[0_0_30px_rgba(0,120,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Become a Strategic Partner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
