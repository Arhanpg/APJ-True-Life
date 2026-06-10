'use client';

const ARCHIVED = [
  { id: '1', planName: 'Panchakarma Detox', patientName: 'Priya Sharma', completedAt: '2026-05-20', totalPhases: 5, diagnosis: 'Vata-Pitta imbalance' },
  { id: '2', planName: 'Shirodhara Course', patientName: 'Mohan Das', completedAt: '2026-03-14', totalPhases: 7, diagnosis: 'Chronic stress' },
];

export default function ArchivePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#004324', fontFamily: 'Playfair Display, serif' }}>Completed Treatments Archive</h1>
        <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Read-only record of all completed treatment plans</p>
      </div>

      <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#B7791F' }}>
        ℹ️ Chat messages are automatically deleted upon treatment completion for privacy compliance.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ARCHIVED.map(t => (
          <div key={t.id} style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111E18' }}>{t.planName}</h3>
                <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>{t.patientName} · Completed {t.completedAt}</p>
              </div>
              <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#f3f4f6', color: '#6b7280' }}>COMPLETED</span>
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
              <div><span style={{ fontSize: 11, color: '#707971' }}>Diagnosis</span><p style={{ fontSize: 13, fontWeight: 500, color: '#111E18', marginTop: 2 }}>{t.diagnosis}</p></div>
              <div><span style={{ fontSize: 11, color: '#707971' }}>Total Phases</span><p style={{ fontSize: 13, fontWeight: 500, color: '#111E18', marginTop: 2 }}>{t.totalPhases}</p></div>
            </div>
            {/* Progress bar */}
            <div style={{ height: 6, background: '#E1F2E8', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', background: '#1A5C38', borderRadius: 999 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: '#707971' }}>100% Complete</span>
              <span style={{ fontSize: 11, color: '#BA1A1A' }}>Chat deleted</span>
            </div>
            <div style={{ marginTop: 14 }}>
              <button style={{ background: 'transparent', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '7px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>View Full Treatment →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
