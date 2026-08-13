import { useState, useEffect } from 'react';

const API = 'http://localhost:5051/api';

const STATUS_COLORS = {
  Pending:   { bg: '#fff3cd', color: '#856404', label: 'Chờ xác nhận' },
  Confirmed: { bg: '#cce5ff', color: '#004085', label: 'Đã xác nhận' },
  Shipping:  { bg: '#d4edda', color: '#155724', label: 'Đang giao' },
  Delivered: { bg: '#d1ecf1', color: '#0c5460', label: 'Đã giao' },
  Paid:      { bg: '#d4edda', color: '#155724', label: 'Đã thanh toán' },
  Cancelled: { bg: '#f8d7da', color: '#721c24', label: 'Đã hủy' },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/admin/stats`)
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => { setError('Không thể kết nối tới server.'); setLoading(false); });
  }, []);

  if (loading) return <div className="admin-loading">⏳ Đang tải dữ liệu...</div>;
  if (error)   return <div className="admin-error">❌ {error}</div>;

  const fmt = (n) => Number(n || 0).toLocaleString('vi-VN') + 'đ';

  return (
    <div>
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card kpi-blue">
          <div className="kpi-icon">💰</div>
          <div className="kpi-info">
            <span className="kpi-label">Doanh thu tháng</span>
            <span className="kpi-value">{fmt(stats.monthlyRevenue)}</span>
          </div>
        </div>
        <div className="kpi-card kpi-green">
          <div className="kpi-icon">📦</div>
          <div className="kpi-info">
            <span className="kpi-label">Đơn chờ xác nhận</span>
            <span className="kpi-value">{stats.pendingOrders}</span>
          </div>
        </div>
        <div className="kpi-card kpi-yellow">
          <div className="kpi-icon">🛍️</div>
          <div className="kpi-info">
            <span className="kpi-label">Tổng sản phẩm</span>
            <span className="kpi-value">{stats.totalProducts}</span>
          </div>
        </div>
        <div className="kpi-card kpi-red">
          <div className="kpi-icon">📋</div>
          <div className="kpi-info">
            <span className="kpi-label">Tổng đơn hàng</span>
            <span className="kpi-value">{stats.totalOrders}</span>
          </div>
        </div>
      </div>

      {/* Doanh thu tổng + Trạng thái đơn hàng */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="admin-card">
          <h2 style={{ marginBottom: '1rem' }}>📊 Doanh thu tổng cộng</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#007bff' }}>{fmt(stats.totalRevenue)}</div>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>Từ các đơn hàng đã thanh toán & giao thành công</p>
        </div>
        <div className="admin-card">
          <h2 style={{ marginBottom: '1rem' }}>📈 Trạng thái đơn hàng</h2>
          {stats.ordersByStatus.map(s => {
            const info = STATUS_COLORS[s.status] || { bg: '#eee', color: '#333', label: s.status };
            return (
              <div key={s.status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ background: info.bg, color: info.color, padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>{info.label}</span>
                <strong>{s.count} đơn</strong>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top sản phẩm bán chạy */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>🔥 Top sản phẩm bán chạy</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>SKU</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Đã bán</th>
                <th>Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map((p, i) => (
                <tr key={p.id}>
                  <td><strong style={{ color: i < 3 ? '#e60012' : '#333' }}>{i + 1}</strong></td>
                  <td style={{ color: '#007bff', fontSize: '0.85rem' }}>{p.sku}</td>
                  <td>{p.name}</td>
                  <td>{Number(p.price).toLocaleString('vi-VN')}đ</td>
                  <td><strong style={{ color: '#28a745' }}>{p.sold}</strong></td>
                  <td>
                    <span style={{ color: p.stock < 10 ? '#e60012' : p.stock < 30 ? '#ffc107' : '#28a745', fontWeight: 600 }}>
                      {p.stock}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.topProducts.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>Chưa có dữ liệu sản phẩm.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Đơn hàng gần đây */}
      <div className="admin-card">
        <h2 style={{ marginBottom: '1rem' }}>🕐 Đơn hàng gần đây</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>SĐT</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(o => {
                const info = STATUS_COLORS[o.status] || { bg: '#eee', color: '#333', label: o.status };
                return (
                  <tr key={o.id}>
                    <td style={{ color: '#007bff', fontWeight: 600 }}>{o.orderCode}</td>
                    <td>{o.customerName || 'Khách vãng lai'}</td>
                    <td>{o.phone || '--'}</td>
                    <td>{Number(o.totalAmount).toLocaleString('vi-VN')}đ</td>
                    <td>
                      <span style={{ background: info.bg, color: info.color, padding: '3px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {info.label}
                      </span>
                    </td>
                    <td style={{ color: '#888', fontSize: '0.85rem' }}>
                      {new Date(o.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                );
              })}
              {stats.recentOrders.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>Chưa có đơn hàng nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
