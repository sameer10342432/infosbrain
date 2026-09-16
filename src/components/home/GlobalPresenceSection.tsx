import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import {
  Globe,
  MapPin,
  Users,
  CheckCircle,
  Mail,
  Phone,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const GlobalPresenceSection: React.FC = () => {
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('dublin-hq');
  const [activeRegionTab, setActiveRegionTab] = useState<string>('Europe');

  const selectedOffice =
    siteConfig.globalOffices.find((o) => o.id === selectedOfficeId) || siteConfig.globalOffices[0];

  return (
    <section id="global" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#0078FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#00C9A7]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          badge="GLOBAL PRESENCE & IMPACT"
          title="Delivering Innovation"
          highlightText="Across Continents"
          description="Local understanding, international collaboration, and scalable digital delivery for organizations operating across regions. We connect ideas and opportunities to create sustainable global impact."
        />

        {/* Global Impact Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {[
            { value: '25+', label: 'Countries Reached', sub: 'Global footprint' },
            { value: '100+', label: 'Successful Projects', sub: 'Enterprise & NGO' },
            { value: '98%', label: 'Client Satisfaction', sub: 'Verified rating' },
            { value: '50+', label: 'Strategic Alliances', sub: 'Tech & universities' },
            { value: '4', label: 'International Hubs', sub: 'Europe, Asia, Africa' },
            { value: '24/7', label: 'Global Collaboration', sub: 'Seamless time zones' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[#071A35]/70 border border-slate-800 hover:border-[#0078FF]/40 text-center transition-all shadow-md group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#0078FF] group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-white mt-1">{stat.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Interactive World Map & Office Command Center */}
        <div className="mb-16 p-6 sm:p-10 rounded-3xl bg-[#071A35]/80 border border-[#0078FF]/30 shadow-[0_0_50px_rgba(0,120,255,0.15)] backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#00C9A7] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>Interactive Global Office Map</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                Connecting Innovation Worldwide
              </h3>
            </div>

            {/* Quick Location Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {siteConfig.globalOffices.map((office) => (
                <button
                  key={office.id}
                  onClick={() => setSelectedOfficeId(office.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedOfficeId === office.id
                      ? 'bg-[#0078FF] text-white shadow-[0_0_15px_rgba(0,120,255,0.5)]'
                      : 'bg-[#050816] text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{office.flag}</span>
                  <span>{office.city}</span>
                </button>
              ))}
            </div>
          </div>

          {/* World Map Visualization */}
          <div className="relative w-full aspect-[2/1] min-h-[300px] max-h-[460px] rounded-2xl bg-[#050816] border border-slate-800/80 overflow-hidden mb-8 shadow-inner">
            {/* Abstract World Grid Background */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full object-cover opacity-60 pointer-events-none"
            >
              <defs>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 120, 255, 0.08)" strokeWidth="0.5" />
                </pattern>
                {/* Continents outlines (Stylized clean vector representation) */}
                <linearGradient id="officePulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0078FF" />
                  <stop offset="100%" stopColor="#00C9A7" />
                </linearGradient>
              </defs>

              <rect width="1000" height="500" fill="#050816" />
              <rect width="1000" height="500" fill="url(#gridPattern)" />

              {/* Continents simplified vector paths */}
              {/* North America */}
              <path
                d="M 120,80 Q 200,60 280,100 Q 260,180 200,240 Q 150,210 130,140 Z"
                fill="#071A35"
                stroke="rgba(0, 120, 255, 0.2)"
                strokeWidth="1"
              />
              {/* South America */}
              <path
                d="M 240,250 Q 310,270 320,340 Q 290,440 240,430 Q 210,330 240,250 Z"
                fill="#071A35"
                stroke="rgba(0, 120, 255, 0.2)"
                strokeWidth="1"
              />
              {/* Europe */}
              <path
                d="M 440,90 Q 550,80 560,160 Q 500,200 450,180 Q 420,130 440,90 Z"
                fill="#071A35"
                stroke="rgba(0, 120, 255, 0.25)"
                strokeWidth="1"
              />
              {/* Africa */}
              <path
                d="M 440,190 Q 550,180 560,280 Q 520,400 470,390 Q 430,290 440,190 Z"
                fill="#071A35"
                stroke="rgba(0, 120, 255, 0.25)"
                strokeWidth="1"
              />
              {/* Asia */}
              <path
                d="M 570,80 Q 820,80 840,220 Q 750,280 630,230 Q 570,170 570,80 Z"
                fill="#071A35"
                stroke="rgba(0, 120, 255, 0.2)"
                strokeWidth="1"
              />
              {/* Australia */}
              <path
                d="M 770,320 Q 870,310 880,380 Q 830,420 770,390 Z"
                fill="#071A35"
                stroke="rgba(0, 120, 255, 0.2)"
                strokeWidth="1"
              />

              {/* Global Connection Arc Lines */}
              <path
                d="M 470,155 Q 560,170 670,220"
                fill="none"
                stroke="rgba(0, 120, 255, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              <path
                d="M 470,155 Q 460,220 480,275"
                fill="none"
                stroke="rgba(0, 201, 167, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              <path
                d="M 495,160 Q 580,200 670,220"
                fill="none"
                stroke="rgba(108, 77, 255, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            </svg>

            {/* Glowing Interactive Office Markers */}
            {siteConfig.globalOffices.map((office) => {
              const isSelected = selectedOfficeId === office.id;
              return (
                <div
                  key={office.id}
                  onClick={() => setSelectedOfficeId(office.id)}
                  style={{
                    left: `${office.coordinates.x}%`,
                    top: `${office.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Outer Ripple */}
                  <span
                    className={`absolute -inset-3 rounded-full opacity-75 animate-ping pointer-events-none ${
                      isSelected ? 'bg-[#0078FF]' : 'bg-cyan-500/50'
                    }`}
                  />
                  {/* Pin Circle */}
                  <div
                    className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs shadow-lg transition-transform ${
                      isSelected
                        ? 'bg-[#0078FF] border-white scale-125 shadow-[0_0_20px_#0078FF]'
                        : 'bg-[#050816] border-[#00C9A7] group-hover:scale-110'
                    }`}
                  >
                    <span>{office.flag}</span>
                  </div>

                  {/* Tooltip Label */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap pointer-events-none transition-all shadow-md ${
                      isSelected
                        ? 'bg-white text-[#071A35] opacity-100 scale-100'
                        : 'bg-[#050816] text-slate-300 border border-slate-800 opacity-0 group-hover:opacity-100 scale-95'
                    }`}
                  >
                    {office.city} ({office.country})
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Office Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-2xl bg-[#050816]/90 border border-slate-800">
            <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-[4/3] relative border border-slate-800">
              <img
                src={selectedOffice.imageUrl}
                alt={`${selectedOffice.city} office`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#071A35]/90 text-white border border-[#0078FF]/30">
                  {selectedOffice.flag} {selectedOffice.country}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#00C9A7]/20 text-[#00C9A7] border border-[#00C9A7]/40">
                  {selectedOffice.teamSize}
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#0078FF] font-semibold">
                  {selectedOffice.role}
                </div>
                <h4 className="text-2xl font-bold text-white font-display">
                  {selectedOffice.city}, {selectedOffice.country}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00C9A7]" />
                  {selectedOffice.address}
                </p>
              </div>

              {/* Services Provided */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono text-slate-300 font-semibold uppercase">
                  Regional Delivery Mandate:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedOffice.servicesProvided.map((service, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-[#071A35]/80 border border-slate-800/80 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#0078FF] flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Success Story */}
              <div className="p-3 rounded-xl bg-[#0078FF]/10 border border-[#0078FF]/20 text-xs text-slate-200">
                <span className="font-bold text-[#0078FF]">Local Impact: </span>
                {selectedOffice.localSuccessStory}
              </div>

              {/* Contact direct */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <a
                  href={`mailto:${selectedOffice.contactEmail}`}
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0078FF]" />
                  <span>{selectedOffice.contactEmail}</span>
                </a>
                {selectedOffice.contactPhone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#00C9A7]" />
                    <span>{selectedOffice.contactPhone}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Where We Serve Regional Coverage Tabs */}
        <div className="mb-16 p-8 rounded-3xl bg-[#071A35]/60 border border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#6C4DFF] uppercase tracking-wider">
                WORLDWIDE REACH
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                Where We Serve: 25+ Countries & Continents
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(siteConfig.regionalCoverage).map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegionTab(region)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeRegionTab === region
                      ? 'bg-[#0078FF] text-white shadow-md'
                      : 'bg-[#050816] text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Active Region Country Badges */}
          <div className="flex flex-wrap gap-2.5">
            {siteConfig.regionalCoverage[
              activeRegionTab as keyof typeof siteConfig.regionalCoverage
            ]?.map((country, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-[#050816] border border-slate-800 text-xs text-slate-200 font-medium flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#00C9A7]" />
                <span>{country}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Global Presence Matters 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: 'Local Understanding, Global Expertise',
              desc: 'Our international network allows us to understand regional needs while applying world-class technological best practices.',
              icon: Globe,
            },
            {
              title: 'Around-the-Clock Support',
              desc: 'Multiple regional operations enable faster communication and continuous project progress across different time zones.',
              icon: Sparkles,
            },
            {
              title: 'International Collaboration',
              desc: 'Our multicultural teams collaborate across continents to bring diverse perspectives and innovative engineering.',
              icon: Users,
            },
            {
              title: 'Cross-Border Innovation',
              desc: 'Combining insights from varied markets and industries to engineer solutions that are globally competitive and locally relevant.',
              icon: Layers,
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#071A35]/70 border border-slate-800 hover:border-[#0078FF]/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0078FF]/10 border border-[#0078FF]/30 flex items-center justify-center text-[#0078FF]">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-display">{pillar.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Global Vision Statement Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#071A35] via-[#050816] to-[#071A35] border border-[#0078FF]/30 text-center shadow-2xl">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#00C9A7] mb-3">
            GLOBAL VISION STATEMENT
          </p>
          <blockquote className="text-lg sm:text-2xl md:text-3xl font-bold text-white font-display max-w-4xl mx-auto leading-relaxed">
            "Our vision is to become a globally recognized leader in technology, innovation, and digital transformation, connecting people, ideas, and opportunities to create sustainable impact across nations and generations."
          </blockquote>
          <div className="mt-4 text-xs font-mono text-slate-400">
            InfosBrain International Operations • Dublin • Amsterdam • Lahore / Islamabad • Accra
          </div>
        </div>
      </div>
    </section>
  );
};
