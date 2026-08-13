import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Image as ImageIcon, Plus, Edit, Trash2, X } from 'lucide-react';

/**
 * Trang Quản Lý Banners Quảng Cáo Trang Chủ (AdminBannerManager)
 */
const AdminBannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    link: '#',
    status: true,
    image_url: '',
    image_file: null
  });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/banners');
      if (res.success) setBanners(res.data || []);
    } catch (err) {
      console.error('Lỗi lấy banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({ title: '', link: '#', status: true, image_url: '', image_file: null });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBanner(b);
    setFormData({ title: b.title, link: b.link || '#', status: b.status, image_url: b.image || '', image_file: null });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Vui lòng nhập tiêu đề Banner!');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('link', formData.link);
      data.append('status', formData.status);
      if (formData.image_file) {
        data.append('image', formData.image_file);
      } else if (formData.image_url) {
        data.append('image_url', formData.image_url);
      }

      if (editingBanner) {
        await axiosClient.put(`/banners/${editingBanner.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Cập nhật Banner thành công!');
      } else {
        await axiosClient.post('/banners', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Thêm Banner thành công!');
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch (err) {
      alert('Lỗi lưu Banner: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa Banner này?')) return;
    try {
      await axiosClient.delete(`/banners/${id}`);
      alert('Xóa Banner thành công!');
      fetchBanners();
    } catch (err) {
      alert('Lỗi xóa Banner: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-indigo-500" /> Quản Lý Banner Quảng Cáo
          </h1>
          <p className="text-xs text-gray-500 mt-1">Tổng số: {banners.length} Banner slider trang chủ</p>
        </div>
        <button onClick={handleOpenAdd} className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Thêm Banner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm space-y-3 p-4">
            <div className="aspect-[21/9] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
              <img src={b.image?.startsWith('http') ? b.image : `https://backend-dogiadung.onrender.com${b.image}`} alt={b.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">{b.title}</h3>
                <p className="text-xs text-gray-400">Link: {b.link}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenEdit(b)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(b.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 space-y-4 border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{editingBanner ? 'Sửa Banner' : 'Thêm Banner'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Tiêu đề Banner *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Link chuyển hướng khi click</label>
                <input type="text" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Hình ảnh Banner</label>
                <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image_file: e.target.files[0] })} className="block w-full text-xs" />
                <input type="text" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="Hoặc nhập URL ảnh..." className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-bold">Hủy</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBannerManager;
