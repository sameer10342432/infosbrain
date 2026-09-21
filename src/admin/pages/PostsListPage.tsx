import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  Copy,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Filter,
  ArrowUpDown,
  FileText,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  isFeatured: number | boolean;
  categoryName?: string;
  authorName?: string;
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  readingTime?: string;
}

interface PostsListPageProps {
  onNavigate: (route: string) => void;
  onPreviewPost: (slug: string) => void;
}

export const PostsListPage: React.FC<PostsListPageProps> = ({ onNavigate, onPreviewPost }) => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Deletion modal state
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    postId?: string;
    isBulk?: boolean;
  }>({ isOpen: false });

  // Fetch categories & authors for dropdown filters
  useEffect(() => {
    async function loadMeta() {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [catRes, authRes] = await Promise.all([
          fetch('/api/categories/admin', { headers }),
          fetch('/api/authors', { headers }),
        ]);
        if (catRes.ok) {
          const data = await catRes.json();
          setCategories(data.categories || []);
        }
        if (authRes.ok) {
          const data = await authRes.json();
          setAuthors(data.authors || []);
        }
      } catch {
        // Ignore
      }
    }
    loadMeta();
  }, [token]);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const query = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        status: statusFilter,
        categoryId: categoryFilter,
        authorId: authorFilter,
        sort,
        search,
      });

      const res = await fetch(`/api/posts/admin/all?${query}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalPosts(data.pagination?.total || 0);
      } else {
        error('Failed to load posts.');
      }
    } catch {
      error('Network error loading posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, statusFilter, categoryFilter, authorFilter, sort, search, token]);

  // Bulk selection toggle
  const toggleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Single post actions
  const handleDeletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/admin/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Post deleted successfully.');
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setSelectedIds((prev) => prev.filter((i) => i !== id));
      } else {
        error('Failed to delete post.');
      }
    } catch {
      error('Network error deleting post.');
    } finally {
      setDeleteModalState({ isOpen: false });
    }
  };

  const handleDuplicatePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/admin/${id}/duplicate`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (res.ok) {
        success('Post duplicated successfully as Draft.');
        fetchPosts();
      } else {
        error(data.error || 'Failed to duplicate post.');
      }
    } catch {
      error('Network error duplicating post.');
    }
  };

  // Bulk actions
  const handleBulkAction = async (action: 'publish' | 'unpublish' | 'archive' | 'delete') => {
    if (selectedIds.length === 0) return;

    if (action === 'delete') {
      setDeleteModalState({ isOpen: true, isBulk: true });
      return;
    }

    try {
      const res = await fetch('/api/posts/admin/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ action, ids: selectedIds }),
      });

      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Bulk action executed successfully.');
        setSelectedIds([]);
        fetchPosts();
      } else {
        error(data.error || 'Bulk action failed.');
      }
    } catch {
      error('Network error executing bulk action.');
    }
  };

  const executeBulkDelete = async () => {
    try {
      const res = await fetch('/api/posts/admin/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ action: 'delete', ids: selectedIds }),
      });

      if (res.ok) {
        success(`Deleted ${selectedIds.length} posts.`);
        setSelectedIds([]);
        fetchPosts();
      } else {
        error('Failed to delete selected posts.');
      }
    } catch {
      error('Network error deleting posts.');
    } finally {
      setDeleteModalState({ isOpen: false });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">All Blog Posts</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage, edit, schedule, and optimize technical insights ({totalPosts} total)
          </p>
        </div>

        <button
          onClick={() => onNavigate('/admin/posts/new')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Post</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#090E1F] border border-slate-800/90 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search posts by title, slug, or content..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer max-w-[150px]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Author filter */}
          <select
            value={authorFilter}
            onChange={(e) => {
              setAuthorFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer max-w-[150px]"
          >
            <option value="all">All Authors</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          {/* Sorting */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="updated">Recently Updated</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Bulk actions bar if items are selected */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl flex items-center justify-between gap-3 animate-in fade-in">
          <span className="text-xs font-semibold text-cyan-300">
            {selectedIds.length} article(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('publish')}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              Publish Selected
            </button>
            <button
              onClick={() => handleBulkAction('unpublish')}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition-colors cursor-pointer"
            >
              Unpublish (Draft)
            </button>
            <button
              onClick={() => handleBulkAction('archive')}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-[#090E1F] border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={posts.length > 0 && selectedIds.length === posts.length}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Published / Scheduled</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    Loading articles...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    No articles found matching your criteria.
                  </td>
                </tr>
              ) : (
                posts.map((post) => {
                  const isSelected = selectedIds.includes(post.id);
                  return (
                    <tr
                      key={post.id}
                      className={`hover:bg-slate-900/50 transition-colors ${
                        isSelected ? 'bg-cyan-950/20' : ''
                      }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(post.id)}
                          className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 max-w-sm">
                        <div className="flex items-start gap-2">
                          {Boolean(post.isFeatured) && (
                            <span title="Featured Article" className="shrink-0 mt-0.5 inline-block">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <button
                              onClick={() => onNavigate(`/admin/posts/edit/${post.id}`)}
                              className="font-semibold text-white hover:text-cyan-400 transition-colors text-left line-clamp-2 cursor-pointer"
                            >
                              {post.title}
                            </button>
                            <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                              /blog/{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                          {post.categoryName || 'General'}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-slate-400">
                        {post.authorName || 'InfosBrain Team'}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                            post.status === 'published'
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                              : post.status === 'scheduled'
                              ? 'bg-violet-950/60 text-violet-300 border-violet-500/40'
                              : post.status === 'archived'
                              ? 'bg-slate-800 text-slate-400 border-slate-700'
                              : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-[11px] text-slate-400 font-mono">
                        {post.status === 'scheduled' && post.scheduledAt ? (
                          <span className="text-violet-300 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(post.scheduledAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        ) : post.publishedAt ? (
                          new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onPreviewPost(post.slug)}
                            title="Preview Article"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onNavigate(`/admin/posts/edit/${post.id}`)}
                            title="Edit Article"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDuplicatePost(post.id)}
                            title="Duplicate as Draft"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteModalState({ isOpen: true, postId: post.id })}
                            title="Delete Post"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing Page <span className="text-white font-bold">{page}</span> of{' '}
            <span className="text-white font-bold">{totalPages}</span> ({totalPosts} posts)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title={deleteModalState.isBulk ? 'Delete Selected Articles' : 'Delete Article'}
        message={
          deleteModalState.isBulk
            ? `Are you sure you want to permanently delete these ${selectedIds.length} articles? This action cannot be undone.`
            : 'Are you sure you want to permanently delete this article? This action cannot be undone.'
        }
        confirmText="Yes, Delete"
        onConfirm={() => {
          if (deleteModalState.isBulk) {
            executeBulkDelete();
          } else if (deleteModalState.postId) {
            handleDeletePost(deleteModalState.postId);
          }
        }}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />
    </div>
  );
};
