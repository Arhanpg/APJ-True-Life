'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Firebase signInWithEmailAndPassword will be wired here
      // For now navigate to dashboard as demo
      await new Promise(r => setTimeout(r, 800));
      router.push('/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left — Brand panel */}
      <div style={{ background: 'linear-gradient(160deg, #1A5C38 0%, #004324 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: '#C9A84C', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#1A5C38', fontWeight: 900, fontSize: 18 }}>A</span>
          </div>
          <span style={{ color: '#fff', fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: 18 }}>APJ TRUE LIFE</span>
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 999, padding: '6px 14px', marginBottom: 24 }}>
            <span style={{ color: '#C9A84C', fontSize: 14 }}>🏆</span>
            <span style={{ color: '#C9A84C', fontSize: 12, fontWeight: 600 }}>AYUSH TV National Health Award 2024</span>
          </div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 20 }}>Your Complete Ayurvedic Clinical Management Platform</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🔒', title: 'Secure Medical Records', desc: 'DPDP Act 2023 compliant patient data management' },
              { icon: '📋', title: 'Treatment Plans', desc: 'Multi-phase Ayurvedic treatment lifecycle management' },
              { icon: '📅', title: 'Schedule Management', desc: 'Calendar, appointments, and real-time patient chat' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{f.title}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>© 2024 APJ TRUE LIFE Ayurvedic Medical Centre</p>
      </div>

      {/* Right — Login form */}
      <div style={{ background: '#EDFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 700, color: '#004324', marginBottom: 8 }}>Welcome back</h2>
          <p style={{ fontSize: 14, color: '#707971', marginBottom: 32 }}>Sign in to your clinical dashboard</p>

          {error && (
            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#BA1A1A' }}>{error}</div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="doctor@apjtruelife.com"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #C0C9BF', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none', background: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 44px 12px 14px', border: '1.5px solid #C0C9BF', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none', background: '#fff' }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#707971', fontSize: 16 }}>
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#404941' }}>
                <input type="checkbox" />
                Remember me for 30 days
              </label>
              <a href="#" style={{ fontSize: 13, color: '#1A5C38', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <button type="submit" disabled={loading}
              style={{ width: '100%', background: loading ? '#2E7D52' : '#1A5C38', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 24, padding: '14px', background: 'rgba(26,92,56,0.06)', borderRadius: 10, border: '1px solid rgba(26,92,56,0.15)' }}>
            <p style={{ fontSize: 12, color: '#1A5C38', fontWeight: 600, marginBottom: 4 }}>🔐 Secure Connection</p>
            <p style={{ fontSize: 11, color: '#707971' }}>This dashboard is exclusively for licensed Ayurvedic practitioners of APJ TRUE LIFE.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
