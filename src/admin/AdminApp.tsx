import React, { useState, useEffect } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { ToastProvider } from './components/Toast';
import { AdminLayout } from './components/AdminLayout';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PostsListPage } from './pages/PostsListPage';
import { PostEditorPage } from './pages/PostEditorPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TagsPage } from './pages/TagsPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { MediaPage } from './pages/MediaPage';
import { InquiriesPage } from './pages/InquiriesPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { useRouter } from '../context/RouterContext';

const AdminRouteController: React.FC = () => {
  const { user, isLoading } = useAdminAuth();
  const { currentPath, navigate } = useRouter();

  // Normalize path
  const path = currentPath.split('?')[0].replace(/\/$/, '') || '/admin';

  // Authentication guards
  useEffect(() => {
    if (!isLoading) {
      if (!user && path !== '/admin/login') {
        navigate('/admin/login');
      } else if (user && path === '/admin/login') {
        navigate('/admin/dashboard');
      }
    }
  }, [user, isLoading, path, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060A17] flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span className="text-xs font-mono tracking-wider text-cyan-300">Authenticating CMS Admin...</span>
      </div>
    );
  }

  // If on login page
  if (path === '/admin/login') {
    return <AdminLoginPage onSuccess={() => navigate('/admin/dashboard')} />;
  }

  // Not logged in fallback while redirecting
  if (!user) {
    return null;
  }

  // Handle Edit Post Route: /admin/posts/edit/:id
  if (path.startsWith('/admin/posts/edit/')) {
    const postId = path.replace('/admin/posts/edit/', '');
    return (
      <AdminLayout
        currentRoute="/admin/posts"
        onNavigate={navigate}
        breadcrumbs={[
          { label: 'Content' },
          { label: 'All Posts', route: '/admin/posts' },
          { label: 'Edit Post' },
        ]}
      >
        <PostEditorPage postId={postId} onNavigate={navigate} />
      </AdminLayout>
    );
  }

  // Handle specific admin subroutes
  switch (path) {
    case '/admin':
    case '/admin/dashboard':
      return (
        <AdminLayout
          currentRoute="/admin/dashboard"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Dashboard' }]}
        >
          <DashboardPage onNavigate={navigate} />
        </AdminLayout>
      );

    case '/admin/posts':
      return (
        <AdminLayout
          currentRoute="/admin/posts"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Content' }, { label: 'All Posts' }]}
        >
          <PostsListPage
            onNavigate={navigate}
            onPreviewPost={(slug) => {
              window.open(`/blog/${slug}?preview=true`, '_blank');
            }}
          />
        </AdminLayout>
      );

    case '/admin/posts/new':
      return (
        <AdminLayout
          currentRoute="/admin/posts/new"
          onNavigate={navigate}
          breadcrumbs={[
            { label: 'Content' },
            { label: 'All Posts', route: '/admin/posts' },
            { label: 'New Post' },
          ]}
        >
          <PostEditorPage onNavigate={navigate} />
        </AdminLayout>
      );

    case '/admin/categories':
      return (
        <AdminLayout
          currentRoute="/admin/categories"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Content' }, { label: 'Categories' }]}
        >
          <CategoriesPage />
        </AdminLayout>
      );

    case '/admin/tags':
      return (
        <AdminLayout
          currentRoute="/admin/tags"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Content' }, { label: 'Tags' }]}
        >
          <TagsPage />
        </AdminLayout>
      );

    case '/admin/authors':
      return (
        <AdminLayout
          currentRoute="/admin/authors"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Content' }, { label: 'Authors' }]}
        >
          <AuthorsPage />
        </AdminLayout>
      );

    case '/admin/media':
      return (
        <AdminLayout
          currentRoute="/admin/media"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Content' }, { label: 'Media Library' }]}
        >
          <MediaPage />
        </AdminLayout>
      );

    case '/admin/inquiries':
      return (
        <AdminLayout
          currentRoute="/admin/inquiries"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Communication' }, { label: 'Contact Inquiries' }]}
        >
          <InquiriesPage />
        </AdminLayout>
      );

    case '/admin/settings':
      return (
        <AdminLayout
          currentRoute="/admin/settings"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Website' }, { label: 'Site Settings' }]}
        >
          <SettingsPage />
        </AdminLayout>
      );

    case '/admin/profile':
      return (
        <AdminLayout
          currentRoute="/admin/profile"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Account' }, { label: 'Admin Profile' }]}
        >
          <ProfilePage />
        </AdminLayout>
      );

    default:
      return (
        <AdminLayout
          currentRoute="/admin/dashboard"
          onNavigate={navigate}
          breadcrumbs={[{ label: 'Dashboard' }]}
        >
          <DashboardPage onNavigate={navigate} />
        </AdminLayout>
      );
  }
};

export const AdminApp: React.FC = () => {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <AdminRouteController />
      </ToastProvider>
    </AdminAuthProvider>
  );
};
