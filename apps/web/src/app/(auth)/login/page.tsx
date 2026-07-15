'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

/**
 * Doctor Login Page — APJ TRUE LIFE Dashboard
 *
 * Auth strategy (per Build Guide Section 3.2):
 * - POST /api/auth/login to Spring Boot auth-service
 * - Returns RS256 JWT (15min) + refresh token (7 days) as httpOnly cookies
 * - NOT Firebase Auth — that is for patients only
 *
 * Per README Section "How Auth Works":
 * - iss = 'apj-auth' → Spring JWT path (DOCTOR/ADMIN)
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await authApi.login(email, password);
      if (result.success) {
        // JWT is now in httpOnly cookie — navigate to dashboard
        router.push('/dashboard');
      }
    } catch (err: any) {
      if (err.message?.includes('Invalid credentials') || err.message?.includes('401')) {
        setError('Incorrect email or password. Please try again.');
      } else if (err.message?.includes('disabled')) {
        setError('Your account has been disabled. Contact the admin.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left: Branding */}
      <div style={{ background: '#1A5C38', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 56px', color: '#fff' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, background: '#C9A84C', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#1A5C38', fontWeight: 800, fontSize: 18 }}>A</span>
            </div>
            <div>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>APJ TRUE LIFE</p>
              <p style={{ fontSize: 12, opacity: 0.7 }}>Ayurvedic Medical Centre</p>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <span style={{ background: '#C9A84C', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>🏆 AYUSH TV National Health Award 2024</span>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Clinical Dashboard for Vaidyas</h1>
        <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 48, lineHeight: 1.6 }}>Manage your patients, treatment plans, appointments, and communications — all in one place.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { icon: '🔒', title: 'Secure Medical Records', desc: 'Encrypted patient data with role-based access control' },
            { icon: '🌿', title: 'Treatment Plans', desc: 'Multi-phase Ayurvedic treatment plan management' },
            { icon: '📅', title: 'Schedule Management', desc: 'Full appointment calendar and booking system' },
          ].map(f => (
            <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: 2 }}>{f.title}</p>
                <p style={{ fontSize: 13, opacity: 0.7 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Login form */}
      <div style={{ background: '#EDFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#004324', marginBottom: 8 }}>Doctor Login</h2>
          <p style={{ fontSize: 14, color: '#707971', marginBottom: 32 }}>Sign in to access your clinical dashboard</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404941', marginBottom: 8 }}>Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="doctor@apjtruelife.com"
                style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', background: '#fff', color: '#111E18', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#404941' }}>Password</label>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', background: '#fff', color: '#111E18', boxSizing: 'border-box' }}
              />
            </div>

            {error && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#BA1A1A' }}>
                {error}
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              style={{ background: loading ? '#707971' : '#1A5C38', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, transition: 'background 0.2s' }}
            >
              {loading ? 'Signing in…' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div style={{ marginTop: 32, padding: '16px', background: '#fff', borderRadius: 10, border: '1px solid #D4E8D8', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <p style={{ fontSize: 12, color: '#707971' }}>Secure connection. Patient data protected under DPDP Act 2023 &amp; IT Act 2000.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
