import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { infoContent } from '../constants/infoData'
import './Header.css'

export default function Header() {
  const [searchText, setSearchText] = useState('')
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()

  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)

  const openModal = (key) => setModal(key)
  const closeModal = () => setModal(null)
  const active = modal ? infoContent[modal] : null

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText)}`);
    }
  }

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="site-header">
      {/* Khối Header phần trên (Logo, Tìm kiếm, Đăng nhập, Giỏ hàng) */}
      <div className="header-top">
        <Link to="/" className="site-logo">
          HOMEVIBE
        </Link>

        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Bạn đang tìm gì?" 
            className="search-input" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <div className="header-actions">
          <div className="delivery-info" onClick={() => openModal('van-chuyen')} style={{ cursor: 'pointer' }}>
            <span className="icon">🚚</span>
            <div className="text-info">
              <strong>Thông tin giao hàng.</strong>
              <span>Phương thức giao hàng</span>
            </div>
          </div>
          
          <div className="auth-links">
            {user ? (
              <>
                <Link to="/profile" style={{ fontWeight: '600', color: '#009e82', textDecoration: 'none' }}>
                  👤 {user.displayName || user.email?.split('@')[0]}
                </Link>
                <span className="divider">|</span>
                <a href="#" onClick={async (e) => { e.preventDefault(); await logout(); navigate('/'); }}>Đăng xuất</a>
              </>
            ) : (
              <>
                <Link to="/login">Đăng nhập</Link> <span className="divider">|</span> <Link to="/register">Đăng ký</Link>
              </>
            )}
          </div>

          <Link to="/cart" className="cart-icon" style={{ position: 'relative' }}>
            🛍️
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-12px', background: '#e60012', 
                color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', fontWeight: 'bold'
              }}>
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* MODAL CHI TIẾT (DÙNG CHUNG STYLE VỚI FOOTER) */}
      {active && (
        <div className="footer-modal-overlay" onClick={closeModal}>
          <div className="footer-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            <div className="modal-header">
              <span className="modal-icon">{active.icon}</span>
              <h2>{active.title}</h2>
            </div>
            <div
              className="modal-body"
              dangerouslySetInnerHTML={{ __html: active.body }}
            />
          </div>
        </div>
      )}
    </header>
  )
}
