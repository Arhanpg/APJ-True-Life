"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArchiveIcon,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/treatments", label: "Treatments", icon: Stethoscope },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/archive", label: "Archive", icon: ArchiveIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { doctorName, logout } = useAuthStore();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-[#1A5C38] px-4 py-6 text-white lg:flex">
      {/* Brand */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <p className="font-display text-2xl font-bold tracking-tight">APJ TRUE LIFE</p>
        <p className="mt-1 text-sm text-white/70">Clinical Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl border-l-[3px] px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "border-[#C9A84C] bg-white/10 text-white"
                  : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Doctor info + logout */}
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
            {doctorName.split(" ")[1]?.[0] ?? "D"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{doctorName}</p>
            <p className="text-xs text-white/60">Chief Vaidya</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
