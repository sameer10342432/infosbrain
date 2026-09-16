import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Bot,
  FileCheck,
  TrendingUp,
  Headphones,
  Sparkles,
  Workflow,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Lock,
  UserCheck,
  Activity,
  AlertTriangle,
  Cpu,
  FileCheck2,
  ChevronRight,
  Sliders,
  Terminal,
} from 'lucide-react';

interface AIToolsSectionProps {
  onOpenConsultation?: () => void;
}

export const AIToolsSection: React.FC<AIToolsSectionProps> = ({ onOpenConsultation }) => {
  const { navigate } = useRouter();
  const [activeToolIndex, setActiveToolIndex] = useState(0);

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'Bot':
        return Bot;
      case 'FileCheck':
        return FileCheck;
      case 'TrendingUp':
        return TrendingUp;
      case 'Headphones':
        return Headphones;
      case 'Sparkles':
        return Sparkles;
      case 'Workflow':
        return Workflow;
      default:
        return Cpu;
    }
  };

  const getPrincipleIcon = (name: string) => {
    switch (name) {
      case 'Lock':
        return Lock;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'UserCheck':
        return UserCheck;
      case 'Activity':
        return Activity;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'Cpu':
        return Cpu;
      case 'FileCheck2':
        return FileCheck2;
      default:
        return ShieldCheck;
    }
  };

  const currentTool = siteConfig.aiTools[activeToolIndex] || siteConfig.aiTools[0];
  const CurrentToolIcon = getToolIcon(currentTool.iconName);

  return (
    <section id="ai-tools" className="relative py-24 bg-[#071A35] overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-[#6C4DFF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-[#0078FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeading
          badge="AI-POWERED TOOLS & SYSTEMS"
          title="Intelligent Tools For"
          highlightText="Smarter Business"
          description="InfosBrain develops practical, secure, and scalable AI-powered tools that help organizations automate routine work, improve decision-making, enhance customer experiences, and uncover valuable insights from data."
        />

        {/* Suggested Feature Line Pill */}
        <div className="text-center -mt-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050816]/90 border border-[#0078FF]/30 text-xs text-slate-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
            <span>AI-powered tools designed to automate work, strengthen decisions, and accelerate responsible digital transformation.</span>
          </div>
        </div>

        {/* Interactive 6 AI Tools Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Tool Selector Pills */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 px-1">
              Select Enterprise Solution:
            </p>
            {siteConfig.aiTools.map((tool, idx) => {
              const Icon = getToolIcon(tool.iconName);
              const isSelected = activeToolIndex === idx;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveToolIndex(idx)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0078FF]/20 via-[#6C4DFF]/15 to-transparent border-[#0078FF] shadow-[0_0_25px_rgba(0,120,255,0.25)]'
                      : 'bg-[#050816]/70 border-slate-800/80 hover:border-slate-700 hover:bg-[#050816]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#0078FF] text-white shadow-[0_0_15px_rgba(0,120,255,0.5)]'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold font-display ${
                          isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{tool.tagline}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#0078FF] translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Tool Interactive Deep Dive */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#050816]/90 border border-[#0078FF]/30 shadow-[0_0_40px_rgba(0,120,255,0.15)] relative overflow-hidden backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#0078FF]/15 text-[#0078FF] border border-[#0078FF]/30">
                  <CurrentToolIcon className="w-3.5 h-3.5" />
                  <span>{currentTool.badge}</span>
                </div>
                <div className="text-xs font-mono font-medium text-[#00C9A7] bg-[#00C9A7]/10 px-3 py-1 rounded-full border border-[#00C9A7]/30">
                  Verified Metric: {currentTool.metric}
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight mb-3">
                {currentTool.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {currentTool.description}
              </p>

              {/* Key Capabilities */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Key Capabilities:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTool.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#071A35]/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00C9A7] flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate(currentTool.ctaAction)}
                  className="px-5 py-2.5 rounded-xl bg-[#0078FF] hover:bg-[#0078FF]/90 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(0,120,255,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentTool.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {onOpenConsultation && (
                  <button
                    onClick={onOpenConsultation}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#00C9A7] text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request AI Consultation</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Custom AI Solutions 6-Step Approach */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl bg-[#050816]/75 border border-slate-800/90 shadow-xl">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono font-bold text-[#6C4DFF] uppercase tracking-wider">
              TAILORED DELIVERY METHODOLOGY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
              Custom AI Solutions for Your Unique Architecture
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Every organization has different challenges. InfosBrain designs tailored AI solutions that integrate with existing platforms, business processes, and data environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {siteConfig.customAIApproach.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-2xl bg-[#071A35]/70 border border-slate-800/80 hover:border-[#0078FF]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-xl font-bold font-mono text-[#0078FF] group-hover:text-[#00C9A7] transition-colors mb-2">
                    {step.step}
                  </div>
                  <div className="text-xs font-mono uppercase text-[#6C4DFF] font-semibold mb-1">
                    {step.phase}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-mono">
              Ready to move from concept to scalable enterprise deployment?
            </span>
            <button
              onClick={() => (onOpenConsultation ? onOpenConsultation() : navigate('/contact'))}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0078FF] to-[#6C4DFF] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Discuss Your AI Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Responsible AI by Design: Innovation Built on Trust */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#071A35] via-[#050816] to-[#071A35] border border-[#00C9A7]/30 shadow-[0_0_35px_rgba(0,201,167,0.1)]">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#00C9A7]/15 text-[#00C9A7] border border-[#00C9A7]/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RESPONSIBLE AI BY DESIGN</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Innovation Built on Trust & Accountability
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              We believe AI should be transparent, secure, inclusive, and accountable. Our solutions are designed with responsible data practices, appropriate human oversight, and organizational governance in mind.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {siteConfig.responsibleAIPrinciples.map((principle, idx) => {
              const Icon = getPrincipleIcon(principle.iconName);
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#050816]/70 border border-slate-800/80 hover:border-[#00C9A7]/40 transition-all space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00C9A7]/10 border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{principle.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{principle.description}</p>
                </div>
              );
            })}
          </div>

          {/* AI Solutions for Every Industry Bar */}
          <div className="pt-6 border-t border-slate-800/80">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              InfosBrain Tailors AI Capabilities For:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Healthcare (Admin automation & info management)',
                'Education (Personalized learning & assistance)',
                'Financial Services (Document processing & risk support)',
                'Nonprofits (Donor engagement & program insights)',
                'Retail (Customer service & demand forecasting)',
                'Logistics (Route planning & operational monitoring)',
                'Government (Digital public services & efficiency)',
                'Manufacturing (Process optimization & maintenance)',
              ].map((ind, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-[#050816] border border-slate-800 text-xs text-slate-300 font-medium"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Build Your AI Advantage Grand Strip */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-[#050816] border border-[#0078FF]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white font-display">
              Build Your AI Advantage: Turn Data into Decisions & Ideas into Impact
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Whether you want to automate a single process or develop an enterprise-wide AI strategy, InfosBrain can help.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <button
              onClick={() => (onOpenConsultation ? onOpenConsultation() : navigate('/contact'))}
              className="px-4 py-2 rounded-xl bg-[#0078FF] hover:bg-[#0078FF]/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Request an AI Consultation
            </button>
            <button
              onClick={() => navigate('/ai-solutions')}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              View AI Solutions
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 rounded-xl bg-[#6C4DFF] hover:bg-[#6C4DFF]/90 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
