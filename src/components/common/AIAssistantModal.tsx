import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, ArrowRight, Shield, Globe2, Calendar } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useRouter } from '../../context/RouterContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    path: string;
  };
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const { navigate } = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello! I am InfosBrain AI Assistant. We transform ideas into intelligent digital solutions across software development, AI, cloud technologies, cybersecurity, and digital transformation. How can I assist your organization today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Recommend an AI tool for our business',
    'How does InfosBrain ensure Responsible AI?',
    'What are your global office locations?',
    'How do you modernize legacy software?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let action: { label: string; path: string } | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('ai tool') || lower.includes('recommend') || lower.includes('assistant')) {
        replyText =
          'InfosBrain provides 6 practical AI-powered tools: AI Business Assistant, Intelligent Document Processing, Predictive Analytics, Customer Service Automation, AI Content Studio, and Workflow Automation. Each is built with enterprise security, role-based controls, and human oversight.';
        action = { label: 'Explore AI Tools Showcase', path: '/ai-solutions' };
      } else if (lower.includes('responsible') || lower.includes('security') || lower.includes('privacy')) {
        replyText =
          'InfosBrain designs AI with "Responsible AI by Design": privacy-conscious architecture, zero-retention defaults, role-based access controls, human-in-the-loop review for critical decisions, and strict ISO/GDPR compliance.';
        action = { label: 'Review Security Standards', path: '/about' };
      } else if (lower.includes('location') || lower.includes('office') || lower.includes('global') || lower.includes('where')) {
        replyText =
          'InfosBrain operates internationally with our Global Headquarters in Dublin (Ireland 🇮🇪), European Operations in Amsterdam (Netherlands 🇳🇱), South Asia R&D in Lahore/Islamabad (Pakistan 🇵🇰), and West Africa Delivery in Accra (Ghana 🇬🇭). We serve clients across 25+ countries.';
        action = { label: 'View Interactive World Map', path: '/#global' };
      } else if (lower.includes('consult') || lower.includes('book') || lower.includes('meeting') || lower.includes('start')) {
        replyText =
          'Our technology strategists and solution architects are available for a 1-on-1 discovery consultation to review your technical requirements and provide an implementation roadmap.';
        action = { label: 'Schedule Consultation', path: '/contact' };
      } else {
        replyText =
          'InfosBrain combines innovation, strategy, design, and engineering expertise to create intelligent solutions that transform business challenges into scalable opportunities. Would you like to explore our Core Services, view our verified Case Studies, or schedule a consultation?';
        action = { label: 'View Core Services', path: '/services' };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          time: 'Just now',
          action,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (path: string) => {
    if (path === '/contact' && onOpenConsultation) {
      onOpenConsultation();
      onClose();
    } else if (path.startsWith('/#')) {
      navigate('/');
      onClose();
      setTimeout(() => {
        const el = document.getElementById(path.replace('/#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      navigate(path);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full sm:max-w-lg h-[85vh] sm:h-[650px] bg-[#071A35] border-t sm:border border-[#0078FF]/30 sm:rounded-3xl flex flex-col overflow-hidden shadow-[0_0_60px_rgba(0,120,255,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#050816]/90 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0078FF] to-[#6C4DFF] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,120,255,0.5)]">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00C9A7] border-2 border-[#050816]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white font-display">InfosBrain AI Assistant</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#0078FF]/20 text-[#0078FF]">
                  v3.4 Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Responsible AI • Encrypted • Multi-Region</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#0078FF]/20 border border-[#0078FF]/40 flex items-center justify-center text-[#0078FF] flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl p-3.5 space-y-2.5 ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-[#0078FF] to-[#6C4DFF] text-white rounded-br-none shadow-md'
                    : 'bg-[#050816]/80 text-slate-200 border border-slate-800 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action!.path)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0078FF]/20 border border-[#0078FF]/50 text-[#0078FF] hover:bg-[#0078FF] hover:text-white transition-all text-xs font-semibold cursor-pointer"
                  >
                    <span>{m.action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-slate-400 text-xs italic">
              <div className="w-7 h-7 rounded-lg bg-[#0078FF]/20 flex items-center justify-center text-[#0078FF]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0078FF] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C4DFF] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C9A7] animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>InfosBrain AI is analyzing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-[#050816]/60 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 rounded-full text-[11px] bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#0078FF] whitespace-nowrap transition-all cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#050816] border-t border-slate-800 flex items-center gap-2 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask about AI tools, software architecture, global offices..."
            className="flex-grow px-3.5 py-2.5 rounded-xl bg-[#071A35] border border-slate-800 focus:border-[#0078FF] text-white text-xs sm:text-sm focus:outline-none transition-all placeholder:text-slate-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-[#0078FF] hover:bg-[#0078FF]/90 disabled:opacity-40 text-white transition-all cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
