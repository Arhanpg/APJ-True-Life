'use client';
import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';

interface ChatSession {
  id: string;
  treatmentPlanId: string;
  patientId: string;
  doctorId: string;
  isActive: boolean;
  createdAt: string;
}

interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';
  content: string;
  isRead: boolean;
  createdAt: string;
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function fetchSessions() {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; data: ChatSession[] }>('/chat/sessions');
      setSessions(res.data || []);
    } catch {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMessages(sessionId: string) {
    try {
      const res = await api.get<any>(`/chat/sessions/${sessionId}/messages`);
      const data = res.data || res;
      setMessages((data?.messages || []).reverse()); // Show oldest first
    } catch {
      setMessages([]);
    }
  }

  async function sendMessage() {
    if (!newMessage.trim() || !activeSession) return;
    try {
      await api.post(`/chat/sessions/${activeSession.id}/messages`, {
        content: newMessage.trim(),
        messageType: 'TEXT',
      });
      setNewMessage('');
      await fetchMessages(activeSession.id);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (e: any) {
      alert(`Failed to send message: ${e.message}`);
    }
  }

  useEffect(() => { fetchSessions(); }, []);
  useEffect(() => {
    if (activeSession) {
      fetchMessages(activeSession.id);
      const interval = setInterval(() => fetchMessages(activeSession.id), 5000); // Poll every 5s
      return () => clearInterval(interval);
    }
  }, [activeSession]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: 'calc(100vh - 120px)', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      {/* Sessions sidebar */}
      <div style={{ borderRight: '1px solid #E1F2E8', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #E1F2E8' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Messages</h2>
        </div>
        {loading ? (
          <div style={{ padding: 20, color: '#707971', fontSize: 13 }}>Loading…</div>
        ) : sessions.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#707971' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
            <p style={{ fontSize: 13 }}>No active chats</p>
          </div>
        ) : (
          sessions.map(s => (
            <div key={s.id} onClick={() => setActiveSession(s)}
              style={{ padding: '14px 16px', cursor: 'pointer', background: activeSession?.id === s.id ? '#EAF4EC' : 'transparent', borderBottom: '1px solid #F0F7F2' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111E18' }}>Patient Chat</div>
              <div style={{ fontSize: 12, color: '#707971', marginTop: 2 }}>{s.isActive ? '● Active' : '○ Closed'}</div>
            </div>
          ))
        )}
      </div>

      {/* Chat area */}
      {activeSession ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', fontWeight: 700, color: '#111E18' }}>
            Chat Session
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.senderId === activeSession.doctorId ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: m.senderId === activeSession.doctorId ? '#1A5C38' : '#F4FAF6',
                  color: m.senderId === activeSession.doctorId ? '#fff' : '#111E18',
                  borderRadius: 12,
                  padding: '8px 14px',
                  maxWidth: '70%',
                  fontSize: 14,
                  lineHeight: 1.5,
                }}>
                  {m.content}
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4, textAlign: 'right' }}>
                    {new Date(m.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #E1F2E8', display: 'flex', gap: 10 }}>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message…"
              style={{ flex: 1, border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', color: '#111E18' }}
            />
            <button onClick={sendMessage} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#707971' }}>
          <div style={{ fontSize: 48 }}>💬</div>
          <p style={{ fontSize: 15, fontWeight: 500 }}>Select a conversation</p>
        </div>
      )}
    </div>
  );
}
