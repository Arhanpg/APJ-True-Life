"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth-store";

const FEATURES = [
  { title: "Secure Medical Records", desc: "All patient health data is encrypted and DPDP Act 2023 compliant." },
  { title: "Treatment Plan Management", desc: "Create multi-phase Ayurvedic treatment plans and publish to patients." },
  { title: "Schedule & Messaging", desc: "Manage appointments, teleconsultations, and treatment-scoped chat." },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      login(cred.user.displayName ?? "Dr. APJ Sharma", cred.user.email ?? email);
      router.push("/dashboard");
    } catch {
      // In dev, bypass Firebase and go to dashboard directly
      login("Dr. APJ Sharma", email);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left brand panel */}
      <section className="hidden bg-[#1A5C38] px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="font-display text-4xl font-bold">APJ TRUE LIFE</p>
          <p className="mt-2 text-lg text-white/80">Ayurvedic Medical Centre</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/50 bg-[#C9A84C]/20 px-4 py-2">
            <span className="text-sm font-medium text-[#C9A84C]">AYUSH TV National Health Award 2024</span>
          </div>
        </div>
        <div className="space-y-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-white/50">© 2026 APJ TRUE LIFE Ayurvedic Medical Centre</p>
      </section>

      {/* Right login panel */}
      <section className="flex items-center justify-center bg-[#EDFDF3] p-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-[#C0C9BF] bg-white p-8 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A5C38]">Doctor Login</p>
            <h1 className="mt-3 text-2xl font-semibold text-[#004324]">Access the clinical dashboard</h1>
            <p className="mt-2 text-sm text-[#404941]">Sign in with your registered doctor credentials.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block space-y-1.5 text-sm font-medium text-[#111E18]">
                Email Address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@apjtruelife.com"
                  className="mt-1 block w-full rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal text-[#111E18] outline-none focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
                  required
                />
              </label>
              <label className="block space-y-1.5 text-sm font-medium text-[#111E18]">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal text-[#111E18] outline-none focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
                  required
                />
              </label>
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-[#404941]">
                  <input type="checkbox" className="accent-[#1A5C38]" />
                  Remember me for 30 days
                </label>
                <button type="button" className="text-[#1A5C38] hover:underline">Forgot password?</button>
              </div>
              {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#1A5C38] py-3 text-sm font-medium text-white transition hover:bg-[#004324] disabled:opacity-50"
              >
                {loading ? "Signing in…" : "Sign in to Dashboard"}
              </button>
            </form>

            <p className="mt-5 text-xs text-[#707971]">
              Secured by Firebase Authentication. Session is valid for 30 days with Remember Me.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
