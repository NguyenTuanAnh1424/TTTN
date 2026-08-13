import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Image,
  Newspaper,
  Sliders,
  Store,
  ShieldAlert
} from 'lucide-react';

/**
 * Component Sidebar Menu bên trái dành cho Trang Quản Trị Admin
 * Phân quyền hiển thị Menu chuẩn 100% theo đúng Role:
 * - SuperAdmin: Thấy toàn bộ 8 mục
 * - Admin: Thấy 6 mục (Dashboard, Sản phẩm, Danh mục, Đơn hàng, Banner, Tin tức)
 * - Editor: Thấy 3 mục (Sản phẩm, Banner, Tin tức)
 */
const AdminSidebar = () => {
  const { user } = useSelector((state) => state.auth);

  // Danh sách các mục Navigation Admin kèm Phân quyền chi tiết
  const menuItems = [
    {
      title: 'Dashboard Thống Kê',
      path: '/admin',
      icon: LayoutDashboard,
      roles: ['SuperAdmin', 'Admin']
    },
    {
      title: 'Quản Lý Sản Phẩm',
      path: '/admin/products',
      icon: Package,
      roles: ['SuperAdmin', 'Admin', 'Editor']
    },
    {
      title: 'Quản Lý Danh Mục',
      path: '/admin/categories',
      icon: FolderTree,
      roles: ['SuperAdmin', 'Admin']
    },
    {
      title: 'Quản Lý Đơn Hàng',
      path: '/admin/orders',
      icon: ShoppingCart,
      roles: ['SuperAdmin', 'Admin']
    },
    {
      title: 'Quản Lý Banner',
      path: '/admin/banners',
      icon: Image,
      roles: ['SuperAdmin', 'Admin', 'Editor']
    },
    {
      title: 'Quản Lý Tin Tức',
      path: '/admin/news',
      icon: Newspaper,
      roles: ['SuperAdmin', 'Admin', 'Editor']
    },
    {
      title: 'Quản Lý Người Dùng',
      path: '/admin/users',
      icon: Users,
      roles: ['SuperAdmin']
    },
    {
      title: 'Quản Lý Giao Diện',
      path: '/admin/settings',
      icon: Sliders,
      roles: ['SuperAdmin']
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800">
      
      {/* Header Sidebar */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <NavLink to="/admin" className="flex items-center gap-2 text-blue-400 font-bold text-lg">
          <ShieldAlert className="w-6 h-6 text-blue-500" />
          <span>Admin Portal</span>
        </NavLink>
      </div>

      {/* Thông tin nhanh Admin */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50">
        <p className="text-xs text-slate-400">Tài khoản quản trị:</p>
        <p className="text-sm font-bold text-white truncate">{user?.name || user?.email}</p>
        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {user?.role}
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          // Lọc quyền hiển thị theo đúng Role của người dùng
          if (item.roles && !item.roles.includes(user?.role)) return null;

          const IconComponent = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <IconComponent className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Sidebar: Quay về trang chủ Client */}
      <div className="p-4 border-t border-slate-800">
        <NavLink
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <Store className="w-4 h-4" /> Quay lại Website Client
        </NavLink>
      </div>

    </aside>
  );
};

export default AdminSidebar;
