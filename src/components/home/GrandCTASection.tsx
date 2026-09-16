import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';
import { ArrowRight, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const GrandCTASection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] radial-spotlight pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#070B1F] to-[#0B1026] border border-cyan-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.2)] text-center relative overflow-hidden backdrop-blur-2xl">
          {/* Cyber grid texture */}
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LET'S TURN YOUR IDEA INTO REALITY</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-display mb-6">
            Ready To Build Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
              Digital Success Story?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Partner with InfosBrain to elevate your digital marketing, build cutting-edge web architecture, and command first-page organic search dominance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/contact')}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get A Free Consultation
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/contact')}
              icon={<Mail className="w-4 h-4 text-cyan-400" />}
            >
              Contact Us Directly
            </Button>
          </div>

          {/* Direct Emails Highlight */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>General Inquiries:</span>
              <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-cyan-300 hover:underline font-mono">
                {siteConfig.contact.primaryEmail}
              </a>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Strategic Partnerships:</span>
              <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="text-cyan-300 hover:underline font-mono">
                {siteConfig.contact.secondaryEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
