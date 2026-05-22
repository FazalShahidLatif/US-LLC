import React, { useState } from 'react';
import { Scale, ShieldCheck, Lock, Mail, AlertCircle, ArrowRight, Home } from 'lucide-react';
import { AuthSession } from '../types';

interface LoginProps {
  onLoginSuccess: (session: AuthSession) => void;
  onNavigateHome: () => void;
}

export default function Login({ onLoginSuccess, onNavigateHome }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Built-in credential helper configurations
  const PRESET_CREDENTIALS = [
    {
      label: 'Admin Account',
      email: 'admin@saasskul.com',
      password: 'admin-secret-access',
      role: 'admin',
      badge: 'Chief Admin Counsel'
    },
    {
      label: 'Staff Account',
      email: 'staff@saasskul.com',
      password: 'staff-secret-access',
      role: 'staff',
      badge: 'Senior Operations Staff'
    },
    {
      label: 'Standard Client',
      email: 'user@saasskul.com',
      password: 'user-secret-access',
      role: 'user',
      badge: 'Beta Corporate Founder'
    }
  ];

  const handlePresetClick = (presetMail: string, presetPass: string) => {
    setEmail(presetMail);
    setPassword(presetPass);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both credential fields to proceed.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authenication failed. Please check registry credentials.');
      }

      const session: AuthSession = {
        token: data.token,
        email: data.email,
        role: data.role,
        name: data.name
      };

      // Trigger callback to set parent state and perform smart redirects
      onLoginSuccess(session);

    } catch (err: any) {
      setErrorMessage(err.message || 'Network error connection or system timeout.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col justify-between selection:bg-indigo-600/35 selection:text-white" id="login-subpanel">
      {/* Editorial Watermark background shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-3xl"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
      </div>

      {/* Top logo & navigation shortcut */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-indigo-950/60">
        <button 
          onClick={onNavigateHome}
          className="flex items-center space-x-2.5 hover:opacity-90 transition-all font-sans text-left bg-transparent border-0 cursor-pointer"
        >
          <span className="h-9 w-9 rounded-none bg-indigo-900/60 border border-indigo-800 flex items-center justify-center text-white shadow-inner">
            <Scale className="w-5 h-5 text-indigo-400" />
          </span>
          <div>
            <span className="text-lg font-serif font-black text-white uppercase tracking-tight">US LLC</span>
            <span className="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold font-mono">Launch & Shield</span>
          </div>
        </button>

        <button 
          onClick={onNavigateHome}
          className="px-4 py-2 border border-indigo-900 bg-indigo-950/50 hover:bg-indigo-905 text-white rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home Portal</span>
        </button>
      </header>

      {/* Main card box core grid */}
      <main className="relative z-10 flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header context */}
          <div className="text-center space-y-2">
            <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-indigo-300 bg-indigo-950 border border-indigo-900 px-3 py-1 rounded-none font-mono">
              Secure Operations Ingress Gate
            </span>
            <h2 className="text-3xl font-serif font-black tracking-tight text-white">
              System Authorization
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto font-body-serif leading-relaxed">
              Verify legal credentials and session credentials on the US LLC administration gateway.
            </p>
          </div>

          <div className="bg-[#0e1424] rounded-none border border-indigo-900/60 p-6 sm:p-8 space-y-6 shadow-2xl relative" id="auth-card">
            {/* Top tiny status strip */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-550"></div>

            {errorMessage && (
              <div className="p-4 bg-rose-950/80 border border-rose-900 text-rose-200 text-xs flex items-start gap-3 rounded-none font-sans leading-relaxed">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5 uppercase tracking-wide">Validation Error</span>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase font-bold tracking-widest text-indigo-300 font-mono">
                  Administrative Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. counsel@usllc.online"
                    className="w-full text-xs rounded-none bg-indigo-950/60 border border-indigo-900 focus:bg-indigo-955 focus:border-indigo-500 transition-all pl-9 pr-3 py-3 focus:outline-none text-slate-100 font-semibold"
                    required
                  />
                  <Mail className="w-4 h-4 text-indigo-400/70 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase font-bold tracking-widest text-indigo-300 font-mono">
                  Security Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs rounded-none bg-indigo-950/60 border border-indigo-900 focus:bg-indigo-955 focus:border-indigo-500 transition-all pl-9 pr-3 py-3 focus:outline-none text-slate-100 font-semibold"
                    required
                  />
                  <Lock className="w-4 h-4 text-indigo-400/70 absolute left-3 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 mt-2 bg-indigo-650 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-indigo-500"
              >
                <span>{isLoading ? 'Verifying Credentials...' : 'Sign In To Terminal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-indigo-950"></div>
              <span className="flex-shrink mx-4 text-[9px] uppercase font-bold tracking-widest text-indigo-400/80 font-mono">
                Development Test Ingress Presets
              </span>
              <div className="flex-grow border-t border-indigo-950"></div>
            </div>

            {/* Quick pre-configured profiles select triggers */}
            <div className="space-y-2.5">
              <p className="text-[10px] text-center text-slate-400 font-body-serif italic">
                Click a testing role target to dynamically load matched credentials:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {PRESET_CREDENTIALS.map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => handlePresetClick(cred.email, cred.password)}
                    className="p-3 text-left border border-indigo-950 hover:border-indigo-800 bg-[#0c111e] hover:bg-slate-900 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <span className="block text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {cred.label}
                      </span>
                      <span className="block text-[10px] text-slate-450 font-mono">
                        {cred.email}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-900 font-semibold">
                      {cred.role.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
          
          <div className="text-center">
            <p className="text-[9px] text-indigo-400 uppercase tracking-widest font-mono flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 animate-[pulse_2s_infinite]" />
              <span>Full compliance operations aligned 50 states</span>
            </p>
          </div>

        </div>
      </main>

      {/* Standard small foot print */}
      <footer className="relative z-10 w-full text-center py-6 border-t border-indigo-950/40 text-[10px] text-slate-500 font-mono">
        <p>© 2026 US LLC. Staging sandbox built for usllc.online development context.</p>
      </footer>
    </div>
  );
}
