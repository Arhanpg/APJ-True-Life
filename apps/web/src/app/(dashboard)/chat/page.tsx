'use client';
import { useState, useRef, useEffect } from 'react';

const MOCK_CONVS = [
  { id: '1', name: 'Ravi Kumar', treatment: 'Nasya Course', lastMsg: 'Thank you doctor!', time: '10:32 AM', unread: 2, avatar: 'RK' },
  { id: '2', name: 'Priya Sharma', treatment: 'Panchakarma', lastMsg: 'I will follow the diet', time: 'Yesterday', unread: 0, avatar: 'PS' },
];

export default function ChatPage() {
  const [activeConv, setActiveConv] = useState<typeof MOCK_CONVS[0] | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'doctor' | 'patient'; time: string }[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function sendMessage() {
    if (!message.trim()) return;
    setMessages(p => [...p, { id: Date.now().toString(), text: message, sender: 'doctor', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setMessage('');
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px - 48px)', background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
      {/* Conversations List */}
      <div style={{ width: 300, borderRight: '1px solid #E1F2E8', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #E1F2E8' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111E18', marginBottom: 10 }}>Messages</h2>
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#707971' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search conversations..." style={{ width: '100%', paddingLeft: 32, paddingRight: 10, paddingTop: 8, paddingBottom: 8, border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 12, outline: 'none' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {MOCK_CONVS.map(c => (
            <div key={c.id} onClick={() => setActiveConv(c)} style={{ padding: '14px 16px', cursor: 'pointer', background: activeConv?.id === c.id ? '#EDFDF3' : 'transparent', borderBottom: '1px solid #F0F7F2', display: 'flex', alignItems: 'center', gap: 12, borderLeft: activeConv?.id === c.id ? '3px solid #1A5C38' : '3px solid transparent' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{c.avatar}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111E18', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                  <span style={{ fontSize: 10, color: '#707971', flexShrink: 0 }}>{c.time}</span>
                </div>
                <p style={{ fontSize: 11, color: '#707971', marginTop: 2 }}>{c.treatment}</p>
                <p style={{ fontSize: 12, color: '#404941', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMsg}</p>
              </div>
              {c.unread > 0 && <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{c.unread}</span></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeConv ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{activeConv.avatar}</span>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>{activeConv.name}</p>
                <p style={{ fontSize: 11, color: '#707971' }}>{activeConv.treatment}</p>
              </div>
            </div>
            <button style={{ background: 'rgba(186,26,26,0.08)', color: '#BA1A1A', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>📹 Video Call</button>
          </div>

          {/* Warning Banner */}
          <div style={{ background: '#FFF8E7', borderBottom: '1px solid #F0C040', padding: '8px 20px', fontSize: 12, color: '#856400', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>⚠️</span> Chat messages will be deleted when treatment is completed.
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#707971', marginTop: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>💬</div>
                <p>Start the conversation with {activeConv.name}</p>
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'doctor' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: m.sender === 'doctor' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', background: m.sender === 'doctor' ? '#1A5C38' : '#EDFDF3', color: m.sender === 'doctor' ? '#fff' : '#111E18', fontSize: 13 }}>
                  <p>{m.text}</p>
                  <p style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: 'right' }}>{m.time} ✓✓</p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707971', padding: 8 }}>📎</button>
            <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            <button onClick={sendMessage} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#707971' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>💬</div>
          <p style={{ fontWeight: 600, color: '#404941', fontSize: 16 }}>Select a conversation</p>
          <p style={{ fontSize: 13, marginTop: 4 }}>Choose from the left to start messaging</p>
        </div>
      )}
    </div>
  );
}
