'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const TABS = ['Details & Notes', 'Medicines', 'Diet Plan', 'Documents'];

export default function TreatmentDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Details & Notes');
  const [showComplete, setShowComplete] = useState(false);
  const [consent, setConsent] = useState(false);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#707971' }}>
        <Link href="/treatments" style={{ color: '#707971', textDecoration: 'none' }}>Treatments</Link>
        <span>/</span>
        <span style={{ color: '#111E18' }}>Treatment Detail</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#004324' }}>Treatment Plan</h1>
          <span style={{ display: 'inline-block', marginTop: 6, padding: '3px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#EAF4EC', color: '#1A5C38' }}>Active · Phase 1 of 3</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href={`/treatments/${id}/phases/new`} style={{ border: '1.5px solid #1A5C38', color: '#1A5C38', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ Add Phase</Link>
          <button onClick={() => setShowComplete(true)} style={{ background: '#BA1A1A', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Complete Treatment</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Phase tabs */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ borderBottom: '1px solid #E1F2E8', display: 'flex', overflow: 'auto' }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding: '12px 20px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                  background: activeTab === t ? '#fff' : '#EDFDF3',
                  color: activeTab === t ? '#1A5C38' : '#707971',
                  borderBottom: activeTab === t ? '2px solid #1A5C38' : '2px solid transparent',
                }}>{t}</button>
              ))}
            </div>
            <div style={{ padding: 24 }}>
              {activeTab === 'Details & Notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Diagnosis</p>
                    <p style={{ fontSize: 14, color: '#111E18' }}>—</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Clinical Notes (Internal)</p>
                    <p style={{ fontSize: 14, color: '#111E18' }}>—</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Patient Instructions</p>
                    <p style={{ fontSize: 14, color: '#111E18' }}>—</p>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Clinical Note</button>
                  </div>
                </div>
              )}
              {activeTab === 'Medicines' && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#707971' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>💊</div>
                  <p>No medicines added yet</p>
                  <button style={{ marginTop: 16, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}>+ Add Medicine</button>
                </div>
              )}
              {activeTab === 'Diet Plan' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1A5C38', marginBottom: 12 }}>✓ To Consume</h4>
                    <p style={{ fontSize: 13, color: '#707971' }}>No items added yet</p>
                    <button style={{ marginTop: 12, background: '#EAF4EC', color: '#1A5C38', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>+ Add Item</button>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: '#BA1A1A', marginBottom: 12 }}>✗ To Avoid</h4>
                    <p style={{ fontSize: 13, color: '#707971' }}>No items added yet</p>
                    <button style={{ marginTop: 12, background: '#FFEBEE', color: '#BA1A1A', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>+ Add Item</button>
                  </div>
                </div>
              )}
              {activeTab === 'Documents' && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#707971' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
                  <p>No documents uploaded</p>
                  <button style={{ marginTop: 16, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}>Upload Document</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111E18', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #E1F2E8' }}>Treatment Overview</h3>
            {[['Start Date', '—'], ['End Date', '—'], ['Progress', '0%'], ['Phase', '1 of 3']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: '#707971' }}>{l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#111E18' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Treatment Modal */}
      {showComplete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 480, maxWidth: '90vw' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111E18', marginBottom: 8 }}>Complete Treatment</h2>
            <p style={{ fontSize: 14, color: '#404941', marginBottom: 20 }}>The following data will be <strong>preserved</strong>:</p>
            {['Treatment Plan Details', 'Assessment Images', 'Prescription History'].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#1A5C38' }}>✓</span>
                <span style={{ fontSize: 13, color: '#111E18' }}>{i}</span>
              </div>
            ))}
            <p style={{ fontSize: 14, color: '#BA1A1A', margin: '16px 0 8px', fontWeight: 600 }}>The following will be DELETED:</p>
            {['Doctor–Patient Chat', 'Chat Attachments'].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#BA1A1A' }}>✗</span>
                <span style={{ fontSize: 13, color: '#111E18' }}>{i}</span>
              </div>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, cursor: 'pointer' }}>
              <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
              <span style={{ fontSize: 13, color: '#404941' }}>I understand chat messages cannot be recovered.</span>
            </label>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowComplete(false)} style={{ flex: 1, background: '#EDFDF3', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button disabled={!consent} style={{ flex: 1, background: consent ? '#BA1A1A' : '#eee', color: consent ? '#fff' : '#999', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, cursor: consent ? 'pointer' : 'not-allowed', fontWeight: 600 }}>Yes, Complete Treatment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
