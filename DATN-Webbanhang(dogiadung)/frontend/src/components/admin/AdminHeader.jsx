import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, Bell, User as UserIcon } from 'lucide-react';

/**
 * Component AdminHeader thanh tiêu đề phía trên trang Quản trị Admin
 * Hiển thị Avatar dạng Chữ cái đầu chuẩn đẹp 100%, không lo lỗi hình ảnh mạng.
 */
const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const [imgError, setImgError] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Lấy ký tự đầu tiên của Tên hoặc Email làm biểu tượng Avatar
  const firstLetter = (user?.name || user?.email || 'A').charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
          Hệ Thống Quản Trị Website Gia Dụng
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Công tắc Dark/Light Mode */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Chuyển chế độ Sáng/Tối"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Thông báo (Minh họa) */}
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
        </button>

        {/* Avatar Chữ Cái Đầu Đẹp & Nút Đăng xuất */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-800">
          
          {user?.avatar && !imgError ? (
            <img
              src={user.avatar}
              alt="Admin Avatar"
              onError={() => setImgError(true)}
              className="w-9 h-9 rounded-full border border-blue-500 object-cover shadow-sm"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md border border-blue-400/30">
              {firstLetter}
            </div>
          )}

          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-gray-800 dark:text-white leading-none">{user?.name || 'Quản trị viên'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 ml-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
