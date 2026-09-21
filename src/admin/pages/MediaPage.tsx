import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  UploadCloud,
  Search,
  Copy,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  Check,
  Loader2,
  Calendar,
  Layers,
} from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

export const MediaPage: React.FC = () => {
  const { token } = useAdminAuth();
  const { success, error, info } = useToast();

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id?: string }>({
    isOpen: false,
  });

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/media/admin?page=${page}&limit=24&search=${encodeURIComponent(search)}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (res.ok) {
        const data = await res.json();
        setMedia(data.media || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      } else {
        error('Failed to load media.');
      }
    } catch {
      error('Network error loading media.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [page, search, token]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      error('Only image files (JPG, PNG, WebP, SVG, GIF) are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      error('File size cannot exceed 5MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await fetch('/api/media/admin/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        success('Image uploaded successfully!');
        fetchMedia();
      } else {
        error(data.error || 'Failed to upload image.');
      }
    } catch {
      error('Network error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (item: MediaItem) => {
    const fullUrl = window.location.origin + item.url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    success('Image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/media/admin/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        success('Media file deleted.');
        setMedia((prev) => prev.filter((m) => m.id !== id));
      } else {
        error('Failed to delete media file.');
      }
    } catch {
      error('Network error deleting media file.');
    } finally {
      setDeleteModalState({ isOpen: false });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Media Library</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Store, preview, and manage high-resolution assets for technical briefings ({totalCount} items)
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Upload New Asset</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
          }
        }}
        className="p-8 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl text-center flex flex-col items-center justify-center cursor-pointer bg-[#090E1F]/50 hover:bg-[#090E1F] transition-colors"
      >
        <UploadCloud className="w-8 h-8 text-cyan-400 mb-2" />
        <span className="text-xs font-semibold text-white">
          Drop high-resolution images here, or browse files
        </span>
        <span className="text-[11px] text-slate-500 mt-1">
          Supports WebP, PNG, JPG, and SVG formats up to 5MB
        </span>
      </div>

      {/* Search bar */}
      <div className="p-4 rounded-2xl bg-[#090E1F] border border-slate-800/90 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by filename..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-[#090E1F] border border-slate-800/90 rounded-2xl p-6 shadow-xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            <span className="text-xs font-mono">Loading assets...</span>
          </div>
        ) : media.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No media assets found. Upload an image above to get started.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div className="aspect-video w-full overflow-hidden bg-slate-900 flex items-center justify-center relative">
                  <img
                    src={item.url}
                    alt={item.originalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => copyUrl(item)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white shadow"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white shadow"
                      title="Open full image"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setDeleteModalState({ isOpen: true, id: item.id })}
                      className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-2.5">
                  <p className="text-[11px] font-semibold text-white truncate" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>{(item.size / 1024).toFixed(1)} KB</span>
                    <span>{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        title="Delete Image Asset"
        message="Are you sure you want to permanently delete this media file? If it is used in any published articles, the image will appear broken."
        confirmText="Delete File"
        onConfirm={() => {
          if (deleteModalState.id) handleDelete(deleteModalState.id);
        }}
        onClose={() => setDeleteModalState({ isOpen: false })}
      />
    </div>
  );
};
