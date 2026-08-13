import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Catalog.css'

const CATEGORY_NAMES = {
  bathroom: 'Phòng Tắm',
  bedroom:  'Phòng Ngủ',
  cleaning: 'Vệ Sinh Nhà Cửa',
  decor:    'Trang Trí Nội Thất',
  dining:   'Phòng Ăn',
  kitchen:  'Thiết Bị Nhà Bếp',
  living:   'Phòng Khách',
}

export default function Catalog() {
  const [products, setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]     = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategory = searchParams.get('category') || 'all'

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/categories').then(r => r.json()),
      fetch('http://localhost:5000/api/products').then(r => r.json()),
    ]).then(([cats, prods]) => {
      const excluded = ['smart-home', 'new-arrival', 'on-sale', 'clearance']
      setCategories(cats.filter(c => !excluded.includes(c.id)))
      setProducts(prods)
      setLoading(false)
    }).catch(console.error)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory]);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.categoryId === activeCategory)

  const title = activeCategory === 'all'
    ? 'Tất cả sản phẩm'
    : (CATEGORY_NAMES[activeCategory] || activeCategory)

  return (
    <div className="catalog-page">
      {/* Sidebar danh mục */}
      <aside className="catalog-sidebar">
        <h3>Danh mục</h3>
        <ul>
          <li>
            <button
              className={`cat-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSearchParams({})}
            >
              🏠 Tất cả sản phẩm
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button
                className={`cat-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSearchParams({ category: cat.id })}
              >
                {cat.emoji} {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="catalog-main">
        <div className="catalog-header-row">
          <h1>{title} <span className="prod-count">({filtered.length} sản phẩm)</span></h1>
        </div>

        {loading ? (
          <div className="catalog-loading">Đang tải sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <div className="catalog-empty">
            <p>😕 Chưa có sản phẩm trong danh mục này.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(prod => (
              <div key={prod.id} className="product-card">
                <Link to={`/product/${prod.id}`} className="product-img-wrapper" style={{ display: 'block' }}>
                  <img src={prod.imageUrl} alt={prod.name} className="product-img" loading="lazy" />
                  {prod.discount > 0 && <span className="discount-badge">-{prod.discount}%</span>}
                  {prod.isNew && <span className="new-badge">MỚI</span>}
                </Link>
                <div className="product-info">
                  <Link to={`/product/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="product-name">{prod.name}</h3>
                  </Link>
                  <div className="product-price">
                    <span className="price-new">{prod.price?.toLocaleString()}đ</span>
                    {prod.originalPrice > prod.price && (
                      <span className="price-old">{prod.originalPrice?.toLocaleString()}đ</span>
                    )}
                  </div>
                  <Link to={`/product/${prod.id}`} style={{ width: '100%', display: 'block' }}>
                    <button className="add-to-cart-btn" style={{ width: '100%', cursor: 'pointer' }}>
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
