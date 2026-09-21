import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Tags,
  Users,
  Image as ImageIcon,
  MessageSquareText,
  Settings,
  UserCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
  pageTitle?: string;
  breadcrumbs?: { label: string; route?: string }[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentRoute,
  onNavigate,
  pageTitle,
  breadcrumbs = [],
}) => {
  const { user, logout, token } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newInquiriesCount, setNewInquiriesCount] = useState<number>(0);

  // Fetch inquiry counts for notification badge
  useEffect(() => {
    async function checkInquiries() {
      try {
        const res = await fetch('/api/inquiries/admin?limit=1', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          if (data.statusCounts && typeof data.statusCounts.New === 'number') {
            setNewInquiriesCount(data.statusCounts.New);
          }
        }
      } catch {
        // Ignore
      }
    }
    checkInquiries();
  }, [token, currentRoute]);

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', route: '/admin/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Content & CMS',
      items: [
        { label: 'All Posts', route: '/admin/posts', icon: FileText },
        { label: 'Add New Post', route: '/admin/posts/new', icon: PlusCircle },
        { label: 'Categories', route: '/admin/categories', icon: FolderTree },
        { label: 'Tags', route: '/admin/tags', icon: Tags },
        { label: 'Authors', route: '/admin/authors', icon: Users },
        { label: 'Media Library', route: '/admin/media', icon: ImageIcon },
      ],
    },
    {
      group: 'Communication',
      items: [
        {
          label: 'Contact Inquiries',
          route: '/admin/inquiries',
          icon: MessageSquareText,
          badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
        },
      ],
    },
    {
      group: 'Settings',
      items: [
        { label: 'Site Settings', route: '/admin/settings', icon: Settings },
      ],
    },
    {
      group: 'Account',
      items: [
        { label: 'Admin Profile', route: '/admin/profile', icon: UserCheck },
      ],
    },
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out of the Admin Panel?')) {
      await logout();
      onNavigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-slate-100 flex font-sans antialiased selection:bg-cyan-500 selection:text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0A1022] border-r border-slate-800/90 shrink-0 sticky top-0 h-screen z-20">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-900/30">
              IB
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight leading-tight">InfosBrain</div>
              <div className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                CMS Admin
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            v2.0
          </span>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-300 font-bold mb-1.5">
                {group.group}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  currentRoute === item.route ||
                  (item.route === '/admin/posts' && currentRoute.startsWith('/admin/posts/edit'));

                return (
                  <button
                    key={item.route}
                    onClick={() => handleNav(item.route)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-500 text-slate-950">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Footer Card */}
        <div className="p-3 border-t border-slate-800 bg-[#080D1D]">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</div>
                <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 max-w-[80vw] bg-[#0A1022] border-r border-slate-800 flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  IB
                </div>
                <span className="text-sm font-bold text-white">InfosBrain Admin</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-5">
              {navGroups.map((group) => (
                <div key={group.group} className="space-y-1">
                  <div className="px-3 text-[10px] font-mono uppercase text-slate-300 font-bold mb-1">
                    {group.group}
                  </div>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentRoute === item.route;
                    return (
                      <button
                        key={item.route}
                        onClick={() => handleNav(item.route)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-500 text-slate-950">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-950/30 border border-rose-500/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 h-16 bg-[#080D1D]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => onNavigate('/admin/dashboard')}
                className="hover:text-cyan-300 transition-colors"
              >
                Admin
              </button>
              {breadcrumbs.map((b, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  {b.route ? (
                    <button
                      onClick={() => onNavigate(b.route!)}
                      className="hover:text-cyan-300 transition-colors"
                    >
                      {b.label}
                    </button>
                  ) : (
                    <span className="text-slate-200 font-medium">{b.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <button
              onClick={() => onNavigate('/admin/posts/new')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-950/50 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {pageTitle && (
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                {pageTitle}
              </h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};
