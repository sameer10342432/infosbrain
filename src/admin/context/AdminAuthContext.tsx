import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => Promise<void>;
  updateUser: (user: AdminUser) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('infosbrain_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('infosbrain_admin_token') || null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate session with server on mount
  useEffect(() => {
    async function verifySession() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Offline sessions stay valid locally
      if (token.startsWith('offline_token_')) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: 'include',
        });

        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (data?.user) {
              setUser(data.user);
              localStorage.setItem('infosbrain_admin_user', JSON.stringify(data.user));
              return;
            }
          }
        }

        // Only explicitly unauthorized from real API resets credentials
        if (res.status === 401 || res.status === 403) {
          setUser(null);
          setToken(null);
          localStorage.removeItem('infosbrain_admin_user');
          localStorage.removeItem('infosbrain_admin_token');
        }
        // If 404 (static host / GitHub Pages) or 500, keep cached user
      } catch {
        // Offline or network error - keep cached state if exists
      } finally {
        setIsLoading(false);
      }
    }

    verifySession();
  }, [token]);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('infosbrain_admin_token', newToken);
    localStorage.setItem('infosbrain_admin_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      });
    } catch {
      // Ignore
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('infosbrain_admin_token');
      localStorage.removeItem('infosbrain_admin_user');
    }
  };

  const updateUser = (updated: AdminUser) => {
    setUser(updated);
    localStorage.setItem('infosbrain_admin_user', JSON.stringify(updated));
  };

  return (
    <AdminAuthContext.Provider value={{ user, token, isLoading, login, logout, updateUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
