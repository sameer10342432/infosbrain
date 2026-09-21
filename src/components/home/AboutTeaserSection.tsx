import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Button } from '../common/Button';
import {
  ArrowRight,
  Code2,
  Compass,
  Cpu,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AboutTeaserSection: React.FC = () => {
  const { navigate } = useRouter();

  const corePillars = [
    {
      title: 'Technology Expertise',
      desc: 'Deep engineering in custom software, cloud architecture, and modern application stacks.',
      icon: Code2,
      color: '#0078FF',
    },
    {
      title: 'Strategic Consulting',
      desc: 'Bridging technical capabilities with operational priorities to achieve strategic goals.',
      icon: Compass,
      color: '#6C4DFF',
    },
    {
      title: 'Innovation & Scalability',
      desc: 'Harnessing AI, intelligent automation, and resilient infrastructure built for modern growth.',
      icon: Cpu,
      color: '#00C9A7',
    },
    {
      title: 'Measurable Outcomes',
      desc: 'Laser-focused on operational efficiency, user retention, and long-term business impact.',
      icon: TrendingUp,
      color: '#0078FF',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#050816] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#0078FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#00C9A7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0078FF]/15 text-[#00C9A7] border border-[#00C9A7]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00C9A7]" />
              <span>WHO WE ARE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display leading-[1.15]">
              Transforming Complex Ideas into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7]">
                Scalable, Measurable Digital Reality
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              InfosBrain is a technology and digital transformation company dedicated to helping businesses, nonprofits, institutions, and government organizations leverage innovative technologies to achieve their strategic objectives.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              By combining expertise in software development, artificial intelligence, cloud solutions, cybersecurity, and digital transformation consulting, InfosBrain delivers practical, scalable, and future-ready solutions that drive efficiency, growth, and long-term impact.
            </p>

            {/* Checklist highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7] flex-shrink-0" />
                <span>Enterprise-Level Execution</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0078FF] flex-shrink-0" />
                <span>Strategic Consulting & Roadmaps</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#6C4DFF] flex-shrink-0" />
                <span>Scalable Cloud & AI Platforms</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7] flex-shrink-0" />
                <span>Measurable Business Velocity</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/about')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Learn More About Us
              </Button>

              <button
                onClick={() => navigate('/case-studies')}
                className="text-sm font-semibold text-[#00C9A7] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer px-3 py-2"
              >
                <span>Explore Proven Outcomes</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Visual 4-Card Pillar Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-[#071A35]/80 border border-slate-800 hover:border-[#0078FF]/50 hover:shadow-[0_15px_30px_rgba(0,120,255,0.15)] transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-[#00C9A7]/50 group-hover:bg-[#00C9A7]/10 flex items-center justify-center text-[#00C9A7] transition-all mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>CAPABILITY 0{idx + 1}</span>
                    <span className="text-[#0078FF]">→</span>
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
