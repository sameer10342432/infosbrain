import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { BlogPostItem } from '../types';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  X,
  Sparkles,
  Share2,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';

export const BlogPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPostItem | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const categories = [
    'All',
    'SEO & Strategy',
    'Web Architecture',
    'Paid Advertising',
    'Conversion Optimization',
  ];

  const filteredPosts = siteConfig.blogPosts.filter((post) => {
    const matchesCat = selectedCat === 'All' || post.category === selectedCat;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Insights & Briefs - Technology, SEO & Marketing Intelligence"
        description="Deep tactical articles on enterprise SEO, modern MERN architecture, ROAS acceleration, and conversion rate optimization by InfosBrain."
      />

      {/* Hero Banner Section with Editorial & Tech Intelligence Imagery */}
      <PageHeroBanner
        badge="EXECUTIVE BRIEFINGS & TECHNICAL INSIGHTS"
        badgeIcon={<BookOpen className="w-3.5 h-3.5 text-cyan-400" />}
        title="Actionable Intelligence For"
        highlightText="Modern Scale"
        description="Our practice directors and senior engineers break down algorithmic SEO shifts, high-performance web architecture patterns, and profitable ad spend economics."
        image={{
          src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Technical Intelligence and Research Briefs',
          tag: 'Engineering & Marketing Insights',
          statPill: {
            value: 'Weekly',
            label: 'Executive Briefings',
            subtext: 'Written by Senior Practice Leads',
          },
          secondaryPill: {
            text: 'Zero Fluff • Pure Tactics',
            icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        actions={
          <>
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                const el = document.getElementById('articles-feed');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Browse Recent Briefs
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/contact')}
            >
              Schedule Direct Consultation
            </Button>
          </>
        }
        keyPoints={[
          'Core Web Vitals Optimization',
          'Algorithmic Search Deconstructions',
          'Enterprise Architecture Patterns',
        ]}
      />

      {/* Search and Category Filter Bar */}
      <section className="py-8 bg-[#070B1F] border-y border-slate-800 sticky top-[68px] z-30 backdrop-blur-xl bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search intelligence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="group rounded-3xl p-7 bg-[#070B1F]/90 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Article Feature Image */}
                  {post.imageUrl ? (
                    <div className="h-44 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden mb-5 group-hover:border-cyan-500/40 transition-all">
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
                    <div className="h-44 rounded-2xl bg-gradient-to-tr from-slate-950 via-blue-950/40 to-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden mb-5">
                      <div className="absolute inset-0 cyber-grid opacity-40" />
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-cyan-400">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-slate-950/90 text-cyan-300 border border-slate-800">
                        {post.category}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                  <span>Read Technical Briefing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              No articles match your query. Try a different search term or category.
            </div>
          )}
        </div>
      </section>

      {/* Thought Leadership Subscription Banner */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-cyan-500/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3">
              Subscribe to the InfosBrain Growth Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-xl mx-auto">
              Bi-weekly technical digests breaking down algorithm updates, high-converting design patterns, and engineering playbooks. Zero spam.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you! You are now subscribed to executive updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer hover:from-cyan-400 hover:to-blue-500"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#070B1F] border border-cyan-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Article Hero Cover */}
              {activeArticle.imageUrl && (
                <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden border border-cyan-500/30">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 font-semibold">
                      {activeArticle.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h1 className="text-2xl sm:text-4xl font-bold text-white font-display leading-snug">
                  {activeArticle.title}
                </h1>
                <div className="text-xs text-slate-500 font-mono">
                  Published by InfosBrain Technical Editorial on {activeArticle.date}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                {activeArticle.excerpt}
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-6">
                <p>
                  As digital ecosystems evolve, standard approaches no longer yield market-beating returns. Businesses that decouple their frontends, maintain rigorous technical hygiene, and align paid acquisition with customer lifetime value outperform their competitors by a significant margin.
                </p>
                <p>
                  At InfosBrain, our engineers and media buyers test hypotheses daily across high-traffic properties. We document these findings to provide open access to modern scaling principles.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white mb-1">Key Strategic Takeaway:</div>
                  <div className="text-slate-400">
                    Prioritize data pipelines and Core Web Vitals before pouring capital into paid acquisition. Performance optimizations directly compound your advertising ROAS.
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Questions on implementing this strategy? Contact{' '}
                  <a href="mailto:info@infosbrain.com" className="text-cyan-300 underline font-mono">
                    info@infosbrain.com
                  </a>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setActiveArticle(null);
                    navigate('/contact');
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Consult With Author
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
