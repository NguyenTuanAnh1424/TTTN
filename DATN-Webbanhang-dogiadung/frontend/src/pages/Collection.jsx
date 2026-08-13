import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Collection({ type }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let title = 'Bộ Sưu Tập';
  if (type === 'new') title = 'Sản Phẩm Mới';
  if (type === 'sale') title = 'Nội Thất Khuyến Mãi';
  if (type === 'clearance') title = 'Thanh Lý Hàng Tồn';

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        let filtered = data;
        if (type === 'new') {
          filtered = data.filter(p => p.isNew === true || p.isNew === 1);
        } else if (type === 'sale') {
          filtered = data.filter(p => p.discount > 0);
        } else if (type === 'clearance') {
          filtered = data.filter(p => p.stock > 0 && p.stock <= 50); // Mẫu: Tồn kho thấp hoặc tự xử lý query
        } else if (type === 'search') {
          // Xử lý search thông qua query string nếu cần
        }
        setProducts(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center', color: '#333' }}>{title} ({products.length})</h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Đang tải...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Không có sản phẩm nào trong danh mục này.</p>
      ) : (
        <div className="products-grid">
          {products.map(prod => (
            <div key={prod.id} className="product-card">
              <Link to={`/product/${prod.id}`} className="product-img-wrapper" style={{ display: 'block' }}>
                <img src={prod.imageUrl} alt={prod.name} className="product-img" />
                {prod.discount > 0 && <span className="discount-badge">-{prod.discount}%</span>}
              </Link>
              <div className="product-info">
                <Link to={`/product/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 className="product-name">{prod.name}</h3>
                </Link>
                <div className="product-price">
                  <span className="price-new">{prod.price.toLocaleString()}đ</span>
                  {prod.originalPrice > prod.price && (
                    <span className="price-old" style={{ textDecoration: 'line-through', color: '#999', marginLeft: '10px', fontSize: '0.9rem' }}>
                      {prod.originalPrice.toLocaleString()}đ
                    </span>
                  )}
                </div>
                <Link to={`/product/${prod.id}`} style={{ width: '100%', display: 'block' }}>
                  <button className="add-to-cart-btn" style={{ width: '100%', cursor: 'pointer' }}>Xem chi tiết</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
