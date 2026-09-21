import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  BookOpen,
  Sparkles,
  Check,
  Linkedin,
  Twitter,
  Mail,
  User,
  ShieldCheck,
} from 'lucide-react';

interface BlogArticlePageProps {
  slug: string;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      setNotFound(false);
      try {
        const isPreview = window.location.search.includes('preview=true');
        const token = localStorage.getItem('infosbrain_admin_token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`/api/posts/${slug}${isPreview ? '?preview=true' : ''}`, {
          headers,
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setPost(data.post);
          setRelatedPosts(data.relatedPosts || []);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-cyan-300">Loading technical briefing...</span>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-32 pb-24 text-center px-4 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3">
          Briefing Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The requested technical publication could not be found or has been moved.
        </p>
        <Button size="md" variant="primary" onClick={() => navigate('/blog')}>
          Return to All Insights
        </Button>
      </div>
    );
  }

  const siteUrl = window.location.origin;
  const canonical = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`;

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.ogImage || post.featuredImage,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'InfosBrain Technical Editorial',
    },
    publisher: {
      '@type': 'Organization',
      name: 'InfosBrain',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };

  return (
    <article className="pt-28 pb-24 bg-[#071A35] min-h-screen text-slate-100">
      <SEOHead
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        canonicalUrl={canonical}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group mb-6"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Insights & Briefs</span>
        </button>

        {/* Category & Read Time Tag */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            {post.category}
          </span>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {post.readingTime || '5 min read'}
          </span>
          {post.formattedDate && (
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {post.formattedDate}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display leading-tight tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Author Card & Social Share */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090E1F]/80 border border-slate-800">
          <div className="flex items-center gap-3">
            {post.author?.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author.name}
                className="w-11 h-11 rounded-xl object-cover border border-cyan-500/30"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="text-xs font-bold text-white">{post.author?.name || 'InfosBrain Team'}</div>
              <div className="text-[11px] text-cyan-400 font-mono">{post.author?.role || 'Technical Practice'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Share Briefing</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 aspect-video max-h-[500px] w-full bg-slate-950 shadow-2xl">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A35] via-transparent to-transparent opacity-60" />
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Executive Excerpt */}
        {post.excerpt && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090E1F]/90 border border-cyan-500/30 text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
            {post.excerpt}
          </div>
        )}

        {/* HTML Content */}
        <div
          className="prose prose-invert prose-cyan max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-slate-800/80">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              Topics & Focus Areas
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t: string) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Card */}
        {post.author?.bio && (
          <div className="p-6 rounded-2xl bg-[#090E1F] border border-slate-800 flex flex-col sm:flex-row items-start gap-4">
            {post.author.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author.name}
                className="w-14 h-14 rounded-2xl object-cover border border-cyan-500/30 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                <User className="w-6 h-6" />
              </div>
            )}
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">About {post.author.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        )}

        {/* Bottom Consultation CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DIRECT ARCHITECT ACCESS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to implement this strategy?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              Our principal engineers and media buyers partner with select enterprises to execute custom digital roadmaps.
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/contact')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Consult With Author
          </Button>
        </div>

        {/* Related Articles Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white font-display">
              Related Executive Briefings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="group p-5 rounded-2xl bg-[#090E1F] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {rel.imageUrl && (
                      <div className="h-32 rounded-xl overflow-hidden mb-4 border border-slate-800">
                        <img
                          src={rel.imageUrl}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mt-1 mb-2 font-display">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400">
                    <span>Read Brief</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
