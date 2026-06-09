"use client";

import { Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export function Header() {
  const doctorName = useAuthStore((s) => s.doctorName);
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-outlinevariant bg-white/90 px-6 backdrop-blur-sm">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted">{today}</p>
        <h1 className="mt-1 text-xl font-semibold text-primary-dark">Welcome, {doctorName}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-outlinevariant bg-surface-low px-3 py-2 text-sm text-muted md:flex">
          <Search className="h-4 w-4" />
          <input
            className="w-56 bg-transparent outline-none placeholder:text-muted"
            placeholder="Search patients, treatments…"
          />
        </div>
        <button
          className="relative rounded-xl border border-outlinevariant p-3 text-muted transition hover:bg-surface-low"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
}
