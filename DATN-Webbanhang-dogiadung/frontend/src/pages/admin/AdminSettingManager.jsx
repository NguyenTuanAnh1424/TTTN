import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import { setSettings as setReduxSettings } from '../../redux/slices/settingSlice';
import { Sliders, Save, Palette, Eye, Layout } from 'lucide-react';

/**
 * Trang Quản Lý Giao Diện Dành Cho Admin (AdminSettingManager)
 * Đổi Logo website, Màu chủ đạo, Bật/Tắt hiển thị các mục Sản phẩm mới/Bán chạy/Sale/Tin tức trên Trang Chủ
 */
const AdminSettingManager = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    site_logo: 'GiaDungStore',
    primary_color: '#2563eb',
    show_new_products: 'true',
    show_best_products: 'true',
    show_sale_products: 'true',
    show_news_section: 'true'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get('/settings');
        if (res.success && res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Lỗi lấy settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await axiosClient.put('/settings', settings);
      if (res.success) {
        dispatch(setReduxSettings(settings));
        alert('Đã lưu cấu hình giao diện thành công!');
      }
    } catch (err) {
      alert('Lỗi lưu cài đặt: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Đang nạp cài đặt giao diện...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-blue-600" /> Quản Lý Giao Diện Website
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Tùy chỉnh Thương hiệu, Màu sắc và Bật / Ẩn các khu vực hiển thị trên Trang Chủ.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. THƯƠNG HIỆU & MÀU SẮC */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
            <Palette className="w-5 h-5 text-purple-600" /> Cấu Hình Thương Hiệu & Màu Sắc
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Tên / Logo Website</label>
              <input
                type="text"
                value={settings.site_logo}
                onChange={(e) => handleChange('site_logo', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Màu sắc chủ đạo (Primary Color)</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.primary_color}
                  onChange={(e) => handleChange('primary_color', e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={settings.primary_color}
                  onChange={(e) => handleChange('primary_color', e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. CẤU HÌNH HIỂN THỊ CÁC MỤC Ở TRANG CHỦ */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
            <Eye className="w-5 h-5 text-emerald-600" /> Bật / Tắt Hiển Thị Các Mục Ở Trang Chủ
          </h2>

          <div className="space-y-3">
            
            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Hiển thị Mục "Sản Phẩm Mới Về"</span>
              <input
                type="checkbox"
                checked={settings.show_new_products === 'true'}
                onChange={(e) => handleChange('show_new_products', e.target.checked ? 'true' : 'false')}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Hiển thị Mục "Sản Phẩm Bán Chạy"</span>
              <input
                type="checkbox"
                checked={settings.show_best_products === 'true'}
                onChange={(e) => handleChange('show_best_products', e.target.checked ? 'true' : 'false')}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Hiển thị Mục "Sản Phẩm Giảm Giá Shock"</span>
              <input
                type="checkbox"
                checked={settings.show_sale_products === 'true'}
                onChange={(e) => handleChange('show_sale_products', e.target.checked ? 'true' : 'false')}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl cursor-pointer">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Hiển thị Mục "Tin Tức & Mẹo Hay Gia Dụng"</span>
              <input
                type="checkbox"
                checked={settings.show_news_section === 'true'}
                onChange={(e) => handleChange('show_news_section', e.target.checked ? 'true' : 'false')}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>

          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
        >
          <Save className="w-5 h-5" /> {saving ? 'Đang lưu...' : 'Lưu Thay Đổi Cấu Hình'}
        </button>

      </form>

    </div>
  );
};

export default AdminSettingManager;
