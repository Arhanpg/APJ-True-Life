"use client";
import { Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export function Header() {
  const doctorName = useAuthStore((s) => s.doctorName);
  const doctorTitle = useAuthStore((s) => s.doctorTitle);

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-outlinevariant bg-white/90 px-6 backdrop-blur-sm">
      {/* Left: greeting */}
      <div>
        <p className="text-xs text-muted">{doctorTitle} · Welcome back</p>
        <h1 className="text-xl font-semibold text-primary-dark">{doctorName}</h1>
      </div>

      {/* Right: search + notifications */}
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-outlinevariant bg-surface-low px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-muted" />
          <input
            className="w-56 bg-transparent text-sm outline-none placeholder:text-muted"
            placeholder="Search patients, treatments…"
          />
        </div>
        <button
          className="rounded-xl border border-outlinevariant p-3 text-muted transition hover:bg-surface-low"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
