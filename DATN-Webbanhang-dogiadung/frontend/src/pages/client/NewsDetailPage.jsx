import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { Newspaper, ArrowLeft, Calendar } from 'lucide-react';

/**
 * Trang Xem Chi Tiết Bài Viết Tin Tức (Client NewsDetailPage)
 */
const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/news/${id}`);
        if (res.success) setNews(res.data);
      } catch (err) {
        console.error('Lỗi lấy chi tiết tin tức:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500">Đang nạp bài viết...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Không Tìm Thấy Bài Viết</h2>
        <Link to="/news" className="inline-block bg-purple-600 text-white px-6 py-2.5 rounded-full font-bold text-sm">
          Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <Link to="/news" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách tin tức
      </Link>

      <article className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
        
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {news.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>Ngày đăng: {new Date(news.createdAt || news.created_at).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {news.image && (
          <div className="aspect-video bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
            <img
              src={news.image?.startsWith('http') ? news.image : `https://backend-dogiadung.onrender.com${news.image}`}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {news.summary && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-900/40 text-sm font-semibold text-purple-900 dark:text-purple-200 italic">
            "{news.summary}"
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {news.content}
        </div>

      </article>

    </div>
  );
};

export default NewsDetailPage;
