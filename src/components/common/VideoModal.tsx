import React from 'react';
import { X, Play, Sparkles, Shield, CheckCircle } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  videoUrl?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title = 'Transforming Ideas into Intelligent Digital Solutions',
  subtitle = 'Discover how InfosBrain partners with organizations worldwide to engineer high-impact technology.',
  videoUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-[#071A35] border border-[#0078FF]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,120,255,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#050816]/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#00C9A7] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>InfosBrain Spotlight</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Area */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#071A35] via-[#050816] to-[#071A35]">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
                alt="InfosBrain Showcase"
                className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs"
              />
              <div className="relative z-10 space-y-4 max-w-lg">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#0078FF] to-[#6C4DFF] flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,120,255,0.6)] animate-pulse">
                  <Play className="w-8 h-8 translate-x-0.5 fill-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white font-display">Executive Showcase & Story</h4>
                  <p className="text-sm text-slate-300">{subtitle}</p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#0078FF]" /> Enterprise Verified
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00C9A7]" /> Global Delivery
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#050816] border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            InfosBrain Global Operations • Dublin • Amsterdam • Lahore/Islamabad • Accra
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0078FF] hover:bg-[#0078FF]/90 text-white font-semibold transition-all cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
