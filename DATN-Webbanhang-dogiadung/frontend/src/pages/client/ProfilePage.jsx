import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, updateUserSuccess } from '../../redux/slices/authSlice';
import axiosClient from '../../api/axiosClient';
import { User, Mail, Phone, MapPin, Upload, Save, CheckCircle, ShieldCheck } from 'lucide-react';

/**
 * Trang Hồ Sơ Cá Nhân Dành Cho Khách Hàng (ProfilePage)
 * Cho phép tự upload ảnh avatar từ máy tính và cập nhật Họ Tên, Email, SĐT, Địa Chỉ.
 */
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imgError, setImgError] = useState(false);

  // Hàm bổ trợ chuyển relative path /uploads/... thành full URL
  const formatAvatarUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Nạp thông tin người dùng hiện tại vào Form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
      setAvatarPreview(formatAvatarUrl(user.avatar));
    }
  }, [user]);

  // Xử lý chọn file ảnh từ máy tính
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setImgError(false);
    }
  };

  // Xử lý cập nhật thông tin & Upload file
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('address', formData.address);

      if (avatarFile) {
        data.append('avatar', avatarFile);
      }

      const res = await axiosClient.put('/auth/profile', data);

      if (res.success && res.user) {
        if (res.token) {
          dispatch(loginSuccess({ user: res.user, token: res.token }));
        } else {
          dispatch(updateUserSuccess(res.user));
        }

        setAvatarPreview(formatAvatarUrl(res.user.avatar));
        setSuccessMessage('Đã cập nhật ảnh đại diện và hồ sơ cá nhân thành công!');
        setAvatarFile(null);
        setImgError(false);
      }
    } catch (err) {
      console.error('Lỗi cập nhật profile:', err);
      setErrorMessage(err.message || 'Cập nhật thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const firstLetter = (formData.name || formData.email || 'U').charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 transition-colors">
        
        {/* Header Hồ sơ */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-7 h-7 text-blue-600" /> Hồ Sơ Cá Nhân Của Tôi
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Quản lý thông tin tài khoản, ảnh đại diện và địa chỉ nhận hàng mặc định.
            </p>
          </div>
          
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <ShieldCheck className="w-3.5 h-3.5" /> Vai trò: {user?.role || 'Khách hàng'}
          </span>
        </div>

        {/* Thông báo thành công / Thất bại */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-bold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm font-bold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. KHU VỰC THAY ĐỔI ẢNH ĐẠI DIỆN AVATAR */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="relative group">
              {avatarPreview && !imgError ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  onError={() => setImgError(true)}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-3xl font-black flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-md">
                  {firstLetter}
                </div>
              )}

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-110"
                title="Tải ảnh mới từ máy tính"
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Ảnh Đại Diện Tài Khoản</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cho phép chọn file hình ảnh (PNG, JPG, WEBP) tối đa 5MB từ máy tính của bạn.
              </p>
              {avatarFile && (
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  ✓ Đã chọn file: {avatarFile.name} (Bấm "Lưu Thay Đổi Hồ Sơ" để tải ảnh lên CSDL)
                </p>
              )}
            </div>
          </div>

          {/* 2. FORM ĐIỀN THÔNG TIN CÁ NHÂN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Họ và tên */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" /> Họ và Tên
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-600" /> Địa Chỉ Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="email@example.com"
              />
            </div>

            {/* Số điện thoại */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-blue-600" /> Số Điện Thoại
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="0987654321"
              />
            </div>

            {/* Địa chỉ giao hàng mặc định */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" /> Địa Chỉ Nhận Hàng Mặc Định
              </label>
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố..."
              />
            </div>

          </div>

          {/* Nút lưu thay đổi */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {loading ? 'Đang lưu cập nhật...' : 'Lưu Thay Đổi Hồ Sơ'}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ProfilePage;
