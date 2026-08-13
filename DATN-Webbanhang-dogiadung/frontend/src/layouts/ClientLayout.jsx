import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useDispatch } from 'react-redux';
import axiosClient from '../api/axiosClient';
import { setSettings } from '../redux/slices/settingSlice';

/**
 * Layout Khung Trang Chủ Dành Cho Khách Hàng (Client)
 */
const ClientLayout = () => {
  const dispatch = useDispatch();

  // Load cấu hình giao diện trang chủ từ Backend khi vào website
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosClient.get('/settings');
        if (res.success && res.data) {
          dispatch(setSettings(res.data));
        }
      } catch (err) {
        console.error('Không thể nạp cài đặt giao diện:', err);
      }
    };
    fetchSettings();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header Điều Hướng Top */}
      <Header />

      {/* Nội Dung Trang Con (Trang chủ, Chi tiết, Giỏ hàng, Tin tức...) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer Chân Trang */}
      <Footer />
    </div>
  );
};

export default ClientLayout;
