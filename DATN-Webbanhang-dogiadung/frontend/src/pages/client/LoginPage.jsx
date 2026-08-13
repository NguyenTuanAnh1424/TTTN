import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import Toast from '../../components/common/Toast';
import { loginSuccess } from '../../redux/slices/authSlice';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

/**
 * Trang Đăng Nhập Tài Khoản (Client LoginPage)
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      setLoading(true);
      const res = await axiosClient.post('/auth/login', formData);

      if (res.success) {
        dispatch(loginSuccess({ token: res.token, user: res.user }));
        setToast({ message: 'Đăng nhập thành công!', type: 'success' });

        // Nếu là Admin/SuperAdmin/Editor -> chuyển sang Admin portal, ngược lại về Trang chủ
        setTimeout(() => {
          if (['SuperAdmin', 'Admin', 'Editor'].includes(res.user.role)) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Email hoặc mật khẩu không chính xác!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Đăng Nhập Tài Khoản</h1>
          <p className="text-xs text-gray-500">Chào mừng bạn quay trở lại GiaDungStore</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl border border-red-200 dark:border-red-800">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Địa chỉ Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="user@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Mật khẩu</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : <>Đăng Nhập Ngay <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Đăng ký ngay
          </Link>
        </div>

      </div>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
};

export default LoginPage;
