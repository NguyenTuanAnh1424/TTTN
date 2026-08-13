import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api';

const STATUS_OPTIONS = [
  { value: 'Pending',   label: 'Chờ xác nhận', bg: '#fff3cd', color: '#856404' },
  { value: 'Confirmed', label: 'Đã xác nhận',   bg: '#cce5ff', color: '#004085' },
  { value: 'Shipping',  label: 'Đang giao',      bg: '#d4edda', color: '#155724' },
  { value: 'Delivered', label: 'Đã giao',        bg: '#d1ecf1', color: '#0c5460' },
  { value: 'Paid',      label: 'Đã thanh toán', bg: '#d4edda', color: '#155724' },
  { value: 'Cancelled', label: 'Đã hủy',         bg: '#f8d7da', color: '#721c24' },
];

function StatusBadge({ status }) {
  const opt = STATUS_OPTIONS.find(s => s.value === status) || { bg: '#eee', color: '#333', label: status };
  return (
    <span style={{
      background: opt.bg, color: opt.color,
      padding: '3px 10px', borderRadius: '12px',
      fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap'
    }}>{opt.label}</span>
  );
}

export default function AdminOrders() {
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filterStatus, setFilter]   = useState('');
  const [selectedOrder, setSelected] = useState(null);
  const [newStatus, setNewStatus]   = useState('');
  const [updating, setUpdating]     = useState(false);
  const [msg, setMsg]               = useState('');

  const fetchOrders = () => {
    setLoading(true);
    fetch(`${API}/orders`)
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = filterStatus ? orders.filter(o => o.status === filterStatus) : orders;

  const openDetail = (order) => {
    setSelected(order);
    setNewStatus(order.status);
    setMsg('');
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API}/orders/${selectedOrder.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMsg('✅ Cập nhật thành công!');
        fetchOrders();
        setSelected(prev => ({ ...prev, status: newStatus }));
      } else {
        setMsg('❌ Cập nhật thất bại.');
      }
    } catch {
      setMsg('❌ Lỗi kết nối server.');
    }
    setUpdating(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
    await fetch(`${API}/orders/${id}`, { method: 'DELETE' });
    setOrders(prev => prev.filter(o => o.id !== id));
    if (selectedOrder?.id === id) setSelected(null);
  };

  const fmt = n => Number(n || 0).toLocaleString('vi-VN') + 'đ';

  return (
    <div>
      {/* Detail Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '2rem',
            width: '540px', maxHeight: '85vh', overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Chi tiết đơn #{selectedOrder.orderCode}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                ['Khách hàng', selectedOrder.customerName || '--'],
                ['Số điện thoại', selectedOrder.phone || '--'],
                ['Tổng tiền', fmt(selectedOrder.totalAmount)],
                ['Thanh toán', selectedOrder.paymentMethod || '--'],
                ['Vận chuyển', selectedOrder.shippingMethod || '--'],
                ['Ngày tạo', new Date(selectedOrder.createdAt).toLocaleString('vi-VN')],
              ].map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>{k}</div>
                  <div style={{ fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>Địa chỉ giao hàng</div>
              <div style={{ fontWeight: 500 }}>{selectedOrder.address || '--'}</div>
            </div>
            {selectedOrder.note && (
              <div style={{ background: '#fffbeb', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>Ghi chú</div>
                <div>{selectedOrder.note}</div>
              </div>
            )}

            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Cập nhật trạng thái:</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <button
                  onClick={handleUpdateStatus}
                  disabled={updating}
                  style={{ padding: '0.5rem 1.2rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  {updating ? '...' : 'Lưu'}
                </button>
              </div>
              {msg && <p style={{ marginTop: '0.75rem', fontWeight: 600, color: msg.startsWith('✅') ? '#28a745' : '#e60012' }}>{msg}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="admin-card">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>📦 Quản lý Đơn hàng</h2>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={filterStatus}
              onChange={e => setFilter(e.target.value)}
              style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.9rem' }}
            >
              <option value="">Tất cả trạng thái</option>
              {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button onClick={fetchOrders} style={{ padding: '0.5rem 1rem', background: '#f8fafc', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
              🔄 Làm mới
            </button>
            <span style={{ color: '#888', fontSize: '0.9rem' }}>{filtered.length} đơn hàng</span>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Đang tải dữ liệu...</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>SĐT</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id}>
                    <td style={{ color: '#007bff', fontWeight: 600 }}>{o.orderCode}</td>
                    <td>{o.customerName || 'Khách vãng lai'}</td>
                    <td>{o.phone || '--'}</td>
                    <td style={{ fontWeight: 600 }}>{fmt(o.totalAmount)}</td>
                    <td style={{ fontSize: '0.85rem', color: '#555' }}>{o.paymentMethod || '--'}</td>
                    <td><StatusBadge status={o.status} /></td>
                    <td style={{ color: '#888', fontSize: '0.85rem' }}>{new Date(o.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => openDetail(o)}
                          className="admin-btn btn-primary"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
                        >Chi tiết</button>
                        <button
                          onClick={() => handleDelete(o.id)}
                          className="admin-btn btn-danger"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
                        >Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                    😕 Chưa có đơn hàng nào.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
