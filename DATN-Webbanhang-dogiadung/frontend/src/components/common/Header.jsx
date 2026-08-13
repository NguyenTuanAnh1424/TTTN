import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logout } from '../../redux/slices/authSlice';
import {
  ShoppingCart,
  Sun,
  Moon,
  User,
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  PackageCheck,
  UserCheck
} from 'lucide-react';
import CategoryMegaMenu from './CategoryMegaMenu';

/**
 * Component Header dành cho Trang Khách Hàng (Client)
 * Tích hợp Avatar chữ cái đầu sắc nét + Hiển thị ảnh Avatar Upload từ Backend PORT 5000
 */
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux Store
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const { totalQuantity } = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.setting);

  // State quản lý mở menu mobile & từ khóa tìm kiếm
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Hàm bổ trợ chuyển relative path /uploads/... thành full URL
  const formatAvatarUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Xử lý submit ô tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchKeyword.trim())}`);
      setSearchKeyword('');
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const firstLetter = (user?.name || user?.email || 'K').charAt(0).toUpperCase();
  const avatarUrl = formatAvatarUrl(user?.avatar);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. LOGO WEBSITE */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600 dark:text-blue-400">
            <span className="bg-blue-600 text-white p-1.5 rounded-lg dark:bg-blue-500">
              🏠
            </span>
            <span className="tracking-tight">{settings.site_logo || 'GiaDungStore'}</span>
          </Link>

          {/* 2. THANH TÌM KIẾM SẢN PHẨM (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Tìm kiếm nồi chiên, quạt điện, máy hút bụi..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* 3. MENU ĐIỀU HƯỚNG & TIỆN ÍCH */}
          <div className="flex items-center gap-3">
            
            {/* Nút Chuyển đổi Dark / Light Mode */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Chuyển chế độ Sáng/Tối"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Giỏ hàng */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Menu Người Dùng / Đăng Nhập */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {avatarUrl && !imgError ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      onError={() => setImgError(true)}
                      className="w-8 h-8 rounded-full border border-blue-500 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center border border-blue-400">
                      {firstLetter}
                    </div>
                  )}

                  <span className="hidden sm:inline-block max-w-[100px] truncate">{user?.name}</span>
                </button>

                {/* Dropdown Menu khi click Avatar */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Đăng nhập với tư cách</p>
                      <p className="text-sm font-bold truncate text-gray-800 dark:text-gray-200">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900/50 dark:text-blue-300">
                        {user?.role}
                      </span>
                    </div>

                    {/* Link đến trang Admin nếu có quyền */}
                    {['SuperAdmin', 'Admin', 'Editor'].includes(user?.role) && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Trang Quản Trị
                      </Link>
                    )}

                    {/* Link đến trang Hồ Sơ Cá Nhân */}
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                    >
                      <UserCheck className="w-4 h-4 text-blue-600" /> Hồ sơ cá nhân của tôi
                    </Link>

                    <Link
                      to="/my-orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <PackageCheck className="w-4 h-4" /> Đơn hàng của tôi
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 border-t border-gray-100 dark:border-gray-700 mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-semibold px-4 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
                >
                  Đăng ký
                </Link>
              </div>
            )}

            {/* Nút Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* 4. THANH NAV MENU CHÍNH (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Trang chủ</Link>
          <div className="relative group">
            <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 py-2 flex items-center gap-1">
              Sản phẩm gia dụng
              <svg className="w-4 h-4 mt-0.5 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </Link>
            <CategoryMegaMenu />
          </div>
          <Link to="/products?sale=true" className="text-red-500 hover:text-red-600 font-bold">Khuyến mãi Hot 🔥</Link>
          <Link to="/news" className="hover:text-blue-600 dark:hover:text-blue-400">Tin tức & Mẹo hay</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
