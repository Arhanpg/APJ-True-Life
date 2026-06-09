"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { patients } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";

export function PatientTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () =>
      patients.filter((p) => {
        const matchesQ = [p.name, p.phone, p.id]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesF = filter === "All" ? true : p.status === filter;
        return matchesQ && matchesF;
      }),
    [query, filter]
  );

  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-primary-dark">Patient Directory</h2>
          <p className="text-sm text-muted">Search and manage all registered patients.</p>
        </div>
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone, ID…"
            className="rounded-xl border border-outlinevariant px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <Link
            href="/patients/new"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            Add Patient
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["All", "Active", "In Treatment", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === tab
                ? "bg-primary text-white"
                : "bg-surface-tint text-muted hover:bg-green-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead>
            <tr className="border-b border-outlinevariant text-xs uppercase tracking-wider text-muted">
              <th className="pb-3 pr-4">Patient</th>
              <th className="pb-3 pr-4">Age / Gender</th>
              <th className="pb-3 pr-4">Active Treatment</th>
              <th className="pb-3 pr-4">Last Visit</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-outlinevariant/50 last:border-0">
                <td className="py-4 pr-4">
                  <p className="font-medium text-onsurface">{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.email} &middot; {p.phone}
                  </p>
                </td>
                <td className="py-4 pr-4 text-muted">
                  {p.age} / {p.gender}
                </td>
                <td className="py-4 pr-4 text-muted">{p.activeTreatment}</td>
                <td className="py-4 pr-4 font-mono text-xs text-muted">{p.lastVisit}</td>
                <td className="py-4 pr-4">
                  <StatusBadge label={p.status} />
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/patients/${p.id}`}
                      className="rounded-lg border border-outlinevariant px-3 py-1.5 text-xs transition hover:bg-surface-low"
                    >
                      View
                    </Link>
                    <Link
                      href="/treatments/new"
                      className="rounded-lg border border-outlinevariant px-3 py-1.5 text-xs transition hover:bg-surface-low"
                    >
                      Add Treatment
                    </Link>
                    <Link
                      href="/chat"
                      className="rounded-lg border border-outlinevariant px-3 py-1.5 text-xs transition hover:bg-surface-low"
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
    </div>
  );
}
