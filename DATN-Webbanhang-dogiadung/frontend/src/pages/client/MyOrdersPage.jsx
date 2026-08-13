import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { PackageCheck, Clock, CheckCircle2, Truck, AlertCircle, XCircle } from 'lucide-react';

/**
 * Trang Lịch Sử Đơn Hàng Của Tôi (Client MyOrdersPage)
 */
const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/orders/my-orders');
        if (res.success) setOrders(res.data || []);
      } catch (err) {
        console.error('Lỗi lấy lịch sử đơn hàng:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  // Render badge trạng thái đơn hàng
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <Clock className="w-3.5 h-3.5" /> Chờ xác nhận
          </span>
        );
      case 'Processing':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            <PackageCheck className="w-3.5 h-3.5" /> Đang xử lý
          </span>
        );
      case 'Shipping':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            <Truck className="w-3.5 h-3.5" /> Đang giao hàng
          </span>
        );
      case 'Completed':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> Đã hoàn thành
          </span>
        );
      case 'Cancelled':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
            <XCircle className="w-3.5 h-3.5" /> Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500">Đang lấy danh sách đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <PackageCheck className="w-6 h-6 text-blue-600" /> Lịch Sử Đơn Hàng Của Tôi ({orders.length})
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center space-y-4 border border-gray-100 dark:border-gray-800">
          <span className="text-5xl">📦</span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Bạn Chưa Có Đơn Hàng Nào!</h2>
          <p className="text-xs text-gray-500">Khi bạn mua hàng, danh sách đơn hàng sẽ xuất hiện ở đây.</p>
          <Link to="/products" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg text-sm">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-4">
              
              {/* Header card đơn hàng */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-lg text-gray-900 dark:text-white">Mã đơn #{order.id}</span>
                    {renderStatusBadge(order.status)}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Ngày đặt: {new Date(order.createdAt || order.created_at).toLocaleString('vi-VN')}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Tổng tiền thanh toán:</span>
                  <p className="text-xl font-extrabold text-red-600 dark:text-red-400">
                    {Number(order.total_amount).toLocaleString('vi-VN')} đ
                  </p>
                </div>
              </div>

              {/* Danh sách các sản phẩm trong đơn */}
              <div className="space-y-3">
                {order.items && order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product?.image?.startsWith('http') ? item.product.image : `http://localhost:5000${item.product?.image}`}
                        alt={item.product?.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop';
                        }}
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-gray-800 dark:text-gray-200 truncate">{item.product?.name || 'Sản phẩm'}</p>
                        <p className="text-[11px] text-gray-500">Số lượng: x{item.quantity} | Giá: {Number(item.price).toLocaleString('vi-VN')} đ</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-gray-900 dark:text-white">
                      {Number(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                ))}
              </div>

              {/* Thông tin giao hàng */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between gap-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                <span>📍 Người nhận: <strong>{order.customer_name}</strong> ({order.customer_phone})</span>
                <span className="truncate">🏠 Địa chỉ: {order.shipping_address}</span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyOrdersPage;
