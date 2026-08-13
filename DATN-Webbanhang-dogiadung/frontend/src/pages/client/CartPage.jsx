import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import { setCartData } from '../../redux/slices/cartSlice';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import Toast from '../../components/common/Toast';
import ConfirmModal from '../../components/common/ConfirmModal';

/**
 * Trang Quản Lý Giỏ Hàng (Client CartPage)
 * Cho phép xem danh sách, cập nhật số lượng, xóa sản phẩm & chuyển sang Checkout
 */
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, idToDelete: null });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Load danh sách sản phẩm trong giỏ hàng từ API
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/cart');
      if (res.success) {
        setCartItems(res.items || []);
        setTotalPrice(res.totalPrice || 0);
        dispatch(setCartData({ items: res.items, totalPrice: res.totalPrice }));
      }
    } catch (err) {
      console.error('Lỗi lấy giỏ hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Cập nhật số lượng
  const handleUpdateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      setLoadingAction(true);
      await axiosClient.put(`/cart/items/${itemId}`, { quantity: newQty });
      fetchCartData();
    } catch (err) {
      showToast('Lỗi cập nhật số lượng: ' + err.message, 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRemove = (itemId) => {
    setConfirmModal({ isOpen: true, idToDelete: itemId });
  };

  const confirmRemove = async () => {
    try {
      setLoadingAction(true);
      await axiosClient.delete(`/cart/items/${confirmModal.idToDelete}`);
      fetchCartData();
      showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
    } catch (err) {
      showToast('Lỗi xóa sản phẩm: ' + err.message, 'error');
    } finally {
      setLoadingAction(false);
      setConfirmModal({ isOpen: false, idToDelete: null });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 text-center space-y-4 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
        <ShoppingBag className="w-16 h-16 mx-auto text-blue-500 animate-bounce" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vui Lòng Đăng Nhập Để Xem Giỏ Hàng</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Bạn cần đăng nhập tài khoản khách hàng để quản lý giỏ hàng của mình.</p>
        <Link to="/login" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg text-sm">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Đang tải thông tin giỏ hàng...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />}
      <ConfirmModal 
        isOpen={confirmModal.isOpen} 
        onClose={() => setConfirmModal({ isOpen: false, idToDelete: null })} 
        onConfirm={confirmRemove}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
      />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-blue-600" /> Giỏ Hàng Của Bạn ({cartItems.length})
        </h1>
        <Link to="/products" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Tiếp tục mua sắm
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center space-y-4 border border-gray-100 dark:border-gray-800">
          <span className="text-5xl">🛒</span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Giỏ Hàng Đang Trống!</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Hãy dạo quanh cửa hàng và chọn các thiết bị gia dụng bạn yêu thích.</p>
          <Link to="/products" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg text-sm">
            Khám phá sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
              {cartItems.map((item) => {
                const product = item.product;
                if (!product) return null;
                const unitPrice = product.sale_price > 0 ? product.sale_price : product.price;
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 flex-shrink-0"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop';
                        }}
                      />
                      <div>
                        <Link to={`/products/${product.id}`} className="font-bold text-sm text-gray-800 dark:text-white hover:text-blue-600 line-clamp-2">
                          {product.name}
                        </Link>
                        <p className="text-xs text-red-600 dark:text-red-400 font-bold mt-1">
                          {Number(unitPrice).toLocaleString('vi-VN')} đ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={loadingAction}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-800 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={loadingAction}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {Number(itemTotal).toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={loadingAction}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* CỘT TỔNG TIỀN THANH TOÁN (SUMMARY BOX) */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                Tóm Tắt Đơn Hàng
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tạm tính giỏ hàng:</span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {Number(totalPrice).toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Phí vận chuyển:</span>
                  <span className="font-bold text-emerald-600">Miễn phí 🚚</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="font-bold text-base text-gray-900 dark:text-white">Tổng cộng:</span>
                <span className="text-2xl font-extrabold text-red-600 dark:text-red-400">
                  {Number(totalPrice).toLocaleString('vi-VN')} đ
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-base"
              >
                Tiến Hành Đặt Hàng <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default CartPage;
