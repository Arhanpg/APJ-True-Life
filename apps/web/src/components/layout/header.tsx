"use client";

import { Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export function Header() {
  const doctorName = useAuthStore((s) => s.doctorName);

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-4 border-b border-[#C0C9BF] bg-white/90 px-6 backdrop-blur-sm">
      <div>
        <p className="text-xs text-[#404941]">Welcome back</p>
        <h1 className="text-xl font-semibold text-[#004324]">{doctorName}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-[#C0C9BF] bg-[#F5FBF7] px-3 py-2.5 md:flex">
          <Search className="h-4 w-4 text-[#707971]" />
          <input
            className="w-64 bg-transparent text-sm text-[#111E18] placeholder:text-[#707971] outline-none"
            placeholder="Search patients, treatments..."
          />
        </div>
        <button
          className="relative rounded-xl border border-[#C0C9BF] p-2.5 text-[#707971] hover:bg-[#F5FBF7]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#BA1A1A]" />
        </button>
      </div>
    </header>
  );
}
