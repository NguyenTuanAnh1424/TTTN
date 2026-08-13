import { Link, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import './AdminLayout.css'

export default function AdminLayout() {
  const location = useLocation()
  const { user, logout } = useContext(AuthContext)
  const isSuperAdmin = user?.role === 'super_admin'


  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2><Link to="/">HOMEVIBE</Link></h2>
          <span className="badge">{isSuperAdmin ? 'Super Admin' : 'Admin'} Panel</span>
        </div>

        
        <nav className="admin-nav">
          <Link to="/admin" className={`admin-nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
            📊 Thống kê (Dashboard)
          </Link>
          <Link to="/admin/products" className={`admin-nav-item ${location.pathname.includes('/admin/products') ? 'active' : ''}`}>
            🛍️ Quản lý Sản phẩm
          </Link>
          <Link to="/admin/categories" className={`admin-nav-item ${location.pathname.includes('/admin/categories') ? 'active' : ''}`}>
            📂 Quản lý Danh mục
          </Link>
          <Link to="/admin/orders" className={`admin-nav-item ${location.pathname.includes('/admin/orders') ? 'active' : ''}`}>
            📦 Quản lý Đơn hàng
          </Link>
          <Link to="/admin/users" className={`admin-nav-item ${location.pathname.includes('/admin/users') ? 'active' : ''}`}>
            👥 Quản lý Khách Hàng
          </Link>
          
          {isSuperAdmin && (
            <>
              <Link to="/admin/staff" className={`admin-nav-item ${location.pathname.includes('/admin/staff') ? 'active' : ''}`}>
                👩‍💼 Quản lý Nhân Viên
              </Link>
              <Link to="/admin/settings" className={`admin-nav-item ${location.pathname.includes('/admin/settings') ? 'active' : ''}`}>
                ⚙️ Cấu hình hệ thống
              </Link>
            </>
          )}

          <Link to="/admin/vouchers" className={`admin-nav-item ${location.pathname.includes('/admin/vouchers') ? 'active' : ''}`}>
            🎟️ Quản lý Voucher
          </Link>
        </nav>

        
        <div className="admin-footer">
          <Link to="/" className="btn-back-home">← Về trang khách hàng</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">
            <h3>Xin chào, {isSuperAdmin ? 'Admin Tổng' : 'Quản trị viên'}</h3>
          </div>

          <div className="admin-header-user">
            <button className="btn-logout" onClick={() => { logout(); window.location.href='/' }}>Đăng xuất</button>
          </div>

        </header>

        <div className="admin-content-area">
          <Outlet /> {/* Nơi các trang con sẽ được render */}
        </div>
      </main>
    </div>
  )
}
