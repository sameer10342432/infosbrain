import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import {
  MessageSquareQuote,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  X,
  Star,
  CheckCircle2,
  Search,
} from 'lucide-react';

interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  designation?: string;
  country?: string;
  flag?: string;
  rating: number;
  avatarText?: string;
  avatarUrl?: string;
  testimonial: string;
  displayOrder: number;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export const TestimonialsAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [country, setCountry] = useState('');
  const [flag, setFlag] = useState('');
  const [rating, setRating] = useState(5);
  const [avatarText, setAvatarText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [submitting, setSubmitting] = useState(false);

  // Media selector
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string; clientName?: string }>({
    isOpen: false,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/testimonials/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials || []);
      } else {
        error('Failed to load testimonials.');
      }
    } catch {
      error('Network error loading testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setClientName('');
    setCompany('');
    setDesignation('');
    setCountry('United States');
    setFlag('🇺🇸');
    setRating(5);
    setAvatarText('');
    setAvatarUrl('');
    setTestimonial('');
    setDisplayOrder(testimonials.length + 1);
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setClientName(item.clientName || '');
    setCompany(item.company || '');
    setDesignation(item.designation || '');
    setCountry(item.country || '');
    setFlag(item.flag || '');
    setRating(item.rating || 5);
    setAvatarText(item.avatarText || '');
    setAvatarUrl(item.avatarUrl || '');
    setTestimonial(item.testimonial || '');
    setDisplayOrder(item.displayOrder || 0);
    setStatus(item.status || 'published');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !testimonial.trim()) {
      error('Client name and Testimonial text are required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      clientName: clientName.trim(),
      company: company.trim(),
      designation: designation.trim() || undefined,
      country: country.trim() || undefined,
      flag: flag.trim() || undefined,
      rating: Number(rating) || 5,
      avatarText: avatarText.trim() || clientName.substring(0, 2).toUpperCase(),
      avatarUrl: avatarUrl.trim() || undefined,
      testimonial: testimonial.trim(),
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingItem ? `/api/cms/testimonials/admin/${editingItem.id}` : '/api/cms/testimonials/admin';
      const method = editingItem ? 'PUT' : 'POST';

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
        success(editingItem ? 'Testimonial updated!' : 'Testimonial created!');
        setModalOpen(false);
        fetchTestimonials();
      } else {
        error(data.error || 'Failed to save testimonial.');
      }
    } catch {
      error('Network error saving testimonial.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (item: TestimonialItem) => {
    const newStatus = item.status === 'published' ? 'hidden' : 'published';
    try {
      const res = await fetch(`/api/cms/testimonials/admin/${item.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success(`Status set to ${newStatus}`);
        setTestimonials((prev) => prev.map((t) => (t.id === item.id ? { ...t, status: newStatus as any } : t)));
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
      const res = await fetch(`/api/cms/testimonials/admin/${deleteModalState.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Testimonial deleted.');
        setTestimonials((prev) => prev.filter((t) => t.id !== deleteModalState.id));
        setDeleteModalState({ isOpen: false });
      } else {
        const data = await res.json();
        error(data.error || 'Failed to delete testimonial.');
      }
    } catch {
      error('Network error deleting testimonial.');
    }
  };

  const filtered = testimonials.filter(
    (t) =>
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.testimonial.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <MessageSquareQuote className="w-6 h-6 text-cyan-400" />
            Testimonials Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage verified client testimonials, ratings, photos, designations, and display order.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-[#0A1022] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, company or review..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E172E] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">Total Reviews: {testimonials.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading client feedback...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-[#0A1022] border border-slate-800 rounded-xl">
            <MessageSquareQuote className="w-12 h-12 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No testimonials found</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#0A1022] border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => toggleStatus(item)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      item.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.status === 'published' ? 'Published' : 'Hidden'}
                  </button>
                </div>

                <p className="text-xs text-slate-300 italic line-clamp-4 leading-relaxed mb-4">
                  "{item.testimonial}"
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                  {item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-900 to-blue-900 border border-cyan-700/50 flex items-center justify-center font-bold text-xs text-cyan-300 shrink-0">
                      {item.avatarText || item.clientName.substring(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                      {item.clientName}
                      {item.flag && <span className="text-xs">{item.flag}</span>}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {item.designation ? `${item.designation}, ` : ''}
                      <span className="text-cyan-400">{item.company}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">Order: {item.displayOrder}</span>
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
                          clientName: item.clientName,
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
          <div className="bg-[#0A1022] border border-slate-750 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E172E]/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-cyan-400" />
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
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
                    Client Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. David Sterling"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Nexus Global"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Chief Technology Officer"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. United Kingdom"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Flag Emoji</label>
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="e.g. 🇬🇧 or 🇺🇸"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Photo / Avatar URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="/assets/images/testimonials/client.jpg"
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
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Testimonial Quote <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Enter the client's direct quote and review..."
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Star Rating (1-5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value) || 5)}
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Great)</option>
                    <option value={3}>3 Stars (Average)</option>
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
                  {editingItem ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleteModalState.clientName}"?`}
        confirmText="Yes, Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />

      <MediaSelectorModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          setAvatarUrl(url);
          setMediaModalOpen(false);
        }}
      />
    </div>
  );
};
