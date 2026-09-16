import React from 'react';
import { useTranslation } from '../../context/TranslationContext';
import { useTheme } from '../../context/ThemeContext';
import { Globe, X, Check, RotateCcw } from 'lucide-react';

export const AutoTranslateNotification: React.FC = () => {
  const {
    showToast,
    dismissToast,
    revertToEnglish,
    currentLanguageObj,
    detectedCountry,
    isAutoTranslated,
  } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!showToast || !isAutoTranslated) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl transition-colors ${
          isDark
            ? 'bg-[#070B1F]/95 border-cyan-500/40 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.2)]'
            : 'bg-white/95 border-cyan-500/40 text-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.15)]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <span>{currentLanguageObj.flag}</span>
                <span>Auto-Translated to {currentLanguageObj.name}</span>
              </div>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {detectedCountry
                  ? `Detected region: ${detectedCountry.name || detectedCountry.code}. Website automatically translated to your local language.`
                  : `Website automatically translated to ${currentLanguageObj.name} based on your browser preferences.`}
              </p>
            </div>
          </div>
          <button
            onClick={dismissToast}
            className={`p-1 rounded-lg transition-colors hover:bg-slate-700/40 cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
            }`}
            aria-label="Close translation notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-700/40 flex items-center justify-end gap-2">
          <button
            onClick={revertToEnglish}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isDark
                ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                : 'border-slate-300 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>English</span>
          </button>
          <button
            onClick={dismissToast}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-sm cursor-pointer"
          >
            <Check className="w-3 h-3" />
            <span>Keep {currentLanguageObj.nativeName}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
