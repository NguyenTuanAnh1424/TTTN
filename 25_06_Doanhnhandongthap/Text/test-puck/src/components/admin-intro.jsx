import React from 'react';

const AdminIntro = ({ 
  title, 
  subtitle, 
  description1, 
  description2, 
  coreValues = [],
  imageSrc, 
  stats = [] 
}) => {
  return (
    <section className="py-16 bg-white w-full font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Phần 1: Tiêu đề chính và Đường gạch */}
        <div className="mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-center" style={{ color: '#0a539c' }}>
            {title}
          </h2>
          {/* Đường gạch cam căn giữa */}
          <div className="w-24 h-0.5 mt-4 transition-all duration-300" style={{ backgroundColor: '#f7941d' }}></div>
        </div>

        {/* Phần 2: Nội dung chính (Grid 2 cột) */}
        <div className="grid grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
          
          {/* Cột Trái: Hình ảnh */}
          <div className="w-full">
            <img
              src={imageSrc}
              alt={title || "Giới thiệu"}
              className="w-full h-auto object-cover rounded-2xl shadow-lg aspect-[4/3]"
            />
          </div>

          {/* Cột Phải: Văn bản & Tầm nhìn/Sứ mệnh */}
          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#0a539c' }}>
              {subtitle}
            </h3>
            
            <div className="leading-relaxed mb-8 space-y-4 text-left" style={{ color: '#555555' }}>
              <p className="text-sm md:text-base">{description1}</p>
              <p className="text-sm md:text-base">{description2}</p>
            </div>

            {/* Box Highlight: Giá trị cốt lõi / Tầm nhìn / Sứ mệnh */}
            {coreValues && coreValues.length > 0 && (
              <div className="bg-gray-50 border-l-[4px] border-orange-500 p-6 rounded-r-xl shadow-sm space-y-4">
                {coreValues.map((item, index) => (
                  <div key={index} className="text-gray-700">
                    <span className="font-bold text-gray-900">{item.title}: </span>
                    {item.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Phần 3: Thống kê (Grid 3 cột) */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-10 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] text-center border border-gray-50 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default AdminIntro;