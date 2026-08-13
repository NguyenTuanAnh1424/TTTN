import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

/**
 * Layout Khung Trang Quản Trị Dành Cho Ban Quản Trị (Admin Portal)
 * Phân quyền truy cập nghiêm ngặt: Chỉ SuperAdmin, Admin, Editor mới được phép vào.
 */
const AdminLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // 1. Nếu chưa đăng nhập -> Chuyển hướng về Trang Đăng Nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Nếu không có quyền quản trị (Role là 'User') -> Từ chối truy cập
  const adminRoles = ['SuperAdmin', 'Admin', 'Editor'];
  if (!user || !adminRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md text-center border border-red-200 dark:border-red-900">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            🚫
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Từ Chối Truy Cập!</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Tài khoản của bạn (<strong className="text-red-500">{user?.role}</strong>) không có quyền hạn truy cập vào Trang Quản Trị Admin.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
          >
            Quay về Trang Chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors">
      {/* Sidebar Menu Góc Trái */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Thanh Quản Trị Góc Trên */}
        <AdminHeader />

        {/* Nội dung chính của từng Trang Quản Trị (Dashboard, Quản lý SP, Đơn hàng...) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
