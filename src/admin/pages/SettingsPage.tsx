import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import {
  Settings,
  Globe,
  Sparkles,
  Share2,
  Mail,
  Check,
  Save,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [emailConfig, setEmailConfig] = useState<any>({});

  const [settings, setSettings] = useState<Record<string, string>>({
    brand_name: 'InfosBrain',
    tagline: 'Transforming Ideas into Intelligent Digital Solutions',
    contact_email: 'info@infosbrain.com',
    secondary_email: 'contact@infosbrain.com',
    seo_title: 'InfosBrain | Transforming Ideas into Intelligent Digital Solutions',
    seo_description: 'InfosBrain is a technology-driven company delivering software development, artificial intelligence, cloud technologies, cybersecurity, and digital transformation consulting.',
    seo_og_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    social_facebook: '',
    social_instagram: '',
    social_linkedin: 'https://www.linkedin.com/company/infosbrain',
    social_x: '',
    social_youtube: '',
    social_tiktok: '',
  });

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch('/api/settings/admin', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          setSettings((prev) => ({ ...prev, ...data.settings }));
          setEmailConfig(data.emailConfig || {});
        } else {
          error('Failed to load settings.');
        }
      } catch {
        error('Network error loading settings.');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [token]);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();
      if (res.ok) {
        success('Site settings saved successfully!');
      } else {
        error(data.error || 'Failed to update settings.');
      }
    } catch {
      error('Network error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span className="text-xs font-mono">Loading settings...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Website & System Settings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure global brand identity, default SEO metadata, social profiles, and email delivery.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* General Settings */}
      <div className="p-6 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white uppercase tracking-wider">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>General Brand Configuration</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              value={settings.brand_name || ''}
              onChange={(e) => handleChange('brand_name', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Brand Tagline
            </label>
            <input
              type="text"
              value={settings.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Primary Contact Email
            </label>
            <input
              type="email"
              value={settings.contact_email || ''}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Secondary / Inquiries Email
            </label>
            <input
              type="email"
              value={settings.secondary_email || ''}
              onChange={(e) => handleChange('secondary_email', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Global SEO Defaults */}
      <div className="p-6 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Default Global SEO Metadata</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Default Global SEO Title
            </label>
            <input
              type="text"
              value={settings.seo_title || ''}
              onChange={(e) => handleChange('seo_title', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={settings.seo_description || ''}
              onChange={(e) => handleChange('seo_description', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Default Open Graph Share Image URL
            </label>
            <input
              type="url"
              value={settings.seo_og_image || ''}
              onChange={(e) => handleChange('seo_og_image', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Social URLs */}
      <div className="p-6 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span>Verified Social Media Channels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              LinkedIn Page URL
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/company/infosbrain"
              value={settings.social_linkedin || ''}
              onChange={(e) => handleChange('social_linkedin', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              X (Twitter) URL
            </label>
            <input
              type="url"
              placeholder="https://x.com/infosbrain"
              value={settings.social_x || ''}
              onChange={(e) => handleChange('social_x', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Facebook Page URL
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/..."
              value={settings.social_facebook || ''}
              onChange={(e) => handleChange('social_facebook', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Instagram Profile URL
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/..."
              value={settings.social_instagram || ''}
              onChange={(e) => handleChange('social_instagram', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              YouTube Channel URL
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/@..."
              value={settings.social_youtube || ''}
              onChange={(e) => handleChange('social_youtube', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              TikTok Profile URL
            </label>
            <input
              type="url"
              placeholder="https://tiktok.com/@..."
              value={settings.social_tiktok || ''}
              onChange={(e) => handleChange('social_tiktok', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Transactional Email System Status */}
      <div className="p-6 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-3">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-sm font-bold text-white uppercase tracking-wider">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>Transactional Email Delivery (SMTP)</span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div>
            <div className="font-semibold text-white">SMTP Mail Delivery Service</div>
            <div className="text-slate-400 text-[11px] mt-0.5">
              Host: {emailConfig.host} • Port: {emailConfig.port} • User: {emailConfig.user}
            </div>
          </div>
          <div>
            {emailConfig.configured ? (
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Connected
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 text-[11px] font-mono">
                Graceful Fallback Mode (Configured via .env)
              </span>
            )}
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Configure <code className="text-cyan-400">SMTP_HOST</code>, <code className="text-cyan-400">SMTP_USER</code>, and <code className="text-cyan-400">SMTP_PASSWORD</code> in your <code className="text-cyan-400">.env</code> to send automated dispatch emails whenever client inquiries are received.
        </p>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>
    </form>
  );
};
