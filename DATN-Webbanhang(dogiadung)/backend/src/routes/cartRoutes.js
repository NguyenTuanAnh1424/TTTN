const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
} = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * ===================================================
 * BỘ ROUTE QUẢN LÝ GIỎ HÀNG (CARTS)
 * Tất cả route giỏ hàng đều yêu cầu Khách hàng Đăng nhập
 * ===================================================
 */

// Route xem giỏ hàng của user
router.get('/', verifyToken, getCart);

// Route thêm sản phẩm vào giỏ hàng
router.post('/add', verifyToken, addToCart);

// Route cập nhật số lượng của mục sản phẩm trong giỏ hàng
router.put('/items/:id', verifyToken, updateCartItem);

// Route xóa mục sản phẩm khỏi giỏ hàng
router.delete('/items/:id', verifyToken, removeFromCart);

module.exports = router;
