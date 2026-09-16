import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative group inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
        isDark
          ? 'bg-slate-900/80 border-slate-700/70 text-amber-400 hover:text-amber-300 hover:border-amber-400/50 hover:bg-slate-800/90 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]'
          : 'bg-white border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-400/60 hover:bg-slate-50 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-4 h-4 text-amber-400 transition-all duration-300 ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 absolute'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`w-4 h-4 text-cyan-400 transition-all duration-300 ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 absolute'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-semibold tracking-wide">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}

      {/* Subtle indicator dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors ${
          isDark ? 'bg-cyan-400 shadow-[0_0_6px_#06B6D4]' : 'bg-amber-500 shadow-[0_0_6px_#F59E0B]'
        }`}
      />
    </button>
  );
};
