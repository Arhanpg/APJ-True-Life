'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      router.push('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) { setError('Enter your email first.'); return; }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch {
      setError('Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex w-[480px] flex-col justify-between p-12" style={{ background: 'var(--primary)' }}>
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-white font-display text-xl font-semibold">APJ TRUE LIFE</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-4 leading-snug">Ayurvedic Excellence, Digitised.</h1>
          <p className="text-green-200 text-base leading-relaxed">Manage your patients, treatments, and appointments from one powerful dashboard.</p>
        </div>
        <div className="space-y-4">
          {['Secure Medical Records','Multi-Phase Treatment Plans','Schedule Management'].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-green-100 text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--primary-dark)' }}>Doctor Login</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Sign in to your clinical dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#FFEBEE', color: 'var(--error)' }}>{error}</div>
          )}
          {resetSent && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#EAF4EC', color: 'var(--primary)' }}>Password reset email sent. Check your inbox.</div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: '#C0C9BF', background: 'var(--surface)' }}
                placeholder="doctor@apjtruelife.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: '#C0C9BF', background: 'var(--surface)' }}
                placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-muted)' }}>
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded" />
                Remember me for 30 days
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Forgot Password?</button>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg text-white font-medium text-sm transition-opacity disabled:opacity-60"
              style={{ background: 'var(--primary)' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-xs text-center" style={{ color: 'var(--outline)' }}>
            🔒 Secure connection. Medical data is encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
}
