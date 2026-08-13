import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { CheckCircle, Package, Home, QrCode, Clock } from 'lucide-react';

const BANK  = 'MB';
const ACCT  = '0967258610';
const OWNER = 'NGUYEN TUAN ANH';

/**
 * Trang Đặt Hàng Thành Công (Client OrderSuccessPage)
 */
const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Polling states
  const pollRef = useRef(null);
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(0);

  const startPolling = (orderId) => {
    setCountdown(300); // 5 minutes timeout
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          clearInterval(pollRef.current);
        }
        return c - 1;
      });
    }, 1000);

    pollRef.current = setInterval(async () => {
      try {
        const res = await axiosClient.get(`/orders/${orderId}`);
        if (res.success && res.data.status === 'Paid') {
          clearInterval(pollRef.current);
          clearInterval(timerRef.current);
          setOrder(res.data);
        }
      } catch (err) {}
    }, 3000);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/orders/${id}`);
        if (res.success) {
          setOrder(res.data);
          // Start polling if payment method is transfer and status is still Pending
          if (res.data.payment_method === 'transfer' && res.data.status === 'Pending') {
            startPolling(res.data.id);
          }
        }
      } catch (err) {
        console.error('Lỗi chi tiết đơn hàng:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();

    return () => {
      clearInterval(pollRef.current);
      clearInterval(timerRef.current);
    };
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
            <p><strong>Hình thức thanh toán:</strong> {order.payment_method === 'transfer' ? 'Chuyển khoản VietQR' : order.payment_method}</p>
            <p><strong>Tổng tiền:</strong> <span className="text-red-600 dark:text-red-400 font-extrabold">{Number(order.total_amount).toLocaleString('vi-VN')} đ</span></p>
          </div>
        )}

        {/* VietQR Section */}
        {order && order.payment_method === 'transfer' && (
          <div className="mt-6 border-2 border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-2xl flex flex-col items-center">
            {order.status === 'Paid' ? (
              <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400 gap-2">
                <CheckCircle className="w-10 h-10" />
                <p className="font-extrabold text-lg">Đã Xác Nhận Thanh Toán</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Đơn hàng của bạn đang được chuẩn bị để giao.</p>
              </div>
            ) : countdown <= 0 ? (
              <div className="flex flex-col items-center text-red-600 gap-2">
                <Clock className="w-10 h-10" />
                <p className="font-extrabold text-lg">Hết Thời Gian Chờ</p>
                <p className="text-sm text-gray-600">Vui lòng liên hệ hotline nếu bạn đã chuyển khoản.</p>
              </div>
            ) : (
              <>
                <h3 className="font-extrabold text-lg text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5" /> Quét Mã Thanh Toán VietQR
                </h3>
                <img 
                  src={`https://img.vietqr.io/image/${BANK}-${ACCT}-compact2.png?amount=${order.total_amount}&addInfo=DH${order.id}&accountName=${encodeURIComponent(OWNER)}`} 
                  alt="VietQR" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain bg-white p-2 rounded-xl shadow-sm"
                />
                <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 text-left w-full max-w-sm space-y-2">
                  <p>Ngân hàng: <strong>MBBank</strong></p>
                  <p>Số tài khoản: <strong className="text-blue-700 dark:text-blue-400 text-lg">{ACCT}</strong></p>
                  <p>Chủ tài khoản: <strong>{OWNER}</strong></p>
                  <p>Nội dung CK: <strong className="text-blue-700 dark:text-blue-400 text-lg">DH{order.id}</strong></p>
                  <p>Số tiền CK: <strong className="text-red-600 font-extrabold">{Number(order.total_amount).toLocaleString('vi-VN')} đ</strong></p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 animate-pulse">
                  <Clock className="w-4 h-4" /> 
                  Hệ thống đang chờ nhận tiền... ({Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')})
                </div>
              </>
            )}
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
