import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl =
    siteConfig.contact.whatsappUrl ||
    `https://wa.me/4915206777889?text=Hello%20InfosBrain!%20I%20would%20like%20to%20discuss%20a%20project.`;

  return (
    <div
      className="fixed bottom-28 md:bottom-20 right-4 sm:right-6 z-40 flex items-center justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Label */}
      <div
        className={`hidden sm:flex items-center mr-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs font-medium transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
        <span className="font-semibold text-emerald-300 mr-1">Chat on WhatsApp:</span>
        <span className="font-mono text-slate-200">+49 1520 6777889</span>
      </div>

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Owner on WhatsApp (+49 1520 6777889)"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#1EBE5D] via-[#25D366] to-[#4ADE80] text-white shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] border border-emerald-300/40 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        title="Chat with Owner on WhatsApp"
      >
        {/* Pulsing Ripple */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />

        {/* WhatsApp Vector Icon */}
        <svg
          className="w-6 h-6 fill-current relative z-10 transition-transform duration-300 group-hover:rotate-12"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.677.15-.2.301-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.238-.244-.589-.493-.509-.677-.518-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.803.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.11.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.723.23 1.381.197 1.901.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.175-1.431-.075-.125-.276-.201-.577-.351zM12.056 21.688c-1.74 0-3.447-.464-4.947-1.344l-.355-.21-3.676.964.981-3.584-.23-.367A9.638 9.638 0 0 1 2.4 12.086C2.4 6.786 6.73 2.456 12.03 2.456c2.569 0 4.984 1 6.8 2.818a9.584 9.584 0 0 1 2.816 6.804c0 5.302-4.329 9.61-9.59 9.61zm0-17.688C7.59 4 3.96 7.63 3.96 12.086c0 1.57.45 3.09 1.305 4.41l.2.31-.58 2.12 2.17-.57.3.18a8.077 8.077 0 0 0 4.701 1.46c4.47 0 8.1-3.63 8.1-8.086 0-2.16-.84-4.19-2.37-3.72a8.04 8.04 0 0 0-5.73-2.18z" />
        </svg>

        {/* Small "Online" status dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-slate-900 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        </span>
      </a>
    </div>
  );
};
