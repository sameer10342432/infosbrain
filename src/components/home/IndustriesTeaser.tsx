import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  ShoppingBag,
  Cpu,
  Building,
  Activity,
  DollarSign,
  GraduationCap,
  Briefcase,
  Store,
  Compass,
  Rocket,
  Laptop,
  Users,
  ArrowRight,
} from 'lucide-react';

export const IndustriesTeaser: React.FC = () => {
  const { navigate } = useRouter();

  const getIndustryIcon = (name: string) => {
    switch (name) {
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Cpu':
        return Cpu;
      case 'Building':
        return Building;
      case 'Activity':
        return Activity;
      case 'DollarSign':
        return DollarSign;
      case 'GraduationCap':
        return GraduationCap;
      case 'Briefcase':
        return Briefcase;
      case 'Store':
        return Store;
      case 'Compass':
        return Compass;
      case 'Rocket':
        return Rocket;
      case 'Laptop':
        return Laptop;
      case 'Users':
        return Users;
      default:
        return Briefcase;
    }
  };

  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="TARGET DOMAINS"
          title="Tailored Solutions For"
          highlightText="Every Key Sector"
          description="Every industry operates under distinct regulatory constraints, buyer psychology, and unit economics. We tailor strategies to your precise vertical."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.industries.slice(0, 6).map((ind) => {
            const Icon = getIndustryIcon(ind.iconName);
            return (
              <div
                key={ind.id}
                onClick={() => navigate('/industries')}
                className="group p-6 rounded-2xl bg-[#070B1F]/80 border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.15)] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Industry Visual Banner */}
                  {ind.imageUrl && (
                    <div className="relative h-32 w-full rounded-xl overflow-hidden mb-4 border border-slate-800 group-hover:border-cyan-500/30 transition-all">
                      <img
                        src={ind.imageUrl}
                        alt={ind.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-[#070B1F]/30 to-transparent" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 backdrop-blur-md">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {!ind.imageUrl && (
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-all mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-2">
                    {ind.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {ind.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ind.relevantServices.map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300/80 bg-cyan-950/40 border border-cyan-500/20"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                  <span>View Sector Roadmap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/industries')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sm font-bold text-slate-200 border border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer shadow-lg"
          >
            <span>Explore All 12 Specialized Industry Practices</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
