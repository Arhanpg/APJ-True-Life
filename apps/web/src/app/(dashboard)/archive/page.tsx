'use client';
import Link from 'next/link';

export default function ArchivePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Completed Treatments Archive</h1>
        <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Read-only records of all completed treatment plans</p>
      </div>

      <div style={{ background: '#FFF8E1', border: '1px solid #FFE57F', borderRadius: 10, padding: '12px 18px', fontSize: 13, color: '#8A6200', display: 'flex', alignItems: 'center', gap: 8 }}>
        ⚠️ <strong>Note:</strong> Chat messages are permanently deleted upon treatment completion. Treatment plan details, images, and prescriptions are preserved.
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EDFDF3' }}>
              {['Plan Name', 'Patient', 'Diagnosis', 'Completed Date', 'Duration', 'Actions'].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '60px 20px', color: '#707971' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📁</div>
                <p style={{ fontWeight: 500, color: '#404941', marginBottom: 6 }}>No completed treatments yet</p>
                <p style={{ fontSize: 13 }}>Completed treatment plans will appear here</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
