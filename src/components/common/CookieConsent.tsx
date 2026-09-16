import React, { useState, useEffect } from 'react';
import { Shield, X, Check } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [preferencesModal, setPreferencesModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('infosbrain_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'infosbrain_cookie_consent',
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
    setVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(
      'infosbrain_cookie_consent',
      JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() })
    );
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'infosbrain_cookie_consent',
      JSON.stringify({
        necessary: true,
        analytics: analyticsEnabled,
        marketing: marketingEnabled,
        timestamp: Date.now(),
      })
    );
    setPreferencesModal(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Bottom Sticky Banner */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="bg-[#070B1F]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.15)] text-slate-200">
          <div className="flex items-center gap-2.5 mb-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Privacy & Cookie Preferences
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            InfosBrain uses cookies and telemetry to analyze web performance, personalize experiences, and optimize conversion flows.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 cursor-pointer"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() => setPreferencesModal(true)}
              className="px-2.5 py-1.5 text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {preferencesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#070B1F] border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                Cookie & Data Preferences
              </h3>
              <button
                onClick={() => setPreferencesModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Strictly Necessary Cookies</div>
                  <div className="text-slate-400 mt-0.5">Required for navigation and session security.</div>
                </div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Required
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Analytics & Performance</div>
                  <div className="text-slate-400 mt-0.5">Helps measure anonymous visitor flow and speed.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Marketing & Personalization</div>
                  <div className="text-slate-400 mt-0.5">Customizes relevant solutions and advertising.</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setPreferencesModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
