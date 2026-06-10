'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, '').trim());
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) { setError('Enter your email address first.'); return; }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message.replace('Firebase: ', '').trim());
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-lg">A</span>
          </div>
          <span className="text-white font-display text-xl font-semibold">APJ TRUE LIFE</span>
        </div>
        <div className="space-y-8">
          <h1 className="text-white font-display text-4xl font-bold leading-tight">
            Ayurvedic Healthcare,<br />Digitised.
          </h1>
          <div className="space-y-4">
            {[
              { icon: '🔒', title: 'Secure Medical Records', desc: 'Patient data protected with Firebase Auth & encrypted storage' },
              { icon: '📋', title: 'Treatment Plans', desc: 'Create multi-phase Ayurvedic treatment plans with ease' },
              { icon: '📅', title: 'Schedule Management', desc: 'Full appointment calendar with real-time notifications' },
            ].map(f => (
              <div key={f.title} className="flex gap-4">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-white font-medium">{f.title}</p>
                  <p className="text-white/70 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/50 text-sm">AYUSH TV National Health Award 2024 Winner</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-primary-dark">Doctor Login</h2>
            <p className="text-gray-500 mt-2">Sign in to your clinical dashboard</p>
          </div>

          {resetSent && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
              Password reset email sent. Check your inbox.
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-outline rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="doctor@apjtruelife.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-outline rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-outline" />
                Remember me for 30 days
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-sm text-primary hover:underline">
                Forgot Password?
              </button>
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400">
            🔒 Secure connection · APJ TRUE LIFE Clinical Portal v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
