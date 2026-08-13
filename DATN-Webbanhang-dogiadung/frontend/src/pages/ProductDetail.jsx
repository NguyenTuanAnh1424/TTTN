import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { toast } from 'react-toastify'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  // Biến state để lưu hình ảnh đang được hiển thị lớn
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // 1. Lấy chi tiết sản phẩm
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Không tìm thấy sản phẩm')
        return res.json()
      })
      .then(data => {
        setProduct(data);

        // LOGIC CHỌN ẢNH ĐỂ HIỂN THỊ:
        // Ưu tiên ảnh isPrimary, nếu không có thì lấy ảnh đầu tiên trong mảng, 
        // cuối cùng mới dùng imageUrl cũ làm backup.
        const primaryImg = data.productImages?.find(img => img.isPrimary);
        const defaultImg = primaryImg?.imageUrl || data.productImages?.[0]?.imageUrl || data.imageUrl;
        setActiveImage(defaultImg);

        // 2. Lấy sản phẩm tương tự dựa trên CategoryId của sản phẩm vừa load
        return fetch(`http://localhost:5000/api/products`);
      })
      .then(res => res.json())
      .then(allProducts => {
        if (product) { // Đảm bảo đã có product để filter
          const similar = allProducts
            .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
            .slice(0, 4);
          setSimilarProducts(similar);
        }
      })
      .catch(err => {
        console.error("Lỗi:", err);
        toast.error("Không thể tải thông tin sản phẩm");
      })
      .finally(() => setLoading(false))
  }, [id, product?.categoryId]); // Chạy lại khi ID hoặc danh mục thay đổi

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product, quantity } })
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    toast.success(`Đã thêm ${quantity} món vào giỏ hàng!`);
  }

  if (loading) return <div className="loading-state">Đang tải thông tin sản phẩm...</div>
  if (!product) return <div className="error-state">Không tìm thấy sản phẩm!</div>

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">

        {/* PHẦN HÌNH ẢNH (GALLERY) */}
        <div className="product-image-section">
          <div className="main-image-wrapper">
            <img src={activeImage} alt={product.name} className="product-detail-img" />
          </div>

          {/* Danh sách ảnh nhỏ (Thumbnails) */}
          {product.productImages?.length > 1 && (
            <div className="product-thumbnails">
              {product.productImages.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail-item ${activeImage === img.imageUrl ? 'active' : ''}`}
                  onClick={() => setActiveImage(img.imageUrl)}
                >
                  <img src={img.imageUrl} alt={`Ảnh phụ ${index}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PHẦN THÔNG TIN CHI TIẾT */}
        <div className="product-info-section">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-sku">Mã sản phẩm: {product.sku || product.id}</p>

          <div className="product-detail-price">
            <span className="current-price">{product.price?.toLocaleString()}đ</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{product.originalPrice?.toLocaleString()}đ</span>
            )}
            {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
          </div>

          <div className="product-specs">
            <p><strong>Kho:</strong> {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}</p>
            <p><strong>Đánh giá:</strong> ⭐ {product.rating} ({product.reviewsCount} đánh giá)</p>
            <p><strong>Đã bán:</strong> {product.sold}</p>
          </div>

          <div className="product-quantity-selector">
            <span className="quantity-label">Số lượng:</span>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
              <input type="number" className="quantity-input" value={quantity} readOnly />
              <button className="quantity-btn" onClick={() => quantity < product.stock && setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="product-actions">
            <button className="btn-buy-now" onClick={handleBuyNow} disabled={product.stock <= 0}>MUA NGAY</button>
            <button className="btn-add-cart" onClick={handleAddToCart} disabled={product.stock <= 0}>THÊM VÀO GIỎ HÀNG</button>
          </div>

          <div className="product-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description || "Chưa có mô tả cho sản phẩm này."}</p>
          </div>
        </div>
      </div>

      {/* SẢN PHẨM TƯƠNG TỰ */}
      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <h2>Sản phẩm tương tự</h2>
          <div className="products-grid">
            {similarProducts.map(prod => (
              <div key={prod.id} className="product-card">
                <Link to={`/product/${prod.id}`} className="product-img-wrapper">
                  <img src={prod.imageUrl} alt={prod.name} className="product-img" />
                </Link>
                <div className="product-info">
                  <Link to={`/product/${prod.id}`} className="product-link">
                    <h3 className="product-name">{prod.name}</h3>
                  </Link>
                  <div className="product-price">
                    <span className="price-new">{prod.price?.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}