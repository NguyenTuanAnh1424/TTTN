import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const query = useQuery();
  const q = query.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        if (q) {
          setProducts(data.filter(p => p.name.toLowerCase().includes(q.toLowerCase())));
        } else {
          setProducts(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center', color: '#333' }}>
        Kết quả tìm kiếm cho: "{q}" ({products.length})
      </h1>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Đang tìm kiếm...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Không tìm thấy sản phẩm nào phù hợp.</p>
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
