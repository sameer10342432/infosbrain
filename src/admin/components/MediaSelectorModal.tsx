import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from './Toast';
import { X, UploadCloud, Search, Check, Image as ImageIcon, Loader2 } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

interface MediaSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, item?: MediaItem) => void;
  title?: string;
}

export const MediaSelectorModal: React.FC<MediaSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Select or Upload Media',
}) => {
  const { token } = useAdminAuth();
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/media/admin?limit=50&search=${encodeURIComponent(search)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch {
      error('Failed to load media library.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, search]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      error('Only image files (JPG, PNG, WebP, SVG) are allowed.');
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
        setMediaList((prev) => [data.media, ...prev]);
        setSelectedItem(data.media);
        setActiveTab('library');
      } else {
        error(data.error || 'Failed to upload image.');
      }
    } catch {
      error('Network error while uploading image.');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A1020] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Search */}
        <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              Media Library ({mediaList.length})
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-800/60'
              }`}
            >
              Upload New
            </button>
          </div>

          {activeTab === 'library' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[350px]">
          {activeTab === 'upload' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-12 text-center flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-900/30 hover:bg-slate-900/60 min-h-[300px]"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                className="hidden"
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-3 text-cyan-400">
                  <Loader2 className="w-10 h-10 animate-spin" />
                  <span className="text-sm font-medium">Uploading and processing image...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-semibold text-white">Click or drag image here to upload</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Supports JPG, PNG, WebP, SVG up to 5MB. Images are automatically saved to your media library.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                  <span className="text-xs">Loading media assets...</span>
                </div>
              ) : mediaList.length === 0 ? (
                <div className="py-16 text-center text-slate-400 text-sm">
                  No media files found.{' '}
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="text-cyan-400 underline hover:text-cyan-300 ml-1 cursor-pointer"
                  >
                    Upload an image now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mediaList.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative rounded-xl border overflow-hidden cursor-pointer transition-all aspect-video bg-slate-950 ${
                          isSelected
                            ? 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-950/50'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img
                          src={item.url}
                          alt={item.originalName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                          <p className="text-[11px] text-white font-mono truncate">{item.originalName}</p>
                          <p className="text-[10px] text-slate-400">{(item.size / 1024).toFixed(1)} KB</p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 p-1 rounded-full bg-cyan-500 text-slate-950 shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 truncate max-w-sm">
            {selectedItem ? (
              <span>
                Selected: <strong className="text-white">{selectedItem.originalName}</strong>
              </span>
            ) : (
              <span>Click an image to select</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedItem) {
                  onSelect(selectedItem.url, selectedItem);
                  onClose();
                }
              }}
              disabled={!selectedItem}
              className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-colors shadow-lg shadow-cyan-950/40 cursor-pointer"
            >
              Insert Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
