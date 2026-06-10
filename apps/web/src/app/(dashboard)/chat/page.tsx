'use client';
import { useState, useRef } from 'react';

const SAMPLE_CONVOS = [
  { id: '1', name: 'Patient A', treatment: 'Nasya Course', lastMsg: 'Doctor, when should I take the medicine?', time: '10:32 AM', unread: 2, initials: 'PA' },
  { id: '2', name: 'Patient B', treatment: 'Panchakarma Phase 1', lastMsg: 'Feeling much better today!', time: 'Yesterday', unread: 0, initials: 'PB' },
];

export default function ChatPage() {
  const [activeConvo, setActiveConvo] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id:string;text:string;fromDoctor:boolean;time:string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const active = SAMPLE_CONVOS.find(c => c.id === activeConvo);

  function send() {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: message, fromDoctor: true, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setMessage('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#004324', marginBottom: 20 }}>Chat</h1>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden', display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: 560 }}>
        {/* Left: Conversation List */}
        <div style={{ borderRight: '1px solid #E1F2E8', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: '1px solid #E1F2E8' }}>
            <input placeholder="Search conversations..." style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {SAMPLE_CONVOS.map(c => (
              <div key={c.id} onClick={() => setActiveConvo(c.id)}
                style={{ padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid #E1F2E8', background: activeConvo === c.id ? '#EDFDF3' : '#fff', borderLeft: activeConvo === c.id ? '3px solid #1A5C38' : '3px solid transparent' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{c.initials}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#111E18', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
                      <span style={{ fontSize: 10, color: '#707971', flexShrink: 0, marginLeft: 8 }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#707971', marginTop: 2 }}>{c.treatment}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                      <p style={{ fontSize: 12, color: '#404941', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{c.lastMsg}</p>
                      {c.unread > 0 && <span style={{ background: '#1A5C38', color: '#fff', borderRadius: 999, padding: '1px 7px', fontSize: 10, fontWeight: 700, marginLeft: 8, flexShrink: 0 }}>{c.unread}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chat panel */}
        {active ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Chat header */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{active.initials}</span>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#111E18' }}>{active.name}</p>
                  <p style={{ fontSize: 11, color: '#707971' }}>{active.treatment}</p>
                </div>
              </div>
              <button style={{ background: '#EDFDF3', border: '1.5px solid #1A5C38', color: '#1A5C38', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>📹 Video Call</button>
            </div>

            {/* Warning */}
            <div style={{ background: '#FFF8E1', borderBottom: '1px solid #FFE082', padding: '8px 20px', fontSize: 12, color: '#C9A84C', display: 'flex', alignItems: 'center', gap: 6 }}>
              ⚠️ Chat messages will be deleted when treatment is completed.
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', color: '#707971', marginTop: 40 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
                  <p style={{ fontSize: 13 }}>No messages yet. Start the conversation.</p>
                </div>
              )}
              {messages.map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: m.fromDoctor ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '70%', background: m.fromDoctor ? '#1A5C38' : '#EDFDF3', color: m.fromDoctor ? '#fff' : '#111E18', borderRadius: m.fromDoctor ? '12px 12px 4px 12px' : '12px 12px 12px 4px', padding: '10px 14px', fontSize: 13 }}>
                    <p>{m.text}</p>
                    <p style={{ fontSize: 10, marginTop: 4, textAlign: 'right', opacity: 0.7 }}>{m.time} {m.fromDoctor ? '✓✓' : ''}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #E1F2E8', display: 'flex', gap: 10, alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707971', fontSize: 20, padding: 4 }}>📎</button>
              <input ref={inputRef} value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type a message..." style={{ flex: 1, padding: '9px 14px', border: '1.5px solid #C0C9BF', borderRadius: 24, fontSize: 13, outline: 'none' }} />
              <button onClick={send} style={{ background: '#1A5C38', border: 'none', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 16 }}>↑</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#707971' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#404941' }}>Select a conversation</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Choose a patient chat from the left panel</p>
          </div>
        )}
      </div>
    </div>
  );
}
