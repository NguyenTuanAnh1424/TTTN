import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { toast } from 'react-toastify'

export default function Cart() {
  const { user } = useContext(AuthContext);
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', minHeight: '50vh' }}>
        <h2>Bạn chưa đăng nhập</h2>
        <p>Vui lòng đăng nhập để xem giỏ hàng của bạn.</p>
        <Link to="/login">
          <button style={{ padding: '0.8rem 2rem', background: '#009e82', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem', fontWeight: 'bold' }}>
            ĐĂNG NHẬP NGAY
          </button>
        </Link>
      </div>
    );
  }

  const totalAmount = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Giỏ hàng của bạn</h1>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#f9f9f9', borderRadius: '8px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1.5rem' }}>Giỏ hàng đang trống.</p>
          <Link to="/">
            <button style={{ padding: '0.8rem 2rem', background: '#009e82', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              TIẾP TỤC MUA SẮM
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.product.id} style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.product.name}</h3>
                  <p style={{ color: '#e60012', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{item.product.price.toLocaleString()}đ</p>
                  <p style={{ margin: '0 0 1rem 0' }}>Số lượng: <strong>{item.quantity}</strong></p>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary" style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Tóm tắt đơn hàng</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', marginTop: '1rem' }}>
              <span>Tổng tiền ({cart.reduce((a, c) => a + c.quantity, 0)} sản phẩm):</span>
              <strong style={{ fontSize: '1.2rem', color: '#e60012' }}>{totalAmount.toLocaleString()}đ</strong>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              style={{ width: '100%', padding: '1rem', background: '#009e82', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
