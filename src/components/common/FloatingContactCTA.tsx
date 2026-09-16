import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { MessageSquare, X, Mail, ArrowRight, Bot } from 'lucide-react';

interface FloatingContactCTAProps {
  onOpenChatbot?: () => void;
}

export const FloatingContactCTA: React.FC<FloatingContactCTAProps> = ({ onOpenChatbot }) => {
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-40">
      {/* Expanded Quick Contact Drawer / Card */}
      {isOpen && (
        <div className="mb-3 w-76 sm:w-96 rounded-2xl bg-[#070B1F]/95 backdrop-blur-2xl border border-cyan-500/30 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.2)] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                InfosBrain Direct Advisory
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-4 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              Have an AI project, software engineering initiative, or digital transformation need? Connect with our solution experts immediately.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400 font-medium">Direct Inquiries:</div>
              <a
                href={`mailto:${siteConfig.contact.primaryEmail}`}
                className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{siteConfig.contact.primaryEmail}</span>
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono pt-1"
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.677.15-.2.301-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.238-.244-.589-.493-.509-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.803.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.11.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.723.23 1.381.197 1.901.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.175-1.431-.075-.125-.276-.201-.577-.351zM12.056 21.688c-1.74 0-3.447-.464-4.947-1.344l-.355-.21-3.676.964.981-3.584-.23-.367A9.638 9.638 0 0 1 2.4 12.086C2.4 6.786 6.73 2.456 12.03 2.456c2.569 0 4.984 1 6.8 2.818a9.584 9.584 0 0 1 2.816 6.804c0 5.302-4.329 9.61-9.59 9.61zm0-17.688C7.59 4 3.96 7.63 3.96 12.086c0 1.57.45 3.09 1.305 4.41l.2.31-.58 2.12 2.17-.57.3.18a8.077 8.077 0 0 0 4.701 1.46c4.47 0 8.1-3.63 8.1-8.086 0-2.16-.84-4.19-2.37-3.72a8.04 8.04 0 0 0-5.73-2.18z" />
                  </svg>
                </span>
                <span>WhatsApp: {siteConfig.contact.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {onOpenChatbot && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenChatbot();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6C4DFF] to-[#0078FF] hover:from-[#5A3EE0] hover:to-[#0066DB] shadow-[0_0_20px_rgba(108,77,255,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Launch AI Assistant (Instant Answers)</span>
              </button>
            )}

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Chat Directly on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/contact');
              }}
              className="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Open Full Inquiry Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] border border-cyan-400/40 cursor-pointer active:scale-95 transition-all duration-200"
        aria-label="Let's Talk"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageSquare className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide uppercase font-display">
          Let's Talk
        </span>
      </button>
    </div>
  );
};
