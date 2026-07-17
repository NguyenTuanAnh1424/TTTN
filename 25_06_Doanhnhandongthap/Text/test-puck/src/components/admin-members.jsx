import React from 'react';

const AdminMembers = ({ title, subtitle, description1, description2, benefitsTitle, benefits = [], imageSrc, stats = [] }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề chính */}
        <div className="mb-12 md:mb-16 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase tracking-wide text-center">
            {title}
          </h2>
          <div className="w-16 h-0.5 mt-4 transition-all duration-300" style={{ backgroundColor: '#f7941d' }}></div>
        </div>

        {/* Nội dung 2 cột */}
        <div className="grid grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Ảnh */}
          <div className="rounded-2xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-[1.02]">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-auto object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>

          {/* Nội dung chữ */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl md:text-2xl font-bold text-blue-900">
              {subtitle}
            </h3>
            
            <p className="text-gray-600 leading-relaxed text-justify">
              {description1}
            </p>
            
            <p className="text-gray-600 leading-relaxed text-justify">
              {description2}
            </p>
            
            {/* Khung Quyền lợi */}
            <div className="bg-gray-50 p-6 rounded-xl mt-2 border border-gray-100">
              <h4 className="font-bold text-blue-900 mb-4">{benefitsTitle}</h4>
              <ul className="space-y-3">
                {benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base border-b border-gray-200 pb-2 w-full">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Thống kê 4 cột */}
        <div className="grid grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-50">
              <div className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-2">{stat.value}</div>
              <div className="text-gray-500 text-xs md:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminMembers;