import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { MediaSelectorModal } from '../components/MediaSelectorModal';
import {
  Users,
  PlusCircle,
  Edit2,
  Trash2,
  Image as ImageIcon,
  X,
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react';

interface AuthorItem {
  id: string;
  name: string;
  role: string;
  bio?: string;
  profileImage?: string;
  socialLinks?: Record<string, string>;
  postCount?: number;
}

export const AuthorsPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [authors, setAuthors] = useState<AuthorItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorItem | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Media selector modal
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  // Delete modal
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string }>({
    isOpen: false,
  });

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/authors');
      if (res.ok) {
        const data = await res.json();
        setAuthors(data.authors || []);
      } else {
        error('Failed to load authors.');
      }
    } catch {
      error('Network error loading authors.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const openCreateModal = () => {
    setEditingAuthor(null);
    setName('');
    setRole('Content Specialist');
    setBio('');
    setProfileImage('');
    setLinkedin('');
    setTwitter('');
    setModalOpen(true);
  };

  const openEditModal = (author: AuthorItem) => {
    setEditingAuthor(author);
    setName(author.name);
    setRole(author.role);
    setBio(author.bio || '');
    setProfileImage(author.profileImage || '');
    setLinkedin(author.socialLinks?.linkedin || '');
    setTwitter(author.socialLinks?.twitter || '');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      error('Author name is required.');
      return;
    }

    setSubmitting(true);
    try {
      const url = editingAuthor ? `/api/authors/admin/${editingAuthor.id}` : '/api/authors/admin';
      const method = editingAuthor ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          role,
          bio,
          profileImage,
          socialLinks: {
            linkedin: linkedin.trim(),
            twitter: twitter.trim(),
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Author saved successfully!');
        setModalOpen(false);
        fetchAuthors();
      } else {
        error(data.error || 'Failed to save author.');
      }
    } catch {
      error('Network error saving author.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/authors/admin/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Author deleted successfully.');
        setAuthors((prev) => prev.filter((a) => a.id !== id));
      } else {
        error('Failed to delete author.');
      }
    } catch {
      error('Network error deleting author.');
    } finally {
      setDeleteModalState({ isOpen: false });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Article Authors</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage practice directors, editorial leads, and contributing researchers.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Author</span>
        </button>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-slate-500">
            Loading authors...
          </div>
        ) : authors.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-slate-500">
            No authors found.
          </div>
        ) : (
          authors.map((author) => (
            <div
              key={author.id}
              className="p-6 rounded-2xl bg-[#090E1F] border border-slate-800/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {author.profileImage ? (
                      <img
                        src={author.profileImage}
                        alt={author.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-base">
                        {author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{author.name}</h3>
                      <p className="text-[11px] text-cyan-400 font-mono mt-0.5">{author.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(author)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteModalState({ isOpen: true, id: author.id })}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {author.bio || 'No biographical overview provided.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  {author.postCount || 0} published articles
                </span>

                <div className="flex items-center gap-2 text-slate-500">
                  {author.socialLinks?.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {author.socialLinks?.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0C1326] border border-slate-800 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingAuthor ? 'Edit Author Profile' : 'Create Author Profile'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Principal Systems Architect"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise Systems & Cloud Engineering Lead"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bio / Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Specialization, background, and research focus..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              {/* Profile Image with media library picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Profile Photo URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaModalOpen(true)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Browse</span>
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Twitter / X URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://x.com/..."
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
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
                  {submitting ? 'Saving...' : 'Save Author'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Selector Modal */}
      <MediaSelectorModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => setProfileImage(url)}
        title="Select Author Profile Picture"
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Author"
        message="Are you sure you want to delete this author? Any posts authored by them will remain but have author unassigned."
        confirmText="Delete Author"
        onConfirm={() => {
          if (deleteModalState.id) handleDelete(deleteModalState.id);
        }}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />
    </div>
  );
};
