import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './Auth.css';

export default function Register() {
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [showCf, setShowCf]       = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  const { login } = useContext(AuthContext);
  const navigate  = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });

      // Giả lập phân quyền theo email (Demo)
      let role = 'customer';
      if (email.startsWith('superadmin'))    role = 'super_admin';
      else if (email.startsWith('admin'))     role = 'admin';
      else if (email.startsWith('staff'))     role = 'staff';
      else if (email.startsWith('shipper'))   role = 'shipper';

      // Lưu role vào localStorage
      localStorage.setItem(`profile_${cred.user.uid}`, JSON.stringify({ role }));

      // Cập nhật AuthContext và chuyển hướng
      await login(cred.user.email, password);
      
      if (role === 'super_admin' || role === 'admin') navigate('/admin');
      else if (role === 'staff') navigate('/staff');
      else if (role === 'shipper') navigate('/shipper');
      else navigate('/'); // Chuyển về trang chủ cho khách hàng


    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email này đã được sử dụng bởi tài khoản khác.');
      } else if (err.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu (tối thiểu 6 ký tự).');
      } else {
        setError('Đã xảy ra lỗi: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6)  s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel = ['', 'Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'][strength];
  const strengthColor = ['', '#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#2b6cb0'][strength];

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
          <h1 className="auth-title">Tạo tài khoản mới</h1>
          <p className="auth-subtitle">Tham gia HOMEVIBE để mua sắm dễ dàng hơn</p>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* Họ và tên */}
            <div className="auth-field">
              <label htmlFor="reg-name">Họ và tên</label>
              <div className="auth-field-input-wrap">
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="reg-email">Địa chỉ Email</label>
              <div className="auth-field-input-wrap">
                <input
                  id="reg-email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="auth-field">
              <label htmlFor="reg-pw">Mật khẩu</label>
              <div className="auth-field-input-wrap">
                <input
                  id="reg-pw"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Tối thiểu 6 ký tự"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPw(v => !v)}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
              {/* Strength bar */}
              {password && (
                <div className="pw-strength">
                  <div className="pw-strength-bars">
                    {[1,2,3,4,5].map(i => (
                      <div
                        key={i}
                        className="pw-strength-bar"
                        style={{ background: i <= strength ? strengthColor : '#e2e8f0' }}
                      />
                    ))}
                  </div>
                  <span className="pw-strength-label" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="auth-field">
              <label htmlFor="reg-cf">Xác nhận mật khẩu</label>
              <div className="auth-field-input-wrap">
                <input
                  id="reg-cf"
                  type={showCf ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={{
                    borderColor: confirm && confirm !== password ? '#e53e3e'
                               : confirm && confirm === password ? '#38a169'
                               : undefined
                  }}
                />
                <button type="button" className="eye-btn" onClick={() => setShowCf(v => !v)}>
                  {showCf ? '🙈' : '👁️'}
                </button>
              </div>
              {confirm && confirm !== password && (
                <span className="auth-field-hint error">Mật khẩu không khớp</span>
              )}
              {confirm && confirm === password && (
                <span className="auth-field-hint success">✓ Mật khẩu khớp</span>
              )}
            </div>

            {/* Terms notice */}
            <div className="auth-notice">
              <span className="auth-notice-icon">📋</span>
              <span>Bằng cách đăng ký, bạn đồng ý với <strong>Điều khoản dịch vụ</strong> và <strong>Chính sách bảo mật</strong> của HOMEVIBE.</span>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </button>
          </form>

          <p className="auth-switch-row">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
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
            Nâng tầm không gian<br />sống của bạn
          </h2>
          <p className="auth-right-desc">
            Đăng ký ngay hôm nay để nhận ưu đãi độc quyền, theo dõi đơn hàng
            và trải nghiệm mua sắm nội thất cao cấp cùng HOMEVIBE.
          </p>

          {/* Feature list */}
          <div className="auth-features">
            {[
              { icon: '🚚', text: 'Giao hàng miễn phí cho đơn từ 500K' },
              { icon: '🔄', text: 'Đổi trả dễ dàng trong 30 ngày' },
              { icon: '💎', text: 'Tích điểm thành viên, nhận quà hấp dẫn' },
              { icon: '🛡️', text: 'Bảo hành chính hãng 100%' },
            ].map((f, i) => (
              <div key={i} className="auth-feature-item">
                <span className="auth-feature-icon">{f.icon}</span>
                <span className="auth-feature-text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}