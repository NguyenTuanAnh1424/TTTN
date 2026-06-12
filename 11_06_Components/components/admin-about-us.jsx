import React from 'react';

const AdminAboutUs = ({
  backgroundType = 'color',
  backgroundValue = '#fdf4ff',
  
 
  columns = [
    {
      id: 'col1',
      type: 'text', 
      title: 'VỀ CÂU LẠC BỘ',
      content: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ của doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp... Với tôn chỉ kết nối - đồng hành - sẻ chia.',
      image: 'https://via.placeholder.com/300x200' // Ảnh minh hoạ góc dưới (nếu có)
    },
    {
      id: 'col2',
      type: 'team', 
      title: 'CƠ CẤU TỔ CHỨC',
      members: [ 
        { id: 1, name: 'Trần Văn Khang', role1: 'Ủy viên BCH', role2: 'Tổng Giám đốc', company: 'Công ty CP Logistics Đồng Tháp', avatar: 'https://via.placeholder.com/80' },
        { id: 2, name: 'Đỗ Thu Trang', role1: 'Thủ quỹ CLB', role2: 'Giám đốc Tài chính', company: 'Công ty TNHH Sơn Việt', avatar: 'https://via.placeholder.com/80' },
        { id: 3, name: 'Vũ Hoàng Long', role1: 'Ủy viên BCH', role2: 'Giám đốc Điều hành', company: 'Công ty Công nghệ số Mekong', avatar: 'https://via.placeholder.com/80' }
      ]
    }
  ]
}) => {
  const bgStyle = backgroundType === 'image' 
    ? { backgroundImage: `url(${backgroundValue})`, backgroundSize: 'cover' }
    : { backgroundColor: backgroundValue };

  return (
    <section style={{ ...bgStyle, padding: '60px 20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {columns.map((col, index) => (
          <div key={index} style={{ 
            flex: '1 1 400px', 
            backgroundColor: '#ffffff', 
            borderRadius: '16px', 
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '24px', textTransform: 'uppercase' }}>
              {col.title}
            </h2>

            {/* Render dạng Đoạn văn (Text) */}
            {col.type === 'text' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '15px' }}>{col.content}</p>
                {col.image && (
                  <img src={col.image} alt="illustration" style={{ width: '100%', borderRadius: '12px', marginTop: '24px', objectFit: 'cover' }} />
                )}
              </div>
            )}

            {/* Render dạng Danh sách nhân sự (Team) */}
            {col.type === 'team' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {col.members?.map((member, mIdx) => (
                  <div key={mIdx} style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: mIdx !== col.members.length - 1 ? '1px solid #f3f4f6' : 'none', paddingBottom: mIdx !== col.members.length - 1 ? '20px' : '0' }}>
                    <img src={member.avatar} alt={member.name} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6' }}>
                      <strong style={{ color: '#111827', fontSize: '15px' }}>Họ tên: {member.name}</strong><br/>
                      <strong>Chức vụ CLB:</strong> {member.role1}<br/>
                      <strong>Chức vụ DN:</strong> {member.role2}<br/>
                      <strong>Doanh nghiệp:</strong> {member.company}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>
        ))}

      </div>
    </section>
  );
};

export default AdminAboutUs;