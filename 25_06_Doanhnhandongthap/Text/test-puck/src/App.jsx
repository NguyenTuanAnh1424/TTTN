import React, { useEffect } from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/puck.css'; // Import CSS mặc định của bộ kéo thả
import puckConfig from './admin-puck-config'; // Import file config bạn vừa viết

// Dữ liệu trống ban đầu
const initialData = {};

function App() {
  useEffect(() => {
    // Hàm này sẽ liên tục kiểm tra và nhúng Tailwind CDN vào iframe của Puck
    const interval = setInterval(() => {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentDocument) {
        const head = iframe.contentDocument.head;
        if (!head.querySelector('#tw-cdn')) {
          const script = iframe.contentDocument.createElement('script');
          script.id = 'tw-cdn';
          script.src = 'https://cdn.tailwindcss.com';
          head.appendChild(script);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Gọi component Puck và truyền config của bạn vào
    <Puck
      config={puckConfig}
      data={initialData}
      onPublish={(data) => {
        console.log("Dữ liệu sau khi kéo thả:", data);
        alert("Đã lưu dữ liệu! Hãy mở F12 (Console) để xem.");
      }}
    />
  );
}

export default App;