import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  isDark = true,
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', text: 'text-lg', subtext: 'text-[8px]', svgSize: 32 },
    md: { box: 'w-10 h-10', text: 'text-xl sm:text-2xl', subtext: 'text-[9px]', svgSize: 40 },
    lg: { box: 'w-12 h-12', text: 'text-2xl sm:text-3xl', subtext: 'text-[10px]', svgSize: 48 },
    xl: { box: 'w-16 h-16', text: 'text-3xl sm:text-4xl', subtext: 'text-[11px]', svgSize: 64 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Mark: "IB surrounded by digital brain neural circuitry" */}
      <div
        className={`relative ${currentSize.box} rounded-xl bg-gradient-to-tr from-[#0078FF] via-[#6C4DFF] to-[#00C9A7] p-[1.5px] shadow-[0_0_20px_rgba(0,120,255,0.35)] group-hover:shadow-[0_0_28px_rgba(0,201,167,0.5)] transition-all duration-300 flex-shrink-0`}
      >
        <div
          className={`w-full h-full rounded-[10px] flex items-center justify-center relative overflow-hidden transition-colors ${
            isDark ? 'bg-[#050816]' : 'bg-slate-900'
          }`}
        >
          {/* SVG: Digital Brain Circuitry & Neural Network Enclosing "IB" */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
          >
            <defs>
              <linearGradient id="ibBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0078FF" />
                <stop offset="50%" stopColor="#6C4DFF" />
                <stop offset="100%" stopColor="#00C9A7" />
              </linearGradient>
              <linearGradient id="ibTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            {/* Left Brain Hemisphere - Digital Circuitry & Nodes */}
            <path
              d="M 44 14 C 33 14 24 21 21 30 C 17 32 14 38 15 45 C 13 48 13 54 16 58 C 14 65 17 72 23 76 C 28 84 37 86 44 86"
              stroke="url(#ibBrainGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 2.5"
              className="opacity-70"
            />
            <path
              d="M 43 20 C 35 20 28 26 27 34 C 23 38 23 45 25 50 C 22 55 24 63 29 68 C 34 74 41 78 43 80"
              stroke="url(#ibBrainGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left Brain Internal Synaptic Connectors */}
            <path d="M 27 34 L 35 38" stroke="#00C9A7" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 25 50 L 33 50" stroke="#0078FF" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 29 68 L 36 64" stroke="#6C4DFF" strokeWidth="1.8" strokeLinecap="round" />
            {/* Left Neural Nodes */}
            <circle cx="21" cy="30" r="2.2" fill="#00C9A7" />
            <circle cx="15" cy="45" r="2" fill="#0078FF" />
            <circle cx="16" cy="58" r="2.2" fill="#6C4DFF" />
            <circle cx="23" cy="76" r="2" fill="#00C9A7" />
            <circle cx="35" cy="38" r="1.8" fill="#00F0FF" />
            <circle cx="36" cy="64" r="1.8" fill="#00F0FF" />

            {/* Right Brain Hemisphere - Digital Circuitry & Nodes */}
            <path
              d="M 56 14 C 67 14 76 21 79 30 C 83 32 86 38 85 45 C 87 48 87 54 84 58 C 86 65 83 72 77 76 C 72 84 63 86 56 86"
              stroke="url(#ibBrainGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 2.5"
              className="opacity-70"
            />
            <path
              d="M 57 20 C 65 20 72 26 73 34 C 77 38 77 45 75 50 C 78 55 76 63 71 68 C 66 74 59 78 57 80"
              stroke="url(#ibBrainGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Right Brain Internal Synaptic Connectors */}
            <path d="M 73 34 L 65 38" stroke="#00C9A7" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 75 50 L 67 50" stroke="#0078FF" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 71 68 L 64 64" stroke="#6C4DFF" strokeWidth="1.8" strokeLinecap="round" />
            {/* Right Neural Nodes */}
            <circle cx="79" cy="30" r="2.2" fill="#00C9A7" />
            <circle cx="85" cy="45" r="2" fill="#0078FF" />
            <circle cx="84" cy="58" r="2.2" fill="#6C4DFF" />
            <circle cx="77" cy="76" r="2" fill="#00C9A7" />
            <circle cx="65" cy="38" r="1.8" fill="#00F0FF" />
            <circle cx="64" cy="64" r="1.8" fill="#00F0FF" />

            {/* Top & Bottom Central Pulse Nodes */}
            <circle cx="50" cy="14" r="2.5" fill="#00C9A7" />
            <line x1="44" y1="14" x2="56" y2="14" stroke="url(#ibBrainGrad)" strokeWidth="1.5" />
            <circle cx="50" cy="86" r="2.5" fill="#6C4DFF" />
            <line x1="44" y1="86" x2="56" y2="86" stroke="url(#ibBrainGrad)" strokeWidth="1.5" />

            {/* Central "IB" Monogram - Clear, Bold & Undistorted */}
            <text
              x="49"
              y="59"
              textAnchor="middle"
              fill="url(#ibTextGrad)"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="31"
              letterSpacing="-1"
              filter="drop-shadow(0 0 6px rgba(0, 240, 255, 0.45))"
            >
              IB
            </text>
          </svg>
        </div>
      </div>

      {/* Brand Text Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-display font-bold ${currentSize.text} tracking-tight flex items-center leading-none ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Infos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7]">
              Brain
            </span>
          </span>
          <span
            className={`font-mono tracking-widest uppercase mt-1 ${currentSize.subtext} font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Digital Transformation & Technology
          </span>
        </div>
      )}
    </div>
  );
};
