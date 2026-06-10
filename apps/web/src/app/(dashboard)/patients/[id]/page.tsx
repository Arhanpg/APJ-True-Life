'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_PATIENT = {
  id: '1', fullName: 'Ravi Kumar', patientCode: 'ATL-1042', gender: 'Male', dob: '1985-06-14',
  phone: '+91 98765 43210', email: 'ravi@example.com', bloodGroup: 'B+',
  address: '12 Gandhi Nagar, Bengaluru – 560001', emergencyContact: '+91 91234 56789',
  prakriti: 'Vata-Pitta', allergies: ['Sesame oil'], avatar: 'RK',
  activeTreatment: { name: 'Nasya Course – Phase 2', status: 'ACTIVE', phase: '2 of 3', progress: 65 },
  appointments: [
    { date: '2024-06-10', type: 'Follow-up', status: 'CONFIRMED' },
    { date: '2024-05-25', type: 'General', status: 'COMPLETED' },
  ],
};

const STAT_CHIP = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div style={{ textAlign: 'center' }}>
    <p style={{ fontSize: 22, fontWeight: 800, color, fontFamily: 'JetBrains Mono, monospace' }}>{value}</p>
    <p style={{ fontSize: 11, color: '#707971', marginTop: 2 }}>{label}</p>
  </div>
);

export default function PatientProfilePage() {
  const params = useParams();
  const p = MOCK_PATIENT;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/patients" style={{ color: '#707971', textDecoration: 'none', fontSize: 13 }}>← Patients</Link>
        <span style={{ color: '#C0C9BF' }}>/</span>
        <span style={{ fontSize: 13, color: '#111E18', fontWeight: 600 }}>{p.fullName}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Profile header card */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{p.avatar}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#004324' }}>{p.fullName}</h1>
                  <span style={{ background: '#EAF4EC', color: '#1A5C38', borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>ACTIVE</span>
                </div>
                <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>{p.patientCode} · {p.gender} · {p.prakriti}</p>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <STAT_CHIP label="Treatments" value="2" color="#1A5C38" />
                  <STAT_CHIP label="Sessions" value="8" color="#C9A84C" />
                  <STAT_CHIP label="Appointments" value="5" color="#004324" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href={`/treatments/new?patient=${p.id}`} style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>+ New Treatment</Link>
                <Link href="/appointments" style={{ border: '1.5px solid #1A5C38', color: '#1A5C38', background: 'transparent', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center' }}>Book Appointment</Link>
                <Link href="/chat" style={{ border: '1.5px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center' }}>Send Message</Link>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['📱 Phone', p.phone], ['📧 Email', p.email], ['🎂 Date of Birth', new Date(p.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })], ['🩸 Blood Group', p.bloodGroup], ['🏠 Address', p.address], ['🆘 Emergency Contact', p.emergencyContact]]
                .map(([label, value]) => (
                  <div key={label}>
                    <p style={{ fontSize: 11, color: '#707971', fontWeight: 600, marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 13, color: '#111E18' }}>{value}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Ayurvedic Profile */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Ayurvedic Profile</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <p style={{ fontSize: 11, color: '#707971', fontWeight: 600, marginBottom: 4 }}>Prakriti</p>
                <span style={{ background: '#EAF4EC', color: '#1A5C38', borderRadius: 8, padding: '5px 14px', fontSize: 13, fontWeight: 600 }}>{p.prakriti}</span>
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#707971', fontWeight: 600, marginBottom: 4 }}>Known Allergies</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.allergies.map(a => <span key={a} style={{ background: '#FFF8E7', color: '#856400', borderRadius: 999, padding: '3px 10px', fontSize: 12 }}>{a}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Appointment History */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>Appointment History</h2>
              <Link href="/appointments" style={{ fontSize: 12, color: '#1A5C38', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
            </div>
            {p.appointments.map((a, i) => (
              <div key={i} style={{ padding: '12px 20px', borderBottom: i < p.appointments.length - 1 ? '1px solid #F0F7F2' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#111E18' }}>{a.type} Consultation</p>
                  <p style={{ fontSize: 12, color: '#707971' }}>{new Date(a.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <span style={{ background: a.status === 'CONFIRMED' ? '#EAF4EC' : '#F5F5F5', color: a.status === 'CONFIRMED' ? '#1A5C38' : '#707971', borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {p.activeTreatment && (
            <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>Active Treatment</h3>
                <span style={{ background: '#EAF4EC', color: '#1A5C38', borderRadius: 999, padding: '2px 10px', fontSize: 10, fontWeight: 700 }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#004324', marginBottom: 4 }}>{p.activeTreatment.name}</p>
              <p style={{ fontSize: 12, color: '#707971', marginBottom: 10 }}>Phase {p.activeTreatment.phase}</p>
              <div style={{ background: '#E1F2E8', borderRadius: 999, height: 6, marginBottom: 4 }}>
                <div style={{ background: '#1A5C38', borderRadius: 999, height: '100%', width: `${p.activeTreatment.progress}%` }} />
              </div>
              <p style={{ fontSize: 11, color: '#1A5C38', fontWeight: 600, textAlign: 'right' }}>{p.activeTreatment.progress}% complete</p>
              <Link href={`/treatments/1`} style={{ display: 'block', marginTop: 12, border: '1.5px solid #1A5C38', color: '#1A5C38', background: 'transparent', borderRadius: 8, padding: '7px', fontSize: 12, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>View Treatment →</Link>
            </div>
          )}
          <div style={{ background: '#EDFDF3', border: '1px solid #C0D9CA', borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#004324', marginBottom: 8 }}>Document Vault</p>
            <p style={{ fontSize: 12, color: '#707971' }}>All prescriptions, diet charts, and assessment images are stored securely.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
