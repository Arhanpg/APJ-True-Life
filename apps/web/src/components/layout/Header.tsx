'use client';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const { user } = useAuthStore();
  const email = user?.email ?? 'Doctor';
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <header style={{
      height: 64, background: '#fff', borderBottom: '1px solid #E1F2E8',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0, position: 'sticky', top: 0, zIndex: 10
    }}>
      <div />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Notification bell */}
        <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, color: '#404941' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{initials}</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#111E18' }}>{email.split('@')[0]}</span>
        </div>
      </div>
    </header>
  );
}
