'use client';
import { KPICard } from '@/components/dashboard/KPICard';
import { TodaySchedule } from '@/components/dashboard/TodaySchedule';
import { RecentMessages } from '@/components/dashboard/RecentMessages';
import { ActiveTreatments } from '@/components/dashboard/ActiveTreatments';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Greeting */}
      <div>
        <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>
          Good morning, Dr. {user?.displayName?.split(' ')[0] || 'Vaidya'} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{today}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Patients" value="24" trend="+3 this week" icon="👥" color="var(--primary)" />
        <KPICard title="Today's Appointments" value="6" trend="2 pending" icon="📅" color="#1565C0" />
        <KPICard title="Unread Messages" value="8" trend="from 5 patients" icon="💬" color="var(--gold)" />
        <KPICard title="Completed Treatments" value="3" trend="this week" icon="✅" color="var(--secondary)" />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <TodaySchedule />
          <ActiveTreatments />
        </div>
        <div>
          <RecentMessages />
        </div>
      </div>
    </div>
  );
}
