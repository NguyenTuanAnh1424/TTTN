import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login }  = useContext(AuthContext);
  const navigate   = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Giả lập phân quyền theo email cho việc phát triển (Demo)
      let role = 'customer';
      if (email.startsWith('superadmin')) role = 'super_admin';
      else if (email.startsWith('admin'))   role = 'admin';
      else if (email.startsWith('staff'))   role = 'staff';
      else if (email.startsWith('shipper')) role = 'shipper';

      // Kiểm tra role đã lưu trong localStorage chưa, nếu chưa (login lần đầu) thì gán role giả lập
      const profileKey = `profile_${user.uid}`;
      const existingProfile = JSON.parse(localStorage.getItem(profileKey) || '{}');
      if (!existingProfile.role || (role !== 'customer' && existingProfile.role !== role)) {
        existingProfile.role = role;
        localStorage.setItem(profileKey, JSON.stringify(existingProfile));
      }

      // Đợi AuthContext cập nhật user status mới (đã có role)
      // Chuyển hướng theo role
      const finalRole = existingProfile.role || role;
      if (finalRole === 'super_admin' || finalRole === 'admin') navigate('/admin');
      else if (finalRole === 'staff') navigate('/staff');
      else if (finalRole === 'shipper') navigate('/shipper');
      else navigate('/'); // Chuyển về trang chủ cho khách hàng


    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Email hoặc mật khẩu không đúng.');
      } else {
        setError('Đã xảy ra lỗi: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ── LEFT: Form ── */}
      <div className="auth-left">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">H</div>
          <span className="auth-logo-name">HOMEVIBE</span>
        </div>

        <div className="auth-form-wrapper">
          <h1 className="auth-title">Chào mừng trở lại</h1>
          <p className="auth-subtitle">Đăng nhập để tiếp tục mua sắm</p>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="login-email">Tên đăng nhập</label>
              <div className="auth-field-input-wrap">
                <input
                  id="login-email"
                  type="email"
                  placeholder="Nhập tên đăng nhập của bạn"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Mật khẩu</label>
              <div className="auth-field-input-wrap">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPw(v => !v)}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="auth-notice">
              <span className="auth-notice-icon">🔒</span>
              <span>Hệ thống sẽ lưu trữ thông tin đăng nhập và trở lại của bạn lần kế tiếp.</span>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="auth-switch-row">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>

          <Link to="/" className="auth-back-link">← Về trang chủ</Link>
        </div>
      </div>

      {/* ── RIGHT: Promo Panel ── */}
      <div className="auth-right">
        <div className="auth-blob auth-blob-1" />
        <div className="auth-blob auth-blob-2" />

        <div className="auth-right-content">
          <div className="auth-right-icon">H</div>

          <h2 className="auth-right-heading">
            Khám phá không gian<br />sống của riêng bạn
          </h2>
          <p className="auth-right-desc">
            Hàng nghìn sản phẩm nội thất chất lượng cao, xu hướng mới nhất,
            giá cả phải chăng. Đăng nhập để trải nghiệm mua sắm tuyệt vời.
          </p>

          <div className="auth-stats">
            <div className="auth-stat-item">
              <span className="auth-stat-number">1,000+</span>
              <span className="auth-stat-label">Sản phẩm</span>
            </div>
            <div className="auth-stat-item">
              <span className="auth-stat-number">5,000+</span>
              <span className="auth-stat-label">Khách hàng</span>
            </div>
            <div className="auth-stat-item">
              <span className="auth-stat-number">4.8★</span>
              <span className="auth-stat-label">Đánh giá</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
