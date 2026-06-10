'use client';
import { useState } from 'react';

const CONVERSATIONS = [
  { id: '1', patientName: 'Ravi Kumar', treatmentName: 'Nasya Therapy', lastMessage: 'Doctor, I have a question about the oil…', time: '10:32 AM', unread: 2 },
  { id: '2', patientName: 'Priya Sharma', treatmentName: 'Panchakarma Detox', lastMessage: 'Thank you doctor!', time: 'Yesterday', unread: 0 },
  { id: '3', patientName: 'Anita Rao', treatmentName: 'Abhyanga Course', lastMessage: 'When is my next session?', time: 'Mon', unread: 1 },
];

const MESSAGES = [
  { id: '1', senderId: 'patient', content: 'Good morning Doctor. I wanted to ask about the nasal oil dosage.', time: '10:28 AM', isRead: true },
  { id: '2', senderId: 'doctor', content: 'Good morning Ravi! Please use 2 drops in each nostril, morning and evening.', time: '10:30 AM', isRead: true },
  { id: '3', senderId: 'patient', content: 'Doctor, I have a question about the oil…', time: '10:32 AM', isRead: false },
];

export default function ChatPage() {
  const [activeConv, setActiveConv] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState('');

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 128px)', background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
      {/* Left: Conversation list */}
      <div style={{ width: 300, borderRight: '1px solid #E1F2E8', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #E1F2E8' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#111E18', marginBottom: 10 }}>Messages</h2>
          <input placeholder="Search conversations…" style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '7px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {CONVERSATIONS.map(conv => (
            <div key={conv.id} onClick={() => setActiveConv(conv)}
              style={{ padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid #E1F2E8', background: activeConv.id === conv.id ? '#EDFDF3' : '#fff', borderLeft: activeConv.id === conv.id ? '3px solid #1A5C38' : '3px solid transparent' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111E18' }}>{conv.patientName}</p>
                  <p style={{ fontSize: 11, color: '#707971' }}>{conv.treatmentName}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ fontSize: 10, color: '#707971' }}>{conv.time}</span>
                  {conv.unread > 0 && <span style={{ background: '#1A5C38', color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>{conv.unread}</span>}
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#707971', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Active chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#111E18' }}>{activeConv.patientName}</p>
            <p style={{ fontSize: 12, color: '#707971' }}>{activeConv.treatmentName}</p>
          </div>
          <button style={{ background: '#EDFDF3', border: '1.5px solid #1A5C38', color: '#1A5C38', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>📹 Video Call</button>
        </div>

        {/* Warning banner */}
        <div style={{ background: '#FFF8E1', borderBottom: '1px solid #FFE082', padding: '8px 20px', fontSize: 12, color: '#B7791F' }}>
          ⚠️ Chat messages will be permanently deleted when treatment is completed.
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MESSAGES.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.senderId === 'doctor' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '65%', padding: '10px 14px', borderRadius: 12, fontSize: 14,
                background: msg.senderId === 'doctor' ? '#1A5C38' : '#F3F4F6',
                color: msg.senderId === 'doctor' ? '#fff' : '#111E18',
                borderBottomRightRadius: msg.senderId === 'doctor' ? 4 : 12,
                borderBottomLeftRadius: msg.senderId === 'patient' ? 4 : 12,
              }}>
                <p style={{ margin: 0 }}>{msg.content}</p>
                <p style={{ fontSize: 10, marginTop: 4, opacity: 0.7 }}>{msg.time} {msg.senderId === 'doctor' && (msg.isRead ? '✓✓' : '✓')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #E1F2E8', display: 'flex', gap: 12, alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707971', padding: 8 }}>📎</button>
          <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message…"
            onKeyDown={e => { if (e.key === 'Enter' && message.trim()) setMessage(''); }}
            style={{ flex: 1, border: '1.5px solid #C0C9BF', borderRadius: 24, padding: '10px 16px', fontSize: 14, outline: 'none' }} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707971', padding: 8 }}>🎤</button>
          <button onClick={() => setMessage('')}
            style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 999, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>➤</button>
        </div>
      </div>
    </div>
  );
}
