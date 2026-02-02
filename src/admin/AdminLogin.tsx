import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Terminal, ArrowLeft, Loader2 } from 'lucide-react';
import { isFirebaseConfigured } from '../services/firebase';
export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Login failed');
    }
  };
  const isDemo = !isFirebaseConfigured();
  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-black px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-terminal-muted hover:text-accent-blue mb-8 text-sm font-mono">

          <ArrowLeft size={14} className="mr-2" /> Back to site
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terminal-card border border-terminal-border mb-4">
            <Lock className="text-accent-red" size={32} />
          </div>
          <h1 className="text-2xl font-mono font-bold text-terminal-text">
            <span className="text-accent-red">sudo</span> login
          </h1>
          <p className="text-terminal-muted mt-2 font-mono text-sm">
            Authentication required for admin access
          </p>

          {isDemo &&
          <div className="mt-4 bg-accent-yellow/10 border border-accent-yellow/30 rounded-lg p-3 text-left">
              <p className="text-accent-yellow text-xs font-mono font-bold mb-1">
                ⚠️ Demo Mode
              </p>
              <p className="text-terminal-muted text-xs">
                Firebase not configured. Using local storage.
                <br />
                <span className="text-terminal-text">Email:</span>{' '}
                fatoyejoseph@gmail.com
                <br />
                <span className="text-terminal-text">Password:</span> admin123
              </p>
            </div>
          }
        </div>

        <div className="bg-terminal-card border border-terminal-border rounded-lg p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error &&
            <div className="bg-accent-red/10 border border-accent-red/50 text-accent-red px-4 py-3 rounded text-sm font-mono flex items-start">
                <Terminal size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            }

            <div>
              <label className="block text-terminal-muted text-xs font-mono mb-2 uppercase tracking-wider">
                User ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-terminal-black border border-terminal-border rounded p-3 text-terminal-text focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all font-mono"
                placeholder="admin@system.local"
                required />

            </div>

            <div>
              <label className="block text-terminal-muted text-xs font-mono mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-terminal-black border border-terminal-border rounded p-3 text-terminal-text focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue transition-all font-mono"
                placeholder="••••••••"
                required />

            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-blue hover:bg-accent-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono font-bold py-3 rounded transition-colors flex items-center justify-center">

              {isLoading ?
              <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Authenticating...
                </> :

              <>
                  <Terminal size={18} className="mr-2" />
                  Authenticate
                </>
              }
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-terminal-muted text-xs font-mono">
            System protected. All access attempts are logged.
          </p>
        </div>
      </div>
    </div>);

}