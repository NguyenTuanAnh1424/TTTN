import React from 'react';

export default function AdminLienHeMetik({
  title = "Liên hệ Metik"
}) {
  return (
    <div className="p-8 bg-white text-center border-t border-gray-200">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">{title}</h2>
      <p className="text-gray-600">Thông tin liên hệ sẽ được hiển thị ở đây.</p>
    </div>
  );
}
