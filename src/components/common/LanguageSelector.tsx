import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, SUPPORTED_LANGUAGES } from '../../context/TranslationContext';
import { useTheme } from '../../context/ThemeContext';
import { Globe, ChevronDown, Check, Sparkles, Search, X } from 'lucide-react';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false, className = '' }) => {
  const {
    currentLang,
    changeLanguage,
    currentLanguageObj,
    detectedCountry,
    isAutoTranslated,
  } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLanguage = (code: string) => {
    changeLanguage(code, true);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-none ${
          isDark
            ? 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800/80'
            : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:border-cyan-500 hover:bg-slate-50 shadow-sm'
        } ${isOpen ? 'ring-2 ring-cyan-500/30 border-cyan-500' : ''}`}
        aria-label="Select language"
        title={`Current Language: ${currentLanguageObj.name}`}
      >
        <span className="text-sm leading-none">{currentLanguageObj.flag}</span>
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span className="uppercase tracking-wider font-bold text-[11px]">
          {compact ? currentLanguageObj.code.slice(0, 2) : currentLanguageObj.name}
        </span>
        {isAutoTranslated && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Auto-translated" />
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 w-72 max-w-[90vw] rounded-2xl border shadow-2xl backdrop-blur-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150 ${
            isDark
              ? 'bg-[#070B1F]/98 border-cyan-500/30 text-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.15)]'
              : 'bg-white/98 border-slate-200 text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
          }`}
        >
          {/* Header & Detected Badge */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Translate Website</span>
            </div>
            {detectedCountry && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
                📍 {detectedCountry.name || detectedCountry.code}
              </span>
            )}
          </div>

          {/* Search Box */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                isDark
                  ? 'bg-slate-900/90 border-slate-700 text-slate-200 placeholder-slate-500'
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Language List */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredLanguages.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-400">
                No languages found
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                          : 'bg-cyan-50 text-cyan-700 font-semibold border border-cyan-300'
                        : isDark
                        ? 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                        : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <div className="text-left">
                        <div className="font-medium flex items-center gap-1">
                          <span>{lang.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({lang.nativeName})
                          </span>
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
            <span>Powered by Intelligent Auto-Translate</span>
            {currentLang !== 'en' && (
              <button
                onClick={() => handleSelectLanguage('en')}
                className="text-cyan-400 hover:underline font-semibold cursor-pointer"
              >
                Reset to English
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
