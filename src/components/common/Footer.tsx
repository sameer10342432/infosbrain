import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { Mail, ArrowUpRight, Shield, Sparkles, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040612] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter / Quick Consultation Banner */}
        <div className="rounded-2xl p-8 mb-16 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Strategic Advisory
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Ready to Accelerate Your Digital Growth?
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Connect with our senior strategists to review your web architecture, search visibility, and paid media performance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Get Free Consultation <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-5">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-violet-600 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center font-display font-extrabold text-lg text-cyan-400">
                  IB
                </div>
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                Infos<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Brain</span>
              </span>
            </button>

            <p className="text-sm text-slate-400 font-medium italic">
              "{siteConfig.brand.tagline}"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.brand.description}
            </p>

            {/* Direct Official Emails */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Official Agency Contacts
              </div>
              <div className="space-y-1">
                <a
                  href={`mailto:${siteConfig.contact.primaryEmail}`}
                  className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{siteConfig.contact.primaryEmail}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.secondaryEmail}`}
                  className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{siteConfig.contact.secondaryEmail}</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors group font-mono"
                  title="Direct WhatsApp Chat with Owner"
                >
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.677.15-.2.301-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.238-.244-.589-.493-.509-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.803.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.11.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.723.23 1.381.197 1.901.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.175-1.431-.075-.125-.276-.201-.577-.351zM12.056 21.688c-1.74 0-3.447-.464-4.947-1.344l-.355-.21-3.676.964.981-3.584-.23-.367A9.638 9.638 0 0 1 2.4 12.086C2.4 6.786 6.73 2.456 12.03 2.456c2.569 0 4.984 1 6.8 2.818a9.584 9.584 0 0 1 2.816 6.804c0 5.302-4.329 9.61-9.59 9.61zm0-17.688C7.59 4 3.96 7.63 3.96 12.086c0 1.57.45 3.09 1.305 4.41l.2.31-.58 2.12 2.17-.57.3.18a8.077 8.077 0 0 0 4.701 1.46c4.47 0 8.1-3.63 8.1-8.086 0-2.16-.84-4.19-2.37-3.72a8.04 8.04 0 0 0-5.73-2.18z" />
                    </svg>
                  </span>
                  <span>WhatsApp: {siteConfig.contact.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            {/* Configurable Social Channels */}
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Network Profiles
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.contact.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all text-xs font-mono font-bold"
                  title="LinkedIn [Configurable]"
                >
                  IN
                </a>
                <a
                  href={siteConfig.contact.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all text-xs font-mono font-bold"
                  title="X / Twitter [Configurable]"
                >
                  X
                </a>
                <a
                  href={siteConfig.contact.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all text-xs font-mono font-bold"
                  title="Facebook [Configurable]"
                >
                  FB
                </a>
                <a
                  href={siteConfig.contact.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all text-xs font-mono font-bold"
                  title="Instagram [Configurable]"
                >
                  IG
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: AI Solutions & Practices */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                AI Solutions
              </h4>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                NEW
              </span>
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigate('/ai-solutions')}
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  AI Practice Overview →
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/workflow-automation')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  AI Workflow Integration
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/predictive-analytics')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Predictive Analytics
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/generative-search')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  AI Search & SGE
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/chatbots-agents')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Custom LLMs & Agents
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/computer-vision')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Computer Vision & OCR
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/generative-ai')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Generative Content Engines
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Agency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/industries')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Industries
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/case-studies')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/blog')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Insights & Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/careers')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Careers & Hiring
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Web & App Development Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Engineering & Stack
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/services/mern-stack-development')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  MERN Stack Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/shopify-development')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Shopify Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/wordpress-development')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  WordPress Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/php-development')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  PHP & Laravel Solutions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/graphic-design')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Graphic Design & UI/UX
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/content-marketing')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Content Marketing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/email-marketing')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Email Marketing & Flows
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Marketing & Advertising */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Search & Paid Media
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/services/digital-marketing')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Digital Marketing Strategy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/seo')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Technical & Organic SEO
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/paid-ads')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Paid Advertising (PPC)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/google-ads')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Google Ads & Search
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/facebook-meta-ads')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Facebook & Meta Ads
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/social-media-marketing')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Social Media Marketing
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              &copy; {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => navigate('/privacy-policy#cookies')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <button
              onClick={handleScrollTop}
              className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
