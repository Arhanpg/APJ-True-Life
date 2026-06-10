'use client';
export default function ArchivePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Completed Treatments Archive</h1>
      <div style={{ background: '#FFF8E7', border: '1px solid #F0C040', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#856400', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>ℹ️</span> Chat messages are permanently deleted upon treatment completion per DPDP Act 2023.
      </div>
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: '60px 20px', textAlign: 'center', color: '#707971' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🗄️</div>
        <p style={{ fontWeight: 600, color: '#404941', marginBottom: 4 }}>No completed treatments yet</p>
        <p style={{ fontSize: 13 }}>Completed treatment plans will appear here</p>
      </div>
    </div>
  );
}
