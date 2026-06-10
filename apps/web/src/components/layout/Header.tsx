'use client';
import { useAuthStore } from '@/store/authStore';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/patients': 'Patients',
  '/treatments': 'Treatment Plans',
  '/appointments': 'Appointments',
  '/chat': 'Messages',
  '/settings': 'Settings',
};

export function Header() {
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const title = Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] || 'Dashboard';

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
      <div>
        <h1 className="font-display text-lg font-semibold" style={{ color: 'var(--primary-dark)' }}>{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg transition-all" style={{ background: 'var(--surface-tint)' }}>
          <span className="text-lg">🔔</span>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{ background: 'var(--error)' }}>3</span>
        </button>
        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: 'var(--secondary)' }}>
            {user?.displayName?.[0]?.toUpperCase() || 'D'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{user?.displayName || 'Dr. Vaidya'}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Chief Physician</p>
          </div>
        </div>
      </div>
    </header>
  );
}
