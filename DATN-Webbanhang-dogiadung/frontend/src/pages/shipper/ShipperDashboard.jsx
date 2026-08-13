import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './ShipperDashboard.css';

export default function ShipperDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.json();
        // Chỉ lấy đơn đang giao (Shipping)
        setOrders(Array.isArray(data) ? data.filter(o => o.status === 'Shipping') : []);
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

  const handleConfirmDelivered = (order) => {
    setActiveOrder(order);
    setShowConfirm(true);
  };

  const executeConfirm = async () => {
    if (!activeOrder) return;
    const id = activeOrder.id;


    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Delivered' })
      });
      if (res.ok) {
        toast.success("✅ Đã cập nhật trạng thái đơn hàng!");
        setShowConfirm(false);
        setActiveOrder(null);
        fetchOrders();
      } else {
        toast.error("Lỗi cập nhật");
      }

    } catch (err) {
      toast.error("Lỗi kết nối");
    }
  };

  const stats = {
    pending: orders.length,
    delivered: 0, 
    total: orders.reduce((sum, o) => sum + o.totalAmount, 0)
  };

  return (
    <div className="shipper-layout">
      {/* HEADER */}
      <header className="shipper-header">
        <div className="shipper-header-left">
          <div className="shipper-logo">
            <span className="logo-icon">H</span>
            <div className="logo-text">
              <strong>HOMEVIBE</strong>
              <span>Shipper Portal</span>
            </div>
          </div>
          <button className="nav-btn active">📊 Tổng Quan</button>
        </div>
        <div className="shipper-header-right">
          <div className="shipper-user-badge">
            <span className="avatar">{user?.displayName?.charAt(0) || 'S'}</span>
            <span className="name">{user?.displayName || 'Shipper'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Đăng Xuất</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="shipper-main">
        
        {/* HERO SECTION */}
        <section className="dashboard-hero card dark-teal">
          <div className="hero-icon">🚚</div>
          <div className="hero-info">
            <h2>Dashboard Shipper</h2>
            <p>Chào mừng {user?.displayName || 'Shipper'} quay trở lại làm việc!</p>
          </div>
          <div className="hero-stats">
            <div className="stat-label">ĐƠN ĐANG GIAO</div>
            <div className="stat-value">{orders.length}</div>
          </div>
        </section>

        {/* QUICK STATS */}
        <section className="summary-grid">
          <div className="summary-card">
            <div className="s-info">
              <div className="s-label">Cần giao</div>
              <div className="s-val">{orders.length}</div>
            </div>
            <div className="s-icon-right">📋</div>
          </div>
          <div className="summary-card">
            <div className="s-info">
              <div className="s-label">Tổng tiền (COD)</div>
              <div className="s-val">{Number(stats.total).toLocaleString('vi-VN')}₫</div>
            </div>
            <div className="s-icon-right">💰</div>
          </div>
        </section>

        {/* ONLINE STATUS */}
        <section className="info-section card">
          <h3 style={{marginBottom: '1rem'}}>Trạng thái nhận đơn</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
               <span className={`status-pill ${isOnline ? 'green' : 'gray'}`}>
                  {isOnline ? '✓ Online - Đang nhận đơn' : 'Offline - Nghỉ ngơi'}
               </span>
               <p style={{marginTop: '0.5rem', color: '#666', fontSize: '0.9rem'}}>Chuyển sang Online để hệ thống tự động gán đơn hàng mới.</p>
            </div>
            <button className="action-btn outline" style={{padding: '0.5rem 1rem', borderRadius: '8px'}} onClick={() => setIsOnline(!isOnline)}>
               {isOnline ? "Chuyển sang Offline" : "Chuyển sang Online"}
            </button>
          </div>
        </section>

        {/* ORDER LIST section */}
        <section className="order-list-section card">
          <div className="ol-header">
            <h3>Danh sách đơn hàng cần giao</h3>
            <p>Vui lòng cập nhật trạng thái sau khi giao xong</p>
          </div>

          {loading ? (
            <p style={{padding: '3rem', textAlign: 'center'}}>Đang tải...</p>
          ) : orders.length === 0 ? (
            <div style={{padding: '4rem', textAlign: 'center', color: '#94a3b8'}}>
               <p style={{fontSize: '3.5rem'}}>📦</p>
               <p style={{marginTop: '1rem'}}>Hiện không có đơn hàng nào cần giao.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="order-item-card" style={{marginBottom: '1.5rem', border: '1px solid #eee', position: 'relative'}}>
                <div className="oi-head" style={{borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem'}}>
                  <div className="oi-meta">
                    <div className="oi-label">MÃ ĐƠN</div>
                    <div className="oi-code" style={{color: '#0d9488'}}>{order.orderCode}</div>
                    <div className="oi-date">Ngày đặt: {new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="oi-total" style={{textAlign: 'right'}}>
                    <div className="oi-label">TỔNG THU (COD)</div>
                    <div className="oi-amount" style={{fontSize: '1.25rem', fontWeight: 700}}>{Number(order.totalAmount).toLocaleString('vi-VN')}₫</div>
                  </div>
                </div>

                <div className="oi-customer" style={{padding: '1rem 0'}}>
                  <div className="c-row">👤 <strong>{order.customerName}</strong></div>
                  <div className="c-row">📍 {order.address}</div>
                  <div className="c-row">📞 {order.phone}</div>
                </div>

                <div className="oi-product-list">
                  {(order.items || []).map(item => (
                    <div key={item.id} className="oi-product" style={{display: 'flex', gap: '1rem', marginTop: '0.75rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px'}}>
                      <img src={item.imageUrl || "https://bizweb.dktcdn.net/100/415/697/products/ke-goc-inox-304-3-tang.jpg"} alt="p" style={{width: 60, height: 60, borderRadius: '4px', objectFit:'cover'}} />
                      <div>
                        <div className="oi-p-name" style={{fontWeight: 600}}>{item.productName}</div>
                        <div className="oi-p-price">Số lượng: {item.quantity} · {Number(item.price).toLocaleString('vi-VN')}đ</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="oi-actions" style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end'}}>
                   <button className="confirm-btn" style={{background: '#0d9488', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}} 
                           onClick={() => handleConfirmDelivered(order)}>
                     Xác nhận đã giao & Thu tiền
                   </button>
                </div>
              </div>
            ))
          )}
        </section>

      </main>

      {/* CUSTOM MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Xác nhận đã giao hàng</h3>
            <p>
              Bạn có chắc chắn đã giao đơn hàng <br/>
              <strong>{activeOrder?.orderCode}</strong> cho khách hàng thành công?
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>Hủy</button>
              <button className="btn-confirm teal" onClick={executeConfirm}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
