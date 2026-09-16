import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { Linkedin, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#0078FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="EXECUTIVE LEADERSHIP & ADVISORY"
          title="Meet the Visionaries"
          highlightText="Behind InfosBrain"
          description="A multidisciplinary executive cadre combining deep technological expertise, global governance acumen, and an uncompromising commitment to client success."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.leadership.map((member) => (
            <div
              key={member.id}
              className="group p-6 rounded-3xl bg-[#071A35]/80 border border-slate-800 hover:border-[#0078FF]/50 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Executive Headshot */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 border border-slate-800 group-hover:border-[#0078FF]/40 transition-all">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-transparent to-transparent opacity-80" />
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#050816]/90 border border-slate-700 hover:border-[#0078FF] hover:bg-[#0078FF] flex items-center justify-center text-white transition-all shadow-md cursor-pointer"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <div className="space-y-1 mb-3">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-[#0078FF]">{member.role}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">{member.bio}</p>
              </div>

              {/* Achievements */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#00C9A7]" />
                  Key Achievements:
                </div>
                <div className="space-y-1">
                  {member.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-[#00C9A7] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
