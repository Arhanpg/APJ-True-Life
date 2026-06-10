'use client';
import { useState } from 'react';

const MOCK_CONVOS = [
  { id: '1', patient: 'Arjun Sharma', treatment: 'Nasya Therapy Course', lastMsg: 'Thank you, doctor!', time: '10:30 AM', unread: 2 },
  { id: '2', patient: 'Priya Nair', treatment: 'Panchakarma Plan', lastMsg: 'When should I take...', time: 'Yesterday', unread: 0 },
];

export default function ChatPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const current = MOCK_CONVOS.find(c => c.id === selected);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, height: 'calc(100vh - 128px)', minHeight: 500 }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Chat</h1>
        <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Secure patient-doctor messaging</p>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        {/* Conversation list */}
        <div style={{ borderRight: '1px solid #E1F2E8', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #E1F2E8' }}>
            <input placeholder="Search conversations…" style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '8px 12px', fontSize: 13, outline: 'none' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {MOCK_CONVOS.length === 0 ? (
              <div style={{ padding: '48px 20px', textAlign: 'center', color: '#707971' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>💬</div>
                <p>No active chats</p>
              </div>
            ) : MOCK_CONVOS.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)} style={{ width: '100%', display: 'block', textAlign: 'left', padding: '14px 16px', border: 'none', borderBottom: '1px solid #F0F7F2', cursor: 'pointer', background: selected === c.id ? '#EDFDF3' : '#fff', borderLeft: selected === c.id ? '3px solid #1A5C38' : '3px solid transparent' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111E18' }}>{c.patient}</span>
                  <span style={{ fontSize: 11, color: '#707971' }}>{c.time}</span>
                </div>
                <p style={{ fontSize: 12, color: '#1A5C38', fontWeight: 500, marginBottom: 4 }}>{c.treatment}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#707971', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{c.lastMsg}</span>
                  {c.unread > 0 && <span style={{ background: '#1A5C38', color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '2px 7px' }}>{c.unread}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {!selected ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#707971' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>💬</div>
              <p style={{ fontWeight: 500, color: '#404941', marginBottom: 6 }}>Select a conversation</p>
              <p style={{ fontSize: 13 }}>Choose a patient chat from the left panel</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>{current?.patient}</p>
                  <p style={{ fontSize: 12, color: '#1A5C38' }}>{current?.treatment}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ background: '#EDFDF3', border: '1px solid #D4E8D8', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, color: '#1A5C38', cursor: 'pointer' }}>📹 Video (Soon)</button>
                </div>
              </div>

              {/* Warning banner */}
              <div style={{ background: '#FFF8E1', borderBottom: '1px solid #FFE57F', padding: '8px 20px', fontSize: 12, color: '#8A6200', display: 'flex', alignItems: 'center', gap: 6 }}>
                ⚠️ Chat messages will be permanently deleted when this treatment is completed.
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ textAlign: 'center', fontSize: 12, color: '#707971' }}>Today</div>
                {/* Sample messages */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EDFDF3', border: '1px solid #D4E8D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#1A5C38', flexShrink: 0 }}>P</div>
                  <div style={{ background: '#F5F5F5', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '65%' }}>
                    <p style={{ fontSize: 14, color: '#111E18' }}>Good morning, doctor!</p>
                    <p style={{ fontSize: 10, color: '#707971', marginTop: 4 }}>10:28 AM</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <div style={{ background: '#1A5C38', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', maxWidth: '65%' }}>
                    <p style={{ fontSize: 14, color: '#fff' }}>Good morning! How are you feeling today?</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4, textAlign: 'right' }}>10:29 AM ✓✓</p>
                  </div>
                </div>
              </div>

              {/* Message input */}
              <div style={{ padding: '14px 20px', borderTop: '1px solid #E1F2E8', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#707971' }}>📎</button>
                <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message…" style={{ flex: 1, border: '1.5px solid #C0C9BF', borderRadius: 24, padding: '10px 16px', fontSize: 14, outline: 'none' }} onKeyDown={e => { if (e.key === 'Enter') setMsg(''); }} />
                <button style={{ background: msg ? '#1A5C38' : '#D4E8D8', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: msg ? 'pointer' : 'default', transition: 'background 0.2s' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
