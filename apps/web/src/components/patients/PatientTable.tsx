'use client';
import Link from 'next/link';

const PATIENTS = [
  { id: 'ATL-0001', name: 'Ramesh Kumar', email: 'ramesh@example.com', phone: '+91 98765 43210', age: 45, gender: 'M', status: 'In Treatment', lastVisit: '2026-06-08', treatment: 'Nasya Course' },
  { id: 'ATL-0002', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 87654 32109', age: 32, gender: 'F', status: 'Active', lastVisit: '2026-06-05', treatment: 'Panchakarma Detox' },
  { id: 'ATL-0003', name: 'Anjali Mehta', email: 'anjali@example.com', phone: '+91 76543 21098', age: 28, gender: 'F', status: 'Completed', lastVisit: '2026-05-20', treatment: 'Shirodhara' },
  { id: 'ATL-0004', name: 'Mohan Das', email: 'mohan@example.com', phone: '+91 65432 10987', age: 55, gender: 'M', status: 'Active', lastVisit: '2026-06-09', treatment: 'General' },
  { id: 'ATL-0005', name: 'Sunita Rao', email: 'sunita@example.com', phone: '+91 54321 09876', age: 38, gender: 'F', status: 'In Treatment', lastVisit: '2026-06-07', treatment: 'Abhyanga' },
];

const STATUS_STYLE: Record<string, string> = {
  'Active': 'chip-active', 'In Treatment': 'chip-progress', 'Completed': 'chip-completed',
};

interface Props { search: string; filter: string; }

export function PatientTable({ search, filter }: Props) {
  const filtered = PATIENTS.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || (filter === 'Active' && p.status === 'Active') || (filter === 'In Treatment' && p.status === 'In Treatment') || (filter === 'Completed' && p.status === 'Completed');
    return matchSearch && matchFilter;
  });

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
      <table className="w-full">
        <thead>
          <tr style={{ background: 'var(--surface-tint)' }}>
            {['Patient','Age / Gender','Active Treatment','Last Visit','Status','Actions'].map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={6} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No patients found.</td></tr>
          ) : filtered.map(p => (
            <tr key={p.id} className="border-t hover:bg-[#F0FAF4] transition-all" style={{ borderColor: '#E8F5E9' }}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" style={{ background: 'var(--secondary)' }}>{p.name[0]}</div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{p.name}</p>
                    <p className="text-xs" style={{ color: 'var(--outline)' }}>{p.id} · {p.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>{p.age}y / {p.gender}</td>
              <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>{p.treatment}</td>
              <td className="px-4 py-3 text-xs" style={{ color: 'var(--outline)' }}>{p.lastVisit}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[p.status] || 'chip-completed'}`}>{p.status}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link href={`/patients/${p.id}`} className="text-xs px-2 py-1 rounded font-medium" style={{ background: 'var(--surface-tint)', color: 'var(--primary)' }}>View</Link>
                  <button className="text-xs px-2 py-1 rounded font-medium" style={{ background: '#E3F2FD', color: '#1565C0' }}>Chat</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#E8F5E9' }}>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Showing {filtered.length} of {PATIENTS.length} patients</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 rounded text-xs border" style={{ borderColor: '#C0C9BF', color: 'var(--text-muted)' }}>Previous</button>
          <button className="px-3 py-1 rounded text-xs" style={{ background: 'var(--primary)', color: 'white' }}>1</button>
          <button className="px-3 py-1 rounded text-xs border" style={{ borderColor: '#C0C9BF', color: 'var(--text-muted)' }}>Next</button>
        </div>
      </div>
    </div>
  );
}
