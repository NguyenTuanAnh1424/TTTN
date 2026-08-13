import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Profile.css';

export default function Profile() {
  const { user, authLoading, logout, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'orders'
  const [orders, setOrders]   = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [form, setForm] = useState({
    displayName: '',
    phone:       '',
    address:     '',
    gender:      '',
    birthDate:   '',
    photoURL:    '',
  });

  // Redirect nếu chưa đăng nhập
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Điền form khi user load
  useEffect(() => {
    if (user) {
      setForm({
        displayName: user.displayName || '',
        phone:       user.phone       || '',
        address:     user.address     || '',
        gender:      user.gender      || '',
        birthDate:   user.birthDate   || '',
        photoURL:    user.photoURL    || '',
      });
    }
  }, [user]);

  // Load đơn hàng của user theo userId
  useEffect(() => {
    if (activeTab === 'orders' && user?.uid) {
      setOrdersLoading(true);
      fetch(`http://localhost:5000/api/orders/user/${encodeURIComponent(user.uid)}`)
        .then(r => r.json())
        .then(data => setOrders(Array.isArray(data) ? data : []))
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [activeTab, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile(form);
      toast.success('✅ Cập nhật thông tin thành công!');
      setEditing(false);
    } catch (err) {
      toast.error('❌ Lỗi: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    toast.info('Đã đăng xuất');
  };

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="profile-spinner" />
      </div>
    );
  }

  if (!user) return null;

  const avatar = form.photoURL || user.photoURL;
  const initials = (user.displayName || user.email || 'U').charAt(0).toUpperCase();

  const STATUS_MAP = {
    Pending:   { label: 'Chờ xác nhận', color: '#f59e0b', bg: '#fffbeb' },
    Processing:{ label: 'Đang xử lý',   color: '#3b82f6', bg: '#eff6ff' },
    Shipping:  { label: 'Đang giao',    color: '#8b5cf6', bg: '#f5f3ff' },
    Delivered: { label: 'Đã giao',      color: '#10b981', bg: '#ecfdf5' },
    Paid:      { label: 'Đã thanh toán',color: '#10b981', bg: '#ecfdf5' },
    Cancelled: { label: 'Đã huỷ',       color: '#ef4444', bg: '#fef2f2' },
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* ── Sidebar Card ── */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-wrap">
            {avatar
              ? <img src={avatar} alt="avatar" className="profile-avatar-img" />
              : <div className="profile-avatar-placeholder">{initials}</div>
            }
            <div className="profile-avatar-badge">
              { (user.role === 'admin' || user.role === 'super_admin') ? '👑' : user.role === 'shipper' ? '🚚' : user.role === 'staff' ? '👩‍💼' : '👤'}
            </div>
          </div>


          <h2 className="profile-name">{user.displayName || 'Người dùng'}</h2>
          <p className="profile-email">{user.email}</p>
          <span className="profile-role-badge">
            { 
              user.role === 'super_admin' ? 'Admin Tổng' : 
              user.role === 'admin' ? 'Quản trị viên' : 
              user.role === 'staff' ? 'Nhân viên' : 
              user.role === 'shipper' ? 'Shipper' : 
              'Khách hàng' 
            }
          </span>


          <nav className="profile-nav">
            <button
              className={`profile-nav-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => { setActiveTab('info'); setEditing(false); }}
            >
              👤 Thông tin cá nhân
            </button>
            <button
              className={`profile-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Đơn hàng của tôi
            </button>
          </nav>

          <button className="profile-logout-btn" onClick={handleLogout}>
            🚪 Đăng xuất
          </button>

          <Link to="/" className="profile-back-link">← Về trang chủ</Link>
        </aside>

        {/* ── Main Content ── */}
        <main className="profile-main">

          {/* ── TAB: Thông tin cá nhân ── */}
          {activeTab === 'info' && (
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <div className="profile-card-label">TÀI KHOẢN CỦA BẠN</div>
                  <h1 className="profile-card-title">Thông tin cá nhân</h1>
                </div>
                {!editing && (
                  <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                    ✏️ Chỉnh sửa
                  </button>
                )}
              </div>

              <form onSubmit={handleSave}>
                {/* Avatar preview */}
                <div className="profile-field-group">
                  <div className="profile-avatar-preview-row">
                    {form.photoURL
                      ? <img src={form.photoURL} alt="preview" className="profile-avatar-preview" />
                      : <div className="profile-avatar-preview placeholder">{initials}</div>
                    }
                    <div className="profile-avatar-info">
                      <div className="profile-avatar-name">{user.displayName || 'Chưa đặt tên'}</div>
                      <div className="profile-avatar-meta">Email: {user.email}</div>
                      <div className="profile-avatar-meta">
                        Vai trò: { 
                          user.role === 'super_admin' ? 'Admin Tổng' : 
                          user.role === 'admin' ? 'Quản trị viên' : 
                          user.role === 'staff' ? 'Nhân viên' : 
                          user.role === 'shipper' ? 'Shipper' : 
                          'Khách hàng' 
                        }
                      </div>

                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="profile-form-grid">
                  {[
                    { label: 'Họ và tên',     key: 'displayName', type: 'text',   placeholder: 'Nhập họ tên' },
                    { label: 'Số điện thoại', key: 'phone',       type: 'tel',    placeholder: 'Nhập số điện thoại' },
                  ].map(f => (
                    <div key={f.key} className="profile-field">
                      <label>{f.label}</label>
                      {editing
                        ? <input type={f.type} value={form[f.key]} placeholder={f.placeholder}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                        : <div className="profile-field-value">{form[f.key] || <span className="empty">Chưa cập nhật</span>}</div>
                      }
                    </div>
                  ))}

                  <div className="profile-field">
                    <label>Giới tính</label>
                    {editing
                      ? (
                        <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}>
                          <option value="">-- Chọn --</option>
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </select>
                      )
                      : <div className="profile-field-value">
                          {form.gender === 'male' ? 'Nam' : form.gender === 'female' ? 'Nữ' : form.gender === 'other' ? 'Khác' : <span className="empty">Chưa cập nhật</span>}
                        </div>
                    }
                  </div>

                  <div className="profile-field">
                    <label>Ngày sinh</label>
                    {editing
                      ? <input type="date" value={form.birthDate}
                          onChange={e => setForm(p => ({ ...p, birthDate: e.target.value }))} />
                      : <div className="profile-field-value">
                          {form.birthDate ? new Date(form.birthDate).toLocaleDateString('vi-VN') : <span className="empty">Chưa cập nhật</span>}
                        </div>
                    }
                  </div>

                  <div className="profile-field profile-field-full">
                    <label>Địa chỉ</label>
                    {editing
                      ? <textarea value={form.address} rows={2} placeholder="Nhập địa chỉ của bạn"
                          onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
                      : <div className="profile-field-value">
                          {form.address || <span className="empty">Chưa cập nhật</span>}
                        </div>
                    }
                  </div>

                  <div className="profile-field profile-field-full">
                    <label>Ảnh đại diện (URL)</label>
                    {editing
                      ? <>
                          <input type="url" value={form.photoURL} placeholder="https://..."
                            onChange={e => setForm(p => ({ ...p, photoURL: e.target.value }))} />
                          <small style={{ color: '#888', marginTop: '4px', display: 'block' }}>
                            Dán link ảnh để cập nhật avatar, hoặc để trống nếu không có.
                          </small>
                        </>
                      : <div className="profile-field-value">
                          {form.photoURL
                            ? <a href={form.photoURL} target="_blank" rel="noopener noreferrer" style={{ color: '#009e82' }}>Xem ảnh</a>
                            : <span className="empty">Chưa cập nhật</span>}
                        </div>
                    }
                  </div>
                </div>

                {editing && (
                  <div className="profile-form-actions">
                    <button type="button" className="profile-cancel-btn"
                      onClick={() => { setEditing(false); setForm({ displayName: user.displayName || '', phone: user.phone || '', address: user.address || '', gender: user.gender || '', birthDate: user.birthDate || '', photoURL: user.photoURL || '' }); }}>
                      Huỷ
                    </button>
                    <button type="submit" className="profile-save-btn" disabled={saving}>
                      {saving ? '⏳ Đang lưu...' : '💾 Lưu thông tin'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* ── TAB: Đơn hàng ── */}
          {activeTab === 'orders' && (
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <div className="profile-card-label">ĐƠN HÀNG CỦA BẠN</div>
                  <h1 className="profile-card-title">Lịch sử mua sắm</h1>
                </div>
                <Link to="/catalog" className="profile-edit-btn" style={{ textDecoration: 'none' }}>
                  Tiếp tục mua sắm →
                </Link>
              </div>

              {ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                  <div className="profile-spinner" style={{ margin: '0 auto' }} />
                  <p style={{ marginTop: '1rem' }}>Đang tải đơn hàng...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="profile-empty-orders">
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📦</div>
                  <p style={{ fontWeight: 600, fontSize: '1.05rem', color: '#475569' }}>Bạn chưa có đơn hàng nào</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Hãy mua sắm và quay lại đây để xem lịch sử!</p>
                  <Link to="/catalog" className="profile-shop-now-btn">Mua sắm ngay</Link>
                </div>
              ) : (
                <div className="profile-orders-list">
                  {orders.map(o => {
                    const s = STATUS_MAP[o.status] || { label: o.status, color: '#888', bg: '#f0f0f0' };
                    return (
                      <div key={o.id} className="profile-order-card">
                        {/* Order header */}
                        <div className="profile-order-head">
                          <div className="profile-order-meta">
                            <div className="profile-order-code-label">Mã đơn hàng</div>
                            <div className="profile-order-code">{o.orderCode}</div>
                            <div className="profile-order-date">
                              {new Date(o.createdAt).toLocaleDateString('vi-VN', {
                                day: '2-digit', month: 'long', year: 'numeric'
                              })}
                            </div>
                            {o.customerName && (
                              <div className="profile-order-customer">
                                <span>👤</span> {o.customerName}
                              </div>
                            )}
                            {o.address && (
                              <div className="profile-order-address">{o.address}</div>
                            )}
                            {o.phone && (
                              <div className="profile-order-phone">ĐT: {o.phone}</div>
                            )}
                          </div>
                          <div className="profile-order-right">
                            <span className="profile-order-status" style={{ color: s.color, background: s.bg }}>
                              {s.label}
                            </span>
                            <div className="profile-order-total-big">
                              {Number(o.totalAmount).toLocaleString('vi-VN')} ₫
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="profile-order-divider" />

                        {/* Items list */}
                        {o.items && o.items.length > 0 ? (
                          <div className="profile-order-items">
                            {o.items.map(item => (
                              <div key={item.id} className="profile-order-item">
                                <div className="profile-item-img-wrap">
                                  {item.imageUrl
                                    ? <img src={item.imageUrl} alt={item.productName} className="profile-item-img" />
                                    : <div className="profile-item-img-placeholder">📦</div>
                                  }
                                </div>
                                <div className="profile-item-info">
                                  <div className="profile-item-name">{item.productName}</div>
                                  <div className="profile-item-attrs">Số lượng: {item.quantity}</div>
                                </div>
                                <div className="profile-item-prices">
                                  <div className="profile-item-unit">
                                    Đơn giá
                                    <span>{Number(item.price).toLocaleString('vi-VN')} ₫</span>
                                  </div>
                                  <div className="profile-item-total">
                                    Thành tiền
                                    <span>{Number(item.price * item.quantity).toLocaleString('vi-VN')} ₫</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0.5rem 0' }}>
                            Không có thông tin sản phẩm.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
