import { useState } from 'react'
import { infoContent } from '../constants/infoData'
import './Footer.css'

export default function Footer() {
  const [modal, setModal] = useState(null) // key của infoContent

  const openModal = (key) => setModal(key)
  const closeModal = () => setModal(null)
  const active = modal ? infoContent[modal] : null

  return (
    <>
      <footer className="site-footer">
        <div className="footer-top">
          {/* CỘT 1: THÔNG TIN */}
          <div className="footer-col">
            <h3>Thông Tin</h3>
            <ul>
              <li><button className="footer-link" onClick={() => openModal('van-chuyen')}>🚚 Thông tin vận chuyển</button></li>
              <li><button className="footer-link" onClick={() => openModal('thanh-toan-cod')}>💵 Thanh toán khi nhận hàng</button></li>
              <li><button className="footer-link" onClick={() => openModal('thanh-toan')}>💳 Phương thức thanh toán</button></li>
              <li><button className="footer-link" onClick={() => openModal('kiem-tra')}>🔍 Chính sách kiểm tra hàng</button></li>
              <li><button className="footer-link" onClick={() => openModal('doi-tra')}>🔄 Chính sách đổi trả</button></li>
              <li><button className="footer-link" onClick={() => openModal('dieu-khoan')}>📋 Điều khoản sử dụng</button></li>
              <li><button className="footer-link" onClick={() => openModal('bao-mat')}>🔒 Chính sách bảo mật</button></li>
            </ul>
          </div>

          {/* CỘT 2: VỀ HOMEVIBE */}
          <div className="footer-col">
            <h3>Về HomeVibe</h3>
            <ul>
              <li><button className="footer-link" onClick={() => openModal('ve-chung-toi')}>🏠 Về chúng tôi</button></li>
              <li><button className="footer-link" onClick={() => openModal('lien-he')}>📞 Liên hệ với chúng tôi</button></li>
            </ul>
          </div>

          {/* CỘT 3: THEO DÕI */}
          <div className="footer-col">
            <h3>Theo Dõi Chúng Tôi</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn facebook" title="Facebook">f</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn instagram" title="Instagram">📷</a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-btn tiktok" title="TikTok">♪</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn youtube" title="YouTube">▶</a>
            </div>

            <div className="footer-badges">
              <div className="badge-item">
                <span className="badge-icon">✅</span>
                <span>Đã thông báo Bộ Công Thương</span>
              </div>
              <div className="badge-item">
                <span className="badge-icon">🛡️</span>
                <span>Bảo mật SSL 256-bit</span>
              </div>
              <div className="badge-item">
                <span className="badge-icon">🏆</span>
                <span>Top 10 Web TMĐT uy tín 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Bản quyền © {new Date().getFullYear()} <strong>CÔNG TY TNHH THƯƠNG MẠI HOMEVIBE VIỆT NAM</strong> | Mã số thuế: 0313596856</p>
          <p>473 Điện Biên Phủ, Phường Thạnh Mỹ Tây, Thành phố Hồ Chí Minh, Việt Nam &nbsp;|&nbsp; Hotline: <strong>1800 6789</strong> (Miễn phí)</p>
        </div>
      </footer>

      {/* MODAL CHI TIẾT */}
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
    </>
  )
}
