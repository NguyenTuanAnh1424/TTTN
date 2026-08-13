import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get('/categories');
        if (res.success) {
          setCategories(res.data.slice(0, 4)); // Lấy 4 danh mục gốc đầu tiên
        }
      } catch (err) {
        console.error('Lỗi lấy danh mục footer:', err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div>
            <div className="flex items-center gap-2 font-bold text-2xl text-white mb-4">
              <span className="bg-blue-600 text-white p-1 rounded-lg">🏠</span>
              <span>GiaDungStore</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Hệ thống bán lẻ đồ gia dụng cao cấp, chính hãng hàng đầu Việt Nam. Cam kết chất lượng, bảo hành uy tín và giao hàng tận nơi.
            </p>
          </div>

          {/* Cột 2: Danh mục nhanh */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Danh Mục Sản Phẩm</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/products?category_id=${c.id}`} className="hover:text-blue-400 transition-colors uppercase">
                    {c.name}
                  </Link>
                </li>
              ))}
              {categories.length === 0 && (
                <li className="text-gray-500">Đang tải danh mục...</li>
              )}
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Hỗ Trợ Khách Hàng</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách đổi trả 1-1</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Phương thức thanh toán</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Hướng dẫn mua hàng online</a></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Thông Tin Liên Hệ</h3>
            <p className="text-sm text-gray-400 mb-2">📍 Địa chỉ: 123 Đường Cầu Giấy, Hà Nội</p>
            <p className="text-sm text-gray-400 mb-2">📞 Hotline: 1900 6868 (8:00 - 21:00)</p>
            <p className="text-sm text-gray-400 mb-4">✉️ Email: cskh@giadungstore.vn</p>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} GiaDungStore. All rights reserved. Bản quyền thuộc về GiaDungStore.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
