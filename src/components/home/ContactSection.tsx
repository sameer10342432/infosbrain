import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Calendar,
  FileText,
  MessageSquare,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Bot,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenConsultation?: () => void;
  onOpenChatbot?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenConsultation,
  onOpenChatbot,
}) => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'proposal' | 'expert'>(
    'consultation'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [serviceFocus, setServiceFocus] = useState('Artificial Intelligence & Machine Learning');
  const [budget, setBudget] = useState('$10k - $25k');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#0078FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00C9A7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="GET IN TOUCH"
          title="Let's Build the Future"
          highlightText="Together"
          description="Whether you have an immediate software project, require custom AI development, or seek long-term digital transformation consulting, our global leadership is ready to connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Form with Tabs */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[#071A35]/90 border border-[#0078FF]/30 shadow-[0_0_40px_rgba(0,120,255,0.15)] backdrop-blur-xl">
            {/* Form Mode Tabs */}
            <div className="flex rounded-2xl bg-[#050816] p-1.5 border border-slate-800 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('consultation');
                  setIsSubmitted(false);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'consultation'
                    ? 'bg-[#0078FF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="truncate">Schedule Consultation</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('proposal');
                  setIsSubmitted(false);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'proposal'
                    ? 'bg-[#0078FF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="truncate">Request Proposal</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('expert');
                  setIsSubmitted(false);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'expert'
                    ? 'bg-[#0078FF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="truncate">Talk to an Expert</span>
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#00C9A7]/20 border border-[#00C9A7] flex items-center justify-center text-[#00C9A7] shadow-[0_0_30px_rgba(0,201,167,0.3)] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white font-display">Inquiry Received</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{name}</span>. Your request for{' '}
                  <span className="text-[#0078FF] font-semibold">{serviceFocus}</span> has been routed to our regional lead architect. We will respond within 4 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#0078FF] text-white text-xs font-semibold hover:bg-[#0078FF]/90 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Thomas Lee"
                      className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="thomas@organization.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Global Health Foundation"
                      className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Primary Service Focus
                    </label>
                    <select
                      value={serviceFocus}
                      onChange={(e) => setServiceFocus(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Artificial Intelligence & Machine Learning">
                        Artificial Intelligence & Machine Learning
                      </option>
                      <option value="Custom Software Development">
                        Custom Software Development
                      </option>
                      <option value="Cloud Solutions & DevOps">
                        Cloud Solutions & DevOps
                      </option>
                      <option value="Cybersecurity & Audits">
                        Cybersecurity & Audits
                      </option>
                      <option value="Web & Mobile Development">
                        Web & Mobile Development
                      </option>
                      <option value="Digital Transformation Consulting">
                        Digital Transformation Consulting
                      </option>
                      <option value="Data Analytics & Business Intelligence">
                        Data Analytics & Business Intelligence
                      </option>
                    </select>
                  </div>
                </div>

                {activeTab === 'proposal' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Estimated Project Scope / Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['<$10k', '$10k - $25k', '$25k - $50k', '$50k+'].map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            budget === b
                              ? 'bg-[#0078FF]/20 border-[#0078FF] text-white shadow-sm'
                              : 'bg-[#050816] border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Brief or Strategic Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your objectives, current technology stack, and desired implementation timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] hover:opacity-95 text-white font-bold text-sm shadow-[0_0_30px_rgba(0,120,255,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {activeTab === 'consultation'
                        ? 'Book Strategic Consultation'
                        : activeTab === 'proposal'
                        ? 'Request Detailed Proposal'
                        : 'Submit Expert Inquiry'}
                    </span>
                  </button>
                  <div className="mt-2.5 text-center text-[11px] text-slate-400 font-mono">
                    🛡️ Protected by Enterprise NDA • Zero spam • Direct senior engineer response
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels, Hubs, & Calendar Triggers */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Consultation Calendar Trigger */}
            <div className="p-6 rounded-3xl bg-[#071A35]/80 border border-[#00C9A7]/30 shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00C9A7]/20 border border-[#00C9A7]/40 flex items-center justify-center text-[#00C9A7]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    Meeting Booking Calendar
                  </h4>
                  <p className="text-xs text-slate-300">Reserve a 30-min discovery slot directly</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with an InfosBrain partner lead without back-and-forth emails. Select your timezone and confirmed instant slot.
              </p>
              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 rounded-xl bg-[#00C9A7] hover:bg-[#00C9A7]/90 text-[#071A35] font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Open Booking Calendar
                </button>
              )}
            </div>

            {/* Direct Instant Channels */}
            <div className="p-6 rounded-3xl bg-[#071A35]/80 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider font-mono text-slate-300">
                Direct Contact Channels
              </h4>

              {/* WhatsApp */}
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-[#050816] border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      WhatsApp Quick Chat
                    </div>
                    <div className="text-[11px] text-slate-400">{siteConfig.contact.whatsappDisplay}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${siteConfig.contact.primaryEmail}`}
                className="p-3.5 rounded-2xl bg-[#050816] border border-slate-800 hover:border-[#0078FF]/50 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0078FF]/10 border border-[#0078FF]/30 flex items-center justify-center text-[#0078FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#0078FF] transition-colors">
                      Advisory & Inquiries
                    </div>
                    <div className="text-[11px] text-slate-400">{siteConfig.contact.primaryEmail}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#0078FF] transition-colors" />
              </a>

              {/* AI Live Chatbot Trigger */}
              {onOpenChatbot && (
                <button
                  type="button"
                  onClick={onOpenChatbot}
                  className="w-full p-3.5 rounded-2xl bg-[#050816] border border-slate-800 hover:border-[#6C4DFF]/50 flex items-center justify-between transition-all group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#6C4DFF]/10 border border-[#6C4DFF]/30 flex items-center justify-center text-[#6C4DFF]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#6C4DFF] transition-colors">
                        InfosBrain AI Live Assistant
                      </div>
                      <div className="text-[11px] text-slate-400">Instant questions & solution guidance</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#6C4DFF] font-semibold">Launch →</span>
                </button>
              )}
            </div>

            {/* Global Hubs Directory */}
            <div className="p-6 rounded-3xl bg-[#071A35]/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                International Hubs
              </h4>
              <div className="space-y-2 text-xs">
                {siteConfig.globalOffices.map((off) => (
                  <div
                    key={off.id}
                    className="p-2.5 rounded-xl bg-[#050816] border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span>{off.flag}</span>
                      <span className="font-semibold text-white">{off.city}</span>
                      <span className="text-slate-400 text-[11px]">({off.country})</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#00C9A7]">{off.teamSize}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
