import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import ProductCard from '../../components/common/ProductCard';
import Toast from '../../components/common/Toast';
import { setCartData } from '../../redux/slices/cartSlice';
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  Flame,
  Tag
} from 'lucide-react';

/**
 * Trang Chi Tiết Sản Phẩm (Client ProductDetailPage)
 * Hiển thị Hình ảnh, Giá niêm yết/khuyến mãi, Mô tả chi tiết, Chọn số lượng & Sản phẩm liên quan
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // States lưu thông tin sản phẩm
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/products/${id}`);
        if (res.success) {
          setProduct(res.data);
          setRelatedProducts(res.relatedProducts || []);
        }
      } catch (err) {
        console.error('Lỗi lấy chi tiết sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (val) => {
    if (val < 1) return;
    if (product && val > product.quantity) {
      showToast(`Trong kho chỉ còn ${product.quantity} sản phẩm!`, 'warning');
      return;
    }
    setQuantity(val);
  };

  // Xử lý Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', 'error');
      navigate('/login');
      return;
    }

    try {
      await axiosClient.post('/cart/add', {
        product_id: product.id,
        quantity
      });

      const cartRes = await axiosClient.get('/cart');
      if (cartRes.success) {
        dispatch(setCartData({ items: cartRes.items, totalPrice: cartRes.totalPrice }));
      }
      showToast(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`, 'success');
    } catch (err) {
      showToast('Lỗi thêm giỏ hàng: ' + (err.message || 'Thất bại'), 'error');
    }
  };

  // Xử lý Mua Nhanh (Thêm vào giỏ & chuyển thẳng đến trang Thanh toán)
  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để mua hàng!', 'error');
      navigate('/login');
      return;
    }

    try {
      await axiosClient.post('/cart/add', {
        product_id: product.id,
        quantity
      });
      navigate('/cart');
    } catch (err) {
      showToast('Lỗi mua nhanh: ' + err.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Đang nạp chi tiết sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Không Tìm Thấy Sản Phẩm</h2>
        <Link to="/products" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  // Tính % giảm giá (nếu có)
  const calculateDiscount = (price, salePrice) => {
    const p = Number(price);
    const sp = Number(salePrice);
    if (!sp || sp <= 0 || sp >= p) return 0;
    return Math.round(((p - sp) / p) * 100);
  };
  
  const pPrice = product ? Number(product.price) : 0;
  const pSalePrice = product ? Number(product.sale_price || 0) : 0;
  const discountPercent = calculateDiscount(pPrice, pSalePrice);
  const displayPrice = pSalePrice > 0 ? pSalePrice : pPrice;

  return (
    <div className="space-y-12">
      
      {/* THÔNG TIN CHI TIẾT SẢN PHẨM (2 CỘT) */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* CỘT TÍNH NĂNG 1: HÌNH ẢNH SẢN PHẨM */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 relative">
            <img
              src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop';
              }}
            />

            {/* HUY HIỆU */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_new && (
                <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-white shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> Mới về
                </span>
              )}
              {product.is_best && (
                <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white shadow-md">
                  <Flame className="w-3.5 h-3.5" /> Bán chạy
                </span>
              )}
              {discountPercent > 0 && (
                <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-red-600 text-white shadow-md">
                  <Tag className="w-3.5 h-3.5" /> Giảm {discountPercent}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CỘT TÍNH NĂNG 2: THÔNG TIN CHI TIẾT & NÚT MUA */}
        <div className="space-y-6">
          
          {/* Tên Danh mục & Tên sản phẩm */}
          <div>
            {product.category && (
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {product.category.name}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Giá & Tình trạng kho */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                {displayPrice.toLocaleString('vi-VN')} đ
              </div>
              {pSalePrice > 0 && pSalePrice < pPrice && (
                <div className="text-sm text-gray-400 line-through mt-0.5">
                  Giá cũ: {pPrice.toLocaleString('vi-VN')} đ
                </div>
              )}
            </div>

            <div className="text-right">
              {product.quantity > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Còn hàng ({product.quantity})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                  🚫 Hết hàng
                </span>
              )}
            </div>
          </div>

          {/* Mô tả ngắn */}
          {product.short_description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.short_description}
            </p>
          )}

          {/* Ô Chọn Số Lượng */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Số lượng mua:</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-gray-800 dark:text-white">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* NÚT THÊM GIỎ HÀNG & MUA NGAY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.quantity <= 0}
              className="py-3.5 px-6 rounded-2xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-40"
            >
              <ShoppingCart className="w-5 h-5" /> Thêm Vào Giỏ Hàng
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.quantity <= 0}
              className="py-3.5 px-6 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-40"
            >
              <Zap className="w-5 h-5" /> Mua Ngay
            </button>
          </div>

          {/* Cam kết của cửa hàng */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-3 gap-2 text-center text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <span>Bảo hành chính hãng 12-24 tháng</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-emerald-500" />
              <span>Miễn phí giao hàng đơn từ 500k</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-5 h-5 text-amber-500" />
              <span>Đổi mới trong 30 ngày nếu lỗi</span>
            </div>
          </div>

        </div>

      </div>

      {/* MÔ TẢ CHI TIẾT SẢN PHẨM */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
          Mô Tả Chi Tiết Sản Phẩm
        </h2>
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {product.description || 'Chưa có bài viết mô tả chi tiết cho sản phẩm này.'}
        </div>
      </div>

      {/* SẢN PHẨM LIÊN QUAN */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Sản Phẩm Cùng Danh Mục
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetailPage;
