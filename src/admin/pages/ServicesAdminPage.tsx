import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import {
  Briefcase,
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
  Layers,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';

import { safeApiFetch, loadOfflineCache, saveOfflineCache } from '../utils/adminFallbackData';
import { siteConfig } from '../../config/siteConfig';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ServiceFaq {
  question: string;
  answer: string;
}

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  iconName: string;
  featured: boolean;
  imageUrl?: string;
  shortDescription: string;
  heroSubtitle?: string;
  description?: string;
  features: string[];
  benefits: string[];
  deliverables: string[];
  technologies: string[];
  process: ProcessStep[];
  faqs: ServiceFaq[];
  ctaText?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  displayOrder: number;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export const ServicesAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [services, setServices] = useState<ServiceItem[]>(() =>
    loadOfflineCache('infosbrain_cms_services', (siteConfig.services as any) || [])
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Development');
  const [iconName, setIconName] = useState('Code2');
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [process, setProcess] = useState<ProcessStep[]>([]);
  const [faqs, setFaqs] = useState<ServiceFaq[]>([]);
  const [ctaText, setCtaText] = useState('Start Your Project');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [submitting, setSubmitting] = useState(false);

  // Active Tab in Form Modal
  const [activeTab, setActiveTab] = useState<'general' | 'lists' | 'process' | 'seo'>('general');

  // Media selector modal
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string; title?: string }>({
    isOpen: false,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await safeApiFetch('/api/services/admin/all', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.isOffline && res.ok && Array.isArray(res.data?.services) && res.data.services.length > 0) {
        setServices(res.data.services);
        saveOfflineCache('infosbrain_cms_services', res.data.services);
      } else {
        const cached = loadOfflineCache('infosbrain_cms_services', (siteConfig.services as any) || []);
        setServices(cached);
      }
    } catch {
      const cached = loadOfflineCache('infosbrain_cms_services', (siteConfig.services as any) || []);
      setServices(cached);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle('');
    setSlug('');
    setCategory('Development');
    setIconName('Code2');
    setFeatured(false);
    setImageUrl('');
    setShortDescription('');
    setHeroSubtitle('');
    setDescription('');
    setFeatures(['']);
    setBenefits(['']);
    setDeliverables(['']);
    setTechnologies(['']);
    setProcess([{ step: '01', title: '', description: '' }]);
    setFaqs([{ question: '', answer: '' }]);
    setCtaText('Start Your Project');
    setMetaTitle('');
    setMetaDescription('');
    setFocusKeyword('');
    setDisplayOrder(services.length + 1);
    setStatus('published');
    setActiveTab('general');
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setTitle(service.title || '');
    setSlug(service.slug || '');
    setCategory(service.category || 'Development');
    setIconName(service.iconName || 'Code2');
    setFeatured(Boolean(service.featured));
    setImageUrl(service.imageUrl || '');
    setShortDescription(service.shortDescription || '');
    setHeroSubtitle(service.heroSubtitle || '');
    setDescription(service.description || '');
    setFeatures(service.features && service.features.length > 0 ? service.features : ['']);
    setBenefits(service.benefits && service.benefits.length > 0 ? service.benefits : ['']);
    setDeliverables(service.deliverables && service.deliverables.length > 0 ? service.deliverables : ['']);
    setTechnologies(service.technologies && service.technologies.length > 0 ? service.technologies : ['']);
    setProcess(service.process && service.process.length > 0 ? service.process : [{ step: '01', title: '', description: '' }]);
    setFaqs(service.faqs && service.faqs.length > 0 ? service.faqs : [{ question: '', answer: '' }]);
    setCtaText(service.ctaText || 'Start Your Project');
    setMetaTitle(service.metaTitle || '');
    setMetaDescription(service.metaDescription || '');
    setFocusKeyword(service.focusKeyword || '');
    setDisplayOrder(service.displayOrder || 0);
    setStatus(service.status || 'published');
    setActiveTab('general');
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingService) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      error('Service title is required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category,
      iconName,
      featured,
      imageUrl: imageUrl.trim() || undefined,
      shortDescription: shortDescription.trim(),
      heroSubtitle: heroSubtitle.trim() || undefined,
      description: description.trim() || undefined,
      features: features.map((f) => f.trim()).filter(Boolean),
      benefits: benefits.map((b) => b.trim()).filter(Boolean),
      deliverables: deliverables.map((d) => d.trim()).filter(Boolean),
      technologies: technologies.map((t) => t.trim()).filter(Boolean),
      process: process.filter((p) => p.title.trim()),
      faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
      ctaText: ctaText.trim() || 'Start Your Project',
      metaTitle: metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
      focusKeyword: focusKeyword.trim() || undefined,
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingService ? `/api/services/admin/${editingService.id}` : '/api/services/admin';
      const method = editingService ? 'PUT' : 'POST';

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
        success(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        setModalOpen(false);
        fetchServices();
      } else {
        error(data.error || 'Failed to save service.');
      }
    } catch {
      error('Network error saving service.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (service: ServiceItem) => {
    const newStatus = service.status === 'published' ? 'hidden' : 'published';
    try {
      const res = await fetch(`/api/services/admin/${service.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success(`Service set to ${newStatus}`);
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, status: newStatus as any } : s))
        );
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
      const res = await fetch(`/api/services/admin/${deleteModalState.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Service deleted.');
        setServices((prev) => prev.filter((s) => s.id !== deleteModalState.id));
        setDeleteModalState({ isOpen: false });
      } else {
        const data = await res.json();
        error(data.error || 'Failed to delete service.');
      }
    } catch {
      error('Network error deleting service.');
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const newServices = [...services];
    const temp = newServices[index];
    newServices[index] = newServices[targetIndex];
    newServices[targetIndex] = temp;

    // Update display orders
    const orderUpdates = newServices.map((s, idx) => ({ id: s.id, displayOrder: idx + 1 }));
    setServices(newServices);

    try {
      await fetch('/api/services/admin/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ items: orderUpdates }),
      });
      success('Display order updated.');
    } catch {
      error('Failed to persist reordering.');
      fetchServices();
    }
  };

  const categories = Array.from(new Set(services.map((s) => s.category || 'General')));

  const filteredServices = services.filter((s) => {
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.shortDescription && s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            Services Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public services, features, repeatable processes, benefits, SEO, and visibility.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Service
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#0A1022] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service title, slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E172E] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 shrink-0 font-medium">Category:</span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filterCategory === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white bg-slate-800/40'
            }`}
          >
            All ({services.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white bg-slate-800/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-[#0A1022] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading services catalog...</span>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No services found</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or create a new service.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0E172E] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800/80">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Features & Process</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredServices.map((service, index) => (
                  <tr key={service.id} className="hover:bg-slate-850/50 transition-colors">
                    {/* Order buttons */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          disabled={index === 0}
                          onClick={() => moveOrder(index, 'up')}
                          className="p-0.5 text-slate-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-400"
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-[10px] text-slate-500">{service.displayOrder}</span>
                        <button
                          disabled={index === services.length - 1}
                          onClick={() => moveOrder(index, 'down')}
                          className="p-0.5 text-slate-400 hover:text-cyan-400 disabled:opacity-20 disabled:hover:text-slate-400"
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Service Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700/60 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-950 to-blue-950 border border-cyan-800/40 flex items-center justify-center shrink-0 text-cyan-400 font-bold">
                            <Layers className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            {service.title}
                            {service.featured && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                <Sparkles className="w-2.5 h-2.5" /> Featured
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                            <span>/services/{service.slug}</span>
                            <a
                              href={`/services/${service.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline inline-flex items-center"
                            >
                              <ExternalLink className="w-2.5 h-2.5 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {service.category}
                      </span>
                    </td>

                    {/* Stats pills */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                          {service.features?.length || 0} features
                        </span>
                        <span className="px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                          {service.process?.length || 0} steps
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                          {service.benefits?.length || 0} benefits
                        </span>
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleStatus(service)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                          service.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        {service.status === 'published' ? (
                          <>
                            <Eye className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Hidden
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModalState({
                              isOpen: true,
                              id: service.id,
                              title: service.title,
                            })
                          }
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A1022] border border-slate-750 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E172E]/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-[#070B19] px-6 gap-2">
              {[
                { id: 'general', label: 'General & Overview' },
                { id: 'lists', label: 'Features & Benefits' },
                { id: 'process', label: 'Process Steps & FAQs' },
                { id: 'seo', label: 'SEO & Metadata' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveService} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: GENERAL */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Service Title <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Full-Stack Web Development"
                        className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        URL Slug <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g. full-stack-web-development"
                        className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Development, Design, Marketing"
                        className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Icon Name (Lucide)</label>
                      <input
                        type="text"
                        value={iconName}
                        onChange={(e) => setIconName(e.target.value)}
                        placeholder="e.g. Code2, Smartphone, Megaphone"
                        className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
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
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Featured Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="/assets/images/services/web-dev.jpg"
                        className="flex-1 bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setMediaModalOpen(true)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                        Browse Media
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Short Description (Card summary)
                    </label>
                    <textarea
                      rows={2}
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="Brief overview displayed on cards and overview pages..."
                      className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Hero Subtitle</label>
                    <input
                      type="text"
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="Catchy secondary headline for the individual service page..."
                      className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Service Description</label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="In-depth explanation of the service and business value..."
                      className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={ctaText}
                        onChange={(e) => setCtaText(e.target.value)}
                        placeholder="Start Your Project"
                        className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Publication Status</label>
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

                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="featuredToggle"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500 h-4 w-4"
                      />
                      <label htmlFor="featuredToggle" className="text-xs text-slate-300 font-medium">
                        Highlight as Featured Service
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FEATURES & BENEFITS */}
              {activeTab === 'lists' && (
                <div className="space-y-6">
                  {/* Repeatable Features */}
                  <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Features & Capabilities</h3>
                        <p className="text-[11px] text-slate-400">Add core features included in this service.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFeatures([...features, ''])}
                        className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Feature
                      </button>
                    </div>

                    <div className="space-y-2">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-cyan-400 w-5 shrink-0 text-center">{idx + 1}.</span>
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => {
                              const newArr = [...features];
                              newArr[idx] = e.target.value;
                              setFeatures(newArr);
                            }}
                            placeholder="e.g. Next.js 14 App Router Architecture"
                            className="flex-1 bg-[#0E172E] border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                          />
                          <button
                            type="button"
                            onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                            className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Repeatable Benefits */}
                  <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Client Benefits</h3>
                        <p className="text-[11px] text-slate-400">Value and ROI propositions delivered to clients.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBenefits([...benefits, ''])}
                        className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Benefit
                      </button>
                    </div>

                    <div className="space-y-2">
                      {benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-emerald-400 w-5 shrink-0 text-center">{idx + 1}.</span>
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => {
                              const newArr = [...benefits];
                              newArr[idx] = e.target.value;
                              setBenefits(newArr);
                            }}
                            placeholder="e.g. 40% Increase in User Engagement"
                            className="flex-1 bg-[#0E172E] border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            type="button"
                            onClick={() => setBenefits(benefits.filter((_, i) => i !== idx))}
                            className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables & Tech stack */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Deliverables</h3>
                        <button
                          type="button"
                          onClick={() => setDeliverables([...deliverables, ''])}
                          className="px-2 py-0.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newArr = [...deliverables];
                                newArr[idx] = e.target.value;
                                setDeliverables(newArr);
                              }}
                              placeholder="e.g. Production Codebase & CI/CD"
                              className="flex-1 bg-[#0E172E] border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setDeliverables(deliverables.filter((_, i) => i !== idx))}
                              className="p-1 text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Technologies Used</h3>
                        <button
                          type="button"
                          onClick={() => setTechnologies([...technologies, ''])}
                          className="px-2 py-0.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {technologies.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newArr = [...technologies];
                                newArr[idx] = e.target.value;
                                setTechnologies(newArr);
                              }}
                              placeholder="e.g. React, Node.js, GraphQL"
                              className="flex-1 bg-[#0E172E] border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                            />
                            <button
                              type="button"
                              onClick={() => setTechnologies(technologies.filter((_, i) => i !== idx))}
                              className="p-1 text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROCESS & FAQS */}
              {activeTab === 'process' && (
                <div className="space-y-6">
                  {/* Process Steps */}
                  <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Service Delivery Process</h3>
                        <p className="text-[11px] text-slate-400">Step-by-step roadmap displayed on service detail page.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setProcess([
                            ...process,
                            {
                              step: String(process.length + 1).padStart(2, '0'),
                              title: '',
                              description: '',
                            },
                          ])
                        }
                        className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Step
                      </button>
                    </div>

                    <div className="space-y-3">
                      {process.map((p, idx) => (
                        <div key={idx} className="bg-[#0A1022] border border-slate-750 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={p.step}
                              onChange={(e) => {
                                const newP = [...process];
                                newP[idx].step = e.target.value;
                                setProcess(newP);
                              }}
                              placeholder="01"
                              className="w-16 bg-[#0E172E] border border-slate-700 rounded px-2 py-1 text-xs text-white text-center font-mono"
                            />
                            <input
                              type="text"
                              value={p.title}
                              onChange={(e) => {
                                const newP = [...process];
                                newP[idx].title = e.target.value;
                                setProcess(newP);
                              }}
                              placeholder="Step Title (e.g. Discovery & Architecture)"
                              className="flex-1 bg-[#0E172E] border border-slate-700 rounded px-3 py-1 text-xs text-white font-semibold"
                            />
                            <button
                              type="button"
                              onClick={() => setProcess(process.filter((_, i) => i !== idx))}
                              className="p-1 text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={p.description}
                            onChange={(e) => {
                              const newP = [...process];
                              newP[idx].description = e.target.value;
                              setProcess(newP);
                            }}
                            placeholder="Detailed description of activities in this phase..."
                            className="w-full bg-[#0E172E] border border-slate-700 rounded p-2 text-xs text-slate-300 placeholder-slate-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Specific FAQs */}
                  <div className="bg-[#0E172E]/40 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Service Specific FAQs</h3>
                        <p className="text-[11px] text-slate-400">Questions specific to this service.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
                        className="px-2.5 py-1 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add FAQ
                      </button>
                    </div>

                    <div className="space-y-3">
                      {faqs.map((f, idx) => (
                        <div key={idx} className="bg-[#0A1022] border border-slate-750 rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-mono text-violet-400">Question #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                              className="text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={f.question}
                            onChange={(e) => {
                              const newF = [...faqs];
                              newF[idx].question = e.target.value;
                              setFaqs(newF);
                            }}
                            placeholder="e.g. How long does a typical migration take?"
                            className="w-full bg-[#0E172E] border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-medium"
                          />
                          <textarea
                            rows={2}
                            value={f.answer}
                            onChange={(e) => {
                              const newF = [...faqs];
                              newF[idx].answer = e.target.value;
                              setFaqs(newF);
                            }}
                            placeholder="Clear, authoritative answer..."
                            className="w-full bg-[#0E172E] border border-slate-700 rounded p-2 text-xs text-slate-300 placeholder-slate-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SEO */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="e.g. Full-Stack Web Development Services | InfosBrain"
                      className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Focus Keyword</label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. full stack web development agency"
                      className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Meta Description</label>
                    <textarea
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Concise, keyword-rich snippet for Google search results (recommended 150-160 characters)..."
                      className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
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
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteModalState.title}"? This service and its detail page will be removed.`}
        confirmText="Yes, Delete Service"
        isDestructive={true}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />

      {/* Media Selector Modal */}
      <MediaSelectorModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          setImageUrl(url);
          setMediaModalOpen(false);
        }}
      />
    </div>
  );
};
