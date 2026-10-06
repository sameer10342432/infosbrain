import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  HelpCircle,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  CheckCircle2,
  Search,
  ChevronDown,
} from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  status: 'published' | 'draft' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

import { safeApiFetch, loadOfflineCache, saveOfflineCache } from '../utils/adminFallbackData';
import { siteConfig } from '../../config/siteConfig';

export const FaqsAdminPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [faqs, setFaqs] = useState<FaqItem[]>(() =>
    loadOfflineCache('infosbrain_cms_faqs', (siteConfig.faqs as any) || [])
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  // Form Fields
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [submitting, setSubmitting] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string; question?: string }>({
    isOpen: false,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await safeApiFetch('/api/cms/faqs/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.isOffline && res.ok && Array.isArray(res.data?.faqs) && res.data.faqs.length > 0) {
        setFaqs(res.data.faqs);
        saveOfflineCache('infosbrain_cms_faqs', res.data.faqs);
      } else {
        const cached = loadOfflineCache('infosbrain_cms_faqs', (siteConfig.faqs as any) || []);
        setFaqs(cached);
      }
    } catch {
      const cached = loadOfflineCache('infosbrain_cms_faqs', (siteConfig.faqs as any) || []);
      setFaqs(cached);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setQuestion('');
    setAnswer('');
    setCategory('General');
    setDisplayOrder(faqs.length + 1);
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (item: FaqItem) => {
    setEditingItem(item);
    setQuestion(item.question || '');
    setAnswer(item.answer || '');
    setCategory(item.category || 'General');
    setDisplayOrder(item.displayOrder || 0);
    setStatus(item.status || 'published');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      error('Question and Answer are required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim() || 'General',
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingItem ? `/api/cms/faqs/admin/${editingItem.id}` : '/api/cms/faqs/admin';
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
        success(editingItem ? 'FAQ updated!' : 'FAQ created!');
        setModalOpen(false);
        fetchFaqs();
      } else {
        error(data.error || 'Failed to save FAQ.');
      }
    } catch {
      error('Network error saving FAQ.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (item: FaqItem) => {
    const newStatus = item.status === 'published' ? 'hidden' : 'published';
    try {
      const res = await fetch(`/api/cms/faqs/admin/${item.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success(`Status set to ${newStatus}`);
        setFaqs((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: newStatus as any } : f)));
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
      const res = await fetch(`/api/cms/faqs/admin/${deleteModalState.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('FAQ deleted.');
        setFaqs((prev) => prev.filter((f) => f.id !== deleteModalState.id));
        setDeleteModalState({ isOpen: false });
      } else {
        const data = await res.json();
        error(data.error || 'Failed to delete FAQ.');
      }
    } catch {
      error('Network error deleting FAQ.');
    }
  };

  const categories = Array.from(new Set(faqs.map((f) => f.category || 'General')));

  const filtered = faqs.filter((f) => {
    const matchesCat = filterCategory === 'all' || f.category === filterCategory;
    const matchesQuery =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            FAQs Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage frequently asked questions rendered across the website accordion sections.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      <div className="bg-[#0A1022] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E172E] border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
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
            All ({faqs.length})
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

      <div className="space-y-3">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono">Loading FAQs...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 bg-[#0A1022] border border-slate-800 rounded-xl">
            <HelpCircle className="w-12 h-12 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No FAQs found</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#0A1022] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-cyan-300 border border-slate-700">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Order: {item.displayOrder}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.question}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.answer}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1">
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
                        question: item.question,
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
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A1022] border border-slate-750 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0E172E]/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                {editingItem ? 'Edit FAQ' : 'Add FAQ'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Question <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. What engagement models does InfosBrain offer?"
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Answer <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Provide a comprehensive and helpful answer..."
                  className="w-full bg-[#0E172E] border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="General, Security, Services"
                    className="w-full bg-[#0E172E] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
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
                  {editingItem ? 'Update FAQ' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete FAQ"
        message={`Are you sure you want to delete this FAQ: "${deleteModalState.question}"?`}
        confirmText="Yes, Delete"
        isDestructive={true}
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />
    </div>
  );
};
