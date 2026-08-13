import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ThankYou() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'HD-2026-UNKNOWN';

  return (
    <div style={{ padding: '5rem 2rem', textAlign: 'center', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e6fffc', color: '#009e82', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem auto' }}>
          ✓
        </div>
        
        <h1 style={{ color: '#333', marginBottom: '1rem' }}>Đặt hàng thành công!</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Cảm ơn bạn đã tin tưởng và mua sắm tại Homevibe.</p>
        
        <div style={{ margin: '2rem 0', padding: '1rem', background: '#f4f6f8', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#555' }}>Mã đơn hàng của bạn là:</p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#009e82' }}>{orderId}</p>
        </div>

        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          Chúng tôi sẽ sớm liên hệ với bạn để xác nhận đơn hàng và tiến hành giao hàng.
        </p>

        <Link to="/">
          <button style={{ padding: '1rem 2rem', background: '#333', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
            TIẾP TỤC MUA SẮM VÀ KHÁM PHÁ
          </button>
        </Link>
      </div>
    </div>
  );
}
