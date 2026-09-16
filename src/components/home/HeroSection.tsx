import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';
import { HeroCanvas } from '../common/HeroCanvas';
import { ArrowRight, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#050816]">
      {/* Ambient background glow orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Suggested Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-950/80 to-cyan-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{siteConfig.brand.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Transforming Ideas Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 drop-shadow-sm">
                Digital Growth
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              InfosBrain helps businesses grow through powerful digital marketing, high-performance websites, intelligent technology, creative design, and data-driven strategies.
            </p>

            {/* Action Buttons: Primary, Secondary, Additional */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/contact')}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Get a Free Consultation
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/services')}
                icon={<Layers className="w-4 h-4 text-cyan-400" />}
              >
                Explore Our Services
              </Button>

              <button
                onClick={() => navigate('/case-studies')}
                className="text-xs sm:text-sm font-bold text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 px-3 py-2 cursor-pointer"
              >
                <span>View Our Work</span>
                <span className="text-cyan-400">→</span>
              </button>
            </div>

            {/* Key Quality Pills */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Enterprise Quality Stacks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Data-Driven ROAS Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span>24/7 Global Client Support</span>
              </div>
            </div>
          </div>

          {/* Right Hero Futuristic Thematic Banner Visual with Layered Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative group w-full max-w-[540px]">
              {/* Animated outer glowing halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-violet-600/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />

              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                {/* Flagship Digital Command Center Banner Image */}
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                  alt="InfosBrain Flagship Digital Command Center"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-125 saturate-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Cyber Gradient Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-[#050816]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/40 via-transparent to-[#050816]/40 pointer-events-none" />

                {/* Layered Interactive Canvas particles */}
                <div className="absolute inset-0 z-10">
                  <HeroCanvas className="w-full h-full" />
                </div>

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-950/85 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-md">
                    InfosBrain Flagship Studio
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Production</span>
                  </div>
                </div>

                {/* Bottom Floating Glassmorphic Stat Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-2xl bg-slate-950/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-white font-display">
                        +340% ROAS{' '}
                        <span className="text-xs font-normal text-cyan-400 font-mono">
                          (Verified Lift)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Enterprise Web Stacks & Autonomous AI
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Elite Craft</span>
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
