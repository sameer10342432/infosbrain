import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCms } from '../../context/CmsContext';
import { siteConfig } from '../../config/siteConfig';
import { BrandLogo } from './BrandLogo';
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
  const { settings } = useCms();
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const linkedinUrl = settings?.social_linkedin || siteConfig.contact.social.linkedin;
  const facebookUrl = settings?.social_facebook || siteConfig.contact.social.facebook;
  const instagramUrl = settings?.social_instagram || siteConfig.contact.social.instagram;
  const xUrl = settings?.social_x || siteConfig.contact.social.x;
  const youtubeUrl = settings?.social_youtube || siteConfig.contact.social.youtube;
  const contactEmail = settings?.contact_email || siteConfig.contact.primaryEmail;
  const secondaryEmail = settings?.secondary_email || siteConfig.contact.secondaryEmail;
  const phone = settings?.phone || siteConfig.contact.phone;
  const address = settings?.address || siteConfig.contact.address;
  const brandTagline = settings?.tagline || siteConfig.brand.tagline;

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim().toLowerCase();
    if (!email || !email.includes('@')) return;

    setIsSubscribing(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          service: 'Footer Newsletter Subscription',
          budget: 'Subscriber',
          projectDetails: 'Subscribed to weekly technology intelligence briefs from Footer dispatch.',
          source: 'Footer Newsletter',
        }),
      });
      setIsSubscribed(true);
      setNewsletterEmail('');
    } catch (err) {
      console.error('Newsletter submission error:', err);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="relative bg-[#040612] border-t border-slate-800/80 pt-16 pb-24 md:pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0078FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C9A7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter / Quick Consultation Banner */}
        <div className="rounded-3xl p-8 sm:p-10 mb-16 bg-gradient-to-r from-[#071A35]/90 via-[#050816] to-[#071A35]/90 border border-[#0078FF]/30 backdrop-blur-xl shadow-[0_0_35px_rgba(0,120,255,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#00C9A7]/15 text-[#00C9A7] border border-[#00C9A7]/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GLOBAL TECHNOLOGY ADVISORY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Ready to Transform Ideas into Intelligent Digital Solutions?
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Connect with InfosBrain senior architects to review your software roadmap, AI adoption strategy, or subscribe to our executive technology dispatch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            {isSubscribed ? (
              <div className="px-5 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed to Executive Dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter business email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-3 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-400 transition-all cursor-pointer whitespace-nowrap"
                >
                  {isSubscribing ? 'Joining...' : 'Subscribe'}
                </button>
              </form>
            )}

            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] hover:opacity-95 shadow-[0_0_25px_rgba(0,120,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
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
              className="group text-left cursor-pointer focus:outline-none"
              aria-label="InfosBrain Home"
            >
              <BrandLogo size="md" isDark={true} />
            </button>

            <p className="text-xs font-mono text-[#00C9A7] font-semibold">
              Build Smarter. Scale Faster. Grow with Confidence.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              InfosBrain helps businesses, nonprofits, institutions, and government organizations turn complex challenges into practical, measurable digital solutions through software development, AI, cloud solutions, cybersecurity, and digital growth.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Connect Across Channels:
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-[#0078FF] flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-red-500 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-blue-500 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#071A35] border border-slate-800 hover:border-slate-400 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  aria-label="X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={instagramUrl}
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
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono text-left m-0 p-0">
              Core Services
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm text-slate-400 p-0 m-0 list-none text-left">
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/services/software-development')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Software Development
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/services/artificial-intelligence-automation')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Artificial Intelligence &amp; Automation
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/services/cloud-solutions')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Cloud Solutions &amp; Infrastructure
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/services/cybersecurity')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Cybersecurity &amp; Compliance
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/services/seo-digital-growth')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  SEO &amp; Digital Growth
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/services/digital-transformation-consulting')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Digital Transformation Consulting
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/services')}
                  className="text-left block w-full hover:text-cyan-300 text-cyan-400 font-medium transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none"
                >
                  View All Services &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: AI-Powered Tools */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono text-left m-0 p-0">
              AI-Powered Tools
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm text-slate-400 p-0 m-0 list-none text-left">
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/ai-solutions/ai-chatbots-agents')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  AI Business Assistant
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/ai-solutions/ai-computer-vision')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Intelligent Document Processing
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/ai-solutions/predictive-analytics')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Predictive Analytics Forecaster
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/ai-solutions/ai-chatbots-agents')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Customer Service Automation
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/ai-solutions/ai-generative-content')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  AI Content Studio
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/ai-solutions/workflow-automation')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Workflow Automation Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Hubs */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono text-left m-0 p-0">
              Organization
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-sm text-slate-400 p-0 m-0 list-none text-left">
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  About Us &amp; Vision
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/industries')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Industries We Serve
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/case-studies')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Verified Case Studies
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/blog')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Innovation Center &amp; Insights
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/careers')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Careers &amp; Fellowships
                </button>
              </li>
              <li className="w-full text-left">
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="text-left block w-full hover:text-white transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed py-0.5 focus:outline-none focus:text-white"
                >
                  Contact &amp; Consultations
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
              &copy; {new Date().getFullYear()} {settings?.brand_name || siteConfig.brand.name}. All rights reserved.
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
