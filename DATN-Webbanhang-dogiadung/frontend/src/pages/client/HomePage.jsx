import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import ProductCard from '../../components/common/ProductCard';
import { Sparkles, Flame, Percent, Newspaper, ArrowRight, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

/**
 * Trang Chủ Website Bán Hàng Đồ Gia Dụng (Client HomePage)
 */
const HomePage = () => {
  const settings = useSelector((state) => state.setting);

  // States lưu dữ liệu fetch từ Backend API
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // Fetch song song các API trang chủ
        const [bannerRes, catRes, newRes, bestRes, saleRes, newsRes] = await Promise.all([
          axiosClient.get('/banners'),
          axiosClient.get('/categories'),
          axiosClient.get('/products?is_new=true&limit=8'),
          axiosClient.get('/products?is_best=true&limit=8'),
          axiosClient.get('/products?is_sale=true&limit=8'),
          axiosClient.get('/news?limit=4')
        ]);

        if (bannerRes.success) setBanners(bannerRes.data);
        if (catRes.success) setCategories(catRes.data);
        if (newRes.success) setNewProducts(newRes.data);
        if (bestRes.success) setBestProducts(bestRes.data);
        if (saleRes.success) setSaleProducts(saleRes.data);
        if (newsRes.success) setLatestNews(newsRes.data);

      } catch (error) {
        console.error('Lỗi nạp dữ liệu trang chủ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Tự động chuyển Banner Slider sau 5 giây
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Đang nạp dữ liệu trang chủ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      
      {/* 1. HERO BANNER SLIDER */}
      {banners.length > 0 && (
        <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-[21/9] max-h-[480px]">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={banner.image?.startsWith('http') ? banner.image : `https://backend-dogiadung.onrender.com${banner.image}`}
                alt={banner.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8 md:p-12">
                <div className="max-w-2xl text-white space-y-3">
                  <span className="inline-block px-3 py-1 bg-blue-600/90 backdrop-blur text-xs font-bold rounded-full uppercase tracking-wider">
                    Khuyến Mãi Đặc Biệt
                  </span>
                  <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
                    {banner.title}
                  </h2>
                  <a
                    href={banner.link || '/products'}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg text-sm"
                  >
                    Khám phá ngay <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Dấu chấm chuyển trang slider */}
          <div className="absolute bottom-4 right-8 z-20 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBannerIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeBannerIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 2. THANH TIỆN ÍCH CAM KẾT CHẤT LƯỢNG */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 dark:text-white">Giao Hàng Toàn Quốc</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Nhanh chóng & An toàn</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 dark:text-white">Hàng Chính Hãng 100%</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Bảo hành chính hãng</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 dark:text-white">Đổi Trả Trong 30 Ngày</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Nếu phát sinh lỗi sản xuất</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 dark:text-white">Hỗ Trợ 24/7</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tư vấn tận tâm</p>
          </div>
        </div>
      </section>

      {/* 3. QUANH DANH MỤC SẢN PHẨM NỔI BẬT */}
      {categories.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Danh Mục Sản Phẩm Gia Dụng
            </h2>
            <Link to="/products" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category_id=${cat.id}`}
                className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all text-center group flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🍳
                </div>
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. SECTION: SẢN PHẨM GIẢM GIÁ SHOCK (Chi phối bởi cài đặt Admin show_sale_products) */}
      {settings.show_sale_products !== 'false' && saleProducts.length > 0 && (
        <section className="space-y-4 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent p-6 rounded-3xl border border-red-200 dark:border-red-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-600 text-white rounded-xl shadow-lg animate-bounce">
                <Percent className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-red-600 dark:text-red-400">
                  Khuyến Mãi Hot 🔥
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sản phẩm gia dụng giảm giá cực sốc</p>
              </div>
            </div>
            <Link to="/products?is_sale=true" className="text-sm font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 5. SECTION: SẢN PHẨM MỚI VỀ (Chi phối bởi cài đặt Admin show_new_products) */}
      {settings.show_new_products !== 'false' && newProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-600 text-white rounded-xl shadow-md">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Sản Phẩm Mới Về
              </h2>
            </div>
            <Link to="/products?is_new=true" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Xem thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 6. SECTION: SẢN PHẨM BÁN CHẠY (Chi phối bởi cài đặt Admin show_best_products) */}
      {settings.show_best_products !== 'false' && bestProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-500 text-white rounded-xl shadow-md">
                <Flame className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Top Bán Chạy Nhất
              </h2>
            </div>
            <Link to="/products?is_best=true" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Xem thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. SECTION: TIN TỨC & MẸO HAY GIA DỤNG (Chi phối bởi cài đặt Admin show_news_section) */}
      {settings.show_news_section !== 'false' && latestNews.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-purple-600 text-white rounded-xl shadow-md">
                <Newspaper className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Tin Tức & Mẹo Hay Gia Dụng
              </h2>
            </div>
            <Link to="/news" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              Xem tất cả bài viết <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {latestNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={news.image?.startsWith('http') ? news.image : `https://backend-dogiadung.onrender.com${news.image}`}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default HomePage;
