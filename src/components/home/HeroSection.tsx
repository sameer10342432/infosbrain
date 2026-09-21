import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';
import { HeroCanvas } from '../common/HeroCanvas';
import { ArrowRight, Sparkles, Layers, ShieldCheck, CheckCircle2, Play, Globe2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation?: () => void;
  onOpenVideoModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onOpenVideoModal,
}) => {
  const { navigate } = useRouter();

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#071A35]">
      {/* Ambient background glow orbs */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-[#0078FF]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#6C4DFF]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-[#00C9A7]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Brand Statement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#0078FF]/20 via-[#6C4DFF]/20 to-transparent text-[#00C9A7] border border-[#00C9A7]/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,201,167,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
              <span>Build Smarter. Scale Faster. Grow with Confidence.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Digital Transformation Solutions for Organizations Ready to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] drop-shadow-sm">
                Scale, Innovate, and Lead.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              InfosBrain helps businesses, nonprofits, institutions, and government organizations turn complex challenges into practical, measurable digital solutions.
            </p>

            {/* Supporting Service / Value Statement */}
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              From software development and artificial intelligence to cloud solutions, cybersecurity, digital strategy, and performance marketing, we combine technology and strategic expertise to help organizations improve performance, strengthen customer engagement, and build future-ready operations.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => (onOpenConsultation ? onOpenConsultation() : navigate('/contact'))}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0078FF] to-[#0060df] hover:from-[#006ee6] hover:to-[#0050c0] text-white font-bold text-sm shadow-[0_0_25px_rgba(0,120,255,0.4)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Start Your Digital Transformation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/services');
                }}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-[#00C9A7] text-slate-100 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Layers className="w-4 h-4 text-[#00C9A7]" />
                <span>Explore Our Services</span>
              </button>

              {onOpenVideoModal && (
                <button
                  onClick={onOpenVideoModal}
                  className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#0078FF] flex items-center justify-center text-white transition-colors">
                    <Play className="w-3.5 h-3.5 translate-x-0.5 fill-white" />
                  </div>
                  <span>Watch Our Story</span>
                </button>
              )}
            </div>

            {/* Key Quality Trust Pillars */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C9A7]" />
                <span>Build Smarter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0078FF]" />
                <span>Scale Faster</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6C4DFF]" />
                <span>Grow with Confidence</span>
              </div>
            </div>
          </div>

          {/* Right Hero Futuristic Thematic Banner Visual with Layered Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative group w-full max-w-[540px]">
              {/* Animated outer glowing halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#0078FF]/30 via-[#6C4DFF]/30 to-[#00C9A7]/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />

              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-[#0078FF]/40 bg-slate-950 shadow-[0_0_50px_rgba(0,120,255,0.2)]">
                {/* Global Command Center Image */}
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                  alt="InfosBrain Global Digital Command Center"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-125 saturate-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Cyber Gradient Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-[#071A35]/40 to-[#071A35]/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071A35]/40 via-transparent to-[#071A35]/40 pointer-events-none" />

                {/* Layered Interactive Canvas particles */}
                <div className="absolute inset-0 z-10">
                  <HeroCanvas className="w-full h-full" />
                </div>

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-mono font-semibold text-cyan-300 bg-[#050816]/90 px-3 py-1.5 rounded-full border border-[#0078FF]/30 backdrop-blur-md shadow-md">
                    InfosBrain Global Delivery Hub
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050816]/90 border border-[#00C9A7]/40 text-[#00C9A7] text-[11px] font-mono backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A7] animate-pulse" />
                    <span>Active Production</span>
                  </div>
                </div>

                {/* Bottom Floating Glassmorphic Stat Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-[#050816]/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-white font-display">
                        Delivering Across Continents
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono mt-0.5">
                        Dublin • Amsterdam • Lahore / Islamabad • Accra
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0078FF]/20 border border-[#0078FF]/40 text-[#0078FF] text-xs font-mono">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>25+ Countries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
