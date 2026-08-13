import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Package, Plus, Edit, Trash2, Search, X, Image as ImageIcon, Sparkles, Flame, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';
import Toast from '../../components/common/Toast';

/**
 * Trang Quản Lý Sản Phẩm Dành Cho Admin (AdminProductManager)
 * Cho phép xem danh sách, Thêm mới (Upload ảnh), Cập nhật & Xóa sản phẩm
 */
const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Confirm Delete Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    productIdToDelete: null
  });

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    sale_price: '',
    quantity: '10',
    short_description: '',
    description: '',
    is_new: false,
    is_sale: false,
    is_best: false,
    image_url: '',
    image_file: null
  });

  // Fetch danh sách sản phẩm
  const fetchProducts = async (page = 1, keyword = '') => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/products?page=${page}&limit=8&search=${encodeURIComponent(keyword)}`);
      if (res.success) {
        setProducts(res.data || []);
        setPagination(res.pagination);
      }
    } catch (err) {
      console.error('Lỗi lấy sản phẩm:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch danh mục
  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get('/categories');
      if (res.success) setCategories(res.data || []);
    } catch (err) {
      console.error('Lỗi lấy danh mục:', err);
    }
  };

  useEffect(() => {
    fetchProducts(1, searchKeyword);
    fetchCategories();
  }, []);

  // Xử lý Tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(1, searchKeyword);
  };

  // Mở Modal Thêm mới
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category_id: categories[0]?.id || '',
      price: '',
      sale_price: '',
      quantity: '10',
      short_description: '',
      description: '',
      is_new: false,
      is_sale: false,
      is_best: false,
      image_url: '',
      image_file: null
    });
    setIsModalOpen(true);
  };

  // Mở Modal Chỉnh sửa
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      sale_price: product.sale_price || '',
      quantity: product.quantity,
      short_description: product.short_description || '',
      description: product.description || '',
      is_new: product.is_new,
      is_sale: product.is_sale,
      is_best: product.is_best,
      image_url: product.image || '',
      image_file: null
    });
    setIsModalOpen(true);
  };

  // Xử lý Submit Form Thêm/Sửa sản phẩm
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category_id || !formData.price) {
      showToast('Vui lòng điền Tên sản phẩm, Danh mục và Giá niêm yết!', 'error');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category_id', formData.category_id);
      data.append('price', formData.price);
      data.append('sale_price', formData.sale_price || 0);
      data.append('quantity', formData.quantity || 0);
      data.append('short_description', formData.short_description);
      data.append('description', formData.description);
      data.append('is_new', formData.is_new);
      data.append('is_sale', formData.is_sale);
      data.append('is_best', formData.is_best);

      if (formData.image_file) {
        data.append('image', formData.image_file);
      } else if (formData.image_url) {
        data.append('image_url', formData.image_url);
      }

      if (editingProduct) {
        // Cập nhật
        await axiosClient.put(`/products/${editingProduct.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('Cập nhật sản phẩm thành công!', 'success');
      } else {
        // Thêm mới
        await axiosClient.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('Thêm sản phẩm mới thành công!', 'success');
      }

      setIsModalOpen(false);
      fetchProducts(pagination.currentPage, searchKeyword);
    } catch (err) {
      showToast('Lỗi lưu sản phẩm: ' + (err.message || 'Thất bại'), 'error');
    }
  };

  // Mở Confirm Modal Xóa Sản Phẩm
  const handleDeleteProduct = (id) => {
    setConfirmModal({
      isOpen: true,
      productIdToDelete: id
    });
  };

  // Thực thi Xóa Sản Phẩm
  const confirmDelete = async () => {
    try {
      await axiosClient.delete(`/products/${confirmModal.productIdToDelete}`);
      showToast('Đã xóa sản phẩm thành công!', 'success');
      fetchProducts(pagination.currentPage, searchKeyword);
    } catch (err) {
      showToast('Lỗi xóa sản phẩm: ' + err.message, 'error');
    } finally {
      setConfirmModal({ isOpen: false, productIdToDelete: null });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER QUẢN LÝ & NÚT THÊM MỚI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" /> Quản Lý Sản Phẩm Gia Dụng
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tổng cộng: <strong>{pagination.totalItems}</strong> sản phẩm trong kho
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Thêm Sản Phẩm Mới
        </button>
      </div>

      {/* THANH TÌM KIẾM */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Tìm tên sản phẩm..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none dark:text-white"
        />
        <button type="submit" className="px-4 py-2.5 bg-gray-800 text-white rounded-2xl font-bold text-sm">
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* BẢNG DANH SÁCH SẢN PHẨM */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-500">Đang tải sản phẩm...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3.5 px-4">Hình ảnh</th>
                  <th className="py-3.5 px-4">Tên sản phẩm</th>
                  <th className="py-3.5 px-4">Danh mục</th>
                  <th className="py-3.5 px-4">Giá bán / Sale</th>
                  <th className="py-3.5 px-4">Kho</th>
                  <th className="py-3.5 px-4">Huy hiệu</th>
                  <th className="py-3.5 px-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="py-3 px-4">
                      <img
                        src={p.image?.startsWith('http') ? p.image : `https://backend-dogiadung.onrender.com${p.image}`}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-xl bg-gray-100 border"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-800 dark:text-gray-100 max-w-xs truncate">
                      {p.name}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {p.category?.name || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-red-600">{Number(p.sale_price > 0 ? p.sale_price : p.price).toLocaleString('vi-VN')} đ</div>
                      {p.sale_price > 0 && <div className="text-[11px] text-gray-400 line-through">{Number(p.price).toLocaleString('vi-VN')} đ</div>}
                    </td>
                    <td className="py-3 px-4 font-bold">{p.quantity}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {p.is_new && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">Mới</span>}
                        {p.is_best && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold">Best</span>}
                        {p.is_sale && <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">Sale</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl"
                          title="Sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* THANH PHÂN TRANG (PAGINATION) */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hiển thị trang <span className="font-bold text-gray-900 dark:text-white">{pagination.currentPage}</span> / {pagination.totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => fetchProducts(pagination.currentPage - 1, searchKeyword)}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => fetchProducts(page, searchKeyword)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                          pagination.currentPage === page 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => fetchProducts(pagination.currentPage + 1, searchKeyword)}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL FORM THÊM / SỬA SẢN PHẨM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full p-6 space-y-6 border border-gray-100 dark:border-gray-800 shadow-2xl my-8">
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                {editingProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Tên sản phẩm *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Danh mục sản phẩm *</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
                  >
                    {categories.flatMap(c => [c, ...(c.children || [])]).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.parent_id ? `--- ↳ ${c.name}` : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Số lượng tồn kho</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Giá niêm yết (VNĐ) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Giá khuyến mãi (VNĐ)</label>
                  <input
                    type="number"
                    value={formData.sale_price}
                    onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    placeholder="0 nếu không giảm"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
                  />
                </div>
              </div>

              {/* Upload ảnh hoặc URL ảnh */}
              <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Hình ảnh sản phẩm</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image_file: e.target.files[0] })}
                  className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-[11px] text-gray-400">Hoặc nhập link URL ảnh:</p>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white"
                />
              </div>

              {/* Badges huy hiệu */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_new}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Mới về (New)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_best}
                    onChange={(e) => setFormData({ ...formData, is_best: e.target.checked })}
                    className="rounded text-amber-500"
                  />
                  <span>Bán chạy (Best)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_sale}
                    onChange={(e) => setFormData({ ...formData, is_sale: e.target.checked })}
                    className="rounded text-red-600"
                  />
                  <span>Giảm giá (Sale)</span>
                </label>
              </div>

              {/* Mô tả */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Mô tả ngắn</label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Nội dung bài viết chi tiết</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
                >
                  {editingProduct ? 'Lưu Cập Nhật' : 'Tạo Sản Phẩm'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA (Hiện đại) */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Xóa Sản Phẩm Này?"
        message="Sản phẩm sau khi xóa sẽ không thể khôi phục lại. Bạn có chắc chắn muốn xóa không?"
        confirmText="Vâng, Xóa Sản Phẩm"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, productIdToDelete: null })}
      />

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
};

export default AdminProductManager;
