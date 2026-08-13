import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import { clearCartLocal } from '../../redux/slices/cartSlice';
import { CreditCard, Truck, CheckCircle2, User } from 'lucide-react';
import Toast from '../../components/common/Toast';

/**
 * Trang Đặt Hàng & Thanh Toán (Client CheckoutPage)
 */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Form State
  const [formData, setFormData] = useState({
    customer_name: user?.name || '',
    customer_email: user?.email || '',
    customer_phone: user?.phone || '',
    shipping_address: user?.address || '',
    payment_method: 'COD',
    note: ''
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const showToast = (message, type = 'success') => setToast({ message, type });

  // Fetch giỏ hàng
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/cart');
        if (res.success) {
          setCartItems(res.items || []);
          setTotalPrice(res.totalPrice || 0);
        }
      } catch (err) {
        console.error('Lỗi lấy giỏ hàng:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý gửi Đặt Hàng
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!formData.customer_name || !formData.customer_email || !formData.customer_phone || !formData.shipping_address) {
      showToast('Vui lòng điền đầy đủ thông tin giao hàng!', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await axiosClient.post('/orders', formData);

      if (res.success) {
        dispatch(clearCartLocal());
        showToast('Đặt hàng thành công!', 'success');
        setTimeout(() => {
          navigate(`/order-success/${res.data.id}`);
        }, 1500);
      }
    } catch (err) {
      showToast('Đặt hàng thất bại: ' + (err.message || 'Lỗi hệ thống'), 'error');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400">Đang chuẩn bị trang thanh toán...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Giỏ Hàng Đang Trống</h2>
        <p className="text-sm text-gray-500">Bạn không có sản phẩm nào trong giỏ để đặt hàng.</p>
        <button onClick={() => navigate('/products')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm">
          Khám phá sản phẩm
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Truck className="w-6 h-6 text-blue-600" /> Xác Nhận Đơn Hàng & Thanh Toán
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT 1 & 2: THÔNG TIN GIAO HÀNG & PHƯƠNG THỨC THANH TOÁN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Thông tin người nhận */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
              <User className="w-5 h-5 text-blue-600" /> Thông Tin Người Nhận Hàng
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Họ và tên *</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Số điện thoại *</label>
                <input
                  type="text"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: 0912345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Địa chỉ Email nhận thông báo *</label>
              <input
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Địa chỉ giao hàng chi tiết *</label>
              <textarea
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleChange}
                required
                rows={2}
                placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Ghi chú đơn hàng (Tùy chọn)</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Giao giờ hành chính, gọi trước khi giao..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
              />
            </div>

          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
              <CreditCard className="w-5 h-5 text-blue-600" /> Chọn Phương Thức Thanh Toán
            </h2>

            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer ${formData.payment_method === 'COD' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="COD"
                    checked={formData.payment_method === 'COD'}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-xs text-gray-500">Trả tiền mặt cho nhân viên giao hàng sau khi đã kiểm tra sản phẩm.</p>
                  </div>
                </div>
                <span className="text-xl">💵</span>
              </label>

              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer ${formData.payment_method === 'transfer' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="transfer"
                    checked={formData.payment_method === 'transfer'}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Chuyển khoản VietQR (Duyệt tự động)</p>
                    <p className="text-xs text-gray-500">Mở ứng dụng ngân hàng quét mã QR để thanh toán.</p>
                  </div>
                </div>
                <span className="text-xl">💳</span>
              </label>
            </div>

          </div>

        </div>

        {/* CỘT 3: TÓM TẮT ĐƠN HÀNG MUA */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Sản Phẩm Đã Chọn ({cartItems.length})
            </h2>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const product = item.product;
                if (!product) return null;
                const unitPrice = product.sale_price > 0 ? product.sale_price : product.price;

                return (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-gray-800 dark:text-gray-200 truncate">{product.name}</p>
                        <p className="text-[11px] text-gray-500">x{item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-gray-900 dark:text-white flex-shrink-0">
                      {Number(unitPrice * item.quantity).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Tạm tính:</span>
                <span>{Number(totalPrice).toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Phí vận chuyển:</span>
                <span className="text-emerald-600 font-bold">Miễn phí 🚚</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2 font-extrabold text-gray-900 dark:text-white">
                <span>Tổng phải trả:</span>
                <span className="text-2xl text-red-600 dark:text-red-400">
                  {Number(totalPrice).toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
            >
              {submitting ? (
                <>Đang xử lý đơn hàng...</>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Hoàn Tất Đặt Hàng
                </>
              )}
            </button>
          </div>
        </div>

      </form>
      
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
};

export default CheckoutPage;
