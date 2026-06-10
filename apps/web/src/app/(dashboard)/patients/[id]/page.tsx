'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const PATIENT = {
  id: 'ATL-0001', name: 'Ramesh Kumar', email: 'ramesh@example.com', phone: '+91 98765 43210',
  dob: '1981-03-15', age: 45, gender: 'Male', bloodGroup: 'O+', address: 'MG Road, Bengaluru 560001',
  prakriti: 'Vata-Pitta', emergencyContact: '+91 98765 00001',
  treatment: { name: 'Nasal Polyp — Nasya Course', phase: 2, total: 4, status: 'ACTIVE', start: '2026-05-01' },
  appointments: [
    { date: '2026-06-08', time: '10:00', type: 'Nasya Treatment', status: 'COMPLETED' },
    { date: '2026-06-10', time: '10:00', type: 'Nasya Treatment', status: 'CONFIRMED' },
  ]
};

export default function PatientDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/patients" style={{ color: 'var(--primary)' }}>Patients</Link>
        <span>/</span>
        <span>{PATIENT.name}</span>
      </div>

      {/* Profile header */}
      <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0" style={{ background: 'var(--secondary)' }}>
            {PATIENT.name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>{PATIENT.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full chip-active font-medium">{PATIENT.prakriti}</span>
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{PATIENT.id} · {PATIENT.email} · {PATIENT.phone}</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ background: 'var(--primary)' }}>+ New Treatment</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>Send Message</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: '#C0C9BF', color: 'var(--text-muted)' }}>Book Appointment</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>Personal Information</h2>
          {[['Date of Birth', PATIENT.dob], ['Age', `${PATIENT.age} years`], ['Gender', PATIENT.gender], ['Blood Group', PATIENT.bloodGroup], ['Prakriti', PATIENT.prakriti], ['Emergency Contact', PATIENT.emergencyContact], ['Address', PATIENT.address]].map(([k, v]) => (
            <div key={k} className="flex py-2 border-b" style={{ borderColor: '#E8F5E9' }}>
              <span className="w-40 text-xs font-medium flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{k}</span>
              <span className="text-sm" style={{ color: 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Current Treatment */}
        <div className="space-y-4">
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
            <h2 className="font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>Current Treatment</h2>
            <p className="font-medium text-sm mb-1" style={{ color: 'var(--text)' }}>{PATIENT.treatment.name}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full chip-active font-medium">{PATIENT.treatment.status}</span>
              <span className="text-xs" style={{ color: 'var(--outline)' }}>Started {PATIENT.treatment.start}</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              <span>Phase {PATIENT.treatment.phase} of {PATIENT.treatment.total}</span>
              <span>{Math.round((PATIENT.treatment.phase/PATIENT.treatment.total)*100)}%</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'var(--surface-tint)' }}>
              <div className="h-2 rounded-full" style={{ width: `${(PATIENT.treatment.phase/PATIENT.treatment.total)*100}%`, background: 'var(--secondary)' }} />
            </div>
            <Link href={`/treatments/1`} className="mt-3 inline-block text-xs font-medium" style={{ color: 'var(--primary)' }}>View Full Treatment →</Link>
          </div>

          {/* Recent appointments */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
            <h2 className="font-semibold mb-3" style={{ color: 'var(--primary-dark)' }}>Recent Appointments</h2>
            {PATIENT.appointments.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#E8F5E9' }}>
                <div>
                  <p className="text-sm">{a.type}</p>
                  <p className="text-xs" style={{ color: 'var(--outline)' }}>{a.date} · {a.time}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium chip-${a.status.toLowerCase()}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
