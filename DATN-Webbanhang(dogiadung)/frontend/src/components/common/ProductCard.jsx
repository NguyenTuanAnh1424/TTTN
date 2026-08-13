import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Eye, Sparkles, Flame, Tag } from 'lucide-react';
import axiosClient from '../../api/axiosClient';
import { setCartData } from '../../redux/slices/cartSlice';

/**
 * Component Thẻ Hiển Thị Sản Phẩm Đồ Gia Dụng (ProductCard)
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Hàm tính % giảm giá
  const calculateDiscount = (price, salePrice) => {
    const p = Number(price);
    const sp = Number(salePrice);
    if (!sp || sp <= 0 || sp >= p) return 0;
    return Math.round(((p - sp) / p) * 100);
  };

  // Hàm xử lý Thêm Nhanh vào Giỏ Hàng
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      return;
    }

    try {
      await axiosClient.post('/cart/add', {
        product_id: product.id,
        quantity: 1
      });
      
      // Load lại giỏ hàng từ server
      const cartRes = await axiosClient.get('/cart');
      if (cartRes.success) {
        dispatch(setCartData({ items: cartRes.items, totalPrice: cartRes.totalPrice }));
      }
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    } catch (err) {
      alert('Lỗi thêm vào giỏ hàng: ' + (err.message || 'Thất bại'));
    }
  };

  const pPrice = Number(product.price);
  const pSalePrice = Number(product.sale_price || 0);
  const discountPercent = calculateDiscount(pPrice, pSalePrice);
  const displayPrice = pSalePrice > 0 ? pSalePrice : pPrice;

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between relative">
      
      {/* BADGES / HUY HIỆU ĐẶC BIỆT */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.is_new && (
          <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-md">
            <Sparkles className="w-3 h-3" /> Mới
          </span>
        )}
        {product.is_best && (
          <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-md">
            <Flame className="w-3 h-3" /> Bán chạy
          </span>
        )}
        {discountPercent > 0 && (
          <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-600 text-white shadow-md">
            <Tag className="w-3 h-3" /> -{discountPercent}%
          </span>
        )}
      </div>

      {/* HÌNH ẢNH SẢN PHẨM KHUNG VUÔNG */}
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden aspect-square bg-gray-50 dark:bg-gray-800">
        <img
          src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop';
          }}
        />

        {/* Nút Xem Chi Tiết Nhanh Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Xem chi tiết
          </span>
        </div>
      </Link>

      {/* NỘI DUNG TÊN & GIÁ */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Tên danh mục nhỏ */}
          {product.category && (
            <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
              {product.category.name}
            </p>
          )}

          {/* Tên sản phẩm */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Khung hiển thị Giá & Nút Thêm vào giỏ */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold text-red-600 dark:text-red-400">
              {displayPrice.toLocaleString('vi-VN')} đ
            </div>
            {pSalePrice > 0 && pSalePrice < pPrice && (
              <div className="text-xs text-gray-400 line-through">
                {pPrice.toLocaleString('vi-VN')} đ
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
