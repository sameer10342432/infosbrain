import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs, settings, isSectionVisible, getSection } = useCms();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  if (!isSectionVisible('home_faq')) {
    return null;
  }

  const sectionData = getSection('home_faq');
  const badge = sectionData?.badge || 'CLARITY & TRANSPARENCY';
  const title = sectionData?.title || 'Frequently Asked';
  const highlightText = sectionData?.highlightText || 'Questions';
  const description =
    sectionData?.description ||
    'Everything you need to know about our engagement models, technical standards, project timelines, and growth strategies.';
  const displayFaqs = faqs && faqs.length > 0 ? faqs : siteConfig.faqs;
  const supportEmail = settings?.secondary_email || settings?.contact_email || 'contact@infosbrain.com';

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#070B1F] border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={badge}
          title={title}
          highlightText={highlightText}
          description={description}
        />

        {/* FAQ Full-Width Showcase Banner */}
        <div className="mb-14 relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.12)] bg-slate-950 flex items-center justify-center group">
          <img
            src="/assets/faq-banner.png"
            alt="InfosBrain Frequently Asked Questions"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-contain md:object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/15 pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-300 bg-slate-950/90 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
              InfosBrain Knowledge Base & Engagement FAQ
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800">
              Clear & Transparent Standards
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {displayFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#050816] border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-cyan-500/20 text-cyan-400 rotate-180' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Have a specific project question?</div>
              <div className="text-xs text-slate-400">Our strategy team answers inquiries directly.</div>
            </div>
          </div>
          <a
            href={`mailto:${supportEmail}`}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 hover:border-cyan-400/40 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{supportEmail}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
