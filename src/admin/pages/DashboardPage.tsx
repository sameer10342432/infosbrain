import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  FileText,
  CheckCircle,
  FileClock,
  Clock,
  FolderTree,
  Tags,
  MessageSquareText,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Image as ImageIcon,
  Calendar,
  ExternalLink,
  ChevronRight,
  Eye,
  Users,
  Briefcase,
  FolderKanban,
  MessageSquareQuote,
  HelpCircle,
  GraduationCap,
  Globe,
  Layers,
} from 'lucide-react';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  categories: number;
  tags: number;
  inquiries: number;
  newInquiries: number;
  teamMembers: number;
  services: number;
  caseStudies: number;
  testimonials: number;
  faqs: number;
  careers: number;
  locations: number;
  sections: number;
}

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    categories: 0,
    tags: 0,
    inquiries: 0,
    newInquiries: 0,
    teamMembers: 0,
    services: 0,
    caseStudies: 0,
    testimonials: 0,
    faqs: 0,
    careers: 0,
    locations: 0,
    sections: 0,
  });

  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch posts
        let postsData: any = {};
        try {
          const postsRes = await fetch('/api/posts/admin/all?limit=5', { headers });
          if (postsRes.ok && postsRes.headers.get('content-type')?.includes('application/json')) {
            postsData = await postsRes.json();
          }
        } catch {
          // offline
        }

        // Fetch inquiries
        let inqData: any = {};
        try {
          const inqRes = await fetch('/api/inquiries/admin?limit=5', { headers });
          if (inqRes.ok && inqRes.headers.get('content-type')?.includes('application/json')) {
            inqData = await inqRes.json();
          }
        } catch {
          // offline
        }

        // Fetch categories
        let catData: any = {};
        try {
          const catRes = await fetch('/api/categories/admin', { headers });
          if (catRes.ok && catRes.headers.get('content-type')?.includes('application/json')) {
            catData = await catRes.json();
          }
        } catch {
          // offline
        }

        // Fetch tags
        let tagsData: any = {};
        try {
          const tagsRes = await fetch('/api/tags', { headers });
          if (tagsRes.ok && tagsRes.headers.get('content-type')?.includes('application/json')) {
            tagsData = await tagsRes.json();
          }
        } catch {
          // offline
        }

        // Fetch CMS data bundle
        let cmsData: any = {};
        try {
          const cmsRes = await fetch('/api/cms/all');
          if (cmsRes.ok && cmsRes.headers.get('content-type')?.includes('application/json')) {
            cmsData = await cmsRes.json();
          }
        } catch {
          // ignore
        }

        const allPosts = postsData.posts || [];
        setRecentPosts(allPosts);
        setRecentInquiries(inqData.inquiries || []);

        const statusCounts = inqData.statusCounts || {};
        const teamTotal = ((cmsData.leadership || []).length) + ((cmsData.teamMembers || []).length);

        setStats({
          totalPosts: postsData.pagination?.total || allPosts.length,
          publishedPosts: allPosts.filter((p: any) => p.status === 'published').length,
          draftPosts: allPosts.filter((p: any) => p.status === 'draft').length,
          scheduledPosts: allPosts.filter((p: any) => p.status === 'scheduled').length,
          categories: catData.categories?.length || 0,
          tags: tagsData.tags?.length || 0,
          inquiries: inqData.pagination?.total || 0,
          newInquiries: statusCounts.New || 0,
          teamMembers: teamTotal,
          services: cmsData.services?.length || 0,
          caseStudies: cmsData.caseStudies?.length || 0,
          testimonials: cmsData.testimonials?.length || 0,
          faqs: cmsData.faqs?.length || 0,
          careers: cmsData.careers?.length || 0,
          locations: cmsData.locations?.length || 0,
          sections: Object.keys(cmsData.sections || {}).length,
        });
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [token]);

  const statCards = [
    {
      title: 'Total Articles',
      value: stats.totalPosts,
      icon: FileText,
      color: 'text-blue-400',
      bg: 'bg-blue-950/40 border-blue-500/30',
      route: '/admin/posts',
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-500/30',
      route: '/admin/posts?status=published',
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      icon: FileClock,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-500/30',
      route: '/admin/posts?status=draft',
    },
    {
      title: 'Scheduled',
      value: stats.scheduledPosts,
      icon: Clock,
      color: 'text-violet-400',
      bg: 'bg-violet-950/40 border-violet-500/30',
      route: '/admin/posts?status=scheduled',
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: FolderTree,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/40 border-cyan-500/30',
      route: '/admin/categories',
    },
    {
      title: 'Tags',
      value: stats.tags,
      icon: Tags,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/40 border-indigo-500/30',
      route: '/admin/tags',
    },
    {
      title: 'Contact Inquiries',
      value: stats.inquiries,
      subValue: stats.newInquiries > 0 ? `${stats.newInquiries} New` : undefined,
      icon: MessageSquareText,
      color: 'text-rose-400',
      bg: 'bg-rose-950/40 border-rose-500/30',
      route: '/admin/inquiries',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Quick Actions Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0C1428] to-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight font-display">
            Executive CMS Control Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, schedule, and optimize technical briefings and track qualified prospective client inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('/admin/posts/new')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-950/50 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Blog Post</span>
          </button>
          <button
            onClick={() => onNavigate('/admin/posts')}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all cursor-pointer"
          >
            Manage Posts
          </button>
          <button
            onClick={() => onNavigate('/admin/categories')}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all cursor-pointer"
          >
            Categories
          </button>
          <button
            onClick={() => onNavigate('/admin/media')}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all cursor-pointer"
          >
            Media Library
          </button>
          <button
            onClick={() => onNavigate('/admin/inquiries')}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all cursor-pointer"
          >
            View Inquiries
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigate(card.route)}
              className="p-4 rounded-2xl bg-[#090E1F] border border-slate-800/90 hover:border-slate-700 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-slate-400 truncate">{card.title}</span>
                <div className={`p-1.5 rounded-lg ${card.bg} border ${card.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-mono">{card.value}</span>
                {card.subValue && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {card.subValue}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Website CMS Content Modules */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Website CMS Modules
            </h3>
            <p className="text-xs text-slate-400">Direct access to manage public content, team, services, testimonials, and visibility.</p>
          </div>
          <button
            onClick={() => onNavigate('/admin/sections')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
          >
            Section Visibility Matrix <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'Sections', count: stats.sections, icon: Layers, route: '/admin/sections', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-500/30' },
            { label: 'Team', count: stats.teamMembers, icon: Users, route: '/admin/team', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-500/30' },
            { label: 'Services', count: stats.services, icon: Briefcase, route: '/admin/services-manage', color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-500/30' },
            { label: 'Case Studies', count: stats.caseStudies, icon: FolderKanban, route: '/admin/case-studies', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/30' },
            { label: 'Reviews', count: stats.testimonials, icon: MessageSquareQuote, route: '/admin/testimonials', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-500/30' },
            { label: 'FAQs', count: stats.faqs, icon: HelpCircle, route: '/admin/faqs', color: 'text-teal-400', bg: 'bg-teal-950/40 border-teal-500/30' },
            { label: 'Careers', count: stats.careers, icon: GraduationCap, route: '/admin/careers', color: 'text-pink-400', bg: 'bg-pink-950/40 border-pink-500/30' },
            { label: 'Locations', count: stats.locations, icon: Globe, route: '/admin/locations', color: 'text-indigo-400', bg: 'bg-indigo-950/40 border-indigo-500/30' },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.label}
                onClick={() => onNavigate(item.route)}
                className="p-3.5 rounded-xl bg-[#090E1F] border border-slate-800/90 hover:border-slate-700 cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-300 truncate">{item.label}</span>
                  <div className={`p-1 rounded-md ${item.bg} border ${item.color}`}>
                    <ItemIcon className="w-3 h-3" />
                  </div>
                </div>
                <span className="text-xl font-bold text-white font-mono">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Column: Recent Posts & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Posts (8 Cols) */}
        <div className="lg:col-span-7 bg-[#090E1F] border border-slate-800/90 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Recent Blog Articles</h3>
              <p className="text-xs text-slate-400">Latest publications and pending drafts in the CMS.</p>
            </div>
            <button
              onClick={() => onNavigate('/admin/posts')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">No blog posts found.</div>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                          post.status === 'published'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                            : post.status === 'scheduled'
                            ? 'bg-violet-950/60 text-violet-300 border-violet-500/30'
                            : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.categoryName && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          • {post.categoryName}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate hover:text-cyan-300 transition-colors">
                      {post.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigate(`/admin/posts/edit/${post.id}`)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-[#090E1F] border border-slate-800/90 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Recent Inquiries</h3>
              <p className="text-xs text-slate-400">Prospective client consultations received.</p>
            </div>
            <button
              onClick={() => onNavigate('/admin/inquiries')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentInquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">No inquiries received yet.</div>
            ) : (
              recentInquiries.map((inq) => {
                const s = (inq.source || '').toLowerCase();
                let sourceBadge = { label: inq.source || 'Contact Form', cls: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40' };
                if (s.includes('newsletter')) {
                  sourceBadge = { label: 'Newsletter', cls: 'bg-amber-950/60 text-amber-300 border-amber-500/40' };
                } else if (s.includes('career') || s.includes('job') || s.includes('candidate')) {
                  sourceBadge = { label: 'Job Application', cls: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' };
                } else if (s.includes('consultation')) {
                  sourceBadge = { label: 'Consultation', cls: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40' };
                } else if (s.includes('ai') || s.includes('feasibility')) {
                  sourceBadge = { label: 'AI Scoping', cls: 'bg-purple-950/60 text-purple-300 border-purple-500/40' };
                } else if (s.includes('homepage')) {
                  sourceBadge = { label: 'Homepage Lead', cls: 'bg-blue-950/60 text-blue-300 border-blue-500/40' };
                }

                return (
                  <div
                    key={inq.id}
                    onClick={() => onNavigate('/admin/inquiries')}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 hover:border-slate-700 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white truncate">{inq.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${sourceBadge.cls}`}>
                          {sourceBadge.label}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                            inq.status === 'New'
                              ? 'bg-rose-950/60 text-rose-300 border-rose-500/40 animate-pulse'
                              : inq.status === 'Converted'
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] text-cyan-400 font-mono truncate">{inq.service || 'General Brief'}</div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {inq.projectDetails}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
