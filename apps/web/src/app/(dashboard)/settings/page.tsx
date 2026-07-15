'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    try {
      await authApi.logout();
    } catch {
      // Ignore errors on logout — clear local state regardless
    } finally {
      router.push('/login');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
      <div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Settings</h1>
        <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>Account and security settings</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Security</h2>
        </div>
        <div style={{ padding: 20 }}>
          <p style={{ fontSize: 13, color: '#707971', marginBottom: 20 }}>
            Your session is secured with RS256 JWT (15-minute TTL) and a 7-day refresh token stored in httpOnly cookies.
          </p>
          <button
            onClick={handleLogout}
            disabled={loading}
            style={{ background: '#BA1A1A', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Logging out…' : 'Sign Out'}
          </button>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Compliance</h2>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'DPDP Act 2023 Compliance', status: 'Active', color: '#1A5C38' },
              { label: 'Data Retention Policy', status: '3 years post last appointment', color: '#404941' },
              { label: 'Encryption', status: 'AES-256 at rest, TLS 1.3 in transit', color: '#404941' },
              { label: 'Patient Consent', status: 'Granular, DPDP-compliant', color: '#404941' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#111E18' }}>{item.label}</span>
                <span style={{ fontSize: 13, color: item.color, fontWeight: 600 }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
