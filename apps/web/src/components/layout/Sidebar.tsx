'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/patients', label: 'Patients', icon: '👥' },
  { href: '/treatments', label: 'Treatments', icon: '🌿' },
  { href: '/appointments', label: 'Appointments', icon: '📅' },
  { href: '/chat', label: 'Messages', icon: '💬' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useAuthStore((s) => s.clearUser);

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    router.push('/login');
  };

  return (
    <aside className="w-60 flex flex-col h-screen flex-shrink-0" style={{ background: 'var(--primary)' }}>
      {/* Logo */}
      <div className="px-5 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold)' }}>
            <span className="text-white font-bold text-base">A</span>
          </div>
          <div>
            <p className="text-white font-display font-semibold text-sm leading-tight">APJ TRUE LIFE</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Ayurvedic Centre</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative"
              style={isActive
                ? { background: 'rgba(255,255,255,0.15)', color: 'white', borderLeft: '3px solid var(--gold)' }
                : { color: 'rgba(255,255,255,0.75)' }}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{ color: 'rgba(255,255,255,0.75)' }}>
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
