import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { ShoppingCart, Clock, CheckCircle2, Truck, XCircle, PackageCheck, Filter } from 'lucide-react';
import Toast from '../../components/common/Toast';

/**
 * Trang Quản Lý Đơn Hàng Dành Cho Admin (AdminOrderManager)
 * Xem toàn bộ đơn hàng khách đặt & Cập nhật trạng thái đơn (Pending -> Processing -> Shipping -> Completed / Cancelled)
 */
const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchOrders = async (page = 1, status = '') => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/orders/admin/all?page=${page}&limit=10${status ? `&status=${status}` : ''}`);
      if (res.success) {
        setOrders(res.data || []);
        setPagination(res.pagination);
      }
    } catch (err) {
      console.error('Lỗi lấy đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1, statusFilter);
  }, [statusFilter]);

  // Đổi trạng thái đơn hàng
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosClient.put(`/orders/admin/${orderId}/status`, { status: newStatus });
      setToast({ message: `Đã đổi trạng thái đơn #${orderId} thành: ${newStatus}`, type: 'success' });
      fetchOrders(pagination.currentPage, statusFilter);
    } catch (err) {
      setToast({ message: 'Lỗi đổi trạng thái đơn hàng: ' + err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" /> Quản Lý Đơn Hàng
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tổng cộng: <strong>{pagination.totalItems}</strong> đơn hàng từ khách
          </p>
        </div>

        {/* Lọc theo trạng thái */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200"
          >
            <option value="">-- Tất cả trạng thái --</option>
            <option value="Pending">Chờ xác nhận (Pending)</option>
            <option value="Processing">Đang xử lý (Processing)</option>
            <option value="Shipping">Đang giao hàng (Shipping)</option>
            <option value="Completed">Đã hoàn thành (Completed)</option>
            <option value="Cancelled">Đã hủy (Cancelled)</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-500">Đang nạp danh sách đơn hàng...</div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Không tìm thấy đơn hàng nào!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3.5 px-4">Mã Đơn</th>
                  <th className="py-3.5 px-4">Khách hàng</th>
                  <th className="py-3.5 px-4">Liên hệ & Địa chỉ</th>
                  <th className="py-3.5 px-4">Tổng tiền</th>
                  <th className="py-3.5 px-4">Trạng thái hiện tại</th>
                  <th className="py-3.5 px-4 text-center">Cập nhật trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="py-3 px-4 font-bold text-blue-600">#{o.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-gray-900 dark:text-white">{o.customer_name}</p>
                      <p className="text-xs text-gray-400">{o.customer_email}</p>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">SĐT: {o.customer_phone}</p>
                      <p className="text-gray-400 truncate max-w-xs">{o.shipping_address}</p>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-red-600 dark:text-red-400">
                      {Number(o.total_amount).toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        o.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        o.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        o.status === 'Shipping' ? 'bg-purple-100 text-purple-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold focus:outline-none dark:text-white cursor-pointer"
                      >
                        <option value="Pending">Chờ xác nhận</option>
                        <option value="Processing">Đang xử lý</option>
                        <option value="Shipping">Đang giao</option>
                        <option value="Completed">Hoàn thành</option>
                        <option value="Cancelled">Đã hủy</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminOrderManager;
