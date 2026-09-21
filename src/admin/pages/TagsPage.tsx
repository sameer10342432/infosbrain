import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { Tags, PlusCircle, Edit2, Trash2, Search, X } from 'lucide-react';

interface TagItem {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export const TagsPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<TagItem | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string }>({
    isOpen: false,
  });

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tags');
      if (res.ok) {
        const data = await res.json();
        setTags(data.tags || []);
      } else {
        error('Failed to load tags.');
      }
    } catch {
      error('Network error loading tags.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const openCreateModal = () => {
    setEditingTag(null);
    setName('');
    setSlug('');
    setModalOpen(true);
  };

  const openEditModal = (tag: TagItem) => {
    setEditingTag(tag);
    setName(tag.name);
    setSlug(tag.slug);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error('Tag name is required.');
      return;
    }

    setSubmitting(true);
    try {
      const url = editingTag ? `/api/tags/admin/${editingTag.id}` : '/api/tags/admin';
      const method = editingTag ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Tag saved successfully!');
        setModalOpen(false);
        fetchTags();
      } else {
        error(data.error || 'Failed to save tag.');
      }
    } catch {
      error('Network error saving tag.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tags/admin/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Tag deleted successfully.');
        setTags((prev) => prev.filter((t) => t.id !== id));
      } else {
        error('Failed to delete tag.');
      }
    } catch {
      error('Network error deleting tag.');
    } finally {
      setDeleteModalState({ isOpen: false });
    }
  };

  const filteredTags = tags.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Blog Tags</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Micro-taxonomies for cross-referencing insights and tactical topics.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Tag</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-[#090E1F] border border-slate-800/90 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div className="bg-[#090E1F] border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
            <tr>
              <th className="p-4">Tag Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-center">Post Count</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-500">
                  Loading tags...
                </td>
              </tr>
            ) : filteredTags.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-500">
                  No tags found.
                </td>
              </tr>
            ) : (
              filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4 font-semibold text-white">#{tag.name}</td>
                  <td className="p-4 font-mono text-cyan-400">{tag.slug}</td>
                  <td className="p-4 text-center font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                      {tag.postCount || 0}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(tag)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteModalState({ isOpen: true, id: tag.id })}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#0C1326] border border-slate-800 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingTag ? 'Edit Tag' : 'Create New Tag'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tag Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Server-Side Tracking"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingTag) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .trim()
                          .replace(/[\s\W-]+/g, '-')
                      );
                    }
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. server-side-tracking"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Tag'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Tag"
        message="Are you sure you want to delete this tag? It will be removed from all attached posts."
        confirmText="Delete Tag"
        onConfirm={() => {
          if (deleteModalState.id) handleDelete(deleteModalState.id);
        }}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />
    </div>
  );
};
