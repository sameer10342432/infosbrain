import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../components/Toast';
import { useRouter } from '../../context/RouterContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess }) => {
  const { login } = useAdminAuth();
  const { success, error } = useToast();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fillDefaultCredentials = () => {
    setEmail('admin@infosbrain.com');
    setPassword('Admin@123456');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setLoading(true);

    const isDefaultAdmin =
      cleanEmail === 'admin@infosbrain.com' &&
      cleanPassword === 'Admin@123456';

    try {
      let isNetworkFailure = false;
      let res: Response | null = null;

      try {
        res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        });
      } catch {
        isNetworkFailure = true;
      }

      // Check if server responded with JSON
      if (res) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          let data: any = null;
          try {
            data = await res.json();
          } catch {
            data = null;
          }

          if (res.ok && data?.success) {
            login(data.token, data.user);
            success(`Welcome back, ${data.user.name}!`);
            onSuccess();
            return;
          } else if (data?.error) {
            setErrorMessage(data.error);
            error(data.error);
            return;
          }
        }
      }

      // If server is unreachable, returned 404 (e.g. GitHub Pages static hosting), or network failed:
      if (isDefaultAdmin) {
        // Fallback to offline / local administrator session
        const offlineUser = {
          id: 'usr_offline_admin',
          email: 'admin@infosbrain.com',
          name: 'InfosBrain Admin',
          role: 'admin',
        };
        const offlineToken = 'offline_token_' + Date.now();
        login(offlineToken, offlineUser);
        success('Signed in as Administrator (Offline / Local CMS Mode)');
        onSuccess();
        return;
      }

      if (isNetworkFailure || !res || res.status === 404 || res.status >= 500) {
        setErrorMessage(
          'API authentication service is currently offline or unreachable. To sign in offline, please use default administrator credentials: admin@infosbrain.com / Admin@123456'
        );
        error('API server unreachable.');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
        error('Login failed.');
      }
    } catch {
      if (isDefaultAdmin) {
        const offlineUser = {
          id: 'usr_offline_admin',
          email: 'admin@infosbrain.com',
          name: 'InfosBrain Admin',
          role: 'admin',
        };
        const offlineToken = 'offline_token_' + Date.now();
        login(offlineToken, offlineUser);
        success('Signed in as Administrator (Offline / Local CMS Mode)');
        onSuccess();
      } else {
        setErrorMessage(
          'Authentication service is offline. To access the portal, use default credentials: admin@infosbrain.com / Admin@123456'
        );
        error('Server unreachable.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060A17] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#0C1326] border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/80">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-black text-xl shadow-lg shadow-cyan-900/40 mb-4">
            IB
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">
            InfosBrain CMS Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">
            Sign in with authorized administrative credentials to manage content and inquiries.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@infosbrain.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={fillDefaultCredentials}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Fill Default Credentials</span>
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Encrypted Session</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Back to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
