import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  BookOpen,
  FileText,
  Download,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  Cloud,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const InnovationCenterSection: React.FC = () => {
  const { navigate } = useRouter();
  const [downloadedPaperId, setDownloadedPaperId] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return Cpu;
      case 'Layers':
        return Layers;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Cloud':
        return Cloud;
      default:
        return FileText;
    }
  };

  const handleDownload = (paperId: string) => {
    setDownloadedPaperId(paperId);
    setTimeout(() => setDownloadedPaperId(null), 3000);
  };

  return (
    <section id="innovation-center" className="relative py-24 bg-[#071A35] overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#6C4DFF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="THOUGHT LEADERSHIP HUB"
          title="Research, White Papers &"
          highlightText="Technology Insights"
          description="Positioning InfosBrain as an intellectual leader and strategic technology vanguard. We publish empirical analyses on modern AI, enterprise architecture, cybersecurity, and cloud resilience."
        />

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {siteConfig.researchPapers.map((paper) => {
            const Icon = getIcon(paper.iconName);
            const isDownloaded = downloadedPaperId === paper.id;
            return (
              <div
                key={paper.id}
                className="group p-8 rounded-3xl bg-[#050816]/90 border border-slate-800/90 hover:border-[#0078FF]/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#0078FF]/15 text-[#0078FF] border border-[#0078FF]/30">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{paper.category}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {paper.pages} Pages • {paper.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-xs font-mono text-[#00C9A7] mb-4">{paper.subtitle}</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {paper.executiveSummary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="p-4 rounded-xl bg-[#071A35]/80 border border-slate-800 space-y-2 mb-6">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Executive Key Takeaways:
                    </p>
                    {paper.keyInsights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9A7] flex-shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <button
                    onClick={() => handleDownload(paper.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isDownloaded
                        ? 'bg-[#00C9A7] text-[#071A35]'
                        : 'bg-[#0078FF] hover:bg-[#0078FF]/90 text-white shadow-md'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloaded ? 'Executive PDF Ready!' : 'Download White Paper'}</span>
                  </button>

                  <button
                    onClick={() => navigate('/blog')}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Read Executive Abstract</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0078FF]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Innovation Center Footer CTA */}
        <div className="p-8 rounded-2xl bg-[#050816] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#6C4DFF]/20 border border-[#6C4DFF]/40 flex items-center justify-center text-[#6C4DFF]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-display">
                Looking for Custom Industry Research or Technology Advisory?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                InfosBrain collaborates with institutional partners to co-author specialized technical white papers.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#0078FF] text-white text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
          >
            Request Custom Report
          </button>
        </div>
      </div>
    </section>
  );
};
