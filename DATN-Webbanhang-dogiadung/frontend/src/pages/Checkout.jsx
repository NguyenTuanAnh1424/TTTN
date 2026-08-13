import { useState, useContext, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { toast } from 'react-toastify'
import './Checkout.css'

const BANK  = 'MB'
const ACCT  = '0967258610'
const OWNER = 'NGUYEN TUAN ANH'

export default function Checkout() {
  const location = useLocation()
  const navigate  = useNavigate()
  const { user } = useContext(AuthContext)
  const { cart, clearCart } = useContext(CartContext)

  const isBuyNow    = location.state?.product !== undefined
  const itemsToBuy  = isBuyNow
    ? [{ product: location.state.product, quantity: location.state.quantity || 1 }]
    : cart

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [isSubmitting, setIsSubmitting]     = useState(false)
  const [currentOrder, setCurrentOrder]     = useState(null)  // { orderCode, totalAmount, id }
  const [payStatus, setPayStatus]           = useState('idle') // idle | waiting | paid
  const [countdown, setCountdown]           = useState(0)

  const pollRef     = useRef(null)
  const timerRef    = useRef(null)

  const [customerInfo, setCustomerInfo] = useState(() => {
    const savedInfo = localStorage.getItem('savedCustomerInfo')
    const parsed = savedInfo ? JSON.parse(savedInfo) : null
    return {
      name: user?.displayName || parsed?.name || '',
      phone: parsed?.phone || '',
      address: parsed?.address || '',
      note: parsed?.note || ''
    }
  })

  // Cập nhật tên nếu auth context load chậm
  useEffect(() => {
    if (user?.displayName && !customerInfo.name) {
      setCustomerInfo(prev => ({ ...prev, name: user.displayName }))
    }
  }, [user])

  useEffect(() => {
    if (itemsToBuy.length === 0) navigate('/cart')
  }, [itemsToBuy, navigate])

  // Cleanup khi unmount
  useEffect(() => () => {
    clearInterval(pollRef.current)
    clearInterval(timerRef.current)
  }, [])

  const subtotal    = itemsToBuy.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const shippingFee = shippingMethod === 'standard' ? 30000 : 50000
  const total       = subtotal + shippingFee

  // QR URL từ VietQR
  const qrUrl = currentOrder
    ? `https://img.vietqr.io/image/${BANK}-${ACCT}-compact2.png?amount=${total}&addInfo=DH${currentOrder.id}&accountName=${encodeURIComponent(OWNER)}`
    : null

  // Bắt đầu polling kiểm tra thanh toán
  const startPolling = (orderId) => {
    setPayStatus('waiting')
    setCountdown(300) // 5 phút timeout

    // Đếm ngược
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timerRef.current)
          clearInterval(pollRef.current)
          setPayStatus('timeout')
        }
        return c - 1
      })
    }, 1000)

    // Poll mỗi 3 giây
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`http://localhost:5000/api/orders/${orderId}`)
        const data = await res.json()
        // API trả về { order: {...}, items: [...] }
        const status = data?.order?.status ?? data?.status
        if (status === 'Paid' || status === 'Delivered') {
          clearInterval(pollRef.current)
          clearInterval(timerRef.current)
          setPayStatus('paid')
          if (!isBuyNow) clearCart()
          toast.success('🎉 Thanh toán thành công! Đặt hàng hoàn tất!')
          setTimeout(() => navigate('/thank-you', { state: { orderId: data?.data?.id ?? data?.id } }), 1500)
        }
      } catch { /* ignore */ }
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!customerInfo.address || !customerInfo.phone || !customerInfo.name) {
      toast.error('Vui lòng điền đủ thông tin giao hàng!')
      return
    }

    // Lưu thông tin khách hàng vào localStorage cho các lần mua sau
    localStorage.setItem('savedCustomerInfo', JSON.stringify({
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      note: customerInfo.note
    }))

    setIsSubmitting(true)
    try {
      const orderData = {
        userId:        user?.uid || 'GUEST',
        customerName:  customerInfo.name,
        phone:         customerInfo.phone,
        address:       customerInfo.address,
        note:          customerInfo.note,
        amount:        total,
        paymentMethod,
        shippingMethod,
        items: itemsToBuy.map(item => ({
          productId: item.product.id,
          quantity:  item.quantity,
          price:     item.product.price
        }))
      }

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      if (!res.ok) throw new Error('Không thể tạo đơn hàng.')

      const result = await res.json() // { success, message, data: { id, ... } }
      setCurrentOrder(result.data)

      if (paymentMethod === 'transfer') {
        // Hiện QR và bắt đầu chờ SePay webhook
        startPolling(result.data.id)
      } else {
        if (!isBuyNow) clearCart()
        toast.success('Đặt hàng thành công (COD)!')
        navigate('/thank-you', { state: { orderId: result.data.id } })
      }
    } catch (err) {
      toast.error(`❌ Lỗi: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* BÊN TRÁI: FORM */}
        <div className="checkout-left">
          <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
            {/* Thông tin giao hàng */}
            <section className="form-section">
              <h2>Thông tin giao hàng</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ và tên <span className="required">*</span></label>
                  <input type="text" required placeholder="Nhập họ và tên"
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Số điện thoại <span className="required">*</span></label>
                  <input type="tel" required placeholder="VD: 0912345678"
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Địa chỉ nhận hàng chi tiết <span className="required">*</span></label>
                <textarea required placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..." rows="2"
                  value={customerInfo.address}
                  onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Ghi chú đơn hàng (Tùy chọn)</label>
                <textarea placeholder="Ví dụ: Giao hàng giờ hành chính..." rows="2"
                  value={customerInfo.note}
                  onChange={e => setCustomerInfo({ ...customerInfo, note: e.target.value })} />
              </div>
            </section>

            {/* Phương thức vận chuyển */}
            <section className="form-section">
              <h2>Phương thức vận chuyển</h2>
              <div className="shipping-methods">
                {[
                  { value: 'standard', label: 'Giao hàng tiêu chuẩn (3-5 ngày)', price: '30.000đ' },
                  { value: 'fast',     label: 'Giao nhanh Hỏa tốc (2-4 giờ)',    price: '50.000đ' },
                ].map(s => (
                  <label key={s.value} className={`radio-option ${shippingMethod === s.value ? 'selected' : ''}`}>
                    <input type="radio" value={s.value}
                      checked={shippingMethod === s.value}
                      onChange={() => setShippingMethod(s.value)} />
                    <div className="option-content">
                      <span className="option-title">{s.label}</span>
                      <span className="option-price">{s.price}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Phương thức thanh toán */}
            <section className="form-section">
              <h2>Phương thức thanh toán</h2>
              <div className="payment-methods">
                <label className={`radio-option payment-opt ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input type="radio" value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')} />
                  <span>💵 Thanh toán khi nhận hàng (COD)</span>
                </label>

                <label className={`radio-option payment-opt ${paymentMethod === 'transfer' ? 'selected' : ''}`}>
                  <input type="radio" value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')} />
                  <span>🏦 Chuyển khoản VietQR (Duyệt tự động)</span>
                </label>

                {/* Thông tin ngân hàng + QR code ngay phía dưới */}
                {paymentMethod === 'transfer' && (
                  <div className="bank-info-box">
                    <div className="bank-info-text">
                      <p><strong>Thông tin chuyển khoản:</strong></p>
                      <p>Ngân hàng: <strong>MBBank</strong></p>
                      <p>Số tài khoản: <strong style={{ fontSize: '1.15rem', color: '#0056b3' }}>{ACCT}</strong></p>
                      <p>Chủ tài khoản: <strong>{OWNER}</strong></p>
                    </div>

                    {/* QR code — chỉ hiện sau khi đã bấm Đặt hàng */}
                    {currentOrder && qrUrl ? (
                      <div className="qr-inline-block">
                        {payStatus === 'paid' ? (
                          <div className="pay-success-badge">✅ Thanh toán thành công!</div>
                        ) : payStatus === 'timeout' ? (
                          <div className="pay-timeout-badge">⏰ Hết thời gian. <button onClick={() => navigate('/cart')}>Quay lại giỏ</button></div>
                        ) : (
                          <>
                            <img src={qrUrl} alt="VietQR" className="qr-inline-img" />
                            <div className="qr-inline-info">
                              <p className="qr-order-code">Mã đơn: <strong>DH{currentOrder.id}</strong></p>
                              <p className="qr-amount">Số tiền: <strong style={{ color: '#e60012' }}>{total.toLocaleString()}đ</strong></p>
                              <div className="qr-waiting">
                                <span className="qr-spinner" />
                                <span>Đang chờ thanh toán... <strong style={{ color: '#007bff' }}>{formatTime(countdown)}</strong></span>
                              </div>
                              <p className="qr-note">Nội dung CK đã điền sẵn trong mã QR</p>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="qr-pending-note">* Mã QR sẽ hiện sau khi bấm <strong>Đặt hàng ngay</strong></p>
                    )}
                  </div>
                )}
              </div>
            </section>
          </form>
        </div>

        {/* BÊN PHẢI: TÓM TẮT ĐƠN HÀNG */}
        <div className="checkout-right">
          <div className="order-summary-sticky">
            <h2>Tóm tắt đơn hàng ({itemsToBuy.length} sản phẩm)</h2>
            <div className="summary-items-list">
              {itemsToBuy.map((item, i) => (
                <div key={i} className="summary-item-card">
                  <div className="item-img-wrapper">
                    <img src={item.product.imageUrl} alt={item.product.name} />
                    <span className="item-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="summary-info">
                    <h4>{item.product.name}</h4>
                    <p className="item-price">{(item.product.price * item.quantity).toLocaleString()}đ</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển:</span>
                <span>{shippingFee.toLocaleString()}đ</span>
              </div>
              <div className="summary-row total-row">
                <span>Tổng cộng:</span>
                <span className="final-total">{total.toLocaleString()}đ</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting || payStatus === 'waiting'}
              className="btn-place-order"
            >
              {isSubmitting
                ? 'ĐANG XỬ LÝ...'
                : payStatus === 'waiting'
                  ? '⏳ CHỜ THANH TOÁN QR...'
                  : 'ĐẶT HÀNG NGAY'}
            </button>

            {/* Nút xác nhận thủ công (phòng khi webhook chậm) */}
            {payStatus === 'waiting' && (
              <button
                onClick={() => {
                  clearInterval(pollRef.current)
                  clearInterval(timerRef.current)
                  if (!isBuyNow) clearCart()
                  navigate('/thank-you', { state: { orderId: currentOrder.id } })
                }}
                style={{
                  marginTop: '0.75rem', width: '100%', padding: '0.75rem',
                  background: 'none', border: '1px solid #ccc', borderRadius: '6px',
                  cursor: 'pointer', color: '#555', fontSize: '0.9rem'
                }}
              >
                Tôi đã chuyển khoản xong →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}