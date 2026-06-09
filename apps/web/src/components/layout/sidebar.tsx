"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  CalendarDays,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/treatments/new", label: "Treatments", icon: Stethoscope },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/archive", label: "Archive", icon: Archive },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 flex-shrink-0 flex-col bg-primary px-4 py-8 text-white lg:flex">
      {/* Brand */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <p className="font-display text-2xl font-bold tracking-tight">APJ TRUE LIFE</p>
        <p className="mt-1 text-xs text-white/60">Ayurvedic Clinical Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl border-l-4 px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "border-gold bg-white/10 text-white"
                  : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer card */}
      <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm">
        <p className="font-semibold text-white">AYUSH TV Award 2024</p>
        <p className="mt-1 text-xs text-white/70">
          Recognized for clinical excellence in Ayurvedic care.
        </p>
      </div>
    </aside>
  );
}
