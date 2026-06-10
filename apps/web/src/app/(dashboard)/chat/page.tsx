'use client';
import { useState } from 'react';

const CONVERSATIONS = [
  { id: '1', patient: 'Ramesh Kumar', treatment: 'Nasya Course', lastMsg: 'Thank you doctor, feeling better now.', time: '10:32 AM', unread: 2 },
  { id: '2', patient: 'Priya Sharma', treatment: 'Panchakarma Detox', lastMsg: 'When should I take the medicine?', time: '09:15 AM', unread: 1 },
  { id: '3', patient: 'Anjali Mehta', treatment: 'Shirodhara Program', lastMsg: 'Appointment confirmed.', time: 'Yesterday', unread: 0 },
];

const MESSAGES = [
  { id: '1', sender: 'patient', content: 'Good morning doctor. I completed the morning routine.', time: '09:00 AM' },
  { id: '2', sender: 'doctor', content: 'Great progress Ramesh! How are you feeling after the Nasya session yesterday?', time: '09:05 AM' },
  { id: '3', sender: 'patient', content: 'Much better. The congestion has reduced significantly.', time: '09:10 AM' },
  { id: '4', sender: 'doctor', content: 'Excellent. Please continue the Anu Thailam drops twice daily and avoid cold food.', time: '09:12 AM' },
  { id: '5', sender: 'patient', content: 'Thank you doctor, feeling better now.', time: '10:32 AM' },
];

export default function ChatPage() {
  const [active, setActive] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-[calc(100vh-140px)] rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
      {/* Conversation list */}
      <div className="w-72 border-r flex flex-col" style={{ borderColor: '#E8F5E9' }}>
        <div className="p-4 border-b" style={{ borderColor: '#E8F5E9' }}>
          <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--primary-dark)' }}>Patient Chats</h2>
          <input placeholder="Search conversations..." className="w-full px-3 py-2 rounded-lg border text-xs outline-none" style={{ borderColor: '#C0C9BF' }} />
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map(c => (
            <div key={c.id} onClick={() => setActive(c)}
              className="p-4 cursor-pointer border-b transition-all"
              style={active.id === c.id ? { background: 'var(--surface-tint)', borderColor: '#E8F5E9' } : { borderColor: '#E8F5E9' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: 'var(--primary-dark)' }}>{c.patient}</span>
                <span className="text-xs" style={{ color: 'var(--outline)' }}>{c.time}</span>
              </div>
              <p className="text-xs mb-1" style={{ color: 'var(--secondary)' }}>{c.treatment}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs truncate flex-1" style={{ color: 'var(--text-muted)' }}>{c.lastMsg}</p>
                {c.unread > 0 && (
                  <span className="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style={{ background: 'var(--primary)' }}>{c.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat panel */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#E8F5E9' }}>
          <div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--primary-dark)' }}>{active.patient}</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{active.treatment}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs px-2 py-1 rounded" style={{ background: '#FFF3E0', color: '#E65100' }}>⚠️ Chat deletes on treatment completion</div>
            <button className="p-2 rounded-lg text-sm" style={{ background: 'var(--surface-tint)', color: 'var(--primary)' }} title="Video call (coming soon)">📹</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {MESSAGES.map(m => (
            <div key={m.id} className={`flex ${m.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm`}
                style={m.sender === 'doctor' ? { background: 'var(--primary)', color: 'white', borderBottomRightRadius: '4px' } : { background: 'var(--surface-tint)', color: 'var(--text)', borderBottomLeftRadius: '4px' }}>
                <p>{m.content}</p>
                <p className={`text-xs mt-1 ${m.sender === 'doctor' ? 'text-green-200' : ''}`} style={m.sender !== 'doctor' ? { color: 'var(--outline)' } : {}}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t" style={{ borderColor: '#E8F5E9' }}>
          <div className="flex items-center gap-3">
            <button className="text-lg" style={{ color: 'var(--outline)' }}>📎</button>
            <input value={message} onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setMessage('')}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-full border text-sm outline-none"
              style={{ borderColor: '#C0C9BF' }} />
            <button className="text-lg" style={{ color: 'var(--outline)' }}>😊</button>
            <button onClick={() => setMessage('')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: 'var(--primary)' }}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
