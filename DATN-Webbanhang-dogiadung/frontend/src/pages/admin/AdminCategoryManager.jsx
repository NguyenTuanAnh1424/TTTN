import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { FolderTree, Plus, Edit, Trash2, X } from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';
import Toast from '../../components/common/Toast';

/**
 * Trang Quản Lý Danh Mục Sản Phẩm (AdminCategoryManager)
 */
const AdminCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, idToDelete: null });
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const [formData, setFormData] = useState({ name: '', description: '', status: true, parent_id: '' });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/categories');
      if (res.success) setCategories(res.data || []);
    } catch (err) {
      console.error('Lỗi lấy danh mục:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', status: true, parent_id: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || '', status: cat.status, parent_id: cat.parent_id || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Vui lòng điền tên danh mục!', 'error');
      return;
    }

    try {
      if (editingCategory) {
        await axiosClient.put(`/categories/${editingCategory.id}`, formData);
        showToast('Cập nhật danh mục thành công!', 'success');
      } else {
        await axiosClient.post('/categories', formData);
        showToast('Thêm danh mục mới thành công!', 'success');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      showToast('Lỗi lưu danh mục: ' + err.message, 'error');
    }
  };

  const handleDelete = (id) => {
    setConfirmModal({ isOpen: true, idToDelete: id });
  };

  const confirmDelete = async () => {
    try {
      await axiosClient.delete(`/categories/${confirmModal.idToDelete}`);
      showToast('Xóa danh mục thành công!', 'success');
      fetchCategories();
    } catch (err) {
      showToast('Lỗi xóa danh mục: ' + err.message, 'error');
    } finally {
      setConfirmModal({ isOpen: false, idToDelete: null });
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-amber-500" /> Quản Lý Danh Mục
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Tổng cộng: <strong>{categories.reduce((acc, c) => acc + 1 + (c.children?.length || 0), 0)}</strong> danh mục (Bao gồm danh mục con)
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-3 px-5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/30 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Thêm Danh Mục Mới
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-500">Đang tải danh mục...</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Tên danh mục</th>
                <th className="py-3.5 px-4">SEO Slug</th>
                <th className="py-3.5 px-4">Mô tả</th>
                <th className="py-3.5 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {categories.flatMap(c => [c, ...(c.children || [])]).map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="py-3 px-4 font-bold text-gray-400">#{c.id}</td>
                  <td className="py-3 px-4 font-bold text-gray-800 dark:text-gray-100">
                    {c.parent_id ? <span className="ml-4 text-gray-400 text-xs">↳ {c.name}</span> : c.name}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-blue-500">{c.slug}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{c.description || 'Chưa có mô tả'}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleOpenEdit(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL THÊM / SỬA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 space-y-4 border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                {editingCategory ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}
              </h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Tên danh mục *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Danh mục cha (Tùy chọn)</label>
                <select
                  value={formData.parent_id || ''}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value === '' ? null : e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white"
                >
                  <option value="">-- Trống (Đây là danh mục gốc) --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Mô tả danh mục</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-bold">Hủy</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Xóa Danh Mục Này?"
        message="Hành động này có thể ảnh hưởng đến các sản phẩm thuộc danh mục. Bạn có chắc chắn muốn xóa không?"
        confirmText="Vâng, Xóa Danh Mục"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, idToDelete: null })}
      />

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />
    </div>
  );
};

export default AdminCategoryManager;
