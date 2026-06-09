"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { patients } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Users } from "lucide-react";

const FILTERS = ["All", "Active", "In Treatment", "Completed"];

export function PatientTable() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () =>
      patients.filter((p) => {
        const matchQ = [p.name, p.phone, p.id]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchF = activeFilter === "All" || p.status === activeFilter;
        return matchQ && matchF;
      }),
    [query, activeFilter]
  );

  return (
    <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#004324]">Patient Directory</h2>
          <p className="mt-1 text-sm text-[#404941]">Search and manage all patient records.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, or ID…"
            className="rounded-xl border border-[#C0C9BF] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A5C38]"
          />
          <Link
            href="/patients/new"
            className="rounded-xl bg-[#1A5C38] px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-[#004324]"
          >
            + Add Patient
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === f
                ? "bg-[#1A5C38] text-white"
                : "bg-[#E1F2E8] text-[#404941] hover:bg-[#1A5C38]/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title="No patients found"
          description="Try adjusting your search or filter."
        />
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E1F2E8] text-[#404941]">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Age / Gender</th>
                <th className="pb-3 font-medium">Active Treatment</th>
                <th className="pb-3 font-medium">Last Visit</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1F2E8]">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="py-4">
                    <p className="font-medium text-[#111E18]">{p.name}</p>
                    <p className="mt-0.5 text-xs text-[#404941]">
                      {p.email} · {p.id}
                    </p>
                  </td>
                  <td className="py-4 text-[#404941]">{p.age} / {p.gender}</td>
                  <td className="py-4 text-[#404941]">{p.activeTreatment}</td>
                  <td className="py-4 font-mono text-xs text-[#404941]">{p.lastVisit}</td>
                  <td className="py-4"><StatusBadge label={p.status} /></td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/patients/${p.id}`}
                        className="rounded-lg border border-[#C0C9BF] px-3 py-1.5 text-xs hover:bg-[#E1F2E8]"
                      >
                        View
                      </Link>
                      <Link
                        href="/treatments/new"
                        className="rounded-lg border border-[#C0C9BF] px-3 py-1.5 text-xs hover:bg-[#E1F2E8]"
                      >
                        Treatment
                      </Link>
                      <Link
                        href="/chat"
                        className="rounded-lg border border-[#C0C9BF] px-3 py-1.5 text-xs hover:bg-[#E1F2E8]"
                      >
                        Chat
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
