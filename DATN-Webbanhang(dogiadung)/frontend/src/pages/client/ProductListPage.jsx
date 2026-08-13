import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import ProductCard from '../../components/common/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, LayoutGrid, List, ChevronRight as ChevronRightIcon } from 'lucide-react';

/**
 * Trang Danh Sách Sản Phẩm (Client ProductListPage)
 * Hỗ trợ Lọc Danh Mục, Tìm Kiếm, Khoảng Giá, Sắp Xếp & Phân Trang
 */
const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc các giá trị filter từ URL Query Parameters
  const categoryIdParam = searchParams.get('category_id') || '';
  const searchParam = searchParams.get('search') || '';
  const isNewParam = searchParams.get('is_new') || '';
  const isSaleParam = searchParams.get('is_sale') || '';
  const isBestParam = searchParams.get('is_best') || '';
  const pageParam = parseInt(searchParams.get('page')) || 1;

  // Local state lưu thông tin filters
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // States bộ lọc
  const [selectedCategory, setSelectedCategory] = useState(categoryIdParam);
  const [priceRange, setPriceRange] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [searchKeyword, setSearchKeyword] = useState(searchParam);

  // Load danh sách Danh mục sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get('/categories');
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error('Lỗi lấy danh mục:', err);
      }
    };
    fetchCategories();
  }, []);

  // Đồng bộ state local khi URL query thay đổi (VD: Click từ Mega Menu)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category_id') || '');
    setSearchKeyword(searchParams.get('search') || '');
  }, [searchParams]);

  // Fetch danh sách sản phẩm mỗi khi URL query params thay đổi
  useEffect(() => {
    let ignore = false;
    
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Phân tích khoảng giá
        let minPrice = '';
        let maxPrice = '';
        if (priceRange === 'under1m') maxPrice = '1000000';
        else if (priceRange === '1m-3m') { minPrice = '1000000'; maxPrice = '3000000'; }
        else if (priceRange === '3m-5m') { minPrice = '3000000'; maxPrice = '5000000'; }
        else if (priceRange === 'over5m') minPrice = '5000000';

        const queryParts = [
          `page=${pageParam}`,
          `limit=12`,
          `sort=${sortOption}`
        ];

        if (selectedCategory) queryParts.push(`category_id=${selectedCategory}`);
        if (searchKeyword.trim()) queryParts.push(`search=${encodeURIComponent(searchKeyword.trim())}`);
        if (minPrice) queryParts.push(`min_price=${minPrice}`);
        if (maxPrice) queryParts.push(`max_price=${maxPrice}`);
        if (isNewParam) queryParts.push(`is_new=${isNewParam}`);
        if (isSaleParam) queryParts.push(`is_sale=${isSaleParam}`);
        if (isBestParam) queryParts.push(`is_best=${isBestParam}`);

        const res = await axiosClient.get(`/products?${queryParts.join('&')}`);

        if (!ignore && res.success) {
          setProducts(res.data);
          setPagination(res.pagination);
        }
      } catch (err) {
        console.error('Lỗi lấy sản phẩm:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProducts();
    return () => { ignore = true; };
  }, [searchParams, selectedCategory, priceRange, sortOption, pageParam]);

  // Cập nhật lại URL Query khi người dùng đổi filter
  const handleApplyFilter = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (selectedCategory) newParams.set('category_id', selectedCategory);
    if (searchKeyword.trim()) newParams.set('search', searchKeyword.trim());
    if (isNewParam) newParams.set('is_new', isNewParam);
    if (isSaleParam) newParams.set('is_sale', isSaleParam);
    if (isBestParam) newParams.set('is_best', isBestParam);
    if (sortOption && sortOption !== 'newest') newParams.set('sort', sortOption);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };
  
  // Khi đổi Sắp xếp thì cập nhật cả URL lập tức
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    newParams.set('page', '1'); // Quay lại trang 1
    setSearchParams(newParams);
  };

  // Chuyển trang (Pagination)
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  // Find current category name for breadcrumb
  const currentCategory = categories.flatMap(c => [c, ...(c.children || [])]).find(c => c.id.toString() === selectedCategory);

  return (
    <div className="space-y-8">
      
      {/* TRANG DANH MỤC: HIỂN THỊ BREADCRUMB & BANNER */}
      {selectedCategory && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-blue-600 cursor-pointer">Trang chủ</Link>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-gray-900 font-bold uppercase">{currentCategory ? currentCategory.name : 'Danh mục'}</span>
          </div>
          <div className="w-full h-[250px] md:h-[350px] rounded-3xl overflow-hidden relative shadow-md">
            {/* Banner Placeholder. Thực tế có thể lấy từ backend */}
            <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop" alt="Category Banner" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* HEADER TRANG & THANH LỌC NHANH */}
      <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {!selectedCategory && (
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Danh Sách Sản Phẩm Gia Dụng
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Hiển thị <strong>{pagination.totalItems}</strong> sản phẩm phù hợp
            </p>
          </div>
        )}

        {/* Ô CHỌN SẮP XẾP */}
        <div className={`flex items-center justify-between gap-6 ${selectedCategory ? 'w-full' : ''}`}>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
              Sắp xếp theo
            </span>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="bg-transparent text-sm font-semibold text-gray-600 dark:text-gray-400 focus:outline-none cursor-pointer"
            >
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
              <option value="name_asc">Tên: A đến Z</option>
              <option value="name_desc">Tên: Z đến A</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Xem dưới dạng</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR BỘ LỌC BÊN TRÁI (Chỉ hiển thị khi KHÔNG phải trang danh mục) */}
        {!selectedCategory && (
          <aside className="space-y-6">
            <form onSubmit={handleApplyFilter} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold border-b border-gray-100 dark:border-gray-800 pb-3">
                <SlidersHorizontal className="w-5 h-5" /> Bộ Lọc Tìm Kiếm
              </div>

              {/* 1. Lọc theo Từ khóa */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Từ khóa sản phẩm</label>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
                />
              </div>

              {/* 2. Lọc theo Danh mục */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Danh mục sản phẩm</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
                >
                  <option value="">-- Tất cả danh mục --</option>
                  {categories.flatMap(c => [c, ...(c.children || [])]).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.parent_id ? `  ↳ ${c.name}` : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Lọc theo Khoảng Giá */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Khoảng giá (VNĐ)</label>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value=""
                      checked={priceRange === ''}
                      onChange={() => setPriceRange('')}
                      className="text-blue-600"
                    />
                    <span>Tất cả mức giá</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="under1m"
                      checked={priceRange === 'under1m'}
                      onChange={() => setPriceRange('under1m')}
                      className="text-blue-600"
                    />
                    <span>Dưới 1.000.000 đ</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="1m-3m"
                      checked={priceRange === '1m-3m'}
                      onChange={() => setPriceRange('1m-3m')}
                      className="text-blue-600"
                    />
                    <span>1.000.000 đ - 3.000.000 đ</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="3m-5m"
                      checked={priceRange === '3m-5m'}
                      onChange={() => setPriceRange('3m-5m')}
                      className="text-blue-600"
                    />
                    <span>3.000.000 đ - 5.000.000 đ</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value="over5m"
                      checked={priceRange === 'over5m'}
                      onChange={() => setPriceRange('over5m')}
                      className="text-blue-600"
                    />
                    <span>Trên 5.000.000 đ</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" /> Áp Dụng Bộ Lọc
              </button>
            </form>
          </aside>
        )}

        {/* LƯỚI SẢN PHẨM & PHÂN TRANG */}
        <main className={`${selectedCategory ? 'lg:col-span-4' : 'lg:col-span-3'} space-y-8`}>
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Đang tải danh sách sản phẩm...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 p-12 rounded-3xl text-center space-y-3 border border-gray-100 dark:border-gray-800">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Không Tìm Thấy Sản Phẩm Phù Hợp</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Vui lòng thử thay đổi từ khóa hoặc khoảng giá lọc khác.</p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className={`grid grid-cols-2 ${selectedCategory ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-6`}>
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="flex gap-6 bg-white p-4 rounded-2xl border border-gray-100 items-center shadow-sm">
                      <img src={p.image_url} alt={p.name} className="w-32 h-32 object-cover rounded-xl" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                        <p className="text-blue-600 font-bold mt-2">{parseInt(p.price).toLocaleString()} đ</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* THANH PHÂN TRANG (PAGINATION) */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        pageNum === pagination.currentPage
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>

      </div>

    </div>
  );
};

export default ProductListPage;
