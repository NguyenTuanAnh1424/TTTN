import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Component ProtectedRoute - Bảo vệ các tuyến đường theo Role cụ thể
 * @param {Array} allowedRoles - Danh sách các Role được phép truy cập (ví dụ: ['SuperAdmin'])
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Nếu Editor vào trang Dashboard -> Tự động chuyển đến trang Sản Phẩm
    if (user?.role === 'Editor') {
      return <Navigate to="/admin/products" replace />;
    }

    return (
      <div className="py-20 text-center space-y-4">
        <div className="text-4xl">🚫</div>
        <h2 className="text-xl font-extrabold text-red-600">Bạn Không Có Quyền Hạn Truy Cập Trang Này!</h2>
        <p className="text-sm text-gray-500">
          Chức năng này yêu cầu quyền <strong>{allowedRoles.join(' hoặc ')}</strong>. Vai trò hiện tại của bạn là: <strong>{user?.role}</strong>.
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
