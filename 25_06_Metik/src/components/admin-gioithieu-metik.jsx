import React from 'react';

export default function AdminGioiThieuMetik({
  videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
  paragraph1 = "Với tinh thần \"Chạm mê tít – Snap into Joy\", metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.",
  paragraph2 = "metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày."
}) {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Video Side */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] bg-gray-100 aspect-video relative">
          <video 
            src={videoUrl} 
            className="w-full h-full object-cover" 
            controls 
          />
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-500 text-lg md:text-xl leading-relaxed text-justify">
          <p className="whitespace-pre-line">
            {paragraph1}
          </p>
          <p className="whitespace-pre-line">
            {paragraph2}
          </p>
        </div>

      </div>
    </div>
  );
}
