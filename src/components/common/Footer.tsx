import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import {
  Mail,
  ArrowUpRight,
  Shield,
  Sparkles,
  Award,
  Lock,
  CheckCircle2,
  Cloud,
  Globe2,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040612] border-t border-slate-800/80 pt-16 pb-24 md:pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0078FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter / Quick Consultation Banner */}
        <div className="rounded-3xl p-8 sm:p-10 mb-16 bg-gradient-to-r from-[#071A35]/90 via-[#050816] to-[#071A35]/90 border border-[#0078FF]/30 backdrop-blur-xl shadow-[0_0_35px_rgba(0,120,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#00C9A7]/15 text-[#00C9A7] border border-[#00C9A7]/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GLOBAL TECHNOLOGY ADVISORY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Ready to Transform Ideas into Intelligent Digital Solutions?
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Connect with InfosBrain senior architects to review your software roadmap, AI adoption strategy, and cloud resilience.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] hover:opacity-95 shadow-[0_0_25px_rgba(0,120,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Hubs Directory Bar */}
        <div className="mb-14 p-6 rounded-2xl bg-[#071A35]/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#00C9A7]">
            <Globe2 className="w-4 h-4" />
            <span>Global Operations & Hubs:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span>🇮🇪 Dublin, Ireland (Global HQ)</span>
            <span className="text-slate-600">•</span>
            <span>🇳🇱 Amsterdam, Netherlands (Europe Hub)</span>
            <span className="text-slate-600">•</span>
            <span>🇵🇰 Lahore / Islamabad, Pakistan (R&D Center)</span>
            <span className="text-slate-600">•</span>
            <span>🇬🇭 Accra, Ghana (West Africa Hub)</span>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] p-[1.5px] shadow-[0_0_20px_rgba(0,120,255,0.4)]">
                <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center font-display font-extrabold text-lg text-white">
                  IB
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-white tracking-tight">
                  Infos<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] to-[#00C9A7]">Brain</span>
                </span>
              </div>
            </button>

            <p className="text-xs font-mono text-[#00C9A7] font-semibold">
              Transforming Ideas into Intelligent Digital Solutions
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              InfosBrain helps businesses, nonprofits, institutions, and public-sector organizations design, build, and scale practical digital solutions through software development, artificial intelligence, cloud technologies, cybersecurity, and digital transformation consulting.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Connect Across Channels:
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-[#0078FF] flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.contact.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-red-500 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-blue-500 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.contact.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-slate-400 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-pink-500 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors cursor-pointer">
                  Custom Software Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions')} className="hover:text-white transition-colors cursor-pointer">
                  Artificial Intelligence & Agents
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors cursor-pointer">
                  Cloud Solutions & DevOps
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors cursor-pointer">
                  Cybersecurity & ISO Audits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors cursor-pointer">
                  Mobile & Web Applications
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors cursor-pointer">
                  Digital Transformation Consulting
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/predictive-analytics')} className="hover:text-white transition-colors cursor-pointer">
                  Data Analytics & BI Reporting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: AI-Powered Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              AI-Powered Tools
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/ai-solutions/ai-chatbots-agents')} className="hover:text-white transition-colors cursor-pointer">
                  AI Business Assistant
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/ai-computer-vision')} className="hover:text-white transition-colors cursor-pointer">
                  Intelligent Document Processing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/predictive-analytics')} className="hover:text-white transition-colors cursor-pointer">
                  Predictive Analytics Forecaster
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/ai-chatbots-agents')} className="hover:text-white transition-colors cursor-pointer">
                  Customer Service Automation
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/ai-generative-content')} className="hover:text-white transition-colors cursor-pointer">
                  AI Content Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-solutions/workflow-automation')} className="hover:text-white transition-colors cursor-pointer">
                  Workflow Automation Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Organization
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us & Vision
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/industries')} className="hover:text-white transition-colors cursor-pointer">
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/case-studies')} className="hover:text-white transition-colors cursor-pointer">
                  Verified Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/blog')} className="hover:text-white transition-colors cursor-pointer">
                  Innovation Center & Insights
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/careers')} className="hover:text-white transition-colors cursor-pointer">
                  Careers & Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Consultations
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Certification Badges Section */}
        <div className="py-8 border-b border-slate-800">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 text-center sm:text-left">
            Certifications & Standards Compliance:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {siteConfig.certifications.map((cert, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#071A35]/60 border border-slate-800 text-center space-y-1"
              >
                <div className="text-xs font-bold text-white">{cert.title}</div>
                <div className="text-[10px] text-slate-400">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#00C9A7]" />
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
              onClick={handleScrollTop}
              className="text-[#0078FF] hover:text-[#00C9A7] cursor-pointer font-semibold transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
