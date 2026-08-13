import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

/**
 * Trang Đặt Hàng Thành Công (Client OrderSuccessPage)
 */
const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/orders/${id}`);
        if (res.success) setOrder(res.data);
      } catch (err) {
        console.error('Lỗi chi tiết đơn hàng:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500">Đang lấy xác nhận đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
          <CheckCircle className="w-12 h-12" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Đặt Hàng Thành Công!
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Cảm ơn bạn đã tin tưởng và mua sắm tại <strong>GiaDungStore</strong>.<br />
          Mã đơn hàng của bạn là: <strong className="text-blue-600 dark:text-blue-400">#{order?.id}</strong>
        </p>

        {/* Thông tin nhận hàng tóm tắt */}
        {order && (
          <div className="text-left bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Người nhận:</strong> {order.customer_name}</p>
            <p><strong>Số điện thoại:</strong> {order.customer_phone}</p>
            <p><strong>Địa chỉ giao:</strong> {order.shipping_address}</p>
            <p><strong>Hình thức thanh toán:</strong> {order.payment_method}</p>
            <p><strong>Tổng tiền:</strong> <span className="text-red-600 dark:text-red-400 font-extrabold">{Number(order.total_amount).toLocaleString('vi-VN')} đ</span></p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/my-orders"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md text-sm flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" /> Xem Đơn Hàng Của Tôi
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 text-sm flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Quay Về Trang Chủ
          </Link>
        </div>

      </div>

    </div>
  );
};

export default OrderSuccessPage;
