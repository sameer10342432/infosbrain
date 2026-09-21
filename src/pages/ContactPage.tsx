import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  Layers,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: 'MERN Stack Development',
    budget: '$5k - $15k',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.message) {
      try {
        await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            service: formData.service,
            budget: formData.budget,
            message: formData.message,
            source: 'Website Contact Page',
          }),
        });
      } catch (err) {
        console.error('Inquiry submission error:', err);
      }
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Contact Us - Start Your Project with InfosBrain"
        description="Connect with InfosBrain digital technology experts. Inquire at info@infosbrain.com or contact@infosbrain.com for web development, SEO, and marketing."
      />

      {/* Hero Banner Section with Strategy Boardroom Imagery */}
      <PageHeroBanner
        badge="COMMENCE COLLABORATION"
        badgeIcon={<Mail className="w-3.5 h-3.5 text-cyan-400" />}
        title="Let’s Build Something"
        highlightText="Extraordinary"
        description="Whether you need a high-performance web platform, an enterprise SEO overhaul, or high-ROAS paid customer acquisition, our senior practice directors are ready to assist."
        image={{
          src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Global Collaboration Center and Boardroom',
          tag: 'Direct Practice Access',
          statPill: {
            value: '< 24 Hours',
            label: 'Response SLA',
            subtext: 'Direct Review By Practice Leadership',
          },
          secondaryPill: {
            text: 'Strict NDA Guaranteed',
            icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        actions={
          <>
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                const el = document.getElementById('inquiry-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<Send className="w-4 h-4" />}
            >
              Submit Project Brief
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/case-studies')}
              icon={<Layers className="w-4 h-4 text-cyan-400" />}
            >
              Explore Our Work
            </Button>
          </>
        }
        keyPoints={[
          'Direct Principal Architect Review',
          'Custom Scope & Milestone Sprints',
          'Zero Obligation Discovery Consultation',
        ]}
      />

      {/* Contact Grid & Form */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-2">
                  // DIRECT INQUIRIES
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Official Communication Channels
                </h2>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  All inquiries receive dedicated attention from our strategic leadership team within 24 hours.
                </p>
              </div>

              {/* Exact Emails Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">General Inquiries</div>
                      <a
                        href={`mailto:${siteConfig.contact.primaryEmail}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors font-mono"
                      >
                        {siteConfig.contact.primaryEmail}
                      </a>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    For project briefs, RFP submissions, and exploratory consultations.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Direct Operations & Partnerships</div>
                      <a
                        href={`mailto:${siteConfig.contact.secondaryEmail}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors font-mono"
                      >
                        {siteConfig.contact.secondaryEmail}
                      </a>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    For enterprise client accounts, joint ventures, and technical integration queries.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-lg group hover:border-emerald-400/60 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.677.15-.2.301-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.238-.244-.589-.493-.509-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.803.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.11.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.723.23 1.381.197 1.901.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.175-1.431-.075-.125-.276-.201-.577-.351zM12.056 21.688c-1.74 0-3.447-.464-4.947-1.344l-.355-.21-3.676.964.981-3.584-.23-.367A9.638 9.638 0 0 1 2.4 12.086C2.4 6.786 6.73 2.456 12.03 2.456c2.569 0 4.984 1 6.8 2.818a9.584 9.584 0 0 1 2.816 6.804c0 5.302-4.329 9.61-9.59 9.61zm0-17.688C7.59 4 3.96 7.63 3.96 12.086c0 1.57.45 3.09 1.305 4.41l.2.31-.58 2.12 2.17-.57.3.18a8.077 8.077 0 0 0 4.701 1.46c4.47 0 8.1-3.63 8.1-8.086 0-2.16-.84-4.19-2.37-3.72a8.04 8.04 0 0 0-5.73-2.18z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Direct Owner WhatsApp</div>
                        <a
                          href={siteConfig.contact.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base font-bold text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                        >
                          {siteConfig.contact.whatsappDisplay}
                        </a>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                      Live Chat
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                    <span>Direct chat for urgent briefs, quotes & founder consultation.</span>
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-semibold ml-2 shrink-0 flex items-center gap-1"
                    >
                      Message Now →
                    </a>
                  </div>
                </div>
              </div>

              {/* Operations & Hours */}
              <div className="p-6 rounded-2xl bg-[#050816] border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Client Response Windows</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {siteConfig.contact.hours}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Agency Operations</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {siteConfig.contact.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <div>
                    <div className="font-bold text-white">NDA & IP Protection</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      Mutual Non-Disclosure Agreements signed prior to proprietary technical reviews.
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Operations Studio Image */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                  alt="InfosBrain Global Digital Operations"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-300 bg-slate-950/90 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
                    InfosBrain Global Operations
                  </span>
                  <span className="text-xs font-mono text-slate-400">Async & Live</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#050816] border border-cyan-500/40 shadow-2xl backdrop-blur-xl relative">
                {submitted ? (
                  <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      Inquiry Received Successfully
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-cyan-300 font-semibold">{formData.fullName}</span>. A senior strategist from InfosBrain will review your requirements and respond via <span className="text-cyan-300">{formData.email}</span> within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs text-cyan-400 hover:underline cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">
                        Request Strategic Consultation
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Tell us about your objectives. We will prepare an initial assessment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Company / Business Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Primary Service of Interest
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                        >
                          {siteConfig.services.map((srv) => (
                            <option key={srv.id} value={srv.title} className="bg-slate-900 text-white">
                              {srv.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Estimated Budget Band
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="<$5k" className="bg-slate-900 text-white">Less than $5,000</option>
                          <option value="$5k - $15k" className="bg-slate-900 text-white">$5,000 – $15,000</option>
                          <option value="$15k - $35k" className="bg-slate-900 text-white">$15,000 – $35,000</option>
                          <option value="$35k+" className="bg-slate-900 text-white">$35,000+ (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Project Brief / Strategic Objectives *
                      </label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your current tech stack, pain points, target launch date, and key metrics..."
                        className="w-full px-4 py-3 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 custom-scrollbar"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Send Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
