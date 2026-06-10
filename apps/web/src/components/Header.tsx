'use client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push('/login');
  }

  return (
    <header className="fixed top-0 right-0 left-60 h-16 bg-white border-b border-outline-variant flex items-center justify-between px-6 z-10">
      <div />
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-surface rounded-lg transition-colors">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">DR</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Doctor</span>
        </div>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50">
          Logout
        </button>
      </div>
    </header>
  );
}
