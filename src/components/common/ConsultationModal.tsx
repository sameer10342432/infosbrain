import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Building, Send, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'Artificial Intelligence & Machine Learning',
}) => {
  const [topic, setTopic] = useState(defaultTopic);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM GMT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const topics = [
    'Artificial Intelligence & Machine Learning',
    'Custom Software & Platform Engineering',
    'Cloud Solutions, Modernization & DevOps',
    'Cybersecurity & ISO/GDPR Compliance',
    'Digital Transformation & Process Optimization',
    'General Strategic Consultation',
  ];

  const dates = [
    'Tomorrow, 10:00 AM GMT',
    'Tomorrow, 2:00 PM GMT',
    'In 2 Days, 11:30 AM GMT',
    'In 2 Days, 4:00 PM GMT',
    'In 3 Days, 1:00 PM GMT',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          business: organization,
          service: topic,
          budget: 'Consultation',
          projectDetails: `[Requested Time: ${selectedDate}]\n${message || 'Consultation request'}`,
          source: 'Consultation Modal',
        }),
      });
    } catch (err) {
      console.error('Inquiry submission error:', err);
    }
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#071A35] border border-[#0078FF]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,120,255,0.3)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#050816]/80 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0078FF] to-[#6C4DFF] flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Schedule a Strategic Consultation</h3>
              <p className="text-xs text-slate-400">Directly connect with InfosBrain's senior technology architects</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#00C9A7]/20 border border-[#00C9A7] flex items-center justify-center text-[#00C9A7] shadow-[0_0_25px_rgba(0,201,167,0.3)] animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white font-display">Consultation Requested!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{name || 'Partner'}</span>. Your strategic session on <span className="text-[#0078FF] font-semibold">{topic}</span> has been logged for <span className="text-[#00C9A7] font-semibold">{selectedDate}</span>. Our advisory lead will confirm via <span className="text-white font-mono">{email}</span> within 4 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-[#0078FF] text-white font-semibold hover:bg-[#0078FF]/90 transition-all cursor-pointer shadow-lg"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Consultation Topic */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Focus Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topics.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                        topic === t
                          ? 'bg-[#0078FF]/20 border-[#0078FF] text-[#0078FF] shadow-[0_0_12px_rgba(0,120,255,0.2)]'
                          : 'bg-[#050816]/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Slot */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00C9A7]" />
                  Select Available Session Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {dates.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`px-3 py-2 rounded-xl text-center text-xs font-medium border transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'bg-[#00C9A7]/20 border-[#00C9A7] text-[#00C9A7] shadow-[0_0_12px_rgba(0,201,167,0.2)]'
                          : 'bg-[#050816]/70 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#0078FF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@organization.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#0078FF] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> Organization / Company Name
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Global Health Initiative or Apex Retail Ltd."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#0078FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Objectives or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your timeline, current bottlenecks, or desired outcomes..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#050816] border border-slate-800 focus:border-[#0078FF] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#0078FF] transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] hover:opacity-95 text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(0,120,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Strategic Consultation Booking</span>
                </button>
                <div className="mt-2 text-center text-[11px] text-slate-400">
                  🔒 Zero commitment • Non-disclosure agreement guaranteed • 100% confidential
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
