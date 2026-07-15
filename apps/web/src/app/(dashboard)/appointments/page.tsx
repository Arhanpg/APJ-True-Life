'use client';
import { useState, useEffect } from 'react';
import { appointmentsApi, type Appointment } from '@/lib/api';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  PENDING:     { bg: '#FFF8E7', color: '#C9A84C' },
  CONFIRMED:   { bg: '#EAF4EC', color: '#1A5C38' },
  IN_PROGRESS: { bg: '#E3F2FD', color: '#1565C0' },
  COMPLETED:   { bg: '#E8F5E9', color: '#2E7D52' },
  CANCELLED:   { bg: '#FFEBEE', color: '#BA1A1A' },
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchAppointments() {
    setLoading(true);
    try {
      const res = await appointmentsApi.list({ date: selectedDate } as any);
      const data = (res as any).data;
      setAppointments(data?.appointments || data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAppointments(); }, [selectedDate]);

  async function handleStatusUpdate(id: string, status: string) {
    setUpdatingId(id);
    try {
      await appointmentsApi.updateStatus(id, status);
      await fetchAppointments();
    } catch (e: any) {
      alert(`Failed to update status: ${e.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Appointments</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>Manage and track patient appointments</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid #C0C9BF', fontSize: 14, color: '#111E18' }}
          />
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F4FAF6', borderBottom: '1px solid #E1F2E8' }}>
              {['Time', 'Patient', 'Type', 'Reason', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#707971' }}>Loading…</td></tr>
            ) : error ? (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#BA1A1A' }}>{error}</td></tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#707971' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>📅</div>
                  <p>No appointments for {selectedDate}</p>
                </td>
              </tr>
            ) : (
              appointments.map(a => {
                const statusStyle = STATUS_COLORS[a.status] || { bg: '#F5F5F5', color: '#707971' };
                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid #F0F7F2' }}>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941', whiteSpace: 'nowrap' }}>
                      {a.startTime} – {a.endTime}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#111E18', fontSize: 14 }}>{a.patientId || '—'}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>
                      <span style={{ background: a.type === 'ONLINE' ? '#E3F2FD' : '#EAF4EC', color: a.type === 'ONLINE' ? '#1565C0' : '#1A5C38', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>
                        {a.type === 'ONLINE' ? '🌐 Online' : '🏥 In-Clinic'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941', maxWidth: 200 }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {a.reason || '—'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: statusStyle.bg, color: statusStyle.color, borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>
                        {a.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {a.status === 'PENDING' && (
                          <button onClick={() => handleStatusUpdate(a.id, 'CONFIRMED')} disabled={updatingId === a.id}
                            style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                            ✓ Confirm
                          </button>
                        )}
                        {a.status === 'CONFIRMED' && (
                          <button onClick={() => handleStatusUpdate(a.id, 'IN_PROGRESS')} disabled={updatingId === a.id}
                            style={{ background: '#1565C0', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                            ▶ Start
                          </button>
                        )}
                        {a.status === 'IN_PROGRESS' && (
                          <button onClick={() => handleStatusUpdate(a.id, 'COMPLETED')} disabled={updatingId === a.id}
                            style={{ background: '#2E7D52', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                            ✓ Complete
                          </button>
                        )}
                        {(a.status === 'PENDING' || a.status === 'CONFIRMED') && (
                          <button onClick={() => handleStatusUpdate(a.id, 'CANCELLED')} disabled={updatingId === a.id}
                            style={{ background: '#fff', color: '#BA1A1A', border: '1px solid #FFCDD2', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                            ✕ Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
