'use client';
import Link from 'next/link';

const MOCK_ARCHIVED = [
  { id: '1', patientName: 'Ravi Kumar', planName: 'Nasya Course – Phase 1', diagnosis: 'Chronic Sinusitis', startDate: '2024-01-10', completedDate: '2024-03-05', phases: 3, patientCode: 'ATL-1042' },
  { id: '2', patientName: 'Priya Sharma', planName: 'Panchakarma Detox', diagnosis: 'Digestive Disorders', startDate: '2024-02-01', completedDate: '2024-04-20', phases: 4, patientCode: 'ATL-1089' },
  { id: '3', patientName: 'Mohan Das', planName: 'Spine & Joint Care', diagnosis: 'Lumbar Spondylosis', startDate: '2023-11-15', completedDate: '2024-01-28', phases: 2, patientCode: 'ATL-0923' },
];

export default function ArchivePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Completed Treatments Archive</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>All completed treatment plans — records preserved, chats deleted per privacy policy.</p>
        </div>
      </div>

      <div style={{ background: '#FFF8E7', border: '1px solid #F0C040', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#856400' }}>
        <span>ℹ️</span>
        <span>Chat messages are permanently deleted upon treatment completion as per DPDP Act 2023 data minimisation policy. All clinical records, prescriptions, and assessment images are preserved.</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MOCK_ARCHIVED.map(t => (
          <div key={t.id} style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', padding: '20px 24px', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{t.patientName.split(' ').map(w => w[0]).join('')}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>{t.patientName}</p>
                    <p style={{ fontSize: 12, color: '#707971' }}>{t.patientCode}</p>
                  </div>
                  <span style={{ background: '#F5F5F5', color: '#707971', borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>COMPLETED</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#004324', marginBottom: 4 }}>{t.planName}</h3>
                <p style={{ fontSize: 13, color: '#707971', marginBottom: 8 }}>Diagnosis: {t.diagnosis}</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#404941' }}>
                  <span>📅 Started: {new Date(t.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  <span>✅ Completed: {new Date(t.completedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  <span>🔁 {t.phases} phases</span>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: '#707971' }}>Treatment Progress</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#1A5C38' }}>100%</span>
                  </div>
                  <div style={{ background: '#E1F2E8', borderRadius: 999, height: 6 }}>
                    <div style={{ background: '#1A5C38', borderRadius: 999, height: '100%', width: '100%' }} />
                  </div>
                </div>

                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#BA1A1A' }}>
                  <span>🗑️</span>
                  <span>Chat was deleted upon treatment completion.</span>
                </div>
              </div>

              <Link href={`/treatments/${t.id}`}
                style={{ background: 'transparent', border: '1.5px solid #1A5C38', color: '#1A5C38', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                View Treatment →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
