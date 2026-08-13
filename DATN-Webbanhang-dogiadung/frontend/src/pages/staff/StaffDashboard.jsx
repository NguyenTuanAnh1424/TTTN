import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './StaffDashboard.css';



export default function StaffDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.ok ? await res.json() : [];
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Cập nhật đơn hàng #${id} thành ${newStatus}`);
        fetchOrders(); // Reload list
      } else {
        toast.error('Có lỗi xảy ra khi cập nhật');
      }
    } catch (err) {
      toast.error('Lỗi kết nối');
    }
  };

  const statusMap = {
    'Pending': { label: 'Chờ xác nhận', class: 'warning' },
    'Confirmed': { label: 'Đã nhận đơn', class: 'info' },
    'Shipping': { label: 'Đang giao', class: 'info' },
    'Delivered': { label: 'Đã hoàn tất', class: 'success' },
    'Cancelled': { label: 'Đã hủy', class: 'danger' },
    'Paid': { label: 'Đã thanh toán', class: 'success' }
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = (filter === 'All' || o.status === filter);
    const matchesSearch = o.orderCode.toLowerCase().includes(search.toLowerCase()) || 
                          o.customerName?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStats = (status) => orders.filter(o => o.status === status).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'Delivered' || o.status === 'Paid' ? o.totalAmount : 0), 0);


  return (
    <div className="staff-layout">
      {/* HEADER */}
      <header className="staff-header">
        <div className="staff-header-left">
          <div className="staff-logo">
            <span className="logo-icon">H</span>
            <div className="logo-text">
              <strong>HOMEVIBE</strong>
              <span>Staff Portal</span>
            </div>
          </div>
          <button className="nav-btn active">📊 Tổng Quan</button>
        </div>
        <div className="staff-header-right">
          <div className="staff-user-badge">
            <span className="avatar">{user?.displayName?.charAt(0) || 'N'}</span>
            <span className="name">{user?.displayName || 'Nhân viên'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Đăng Xuất</button>
        </div>
      </header>


      {/* MAIN CONTENT */}
      <main className="staff-main">
        
        {/* DASHBOARD CARD */}
        <section className="dashboard-hero card">
          <div className="hero-icon">
            📊
          </div>
          <div className="hero-info">
            <h2>Dashboard Nhân Viên</h2>
            <p>Quản lý đơn hàng và chăm sóc khách hàng chuyên nghiệp</p>
          </div>
          <div className="hero-stats">
            <div className="stat-label">TỔNG ĐƠN HÀNG</div>
            <div className="stat-value">1</div>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="summary-grid">
          <div className="summary-card">
            <div className="s-icon orange">⏳</div>
            <div className="s-info">
              <div className="s-label">ĐƠN CHỜ XÁC NHẬN</div>
              <div className="s-val">{getStats('Pending')}</div>
              <div className="s-sub">{getStats('Pending')} đơn mới</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="s-icon blue">📦</div>
            <div className="s-info">
              <div className="s-label">ĐƠN ĐANG XỬ LÝ</div>
              <div className="s-val">{getStats('Confirmed')}</div>
              <div className="s-sub">Chờ gán shipper</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="s-icon green">✓</div>
            <div className="s-info">
              <div className="s-label">ĐƠN HOÀN TẤT</div>
              <div className="s-val">{getStats('Delivered') + getStats('Paid')}</div>
              <div className="s-sub">Giao xong/Đã trả tiền</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="s-icon purple">₫</div>
            <div className="s-info">
              <div className="s-label">THU NHẬP ĐƠN HOÀN TẤT</div>
              <div className="s-val">{(totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="s-sub">Tổng tiền đơn đã xong</div>
            </div>
          </div>
        </section>

        {/* ORDER MANAGEMENT SECTION */}
        <section className="order-management card">
          <div className="om-header">
            <h3>Quản lý đơn hàng</h3>
            <p>Xử lý và theo dõi tất cả đơn hàng trong hệ thống</p>
          </div>

          <div className="om-filters">
            {['All', 'Pending', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'].map(s => (
              <button 
                key={s} 
                className={`filter-chip ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s === 'All' ? 'Tất cả' : statusMap[s]?.label || s}
              </button>
            ))}
          </div>

          <div className="om-search">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm mã đơn, tên khách hàng hoặc sản phẩm..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Đang tải đơn hàng...</p>
          ) : filteredOrders.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Không tìm thấy đơn hàng nào.</p>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-head">
                  <div className="order-meta">
                    <div className="order-icon">📋</div>
                    <div>
                      <div className="order-label">MÃ ĐƠN HÀNG</div>
                      <div className="order-code">{order.orderCode}</div>
                    </div>
                    <div className="order-time">
                      🕒 {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="order-total-block">
                    <div className="total-label">TỔNG TIỀN</div>
                    <div className="total-val">{Number(order.totalAmount).toLocaleString('vi-VN')}đ</div>
                    <span className={`status-pill ${statusMap[order.status]?.class || 'default'}`}>
                      {statusMap[order.status]?.label || order.status}
                    </span>
                    <div className="payment-method">💬 {order.paymentMethod}</div>
                  </div>
                </div>

                <div className="order-customer">
                  <div className="c-row"><span className="c-icon">👤</span> <strong>{order.customerName}</strong></div>
                  <div className="c-row"><span className="c-icon">📍</span> {order.address}</div>
                  <div className="c-row"><span className="c-icon">📞</span> {order.phone}</div>
                </div>

                <div className="order-product-list">
                  {(order.items || []).map(item => (
                    <div key={item.id} className="order-product-item">
                      <img src={item.imageUrl || "https://via.placeholder.com/60"} alt="Product" className="p-img" />
                      <div className="p-info">
                        <div className="p-name">{item.productName}</div>
                        <div className="p-price">
                          <strong>x{item.quantity}</strong> · {Number(item.price).toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                      <div className="p-total">{Number(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                    </div>
                  ))}
                </div>

                <div className="order-actions">
                  {order.status === 'Pending' && (
                    <button className="action-btn dark-teal" onClick={() => updateStatus(order.id, 'Confirmed')}>
                      ✓ Xác nhận đơn
                    </button>
                  )}
                  {order.status === 'Confirmed' && (
                    <button className="action-btn dark-teal" onClick={() => updateStatus(order.id, 'Shipping')}>
                      🚀 Gán cho shipper
                    </button>
                  )}
                  {order.status === 'Shipping' && (
                    <button className="action-btn disabled" disabled>
                      🚚 Đang giao hàng...
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <button className="action-btn disabled" disabled>
                      ✅ Đã hoàn tất
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
