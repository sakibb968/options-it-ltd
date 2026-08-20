import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  User, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  Building
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Admin');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await apiClient.register({
          name,
          email,
          password,
          role,
          companyName
        });
        localStorage.setItem('options_it_token', res.token);
        localStorage.setItem('options_it_user', JSON.stringify(res.user));
        onLoginSuccess(res.user, res.token);
        onClose();
      } else {
        const res = await apiClient.login({ email, password });
        localStorage.setItem('options_it_token', res.token);
        localStorage.setItem('options_it_user', JSON.stringify(res.user));
        onLoginSuccess(res.user, res.token);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0B1F4D] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#071438] text-slate-400 hover:text-white border border-blue-900/50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#071438] border border-blue-400/40 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {isRegister ? 'Create Agency Account' : 'Options IT Portal Login'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister ? 'Register for Admin or Client access' : 'Enter credentials for Admin Dashboard or Client Hub'}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1-Click Demo Logins */}
        {!isRegister && (
          <div className="mb-5 p-3 rounded-2xl bg-[#071438] border border-blue-900/60">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Quick 1-Click Demo Credentials:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@optionitld.com', 'Admin@2026')}
                className="px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-800/80 text-[11px] text-blue-300 font-semibold text-left transition-colors"
              >
                👑 <strong>Admin</strong> (Full CRM)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('superadmin@optionitld.com', 'SuperAdmin@2026')}
                className="px-2.5 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-800/80 text-[11px] text-purple-300 font-semibold text-left transition-colors"
              >
                ⚡ <strong>Super Admin</strong>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('client@apexnutrition.com', 'Client@2026')}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 text-[11px] text-emerald-300 font-semibold text-left transition-colors"
              >
                💼 <strong>Client Portal</strong>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('editor@optionitld.com', 'Editor@2026')}
                className="px-2.5 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-800/80 text-[11px] text-amber-300 font-semibold text-left transition-colors"
              >
                ✍️ <strong>Content Editor</strong>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Sakib Al-Hasan"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Role</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Client">Client</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="Options IT Ltd"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="admin@optionitld.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-sm text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#071438] border border-blue-900 text-sm text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-blue-900/50 text-center flex items-center justify-between text-xs text-slate-400">
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-[#0066FF] hover:underline"
          >
            {isRegister ? 'Already have an account? Sign In' : 'Need an account? Register'}
          </button>

          <span className="text-[10px] text-slate-500 font-mono">JWT RBAC v1.0</span>
        </div>

      </div>
    </div>
  );
};
