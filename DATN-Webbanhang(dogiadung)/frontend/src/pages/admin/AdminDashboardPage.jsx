import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Package, FolderTree, ShoppingCart, Users, DollarSign, ArrowUpRight, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

/**
 * Trang Dashboard Thống Kê Quản Trị (AdminDashboardPage)
 * Hiển thị các thẻ chỉ số (Sản phẩm, Danh mục, Đơn hàng, User, Doanh thu) + Biểu đồ Recharts
 */
const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/admin/dashboard/stats');
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Lỗi lấy thống kê Dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400">Đang nạp số liệu thống kê Dashboard...</p>
      </div>
    );
  }

  // Chuẩn bị dữ liệu biểu đồ trạng thái đơn hàng (Đảm bảo có dữ liệu mặc định để biểu đồ không bị trắng)
  const defaultStatuses = ['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'];
  const chartData = stats?.ordersByStatus && stats.ordersByStatus.length > 0
    ? stats.ordersByStatus.map((item) => ({
        status: item.status === 'Pending' ? 'Chờ xử lý' :
                item.status === 'Processing' ? 'Đang xử lý' :
                item.status === 'Shipping' ? 'Đang giao' :
                item.status === 'Completed' ? 'Hoàn thành' : 'Đã hủy',
        count: parseInt(item.count) || 0
      }))
    : [
        { status: 'Chờ xử lý', count: 0 },
        { status: 'Đang xử lý', count: 0 },
        { status: 'Đang giao', count: 0 },
        { status: 'Hoàn thành', count: 0 },
        { status: 'Đã hủy', count: 0 }
      ];

  const COLORS = ['#f59e0b', '#3b82f6', '#a855f7', '#10b981', '#ef4444'];

  return (
    <div className="space-y-8">
      
      {/* HEADER TIÊU ĐỀ */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Tổng Quan Thống Kê Bán Hàng
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Báo cáo thời gian thực về sản phẩm, đơn hàng, khách hàng và doanh thu.
        </p>
      </div>

      {/* 1. LƯỚI THẺ CHỈ SỐ STATS CARDS (5 THẺ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Thẻ 1: Doanh thu */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-6 rounded-3xl shadow-lg shadow-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Tổng Doanh Thu</span>
            <span className="p-2 bg-white/20 rounded-xl backdrop-blur">
              <DollarSign className="w-5 h-5" />
            </span>
          </div>
          <div className="text-xl font-extrabold truncate">
            {Number(stats?.totalRevenue || 0).toLocaleString('vi-VN')} đ
          </div>
          <p className="text-[11px] opacity-80">Từ các đơn hoàn thành</p>
        </div>

        {/* Thẻ 2: Tổng đơn hàng */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Tổng Đơn Hàng</span>
            <span className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl">
              <ShoppingCart className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {stats?.totalOrders || 0}
          </div>
          <p className="text-[11px] text-gray-400">Toàn bộ đơn phát sinh</p>
        </div>

        {/* Thẻ 3: Sản phẩm */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Tổng Sản Phẩm</span>
            <span className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-xl">
              <Package className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {stats?.totalProducts || 0}
          </div>
          <p className="text-[11px] text-gray-400">Đang bán trong kho</p>
        </div>

        {/* Thẻ 4: Danh mục */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Danh Mục</span>
            <span className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
              <FolderTree className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {stats?.totalCategories || 0}
          </div>
          <p className="text-[11px] text-gray-400">Loại mặt hàng</p>
        </div>

        {/* Thẻ 5: Người dùng */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Người Dùng</span>
            <span className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {stats?.totalUsers || 0}
          </div>
          <p className="text-[11px] text-gray-400">Tài khoản đăng ký</p>
        </div>

      </div>

      {/* 2. BIỂU ĐỒ RECHARTS THỐNG KÊ ĐƠN HÀNG THEO TRẠNG THÁI */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
            Biểu Đồ Trạng Thái Đơn Hàng
          </h2>
          <span className="text-xs text-gray-400">Đơn vị: Số lượng đơn</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="status" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. BẢNG 5 ĐƠN HÀNG MỚI NHẤT */}
      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
              Đơn Hàng Mới Đặt Gần Đây
            </h2>
            <a href="/admin/orders" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Xem tất cả đơn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3 px-4">Mã Đơn</th>
                  <th className="py-3 px-4">Khách Hàng</th>
                  <th className="py-3 px-4">Tổng Tiền</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4">Ngày Đặt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-bold text-blue-600">#{order.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">{order.customer_name}</td>
                    <td className="py-3 px-4 font-extrabold text-red-600 dark:text-red-400">
                      {Number(order.total_amount).toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {new Date(order.created_at || order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
