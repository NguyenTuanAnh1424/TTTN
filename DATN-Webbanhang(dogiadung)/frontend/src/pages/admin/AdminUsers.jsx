import { useState, useEffect } from 'react';

const API = 'http://localhost:5051/api';

export default function AdminUsers() {
  const [users, setUsers]   = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/users`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API}/orders`).then(r => r.json()).catch(() => []),
    ]).then(([u, o]) => {
      setUsers(u);
      setOrders(o);
      setLoading(false);
    });
  }, []);

  // Tổng hợp thống kê khách hàng từ đơn hàng (khi chưa có API users)
  const customerStats = (() => {
    const map = {};
    orders.forEach(o => {
      if (!o.customerName) return;
      const key = o.phone || o.customerName;
      if (!map[key]) {
        map[key] = { name: o.customerName, phone: o.phone || '--', userId: o.userId || 'GUEST', orders: 0, totalSpent: 0, lastOrder: o.createdAt };
      }
      map[key].orders += 1;
      map[key].totalSpent += Number(o.totalAmount || 0);
      if (new Date(o.createdAt) > new Date(map[key].lastOrder)) map[key].lastOrder = o.createdAt;
    });
    return Object.values(map).sort((a, b) => b.totalSpent - a.totalSpent);
  })();

  const fmt = n => Number(n).toLocaleString('vi-VN') + 'đ';

  return (
    <div>
      {/* KPI Cards */}
      <div className="kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card kpi-blue">
          <div className="kpi-icon">👥</div>
          <div className="kpi-info">
            <span className="kpi-label">Tổng khách hàng</span>
            <span className="kpi-value">{customerStats.length}</span>
          </div>
        </div>
        <div className="kpi-card kpi-green">
          <div className="kpi-icon">📋</div>
          <div className="kpi-info">
            <span className="kpi-label">Tổng đơn hàng</span>
            <span className="kpi-value">{orders.length}</span>
          </div>
        </div>
        <div className="kpi-card kpi-yellow">
          <div className="kpi-icon">💰</div>
          <div className="kpi-info">
            <span className="kpi-label">Doanh thu tổng</span>
            <span className="kpi-value" style={{ fontSize: '1.2rem' }}>
              {fmt(orders.reduce((s, o) => s + Number(o.totalAmount || 0), 0))}
            </span>
          </div>
        </div>
        <div className="kpi-card kpi-red">
          <div className="kpi-icon">⭐</div>
          <div className="kpi-info">
            <span className="kpi-label">Đặt nhiều nhất</span>
            <span className="kpi-value" style={{ fontSize: '1rem' }}>
              {customerStats[0]?.orders || 0} đơn
            </span>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ margin: 0 }}>👥 Danh sách Khách hàng</h2>
            <p style={{ color: '#888', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              Tổng hợp từ lịch sử đặt hàng thực tế.
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Đang tải...</div>
        ) : customerStats.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
            <p>Chưa có khách hàng nào đặt hàng.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Tổng đơn</th>
                  <th>Tổng chi tiêu</th>
                  <th>Đơn gần nhất</th>
                  <th>Hạng</th>
                </tr>
              </thead>
              <tbody>
                {customerStats.map((c, i) => {
                  let rank = { label: 'Thường', bg: '#eee', color: '#555' };
                  if (c.totalSpent >= 5000000)  rank = { label: '💎 VIP', bg: '#e8d5ff', color: '#6f42c1' };
                  else if (c.totalSpent >= 1000000) rank = { label: '🥇 Vàng', bg: '#fff3cd', color: '#856404' };
                  else if (c.orders >= 2)       rank = { label: '🥈 Bạc',  bg: '#f0f0f0', color: '#555' };
                  return (
                    <tr key={i}>
                      <td style={{ color: '#888', fontWeight: 600 }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: `hsl(${(c.name.charCodeAt(0) * 37) % 360}, 60%, 70%)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, color: '#fff', fontSize: '0.9rem', flexShrink: 0
                          }}>
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{c.name}</div>
                            {c.userId !== 'GUEST' && <div style={{ fontSize: '0.75rem', color: '#888' }}>ID: {c.userId.substring(0, 12)}...</div>}
                          </div>
                        </div>
                      </td>
                      <td>{c.phone}</td>
                      <td>
                        <span style={{ background: '#cce5ff', color: '#004085', padding: '2px 10px', borderRadius: '10px', fontWeight: 600 }}>
                          {c.orders} đơn
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: '#007bff' }}>{fmt(c.totalSpent)}</td>
                      <td style={{ color: '#888', fontSize: '0.85rem' }}>{new Date(c.lastOrder).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <span style={{ background: rank.bg, color: rank.color, padding: '2px 10px', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem' }}>
                          {rank.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
