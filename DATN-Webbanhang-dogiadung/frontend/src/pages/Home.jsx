import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

// Map hình ảnh đẹp cho từng danh mục
const categoryImages = {
  'bathroom':  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  'bedroom':   'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
  'cleaning':  'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&q=80',
  'decor':     'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
  'dining':    'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
  'kitchen':   'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  'living':    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  'new-arrival':'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  'on-sale':   'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  'clearance': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
}

// Slides cho hero
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85',
    tag: '✨ Bộ sưu tập mới 2025',
    title: 'Không gian sống',
    highlight: 'đẳng cấp hơn',
    subtitle: 'Khám phá hàng nghìn sản phẩm nội thất & gia dụng chính hãng',
    cta: 'Mua sắm ngay',
    link: '/catalog',
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85',
    tag: '🛋️ Phòng khách hiện đại',
    title: 'Thiết kế',
    highlight: 'tinh tế & sang trọng',
    subtitle: 'Biến mọi góc nhà thành tác phẩm nghệ thuật trong cuộc sống',
    cta: 'Khám phá ngay',
    link: '/catalog',
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85',
    tag: '🍳 Thiết bị nhà bếp',
    title: 'Bếp của bạn',
    highlight: 'xứng đáng hơn',
    subtitle: 'Từ lò nướng đến dao thớt, tất cả chất lượng cao với giá tốt',
    cta: 'Xem bộ sưu tập',
    link: '/catalog',
  },
]

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/categories').then(res => res.json()),
      fetch('http://localhost:5000/api/products').then(res => res.json())
    ])
      .then(([catData, prodData]) => {
        const excludedCats = ['smart-home', 'new-arrival', 'on-sale', 'clearance']
        setCategories(catData.filter(c => !excludedCats.includes(c.id)))
        setProducts(prodData)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const featuredProducts = products.filter(p => p.isFeatured || p.isNew).slice(0, 8)
  const currentSlide = heroSlides[slideIndex]

  if (loading) return <div className="hv-loading"><div className="hv-spinner"></div><p>Đang tải...</p></div>

  return (
    <div className="home-page">

      {/* ====== HERO SLIDER ====== */}
      <section className="hero-slider">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
          key={slideIndex}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tag">{currentSlide.tag}</span>
          <h1 className="hero-title">
            {currentSlide.title}<br />
            <span className="hero-highlight">{currentSlide.highlight}</span>
          </h1>
          <p className="hero-subtitle">{currentSlide.subtitle}</p>
          <div className="hero-actions">
            <Link to={currentSlide.link} className="btn-hero-primary">{currentSlide.cta} →</Link>
            <Link to="/catalog" className="btn-hero-outline">Xem tất cả</Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`dot ${i === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(i)} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <span>↓</span>
        </div>
      </section>

      {/* ====== CATEGORY CARDS ====== */}
      <section className="home-section">
        <div className="section-header">
          <h2>Danh mục sản phẩm</h2>
          <p>Tìm kiếm sản phẩm theo không gian sống của bạn</p>
        </div>
        <div className="category-grid">
          {categories.map(cat => (
            <Link to={`/catalog?category=${cat.id}`} key={cat.id} className="cat-card">
              <div
                className="cat-card-img"
                style={{ backgroundImage: `url(${categoryImages[cat.id] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'})` }}
              />
              <div className="cat-card-overlay">
                <span className="cat-card-emoji">{cat.emoji}</span>
                <span className="cat-card-name">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== BANNER GIỮA TRANG ====== */}
      <section className="mid-banner">
        <div
          className="mid-banner-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1400&q=85)` }}
        />
        <div className="mid-banner-overlay"/>
        <div className="mid-banner-content">
          <span className="mid-banner-tag">🔥 Ưu đãi đặc biệt</span>
          <h2>Giảm đến <strong>40%</strong> sản phẩm được chọn</h2>
          <p>Số lượng có hạn — Đừng bỏ lỡ cơ hội vàng này!</p>
          <Link to="/catalog" className="btn-mid-banner">Xem ngay →</Link>
        </div>
      </section>

      {/* ====== SẢN PHẨM NỔI BẬT ====== */}
      <section className="home-section">
        <div className="section-header">
          <h2>Sản phẩm nổi bật</h2>
          <p>Được khách hàng yêu thích và đánh giá cao nhất</p>
        </div>
        <div className="products-grid">
          {(featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8)).map(prod => (
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
                  <button className="add-to-cart-btn" style={{ cursor: 'pointer' }}>Xem chi tiết</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/catalog" className="btn-view-all">Xem tất cả sản phẩm →</Link>
        </div>
      </section>

      {/* ====== USP BAR ====== */}
      <section className="usp-bar">
        {[
          { icon: '🚚', title: 'Giao hàng nhanh', desc: 'Toàn quốc trong 1–5 ngày' },
          { icon: '🔄', title: 'Đổi trả dễ dàng', desc: 'Trong vòng 7 ngày' },
          { icon: '✅', title: 'Hàng chính hãng', desc: '100% nguồn gốc rõ ràng' },
          { icon: '💳', title: 'Thanh toán an toàn', desc: 'SSL & VietQR bảo mật' },
        ].map((item, i) => (
          <div key={i} className="usp-item">
            <span className="usp-icon">{item.icon}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

    </div>
  )
}
