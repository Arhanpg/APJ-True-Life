'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard',    label: 'Dashboard',   icon: '🏠' },
  { href: '/patients',     label: 'Patients',     icon: '👤' },
  { href: '/treatments',   label: 'Treatments',   icon: '📋' },
  { href: '/appointments', label: 'Appointments', icon: '📅' },
  { href: '/chat',         label: 'Chat',         icon: '💬' },
  { href: '/archive',      label: 'Archive',      icon: '🗂️' },
  { href: '/settings',     label: 'Settings',     icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 h-screen fixed top-0 left-0 bg-primary flex flex-col z-20">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded-md flex items-center justify-center">
            <span className="text-primary font-bold text-sm">A</span>
          </div>
          <div>
            <p className="text-white font-display font-semibold text-sm leading-tight">APJ TRUE LIFE</p>
            <p className="text-white/50 text-xs">Clinical Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/15 text-white border-l-2 border-gold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-white/40 text-xs">AYUSH TV Award 2024</p>
        <p className="text-white/30 text-xs mt-0.5">v1.0 · APJ TRUE LIFE</p>
      </div>
    </aside>
  );
}
