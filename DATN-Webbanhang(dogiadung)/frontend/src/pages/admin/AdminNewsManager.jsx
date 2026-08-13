import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Newspaper, Plus, Edit, Trash2, X } from 'lucide-react';

/**
 * Trang Quản Lý Bài Viết Tin Tức (AdminNewsManager)
 */
const AdminNewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [formData, setFormData] = useState({ title: '', summary: '', content: '', image_url: '', image_file: null });

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/news?limit=20');
      if (res.success) setNewsList(res.data || []);
    } catch (err) {
      console.error('Lỗi lấy bài viết:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenAdd = () => {
    setEditingNews(null);
    setFormData({ title: '', summary: '', content: '', image_url: '', image_file: null });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n) => {
    setEditingNews(n);
    setFormData({ title: n.title, summary: n.summary || '', content: n.content || '', image_url: n.image || '', image_file: null });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Vui lòng điền tiêu đề và nội dung bài viết!');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('summary', formData.summary);
      data.append('content', formData.content);
      if (formData.image_file) {
        data.append('image', formData.image_file);
      } else if (formData.image_url) {
        data.append('image_url', formData.image_url);
      }

      if (editingNews) {
        await axiosClient.put(`/news/${editingNews.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Cập nhật tin tức thành công!');
      } else {
        await axiosClient.post('/news', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Thêm bài viết mới thành công!');
      }
      setIsModalOpen(false);
      fetchNews();
    } catch (err) {
      alert('Lỗi lưu tin tức: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) return;
    try {
      await axiosClient.delete(`/news/${id}`);
      alert('Xóa bài viết thành công!');
      fetchNews();
    } catch (err) {
      alert('Lỗi xóa bài viết: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-purple-600" /> Quản Lý Bài Viết Tin Tức
          </h1>
          <p className="text-xs text-gray-500 mt-1">Tổng số: {newsList.length} bài viết mẹo hay</p>
        </div>
        <button onClick={handleOpenAdd} className="py-2.5 px-5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Viết Bài Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsList.map((n) => (
          <div key={n.id} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm p-4 space-y-3 flex flex-col justify-between">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
              <img src={n.image?.startsWith('http') ? n.image : `http://localhost:5000${n.image}`} alt={n.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">{n.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{n.summary}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => handleOpenEdit(n)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(n.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-xl w-full p-6 space-y-4 border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{editingNews ? 'Sửa Bài Viết' : 'Thêm Bài Viết'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Tiêu đề bài viết *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Tóm tắt ngắn</label>
                <input type="text" value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Ảnh đại diện bài viết</label>
                <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image_file: e.target.files[0] })} className="block w-full text-xs" />
                <input type="text" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="URL ảnh..." className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Nội dung chi tiết *</label>
                <textarea rows={4} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs dark:text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-bold">Hủy</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs">Lưu Bài Viết</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsManager;
