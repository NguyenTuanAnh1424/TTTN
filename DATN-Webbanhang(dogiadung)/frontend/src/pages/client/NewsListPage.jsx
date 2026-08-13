import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Trang Danh Sách Tin Tức & Mẹo Hay Gia Dụng (Client NewsListPage)
 */
const NewsListPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/news?page=${pagination.currentPage}&limit=6`);
        if (res.success) {
          setNewsList(res.data || []);
          setPagination(res.pagination);
        }
      } catch (err) {
        console.error('Lỗi lấy danh sách tin tức:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [pagination.currentPage]);

  return (
    <div className="space-y-8">
      
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-purple-600" /> Tin Tức & Kinh Nghiệm Hay Gia Dụng
        </h1>
      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500">Đang tải tin tức...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img
                  src={news.image?.startsWith('http') ? news.image : `http://localhost:5000${news.image}`}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop';
                  }}
                />
              </div>

              <div className="p-6 space-y-3">
                <h2 className="font-bold text-base text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {news.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                  {news.summary}
                </p>
                <p className="text-[11px] text-gray-400 font-medium">
                  Đăng ngày: {new Date(news.createdAt || news.created_at).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
};

export default NewsListPage;
