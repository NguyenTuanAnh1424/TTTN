const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

/**
 * ===================================================
 * BỘ ROUTE QUẢN LÝ ĐƠN HÀNG & CHECKOUT (ORDERS)
 * ===================================================
 */

// Route Đặt hàng mới (Khách hàng có thể đăng nhập hoặc vãng lai)
// Nếu có gửi header Token thì tự động đính kèm req.user
router.post('/', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return verifyToken(req, res, next);
  }
  next();
}, createOrder);

// Route xem lịch sử đơn hàng cá nhân (Yêu cầu đăng nhập)
router.get('/my-orders', verifyToken, getMyOrders);

// Route xem chi tiết 1 đơn hàng theo ID
router.get('/:id', getOrderById);

// Route Admin lấy toàn bộ đơn hàng (Phân trang, lọc trạng thái)
router.get('/admin/all', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), getAllOrders);

// Route Admin cập nhật trạng thái đơn hàng (Pending -> Processing -> Shipping -> Completed / Cancelled)
router.put('/admin/:id/status', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), updateOrderStatus);

module.exports = router;
