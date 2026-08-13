import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Client Pages
import HomePage from './pages/client/HomePage';
import ProductListPage from './pages/client/ProductListPage';
import ProductDetailPage from './pages/client/ProductDetailPage';
import CartPage from './pages/client/CartPage';
import CheckoutPage from './pages/client/CheckoutPage';
import OrderSuccessPage from './pages/client/OrderSuccessPage';
import MyOrdersPage from './pages/client/MyOrdersPage';
import NewsListPage from './pages/client/NewsListPage';
import NewsDetailPage from './pages/client/NewsDetailPage';
import LoginPage from './pages/client/LoginPage';
import RegisterPage from './pages/client/RegisterPage';
import ProfilePage from './pages/client/ProfilePage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductManager from './pages/admin/AdminProductManager';
import AdminCategoryManager from './pages/admin/AdminCategoryManager';
import AdminOrderManager from './pages/admin/AdminOrderManager';
import AdminBannerManager from './pages/admin/AdminBannerManager';
import AdminNewsManager from './pages/admin/AdminNewsManager';
import AdminUserManager from './pages/admin/AdminUserManager';
import AdminSettingManager from './pages/admin/AdminSettingManager';

/**
 * Component App - Định nghĩa toàn bộ hệ thống Routing điều hướng ứng dụng
 * Bảo vệ phân quyền truy cập trang Admin nghiêm ngặt cho từng Role:
 * - SuperAdmin: Toàn quyền cả 8 trang
 * - Admin: 6 trang (Dashboard, Sản phẩm, Danh mục, Đơn hàng, Banner, Tin tức)
 * - Editor: 3 trang (Sản phẩm, Banner, Tin tức)
 */
function App() {
  return (
    <Routes>
      {/* 1. TOÀN BỘ CÁC TRANG DÀNH CHO KHÁCH HÀNG (CLIENT LAYOUT) */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success/:id" element={<OrderSuccessPage />} />
        <Route path="my-orders" element={<MyOrdersPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="news" element={<NewsListPage />} />
        <Route path="news/:id" element={<NewsDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* 2. TOÀN BỘ CÁC TRANG QUẢN TRỊ DÀNH CHO ADMIN (ADMIN LAYOUT) */}
      <Route path="/admin" element={<AdminLayout />}>
        
        {/* Dashboard: SuperAdmin + Admin */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin', 'Admin']} />}>
          <Route index element={<AdminDashboardPage />} />
        </Route>

        {/* Quản lý Sản Phẩm: SuperAdmin + Admin + Editor */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin', 'Admin', 'Editor']} />}>
          <Route path="products" element={<AdminProductManager />} />
        </Route>

        {/* Quản lý Danh Mục: SuperAdmin + Admin */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin', 'Admin']} />}>
          <Route path="categories" element={<AdminCategoryManager />} />
        </Route>

        {/* Quản lý Đơn Hàng: SuperAdmin + Admin */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin', 'Admin']} />}>
          <Route path="orders" element={<AdminOrderManager />} />
        </Route>

        {/* Quản lý Banner: SuperAdmin + Admin + Editor */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin', 'Admin', 'Editor']} />}>
          <Route path="banners" element={<AdminBannerManager />} />
        </Route>

        {/* Quản lý Tin Tức: SuperAdmin + Admin + Editor */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin', 'Admin', 'Editor']} />}>
          <Route path="news" element={<AdminNewsManager />} />
        </Route>

        {/* Quản lý Người Dùng: Chỉ SuperAdmin */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin']} />}>
          <Route path="users" element={<AdminUserManager />} />
        </Route>

        {/* Quản lý Giao Diện: Chỉ SuperAdmin */}
        <Route element={<ProtectedRoute allowedRoles={['SuperAdmin']} />}>
          <Route path="settings" element={<AdminSettingManager />} />
        </Route>

      </Route>

      {/* Tự động chuyển hướng nếu truy cập link không hợp lệ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
