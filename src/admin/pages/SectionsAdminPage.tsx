import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import {
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff,
  Edit2,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Sparkles,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';

import {
  safeApiFetch,
  loadOfflineCache,
  saveOfflineCache,
  FALLBACK_SECTIONS,
  AdminSectionItem,
} from '../utils/adminFallbackData';

type SectionItem = AdminSectionItem;


export const SectionsAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [sections, setSections] = useState<AdminSectionItem[]>(() =>
    loadOfflineCache('infosbrain_cms_sections', FALLBACK_SECTIONS)
  );
  const [loading, setLoading] = useState(false);
  const [activePageTab, setActivePageTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<AdminSectionItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('');
  const [highlightText, setHighlightText] = useState('');
  const [description, setDescription] = useState('');
  const [primaryCtaText, setPrimaryCtaText] = useState('');
  const [primaryCtaUrl, setPrimaryCtaUrl] = useState('');
  const [secondaryCtaText, setSecondaryCtaText] = useState('');
  const [secondaryCtaUrl, setSecondaryCtaUrl] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<'visible' | 'hidden'>('visible');
  const [submitting, setSubmitting] = useState(false);

  // Media selector
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await safeApiFetch('/api/cms/sections/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.isOffline && res.ok && Array.isArray(res.data?.sections) && res.data.sections.length > 0) {
        setSections(res.data.sections);
        saveOfflineCache('infosbrain_cms_sections', res.data.sections);
      } else {
        // Safe offline / static hosting fallback
        const cached = loadOfflineCache('infosbrain_cms_sections', FALLBACK_SECTIONS);
        setSections(cached);
      }
    } catch {
      const cached = loadOfflineCache('infosbrain_cms_sections', FALLBACK_SECTIONS);
      setSections(cached);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const toggleVisibility = async (sec: AdminSectionItem) => {
    const newStatus: 'visible' | 'hidden' = sec.status === 'visible' ? 'hidden' : 'visible';
    const updated = sections.map((s) => (s.sectionKey === sec.sectionKey ? { ...s, status: newStatus } : s));
    
    // Optimistic UI update & local persistence
    setSections(updated);
    saveOfflineCache('infosbrain_cms_sections', updated);
    window.dispatchEvent(new Event('infosbrain_cms_updated'));

    try {
      const res = await safeApiFetch(`/api/cms/sections/admin/${sec.sectionKey}/visibility`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.isOffline && !res.ok) {
        error('Server rejected visibility change.');
      }
    } catch {
      // offline mode
    }

    success(`Section "${sec.title || sec.sectionKey}" is now ${newStatus}.`);
  };

  const openEditModal = (sec: AdminSectionItem) => {
    setEditingSection(sec);
    setTitle(sec.title || '');
    setSubtitle(sec.subtitle || '');
    setBadge(sec.badge || '');
    setHighlightText(sec.highlightText || '');
    setDescription(sec.description || '');
    setPrimaryCtaText(sec.primaryCtaText || '');
    setPrimaryCtaUrl(sec.primaryCtaUrl || '');
    setSecondaryCtaText(sec.secondaryCtaText || '');
    setSecondaryCtaUrl(sec.secondaryCtaUrl || '');
    setImage(sec.image || '');
    setStatus(sec.status || 'visible');
    setEditModalOpen(true);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    setSubmitting(true);
    const payload = {
      title: title.trim() || undefined,
      subtitle: subtitle.trim() || undefined,
      badge: badge.trim() || undefined,
      highlightText: highlightText.trim() || undefined,
      description: description.trim() || undefined,
      primaryCtaText: primaryCtaText.trim() || undefined,
      primaryCtaUrl: primaryCtaUrl.trim() || undefined,
      secondaryCtaText: secondaryCtaText.trim() || undefined,
      secondaryCtaUrl: secondaryCtaUrl.trim() || undefined,
      image: image.trim() || undefined,
      status,
    };

    const updated = sections.map((s) => {
      if (s.sectionKey === editingSection.sectionKey) {
        return {
          ...s,
          ...payload,
          updatedAt: new Date().toISOString(),
        };
      }
      return s;
    });

    setSections(updated);
    saveOfflineCache('infosbrain_cms_sections', updated);
    window.dispatchEvent(new Event('infosbrain_cms_updated'));

    try {
      await safeApiFetch(`/api/cms/sections/admin/${editingSection.sectionKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // offline mode
    } finally {
      setSubmitting(false);
      setEditModalOpen(false);
      success('Section content updated successfully!');
    }
  };

  const pageGroups = Array.from(new Set(sections.map((s) => s.page || 'home')));

  const filtered = sections.filter((s) => {
    const matchesPage = s.page === activePageTab;
    const matchesQuery =
      (s.title && s.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.sectionKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPage && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-cyan-400" />
            Website Sections & Visibility Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Toggle visibility and edit titles, badges, CTAs, and images for all website sections and banners.
          </p>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        {pageGroups.map((pg) => {
          const count = sections.filter((s) => s.page === pg).length;
          const visibleCount = sections.filter((s) => s.page === pg && s.status === 'visible').length;
          return (
            <button
              key={pg}
              onClick={() => setActivePageTab(pg)}
              className={`py-2 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                activePageTab === pg
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white bg-[#0A1022] border border-slate-800'
              }`}
            >
              <span>{pg} Page</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700">
                {visibleCount}/{count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Filter */}
      <div className="bg-[#0A1022] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sections by name or key..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E172E] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Showing {filtered.length} of {sections.length} total sections
        </span>
      </div>

      {/* Sections Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading section configurations...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-[#0A1022] border border-slate-800 rounded-xl">
            <Layers className="w-12 h-12 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No sections found for this filter</p>
          </div>
        ) : (
          filtered.map((sec) => {
            const isVis = sec.status === 'visible';
            return (
              <div
                key={sec.sectionKey}
                className={`bg-[#0A1022] border rounded-xl p-5 transition-all shadow-md flex flex-col justify-between ${
                  isVis
                    ? 'border-slate-800 hover:border-slate-700'
                    : 'border-red-950/40 bg-red-950/5 opacity-70'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {sec.sectionKey}
                      </span>
                      {sec.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                          {sec.badge}
                        </span>
                      )}
                    </div>

                    {/* Quick Visibility Switch */}
                    <button
                      onClick={() => toggleVisibility(sec)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        isVis
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20'
                      }`}
                      title="Click to toggle Show / Hide on public website"
                    >
                      {isVis ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-emerald-400" />
                          Visible
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4 text-red-400" />
                          Hidden
                        </>
                      )}
                    </button>
                  </div>

                  {/* Section Title & Subtitle */}
                  <h3 className="text-base font-bold text-white mt-1">
                    {sec.title || sec.sectionKey.replace(/_/g, ' ').toUpperCase()}
                  </h3>
                  {sec.highlightText && (
                    <span className="text-xs text-cyan-400 font-semibold inline-block mt-0.5">
                      Highlight: "{sec.highlightText}"
                    </span>
                  )}
                  {sec.description && (
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {sec.description}
                    </p>
                  )}

                  {/* CTA info if present */}
                  {(sec.primaryCtaText || sec.secondaryCtaText) && (
                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-800/60 text-[11px] text-slate-400">
                      {sec.primaryCtaText && (
                        <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono text-cyan-300">
                          CTA: {sec.primaryCtaText} ({sec.primaryCtaUrl || '#'})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Bar: Edit Button */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Updated: {new Date(sec.updatedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => openEditModal(sec)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                    Edit Content
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* EDIT CONTENT MODAL */}
      {editModalOpen && editingSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A1022] border border-slate-750 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E172E]/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Edit Section: {editingSection.sectionKey}
              </h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Badge / Eyebrow Text</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. ENTERPRISE ENGINEERING"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Section Visibility</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="visible">Visible (Rendered on Frontend)</option>
                    <option value="hidden">Hidden (Completely suppressed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Main Heading / Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next-Generation AI & Enterprise Platforms"
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Highlighted Headline Phrase (Color Accent)
                </label>
                <input
                  type="text"
                  value={highlightText}
                  onChange={(e) => setHighlightText(e.target.value)}
                  placeholder="e.g. Engineered For Global Scale"
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description / Subtitle</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Compelling text explaining the value proposition..."
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Button Text</label>
                  <input
                    type="text"
                    value={primaryCtaText}
                    onChange={(e) => setPrimaryCtaText(e.target.value)}
                    placeholder="e.g. Explore Capabilities"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Button URL</label>
                  <input
                    type="text"
                    value={primaryCtaUrl}
                    onChange={(e) => setPrimaryCtaUrl(e.target.value)}
                    placeholder="e.g. /services or /contact"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Secondary Button Text</label>
                  <input
                    type="text"
                    value={secondaryCtaText}
                    onChange={(e) => setSecondaryCtaText(e.target.value)}
                    placeholder="e.g. View Case Studies"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Secondary Button URL</label>
                  <input
                    type="text"
                    value={secondaryCtaUrl}
                    onChange={(e) => setSecondaryCtaUrl(e.target.value)}
                    placeholder="e.g. /case-studies"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Banner / Supporting Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/assets/images/banner.jpg"
                    className="flex-1 bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaModalOpen(true)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    Browse
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5"
                >
                  {submitting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaSelectorModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          setImage(url);
          setMediaModalOpen(false);
        }}
      />
    </div>
  );
};
