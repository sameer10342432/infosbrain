import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Code2,
  Layers,
  Server,
  Cpu,
  Globe,
  ShoppingBag,
  Database,
  Terminal,
  Search,
  Share2,
  BarChart3,
  LineChart,
} from 'lucide-react';

export const TechnologiesSection: React.FC = () => {
  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Layers':
        return Layers;
      case 'Server':
        return Server;
      case 'Cpu':
        return Cpu;
      case 'Globe':
        return Globe;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Database':
        return Database;
      case 'Terminal':
        return Terminal;
      case 'Search':
        return Search;
      case 'Share2':
        return Share2;
      case 'BarChart3':
        return BarChart3;
      case 'LineChart':
        return LineChart;
      default:
        return Cpu;
    }
  };

  return (
    <section id="technologies" className="relative py-20 bg-[#050816] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR TECHNICAL ARSENAL"
          title="Technologies"
          highlightText="We Work With"
          description="We engineer with battle-tested frameworks, modern headless architectures, and enterprise marketing platforms."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {siteConfig.technologies.map((tech, idx) => {
            const Icon = getTechIcon(tech.icon);
            return (
              <div
                key={idx}
                className="group p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-200 text-center flex flex-col items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {tech.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
