import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

export const InsightsTeaser: React.FC = () => {
  const { navigate } = useRouter();
  const [posts, setPosts] = useState<any[]>(siteConfig.blogPosts.slice(0, 3));

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        const res = await fetch('/api/posts?featured=true&limit=3');
        if (res.ok) {
          const data = await res.json();
          if (data.posts && data.posts.length > 0) {
            setPosts(data.posts.slice(0, 3));
          }
        }
      } catch {
        // Keep siteConfig fallback
      }
    }
    loadFeaturedPosts();
  }, []);

  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-3">
              <span>GROWTH KNOWLEDGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display">
              Latest Insights &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                Technical Briefs
              </span>
            </h2>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(post.slug ? `/blog/${post.slug}` : '/blog')}
              className="group rounded-2xl p-6 bg-[#070B1F]/80 border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.15)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual Header */}
                {post.imageUrl ? (
                  <div className="h-40 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden mb-5 group-hover:border-cyan-500/40 transition-all">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-[#070B1F]/30 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                ) : (
                  <div className="h-36 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-950/50 to-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden mb-5">
                    <div className="absolute inset-0 cyber-grid opacity-50" />
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 shadow-md">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-slate-950/90 text-cyan-300 border border-slate-800">
                      {post.category}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-display line-clamp-2 mb-3">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
