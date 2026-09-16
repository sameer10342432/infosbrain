import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Cpu,
  Workflow,
  Shield,
  Radio,
  GraduationCap,
  Building2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  FlaskConical,
  Atom,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const FeaturedInnovationsSection: React.FC = () => {
  const { navigate } = useRouter();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return Cpu;
      case 'Workflow':
        return Workflow;
      case 'Shield':
        return Shield;
      case 'Radio':
        return Radio;
      case 'GraduationCap':
        return GraduationCap;
      case 'Building2':
        return Building2;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Sparkles;
    }
  };

  const labTechs = [
    'Generative AI',
    'Machine Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Intelligent Automation',
    'AI Agents',
    'Predictive Analytics',
    'Knowledge Management',
    'Digital Assistants',
    'Intelligent Research Platforms',
  ];

  return (
    <section id="innovations" className="relative py-24 bg-[#071A35] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#6C4DFF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="FEATURED INNOVATIONS & R&D"
          title="Future Technologies"
          highlightText="Engineered For Today"
          description="InfosBrain continuously explores emerging technologies to transform innovative concepts into production-grade solutions that create lasting value for organizations worldwide."
        />

        {/* Future Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {siteConfig.innovations.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="group p-6 rounded-2xl bg-[#050816]/80 border border-slate-800/80 hover:border-[#6C4DFF]/50 hover:shadow-[0_0_25px_rgba(108,77,255,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-[#6C4DFF]/50 group-hover:bg-[#6C4DFF]/15 flex items-center justify-center text-[#6C4DFF] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#0078FF]/10 text-[#0078FF] border border-[#0078FF]/30">
                      {item.readinessLevel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors mb-1.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mb-3">{item.tagline}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-[#00C9A7] font-semibold">Active Application: </span>
                    {item.useCase}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Innovation Lab Thematic Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#050816] via-[#071A35] to-[#050816] border border-[#0078FF]/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#6C4DFF]/20 text-[#6C4DFF] border border-[#6C4DFF]/40">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>INFOSBRAIN AI INNOVATION LAB</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Building Tomorrow's Technologies Today
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our specialized R&D units in Dublin, Amsterdam, and Lahore/Islamabad bridge fundamental computer science advances with practical organizational deployment.
              </p>
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {labTechs.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#050816] border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-3">
              <button
                onClick={() => navigate('/ai-solutions')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] text-white text-xs sm:text-sm font-bold shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Innovation Lab Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 rounded-xl bg-[#071A35] border border-slate-700 hover:border-[#00C9A7] text-slate-200 text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer"
              >
                Collaborate on R&D Pilot
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
