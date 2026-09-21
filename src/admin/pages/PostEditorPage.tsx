import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { RichTextEditor } from '../components/RichTextEditor';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import { PostPreviewModal } from './PostPreviewModal';
import {
  Save,
  Send,
  Clock,
  Eye,
  ArrowLeft,
  Image as ImageIcon,
  Check,
  Calendar,
  Layers,
  Search,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Tag as TagIcon,
  X,
  ExternalLink,
} from 'lucide-react';

interface PostEditorPageProps {
  postId?: string; // If undefined, this is a new post
  onNavigate: (route: string) => void;
}

export const PostEditorPage: React.FC<PostEditorPageProps> = ({ postId, onNavigate }) => {
  const { token } = useAdminAuth();
  const { success, error, info } = useToast();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [manualSlugEdit, setManualSlugEdit] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled' | 'archived'>('draft');
  const [scheduledAt, setScheduledAt] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [readingTime, setReadingTime] = useState('');

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);

  // Tags
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Dropdown data
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);

  // Modals
  const [isFeaturedMediaModalOpen, setIsFeaturedMediaModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Auto-slug generator
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!manualSlugEdit && !postId) {
      setSlug(generateSlug(val));
    }
  };

  // Load categories, authors, and existing post if editing
  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [catRes, authRes] = await Promise.all([
          fetch('/api/categories/admin', { headers }),
          fetch('/api/authors', { headers }),
        ]);

        if (catRes.ok) {
          const cData = await catRes.json();
          setCategories(cData.categories || []);
          if (!categoryId && cData.categories?.[0]) {
            setCategoryId(cData.categories[0].id);
          }
        }

        if (authRes.ok) {
          const aData = await authRes.json();
          setAuthors(aData.authors || []);
          if (!authorId && aData.authors?.[0]) {
            setAuthorId(aData.authors[0].id);
          }
        }

        // If editing existing post
        if (postId) {
          const postRes = await fetch(`/api/posts/admin/${postId}`, { headers });
          if (postRes.ok) {
            const data = await postRes.json();
            const p = data.post;
            setTitle(p.title || '');
            setSlug(p.slug || '');
            setManualSlugEdit(true);
            setExcerpt(p.excerpt || '');
            setContent(p.content || '');
            setFeaturedImage(p.featuredImage || '');
            setFeaturedImageAlt(p.featuredImageAlt || '');
            setCategoryId(p.categoryId || '');
            setAuthorId(p.authorId || '');
            setStatus(p.status || 'draft');
            setScheduledAt(p.scheduledAt ? p.scheduledAt.substring(0, 16) : '');
            setIsFeatured(Boolean(p.isFeatured));
            setReadingTime(p.readingTime || '');
            setSeoTitle(p.seoTitle || '');
            setSeoDescription(p.seoDescription || '');
            setFocusKeyword(p.focusKeyword || '');
            setCanonicalUrl(p.canonicalUrl || '');
            setOgTitle(p.ogTitle || '');
            setOgDescription(p.ogDescription || '');
            setOgImage(p.ogImage || '');
            setRobotsIndex(p.robotsIndex !== undefined ? Boolean(p.robotsIndex) : true);
            setRobotsFollow(p.robotsFollow !== undefined ? Boolean(p.robotsFollow) : true);
            setTags(p.tags || []);
          } else {
            error('Failed to load post.');
          }
        }
      } catch {
        error('Error initializing post editor.');
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [postId, token]);

  // Handle adding a tag
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Save post
  const handleSave = async (targetStatus?: 'draft' | 'published' | 'scheduled' | 'archived') => {
    if (!title.trim()) {
      error('Post title is required.');
      return;
    }

    const postStatus = targetStatus || status;

    if (postStatus === 'scheduled' && !scheduledAt) {
      error('Please select a schedule date and time.');
      return;
    }

    setSaving(true);
    setAutosaveStatus('saving');

    const payload = {
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content,
      featuredImage,
      featuredImageAlt,
      categoryId,
      authorId,
      status: postStatus,
      scheduledAt: postStatus === 'scheduled' ? new Date(scheduledAt).toISOString() : null,
      isFeatured,
      readingTime,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      focusKeyword,
      canonicalUrl,
      ogTitle: ogTitle || title,
      ogDescription: ogDescription || excerpt,
      ogImage: ogImage || featuredImage,
      robotsIndex,
      robotsFollow,
      tags,
    };

    try {
      const url = postId ? `/api/posts/admin/${postId}` : '/api/posts/admin';
      const method = postId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setAutosaveStatus('saved');
        success(data.message || 'Post saved successfully!');
        if (!postId && data.id) {
          // If created new post, redirect to edit URL
          onNavigate(`/admin/posts/edit/${data.id}`);
        }
      } else {
        setAutosaveStatus('idle');
        error(data.error || 'Failed to save post.');
      }
    } catch {
      setAutosaveStatus('idle');
      error('Network error saving post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span className="text-xs font-mono">Loading post editor...</span>
      </div>
    );
  }

  // Active Category Name & Author Name for preview
  const activeCat = categories.find((c) => c.id === categoryId);
  const activeAuth = authors.find((a) => a.id === authorId);

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/posts')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {postId ? 'Edit Blog Article' : 'Create New Article'}
              </h2>
              {autosaveStatus === 'saving' && (
                <span className="text-[10px] font-mono text-cyan-400 animate-pulse">Saving...</span>
              )}
              {autosaveStatus === 'saved' && (
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Saved
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono">
              URL: /blog/{slug || 'post-slug'}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preview Layout</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          {status === 'scheduled' ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('scheduled')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-950/50 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Update Schedule</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('published')}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{postId ? 'Update & Publish' : 'Publish Now'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Grid: Main editor on Left (8 cols), Meta/Publishing/SEO on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Editor Section */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Article Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Enterprise SEO: Core Web Vitals and Semantic Architecture"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 text-lg font-bold rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-400 font-mono">
                URL Slug
              </label>
              <button
                type="button"
                onClick={() => setManualSlugEdit(!manualSlugEdit)}
                className="text-[11px] text-cyan-400 hover:underline cursor-pointer font-mono"
              >
                {manualSlugEdit ? 'Reset to Auto-Slug' : 'Edit Slug Manually'}
              </button>
            </div>
            <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs font-mono text-slate-400 focus-within:border-cyan-400">
              <span className="text-slate-600 select-none">/blog/</span>
              <input
                type="text"
                disabled={!manualSlugEdit}
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="w-full bg-transparent text-white focus:outline-none disabled:text-slate-400"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Excerpt / Briefing Summary
            </label>
            <textarea
              rows={3}
              placeholder="A concise 2-3 sentence overview of this intelligence report for search snippets and preview cards..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-3 text-xs leading-relaxed rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Featured Image */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Featured Cover Image
              </label>
              <button
                type="button"
                onClick={() => setIsFeaturedMediaModalOpen(true)}
                className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Select from Media Library</span>
              </button>
            </div>

            {featuredImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 group aspect-video bg-slate-950 max-h-64">
                <img
                  src={featuredImage}
                  alt={featuredImageAlt || title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFeaturedMediaModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-500 cursor-pointer"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFeaturedImage('');
                      setFeaturedImageAlt('');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsFeaturedMediaModalOpen(true)}
                className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-colors"
              >
                <ImageIcon className="w-8 h-8 text-slate-600 mb-2" />
                <span className="text-xs font-semibold text-slate-300">Click to choose or upload featured image</span>
                <span className="text-[11px] text-slate-500 mt-1">Recommended: 1200x630 WebP or JPG</span>
              </div>
            )}

            {featuredImage && (
              <div className="mt-2.5">
                <input
                  type="text"
                  placeholder="Image Alt Text for SEO & Accessibility..."
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>

          {/* Rich Content Editor */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Article Content *
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {/* SEO Metadata Card */}
          <div className="p-6 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Search Engine Optimization (SEO)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                Google SERP Ready
              </span>
            </div>

            {/* Focus Keyword */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Focus Keyword / Search Query
              </label>
              <input
                type="text"
                placeholder="e.g. enterprise headless ecommerce"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* SEO Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  SEO Title Tag
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    (seoTitle || title).length >= 50 && (seoTitle || title).length <= 65
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  {(seoTitle || title).length} / 60 chars (Recommended: 50-60)
                </span>
              </div>
              <input
                type="text"
                placeholder={title || 'Custom meta title'}
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Meta Description
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    (seoDescription || excerpt).length >= 140 && (seoDescription || excerpt).length <= 165
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  {(seoDescription || excerpt).length} / 160 chars (Recommended: 150-160)
                </span>
              </div>
              <textarea
                rows={3}
                placeholder={excerpt || 'Compelling search description snippet...'}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 leading-relaxed"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Canonical URL (Optional)
              </label>
              <input
                type="url"
                placeholder={`https://infosbrain.com/blog/${slug || 'article'}`}
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            {/* Robots Directives */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={robotsIndex}
                  onChange={(e) => setRobotsIndex(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Allow search indexing (Index)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={robotsFollow}
                  onChange={(e) => setRobotsFollow(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Follow links (Follow)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Publishing & Taxonomies (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publication Status Card */}
          <div className="p-5 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Publishing Settings
            </h3>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Article Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Live to Public)</option>
                <option value="scheduled">Scheduled (Auto-Publish at Date)</option>
                <option value="archived">Archived (Hidden from Listings)</option>
              </select>
            </div>

            {/* Scheduled Date Picker if status is scheduled */}
            {status === 'scheduled' && (
              <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/30 space-y-2 animate-in fade-in">
                <label className="block text-xs font-semibold text-violet-300">
                  Publication Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-violet-400"
                />
                <p className="text-[11px] text-slate-400 leading-snug">
                  The article will automatically become public once this timestamp is reached via our server-side cron publisher.
                </p>
              </div>
            )}

            {/* Featured Post Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-white">Feature on Homepage</div>
                  <div className="text-[11px] text-slate-400">Showcase in the Insights teaser section</div>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Reading Time override */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estimated Reading Time
              </label>
              <input
                type="text"
                placeholder="Auto-calculated (e.g. 6 min read)"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="p-5 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Category
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('/admin/categories')}
                className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
              >
                + Add Category
              </button>
            </div>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Author Selector */}
          <div className="p-5 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Author
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('/admin/authors')}
                className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
              >
                + Add Author
              </button>
            </div>

            <select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {authors.map((auth) => (
                <option key={auth.id} value={auth.id}>
                  {auth.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Manager */}
          <div className="p-5 rounded-2xl bg-[#090E1F] border border-slate-800/90 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Tags
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Media Modal */}
      <MediaSelectorModal
        isOpen={isFeaturedMediaModalOpen}
        onClose={() => setIsFeaturedMediaModalOpen(false)}
        onSelect={(url, item) => {
          setFeaturedImage(url);
          if (item && !featuredImageAlt) {
            setFeaturedImageAlt(item.originalName);
          }
        }}
        title="Select Featured Article Image"
      />

      {/* Preview Modal */}
      <PostPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        post={{
          title: title || 'Preview Title',
          slug,
          excerpt,
          content,
          featuredImage,
          featuredImageAlt,
          categoryName: activeCat?.name || 'Technology',
          authorName: activeAuth?.name || 'InfosBrain Team',
          readingTime: readingTime || '5 min read',
          tags,
          publishedAt: status === 'published' ? new Date().toISOString() : undefined,
        }}
      />
    </div>
  );
};
