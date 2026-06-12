import React from 'react';

const AdminBannerSenHong = ({
  // Nền phía sau
  backgroundType = 'color', 
  backgroundValue = '#a8c0ff', 
  
  // Cụm Sen Hồng
  alignment = 'flex-start', 
  boxRadius = '24px',
  
  // Nút bấm
  buttonText = 'Tham gia cộng đồng',
  buttonBgColor = '#3b82f6',
  buttonTextColor = '#ffffff',
  buttonRadius = '999px',
  
  // Chữ
  title = 'Sen Hồng',
  titleColor = '#facc15',
  titleSize = '48px',
  description = 'CLB Doanh nhân Đồng Tháp tại TP.HCM quy tụ những người con quê hương...',
  descColor = '#ffffff'
}) => {
  const bgStyle = backgroundType === 'image' 
    ? { backgroundImage: `url(${backgroundValue})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: backgroundValue };

  return (
    <section style={{ ...bgStyle, padding: '80px 40px', minHeight: '450px', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: alignment }}>
        
        {/* Box chứa nội dung chính */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.15)', 
          backdropFilter: 'blur(12px)',
          borderRadius: boxRadius,
          padding: '40px',
          maxWidth: '550px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ color: descColor, fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Lan tỏa giá trị đất
          </p>
          <h1 style={{ color: titleColor, fontSize: titleSize, fontWeight: 'bold', margin: '0 0 20px 0' }}>
            {title}
          </h1>
          <p style={{ color: descColor, lineHeight: '1.6', marginBottom: '32px' }}>
            {description}
          </p>
          
          <button style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
            borderRadius: buttonRadius,
            padding: '12px 28px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            {buttonText}
          </button>
        </div>

      </div>
    </section>
  );
};

export default AdminBannerSenHong;