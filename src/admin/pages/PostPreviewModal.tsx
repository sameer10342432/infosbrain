import React from 'react';
import { X, Calendar, Clock, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';

interface PostPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    categoryName?: string;
    authorName?: string;
    readingTime?: string;
    tags?: string[];
    publishedAt?: string;
  };
}

export const PostPreviewModal: React.FC<PostPreviewModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  if (!isOpen) return null;

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#050816] border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Preview Top bar banner */}
        <div className="px-6 py-3 bg-cyan-950/60 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>PREVIEW MODE — Live Website Layout Simulation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Article Body matching InfosBrain styling */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 custom-scrollbar space-y-8 text-slate-100">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-cyan-500/30">
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/40 font-semibold backdrop-blur-md">
                  {post.categoryName || 'General'}
                </span>
              </div>
            </div>
          )}

          {/* Title & Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {dateStr}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime || '5 min read'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white font-display leading-tight">
              {post.title || 'Untitled Post'}
            </h1>

            <div className="text-xs text-slate-400 font-mono">
              Written by <span className="text-white font-semibold">{post.authorName || 'InfosBrain Team'}</span>
            </div>
          </div>

          {/* Excerpt Lead */}
          {post.excerpt && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              {post.excerpt}
            </div>
          )}

          {/* Rich Content */}
          <div
            className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base border-t border-slate-800/80 pt-8"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>No content written yet.</p>' }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-slate-900 text-xs font-mono text-cyan-300 border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
