import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';
import { ArrowRight, ShieldCheck, Target, Lightbulb, Compass, Award } from 'lucide-react';

export const AboutTeaserSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative py-24 bg-[#070B1F] border-t border-slate-800/80 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl">
              {/* Agency Atmosphere Photo */}
              <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-6 border border-slate-700/80 group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="InfosBrain Engineering & Strategy Lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-transparent to-black/30" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
                    InfosBrain Innovation Lab
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    // INFOSBRAIN FOUNDATIONS
                  </span>
                  <span className="text-xs text-slate-500 font-mono">EST. 2024</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-white flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-cyan-400" />
                      Our Mission
                    </div>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      Empowering global enterprises and agile startups through resilient technology stacks, algorithmic marketing, and distinctive brand design.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-white flex items-center gap-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-violet-400" />
                      Our Vision
                    </div>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      To be the world’s most trusted digital growth ally, where technical rigor meets boundless creative innovation.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-white flex items-center gap-2 mb-1">
                      <Compass className="w-4 h-4 text-blue-400" />
                      Our Core Principles
                    </div>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      Radical engineering clarity, statistical accountability, zero vanity metrics, and enduring commercial partnerships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              <span>ABOUT INFOSBRAIN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display leading-tight">
              A Digital Technology Agency{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                Built For Modern Scale
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              InfosBrain is a modern digital technology and growth agency helping businesses turn ideas into powerful digital experiences. We bridge the gap between creative visual artistry and deep technical engineering.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Whether architecting real-time MERN software, optimizing enterprise SEO architecture for first-page search capture, or managing millions in high-ROAS paid media, our multidisciplinary teams operate with obsessive attention to craft.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/about')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Read Our Story & Values
              </Button>

              <button
                onClick={() => navigate('/case-studies')}
                className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer px-3 py-2"
              >
                <span>View Case Studies</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
