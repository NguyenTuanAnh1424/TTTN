import React from 'react';

const AdminDepartments = ({
  backgroundType = 'color',
  backgroundValue = '#eef2ff',
  mainTitle = 'CÁC BAN CHUYÊN MÔN',
  titleColor = '#1e3a8a',
  subTitle = 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
  
  
  items = [
    { id: 1, title: 'Ban Kinh tế - Đầu tư', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' },
    { id: 2, title: 'Ban Văn hóa - Thể thao', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' },
    { id: 3, title: 'Ban Xã hội - Cộng đồng', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' },
    { id: 4, title: 'Ban Khởi nghiệp', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' },
    { id: 5, title: 'Ban Giao thương quốc tế', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' }
  ]
}) => {
  const bgStyle = backgroundType === 'image' 
    ? { backgroundImage: `url(${backgroundValue})`, backgroundSize: 'cover' }
    : { backgroundColor: backgroundValue };

  return (
    <section style={{ ...bgStyle, padding: '60px 20px', textAlign: 'center' }}>
      <h2 style={{ color: titleColor, fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{mainTitle}</h2>
      <p style={{ color: titleColor, fontSize: '14px', fontWeight: '500', marginBottom: '50px' }}>{subTitle}</p>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {items.map((item, index) => (
          <div key={index} style={{
            background: 'linear-gradient(135deg, #2563eb, #1e40af)',
            color: '#fff',
            borderRadius: '24px',
            borderRadius: '24px 8px 24px 8px', // Bo góc chéo giống thiết kế
            padding: '40px 20px',
            width: '280px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 10px 25px rgba(30, 58, 138, 0.2)'
          }}>
            <img src={item.icon} alt={item.title} style={{ width: '64px', height: '64px', marginBottom: '20px', objectFit: 'contain' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', minHeight: '48px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              {item.title}
            </h3>
            <button style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: item.btnRadius || '20px',
              padding: '8px 24px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s'
            }}>
              {item.btnText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminDepartments;