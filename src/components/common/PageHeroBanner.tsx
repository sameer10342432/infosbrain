import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export interface PageHeroBannerProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  highlightText?: string;
  description: string;
  image: {
    src: string;
    alt: string;
    tag?: string;
    statPill?: {
      value: string;
      label: string;
      subtext?: string;
    };
    secondaryPill?: {
      text: string;
      icon?: React.ReactNode;
    };
  };
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string; onClick?: () => void }>;
  keyPoints?: string[];
  layout?: 'split' | 'cinematic';
  className?: string;
  children?: React.ReactNode;
}

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  badge,
  badgeIcon = <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />,
  title,
  highlightText,
  description,
  image,
  actions,
  breadcrumbs,
  keyPoints,
  layout = 'split',
  className = '',
  children,
}) => {
  if (layout === 'cinematic') {
    return (
      <section className={`relative py-20 sm:py-28 bg-[#050816] overflow-hidden ${className}`}>
        {/* Background Banner Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={image.src}
            alt={image.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/75 to-[#050816]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-transparent to-[#050816]" />
        </div>

        {/* Cyber Grid & Ambient Glows */}
        <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumbs if provided */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 mb-6" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>/</span>}
                  {crumb.onClick ? (
                    <button
                      onClick={crumb.onClick}
                      className="hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className={idx === breadcrumbs.length - 1 ? 'text-cyan-300 font-semibold' : ''}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              {badgeIcon}
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] mb-6">
            {title}{' '}
            {highlightText && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 drop-shadow-sm">
                {highlightText}
              </span>
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            {description}
          </p>

          {actions && (
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {actions}
            </div>
          )}

          {image.statPill && (
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-bold text-white font-display">{image.statPill.value}</span>
              <span className="text-xs text-slate-300 font-mono">• {image.statPill.label}</span>
              {image.statPill.subtext && (
                <span className="hidden sm:inline text-xs text-slate-400">({image.statPill.subtext})</span>
              )}
            </div>
          )}

          {children}
        </div>
      </section>
    );
  }

  // Default 'split' layout: Content on left, cinematic banner card on right
  return (
    <section className={`relative py-14 sm:py-20 lg:py-24 bg-[#050816] overflow-hidden ${className}`}>
      {/* Ambient glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6 sm:mb-8" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                {crumb.onClick ? (
                  <button
                    onClick={crumb.onClick}
                    className="hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className={idx === breadcrumbs.length - 1 ? 'text-cyan-300 font-semibold' : ''}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-950/80 to-cyan-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.18)]">
                {badgeIcon}
                <span>{badge}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1]">
              {title}{' '}
              {highlightText && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 drop-shadow-sm">
                  {highlightText}
                </span>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {description}
            </p>

            {/* Action buttons */}
            {actions && (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                {actions}
              </div>
            )}

            {/* Key feature points */}
            {keyPoints && keyPoints.length > 0 && (
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400">
                {keyPoints.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            )}

            {children}
          </div>

          {/* Right Column: Hero Banner Picture Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative group w-full max-w-[540px] mx-auto">
              {/* Outer decorative gradient glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-violet-600/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />

              {/* Main Banner Card */}
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-[0_0_50px_rgba(6,182,212,0.18)]">
                {/* Banner Image with subtle zoom on hover */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
                  <img
                    src={image.src}
                    alt={image.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Vignette & Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/30 via-transparent to-[#050816]/30" />

                  {/* Top Bar Tag & Live Status Indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    {image.tag ? (
                      <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-950/85 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-md">
                        {image.tag}
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-950/85 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-md">
                        InfosBrain Digital
                      </span>
                    )}

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Production</span>
                    </div>
                  </div>

                  {/* Bottom Float Card: Stat or Secondary Pill */}
                  {(image.statPill || image.secondaryPill) && (
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-700/70 backdrop-blur-xl shadow-2xl">
                      {image.statPill && (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-base sm:text-lg font-bold text-white font-display">
                              {image.statPill.value}{' '}
                              <span className="text-xs font-normal text-cyan-400 font-mono">
                                ({image.statPill.label})
                              </span>
                            </div>
                            {image.statPill.subtext && (
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                {image.statPill.subtext}
                              </div>
                            )}
                          </div>
                          {image.secondaryPill && (
                            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                              {image.secondaryPill.icon}
                              <span>{image.secondaryPill.text}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {!image.statPill && image.secondaryPill && (
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                          {image.secondaryPill.icon}
                          <span>{image.secondaryPill.text}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
