import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import {
  FolderKanban,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  X,
  Plus,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Search,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ResultMetric {
  metric: string;
  label: string;
  description?: string;
}

interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration?: string;
  shortDescription: string;
  fullDescription?: string;
  featuredImage?: string;
  challenge?: string;
  solution?: string;
  results: ResultMetric[];
  technologies: string[];
  services: string[];
  featured: boolean;
  displayOrder: number;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export const CaseStudiesAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [cases, setCases] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudyItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [client, setClient] = useState('');
  const [industry, setIndustry] = useState('');
  const [duration, setDuration] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState<ResultMetric[]>([{ metric: '', label: '', description: '' }]);
  const [technologies, setTechnologies] = useState<string[]>(['']);
  const [servicesList, setServicesList] = useState<string[]>(['']);
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [submitting, setSubmitting] = useState(false);

  // Media selector modal
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string; title?: string }>({
    isOpen: false,
  });

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/case-studies/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setCases(data.caseStudies || []);
      } else {
        error('Failed to load case studies.');
      }
    } catch {
      error('Network error loading case studies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const openCreateModal = () => {
    setEditingCase(null);
    setTitle('');
    setSlug('');
    setClient('');
    setIndustry('');
    setDuration('3 Months');
    setShortDescription('');
    setFullDescription('');
    setFeaturedImage('');
    setChallenge('');
    setSolution('');
    setResults([{ metric: '+150%', label: 'Conversion Uplift', description: 'Immediate ROI post launch' }]);
    setTechnologies(['React', 'TypeScript', 'Node.js']);
    setServicesList(['Web Development']);
    setFeatured(false);
    setDisplayOrder(cases.length + 1);
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (item: CaseStudyItem) => {
    setEditingCase(item);
    setTitle(item.title || '');
    setSlug(item.slug || '');
    setClient(item.client || '');
    setIndustry(item.industry || '');
    setDuration(item.duration || '');
    setShortDescription(item.shortDescription || '');
    setFullDescription(item.fullDescription || '');
    setFeaturedImage(item.featuredImage || '');
    setChallenge(item.challenge || '');
    setSolution(item.solution || '');
    setResults(item.results && item.results.length > 0 ? item.results : [{ metric: '', label: '', description: '' }]);
    setTechnologies(item.technologies && item.technologies.length > 0 ? item.technologies : ['']);
    setServicesList(item.services && item.services.length > 0 ? item.services : ['']);
    setFeatured(Boolean(item.featured));
    setDisplayOrder(item.displayOrder || 0);
    setStatus(item.status || 'published');
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingCase) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) {
      error('Title and Client name are required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      client: client.trim(),
      industry: industry.trim(),
      duration: duration.trim() || undefined,
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim() || undefined,
      featuredImage: featuredImage.trim() || undefined,
      challenge: challenge.trim() || undefined,
      solution: solution.trim() || undefined,
      results: results.filter((r) => r.metric.trim() && r.label.trim()),
      technologies: technologies.map((t) => t.trim()).filter(Boolean),
      services: servicesList.map((s) => s.trim()).filter(Boolean),
      featured,
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingCase ? `/api/cms/case-studies/admin/${editingCase.id}` : '/api/cms/case-studies/admin';
      const method = editingCase ? 'PUT' : 'POST';

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
        success(editingCase ? 'Case study updated!' : 'Case study created!');
        setModalOpen(false);
        fetchCases();
      } else {
        error(data.error || 'Failed to save case study.');
      }
    } catch {
      error('Network error saving case study.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (item: CaseStudyItem) => {
    const newStatus = item.status === 'published' ? 'hidden' : 'published';
    try {
      const res = await fetch(`/api/cms/case-studies/admin/${item.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success(`Status set to ${newStatus}`);
        setCases((prev) => prev.map((c) => (c.id === item.id ? { ...c, status: newStatus as any } : c)));
      } else {
        error('Failed to change status.');
      }
    } catch {
      error('Network error changing status.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalState.id) return;
    try {
      const res = await fetch(`/api/cms/case-studies/admin/${deleteModalState.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Case study deleted.');
        setCases((prev) => prev.filter((c) => c.id !== deleteModalState.id));
        setDeleteModalState({ isOpen: false });
      } else {
        const data = await res.json();
        error(data.error || 'Failed to delete case study.');
      }
    } catch {
      error('Network error deleting case study.');
    }
  };

  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-cyan-400" />
            Case Studies Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showcase enterprise transformation stories, client metrics, solutions, and technologies.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-200"
        >
          <PlusCircle className="w-4 h-4" />
          Add Case Study
        </button>
      </div>

      {/* Search */}
      <div className="bg-[#0A1022] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, client, or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E172E] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">Total Stories: {cases.length}</span>
      </div>

      {/* Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading case studies...</span>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-[#0A1022] border border-slate-800 rounded-xl">
            <FolderKanban className="w-12 h-12 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No case studies found</p>
          </div>
        ) : (
          filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-[#0A1022] border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-lg flex flex-col transition-all group"
            >
              {/* Image banner */}
              <div className="h-40 relative bg-slate-900 overflow-hidden">
                {item.featuredImage ? (
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <FolderKanban className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {item.industry || 'Tech'}
                  </span>
                  {item.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/80 backdrop-blur-md text-white flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <button
                    onClick={() => toggleStatus(item)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold backdrop-blur-md transition-colors ${
                      item.status === 'published'
                        ? 'bg-emerald-500/80 text-white'
                        : 'bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    {item.status === 'published' ? 'Published' : 'Hidden'}
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">{item.client}</div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors mt-0.5 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Metrics Highlight */}
                {item.results && item.results.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-cyan-400">{item.results[0].metric}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{item.results[0].label}</div>
                    </div>
                    {item.results[1] && (
                      <div className="text-right">
                        <div className="text-base font-extrabold text-emerald-400">{item.results[1].metric}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{item.results[1].label}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">Order: {item.displayOrder}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModalState({
                          isOpen: true,
                          id: item.id,
                          title: item.title,
                        })
                      }
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A1022] border border-slate-750 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E172E]/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-cyan-400" />
                {editingCase ? 'Edit Case Study' : 'Add New Case Study'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Title <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Scaling Global FinTech Infrastructure"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Slug <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. global-fintech-infrastructure"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. PayMax International"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Financial Services"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 Months"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Featured Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="/assets/images/case-studies/fintech.jpg"
                    className="flex-1 bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500"
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

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Overview summarized in cards and teasers..."
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Challenge</label>
                  <textarea
                    rows={3}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="What bottleneck or limitation was the client facing?"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Solution</label>
                  <textarea
                    rows={3}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="How InfosBrain engineered and delivered the solution..."
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Repeatable Results / Metrics */}
              <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Metrics & Measurable Results</h3>
                    <p className="text-[11px] text-slate-400">Add quantitative impact numbers (e.g. +240%, 3.5x).</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setResults([...results, { metric: '', label: '', description: '' }])}
                    className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Metric
                  </button>
                </div>

                <div className="space-y-2">
                  {results.map((r, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={r.metric}
                        onChange={(e) => {
                          const newR = [...results];
                          newR[idx].metric = e.target.value;
                          setResults(newR);
                        }}
                        placeholder="e.g. +300%"
                        className="w-24 bg-[#0E172E] border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-bold text-center focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="text"
                        value={r.label}
                        onChange={(e) => {
                          const newR = [...results];
                          newR[idx].label = e.target.value;
                          setResults(newR);
                        }}
                        placeholder="Metric Label (e.g. Faster Page Loads)"
                        className="flex-1 bg-[#0E172E] border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setResults(results.filter((_, i) => i !== idx))}
                        className="p-1.5 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Technologies Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={technologies.join(', ')}
                    onChange={(e) => setTechnologies(e.target.value.split(',').map((s) => s.trim()))}
                    placeholder="React, Next.js, Node.js, AWS"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Services Provided (comma separated)
                  </label>
                  <input
                    type="text"
                    value={servicesList.join(', ')}
                    onChange={(e) => setServicesList(e.target.value.split(',').map((s) => s.trim()))}
                    placeholder="Web Development, Cloud Architecture"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featuredCase"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-4 w-4"
                  />
                  <label htmlFor="featuredCase" className="text-xs text-slate-300 font-medium">
                    Feature on Home Teaser
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
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
                  {editingCase ? 'Update Case Study' : 'Create Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Case Study"
        message={`Are you sure you want to delete "${deleteModalState.title}"?`}
        confirmText="Yes, Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />

      {/* Media Selector */}
      <MediaSelectorModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          setFeaturedImage(url);
          setMediaModalOpen(false);
        }}
      />
    </div>
  );
};
