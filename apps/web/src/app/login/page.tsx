export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left panel */}
      <section className="hidden flex-col justify-between bg-primary p-12 text-white lg:flex">
        <div>
          <p className="font-display text-5xl font-bold leading-tight">APJ TRUE LIFE</p>
          <p className="mt-1 text-lg text-white/70">Ayurvedic Medical Centre</p>
          <p className="mt-4 max-w-sm text-white/80">
            Secure clinical workspace for doctors. Manage patients, treatment plans, appointments, and chat from one dashboard.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { title: "Secure Medical Records", desc: "Patient profiles, prakriti assessment, and medical history stored safely." },
            { title: "Treatment Plan Management", desc: "Create multi-phase Ayurvedic treatment plans with medicines, diet, and documents." },
            { title: "Schedule Management", desc: "Weekly calendar with appointment booking, confirmations, and reminders." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/40">AYUSH TV National Health Award 2024 &middot; Confidential</p>
      </section>

      {/* Login form */}
      <section className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-widest text-muted">Doctor Login</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary-dark">
              Access the clinical dashboard
            </h1>
          </div>

          <div className="rounded-3xl border border-outlinevariant bg-white p-8 shadow-card">
            <form className="space-y-5">
              <label className="block space-y-2 text-sm font-medium text-primary-dark">
                <span>Email Address</span>
                <input
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-outlinevariant px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="doctor@apjtruelife.com"
                />
              </label>

              <label className="block space-y-2 text-sm font-medium text-primary-dark">
                <span>Password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-outlinevariant px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted">
                  <input type="checkbox" className="rounded" />
                  Remember me for 30 days
                </label>
                <button type="button" className="text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-4 py-3 font-medium text-white transition hover:bg-primary-dark"
              >
                Sign in to Dashboard
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-muted">
            Production: Firebase Email/Password auth &rarr; Auth Service JWT.
          </p>
        </div>
      </section>
    </main>
  );
}
