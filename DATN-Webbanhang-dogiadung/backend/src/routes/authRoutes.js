const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * BỘ ROUTE XÁC THỰC VÀ BẢO TRÌ HỒ SƠ NGƯỜI DÙNG (AUTHENTICATION & PROFILE)
 */

// Route Đăng ký tài khoản khách hàng mới
router.post('/register', register);

// Route Đăng nhập hệ thống (nhận về JWT token)
router.post('/login', login);

// Route Lấy thông tin tài khoản cá nhân (yêu cầu gửi Token)
router.get('/profile', verifyToken, getProfile);

// Route Cập nhật thông tin tài khoản cá nhân (Upload ảnh avatar + Họ tên, Email, SĐT, Địa chỉ)
router.put('/profile', verifyToken, upload.single('avatar'), updateProfile);

module.exports = router;
