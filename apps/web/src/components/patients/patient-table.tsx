"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { patients } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";

const FILTERS = ["All", "Active", "In Treatment", "Completed"] as const;

export function PatientTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      patients.filter((p) => {
        const matchQuery = [p.name, p.phone, p.id]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchFilter = filter === "All" || p.status === filter;
        return matchQuery && matchFilter;
      }),
    [query, filter]
  );

  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary-dark">Patient Directory</h1>
          <p className="text-sm text-muted">Search, filter, and manage all patient profiles.</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, patient ID"
            className="rounded-xl border border-outlinevariant px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <Link
            href="/patients/new"
            className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-primary-dark"
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
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "bg-primary text-white"
                : "bg-surface-tint text-muted hover:bg-surface-tint/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-outlinevariant">
              {["Patient", "Age / Gender", "Active Treatment", "Last Visit", "Status", "Actions"].map((h) => (
                <th key={h} className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-outlinevariant/50 last:border-0 hover:bg-surface-low">
                <td className="py-4">
                  <p className="font-medium text-onsurface">{p.name}</p>
                  <p className="text-xs text-muted">{p.email} · {p.phone}</p>
                  <p className="font-mono text-xs text-muted">{p.id}</p>
                </td>
                <td className="py-4 text-muted">{p.age} / {p.gender}</td>
                <td className="py-4 text-muted">{p.activeTreatment}</td>
                <td className="py-4 text-muted">{p.lastVisit}</td>
                <td className="py-4"><StatusBadge label={p.status} /></td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/patients/${p.id}`} className="rounded-lg border border-outlinevariant px-3 py-2 text-xs hover:bg-surface-low">View</Link>
                    <Link href="/treatments/new" className="rounded-lg border border-outlinevariant px-3 py-2 text-xs hover:bg-surface-low">Add Treatment</Link>
                    <Link href="/chat" className="rounded-lg border border-outlinevariant px-3 py-2 text-xs hover:bg-surface-low">Chat</Link>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="py-12 text-center text-muted">No patients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
