import React from 'react';

const AdminBannerSenHong = ({
  backgroundType, backgroundValue, overlayColor, alignment, boxRadius,
  title, titleColor, titleSize, description, descColor, 
  buttonText, buttonBgColor, buttonTextColor, buttonRadius
}) => {
  
  // Hàm xử lý bo góc linh hoạt: nhận cả Object (từ Puck) hoặc String (đã chỉnh tay)
  const parseRadius = (r) => {
    if (typeof r === 'object') return `${r.tl || '0px'} ${r.tr || '0px'} ${r.br || '0px'} ${r.bl || '0px'}`;
    return r || '0px';
  };

  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: alignment,
        overflow: 'hidden',
        padding: '2rem 5%',
        fontFamily: 'sans-serif'
      }}
    >
      {/* 1. LỚP NỀN XANH CỨNG (Thay thế cho nền đen của GIF) */}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: overlayColor || '#1e40af',
          zIndex: 0
        }} 
      />

      {/* 2. LỚP ẢNH GIF VỚI HIỆU ỨNG HÒA TRỘN (SCREEN) */}
      {backgroundType === 'image' && (
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${backgroundValue})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            mixBlendMode: 'screen', 
            zIndex: 1 
          }} 
        />
      )} 
      

      {/* 3. Khung Nội dung */}
      <div 
        style={{
          position: 'relative', zIndex: 2, maxWidth: '600px', padding: '3rem 2.5rem',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
          borderRadius: parseRadius(boxRadius),
        }}
      >
        <h1 style={{ fontSize: titleSize, fontWeight: 'bold', margin: '0 0 1rem 0', color: titleColor, lineHeight: 1.1 }}>
          {title}
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem', color: descColor, opacity: 0.9 }}>
          {description}
        </p>
        <button 
          style={{
            padding: '12px 32px', fontSize: '1.1rem', fontWeight: '600',
            color: buttonTextColor, backgroundColor: buttonBgColor, border: 'none',
            cursor: 'pointer', transition: 'transform 0.2s',
            borderRadius: parseRadius(buttonRadius),
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default AdminBannerSenHong;