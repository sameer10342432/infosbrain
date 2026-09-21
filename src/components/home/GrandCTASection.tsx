import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../common/Button';
import { ArrowRight, Mail, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';

interface GrandCTASectionProps {
  onOpenConsultation?: () => void;
}

export const GrandCTASection: React.FC<GrandCTASectionProps> = ({ onOpenConsultation }) => {
  const { navigate } = useRouter();

  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0078FF]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#071A35]/95 to-[#050816]/95 border border-[#0078FF]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,120,255,0.2)] text-center relative overflow-hidden backdrop-blur-2xl">
          {/* Cyber grid texture */}
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0078FF]/15 text-[#00C9A7] border border-[#00C9A7]/30 mb-6 shadow-[0_0_15px_rgba(0,201,167,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00C9A7]" />
            <span>DIGITAL INNOVATION & TRANSFORMATION</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-display mb-6">
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7]">
              Extraordinary Together
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed mb-4 font-normal">
            From enterprise-grade web platforms and digital transformation initiatives to advanced SEO strategies and high-ROI customer acquisition campaigns, our senior consultants and practice leaders are committed to helping you achieve your goals.
          </p>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            We combine technology, innovation, and strategic insight to deliver measurable results that drive long-term success.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              size="lg"
              variant="primary"
              onClick={() => (onOpenConsultation ? onOpenConsultation() : navigate('/contact'))}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Start a Conversation
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/contact')}
              icon={<Mail className="w-4 h-4 text-[#00C9A7]" />}
            >
              Contact Us Today
            </Button>
          </div>

          {/* Final Callout Card */}
          <div className="p-6 rounded-2xl bg-[#050816]/80 border border-slate-800/90 text-left max-w-2xl mx-auto mb-8">
            <div className="text-xs font-mono font-bold uppercase text-[#00C9A7] mb-1">
              Ready to Transform Your Digital Future?
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Partner with InfosBrain to build technology that improves performance, supports growth, and creates lasting value. Let's turn your next digital ambition into a practical, scalable solution.
            </p>
          </div>

          {/* Direct Emails Highlight */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00C9A7]" />
              <span>General Inquiries:</span>
              <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-cyan-300 hover:underline font-mono">
                {siteConfig.contact.primaryEmail}
              </a>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00C9A7]" />
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
