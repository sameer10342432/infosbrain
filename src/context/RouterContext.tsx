import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Normalize initial path from window.location.pathname or hash
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    // If hash routing is used (e.g. #/about), extract it
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    let p = window.location.pathname || '/';
    // If running in a repository subpath on github.io or similar static hosts
    if (window.location.hostname.includes('github.io')) {
      p = p.replace(/^\/[^/]+(?=\/|$)/, '') || '/';
    }
    return p.startsWith('/') ? p : `/${p}`;
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setCurrentPath(window.location.hash.slice(1));
      } else {
        let p = window.location.pathname || '/';
        if (window.location.hostname.includes('github.io')) {
          p = p.replace(/^\/[^/]+(?=\/|$)/, '') || '/';
        }
        setCurrentPath(p.startsWith('/') ? p : `/${p}`);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('#') && !path.startsWith('#/')) {
      // It is an anchor on the current page
      const id = path.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // If path has an anchor (e.g. /#process)
    if (path.includes('#') && !path.startsWith('#/')) {
      const [targetPath, hash] = path.split('#');
      if (targetPath === '' || targetPath === currentPath) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }

    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Update browser history or hash
    if (window.location.hostname.includes('github.io')) {
      window.location.hash = `#${path}`;
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, searchQuery, setSearchQuery }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
