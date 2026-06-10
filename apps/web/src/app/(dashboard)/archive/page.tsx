'use client';
import Link from 'next/link';

export default function ArchivePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Completed Treatments Archive</h1>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🗄️</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#404941', marginBottom: 8 }}>No completed treatments yet</h3>
        <p style={{ fontSize: 14, color: '#707971', marginBottom: 8 }}>Completed treatment plans will appear here</p>
        <p style={{ fontSize: 12, color: '#C9A84C', background: '#FFF8E1', display: 'inline-block', padding: '6px 16px', borderRadius: 999, marginTop: 8 }}>ℹ️ Chat messages are deleted upon treatment completion</p>
      </div>
    </div>
  );
}
