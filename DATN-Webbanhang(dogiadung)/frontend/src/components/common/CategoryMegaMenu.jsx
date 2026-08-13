import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

const CategoryMegaMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get('/categories');
        if (res.success) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Lỗi lấy danh mục mega menu:', err);
      }
    };
    fetchCategories();
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-[600px] bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 rounded-b-xl py-6 px-8 grid grid-cols-3 gap-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      {categories.map((col) => (
        <div key={col.id} className="space-y-4">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase mb-4 tracking-wider">
            {col.name}
          </h3>
          {col.children && col.children.length > 0 && (
            <ul className="space-y-3">
              {col.children.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/products?category_id=${item.id}`}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm uppercase transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryMegaMenu;
