import { useState } from 'react';

export default function AdminStaff() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Nguyen Van', email: 'nv1@g.co', phone: '0123456789', role: 'Nhân viên bán hàng', status: 'Hoạt động', createdAt: '2025-12-02' }
  ]);
  
  const [shippers, setShippers] = useState([
    { id: 1, name: 'Nguyen Cu', phone: '0123456789', licensePlate: '111111', status: 'Hoạt động' }
  ]);

  return (
    <div className="admin-page">
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="admin-page-title" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>Quản Lý Tài Khoản Nhân Viên</h2>
        <button style={{
          background: '#ef4444', color: '#fff', border: 'none', padding: '0.6rem 1.25rem',
          borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
        }}>+ Thêm Nhân Viên</button>
      </div>

      {/* Bảng Nhân viên */}
      <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>TÊN</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>EMAIL</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>SĐT</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>VAI TRÒ</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>TRẠNG THÁI</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>NGÀY TẠO</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(s => (
              <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 500 }}>{s.name}</td>
                <td style={{ padding: '1rem', color: '#475569' }}>{s.email}</td>
                <td style={{ padding: '1rem', color: '#475569' }}>{s.phone}</td>
                <td style={{ padding: '1rem', color: '#475569' }}>{s.role}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {s.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#475569' }}>{s.createdAt}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', margin: '0 5px' }}>Sửa</button>
                  <button style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', margin: '0 5px' }}>Khóa</button>
                  <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', margin: '0 5px' }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bảng Shipper */}
      <div className="admin-page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="admin-page-title" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>Quản Lý Shipper</h2>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>MÃ SHIPPER</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>TÊN ĐẦY ĐỦ</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>SĐT</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>BIỂN SỐ XE</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>TRẠNG THÁI</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {shippers.map(sh => (
              <tr key={sh.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 500 }}>{sh.id}</td>
                <td style={{ padding: '1rem', color: '#475569' }}>{sh.name}</td>
                <td style={{ padding: '1rem', color: '#475569' }}>{sh.phone}</td>
                <td style={{ padding: '1rem', color: '#475569' }}>{sh.licensePlate}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {sh.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', margin: '0 5px' }}>Sửa</button>
                  <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', margin: '0 5px' }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
