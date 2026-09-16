import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { Globe, Rocket, GraduationCap, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const CareersTeaserSection: React.FC = () => {
  const { navigate } = useRouter();

  const careerTracks = [
    {
      title: 'Global Remote Opportunities',
      desc: 'Collaborate with distributed teams across Europe, Asia, and Africa on mission-critical software and AI initiatives.',
      icon: Globe,
      badge: 'Distributed / Remote',
      color: '#0078FF',
    },
    {
      title: 'Technology & AI Careers',
      desc: 'Full-stack engineers, cloud architects, machine learning researchers, and cybersecurity specialists.',
      icon: Code2,
      badge: 'Mid & Senior Roles',
      color: '#6C4DFF',
    },
    {
      title: 'Graduate Fellowship Programs',
      desc: 'Accelerate your career through structured mentorship, production-code experience, and continuous learning.',
      icon: GraduationCap,
      badge: 'University Grads',
      color: '#00C9A7',
    },
    {
      title: 'Global Internship Programs',
      desc: 'Hands-on exposure to cloud modernization, generative AI agent workflows, and modern web application development.',
      icon: Rocket,
      badge: 'Internships',
      color: '#0078FF',
    },
  ];

  return (
    <section id="careers" className="relative py-24 bg-[#071A35] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#6C4DFF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="TALENT & CULTURE"
          title="Build the Future"
          highlightText="With InfosBrain"
          description="Join an international team of visionary technologists, software architects, and AI researchers working across continents to solve complex real-world challenges."
        />

        {/* 4 Career Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {careerTracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#050816]/80 border border-slate-800 hover:border-[#0078FF]/50 transition-all flex flex-col justify-between shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-[#0078FF]/40 flex items-center justify-center text-[#0078FF] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#0078FF]/10 text-[#0078FF] border border-[#0078FF]/20">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{track.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-[#00C9A7] font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Impact & Autonomy
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout */}
        <div className="p-8 rounded-3xl bg-[#050816]/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-white font-display">
              Ready to create lasting impact with world-class engineering?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore our current open technical positions or submit an open application to our leadership team.
            </p>
          </div>

          <button
            onClick={() => navigate('/careers')}
            className="px-6 py-3 rounded-xl bg-[#0078FF] hover:bg-[#0078FF]/90 text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Explore Open Positions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
