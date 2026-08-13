const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

/**
 * BỘ ROUTE QUẢN LÝ CẤU HÌNH GIAO DIỆN HỆ THỐNG (Chỉ SuperAdmin mới được chỉnh sửa)
 */
router.get('/', getSettings);
router.put('/', verifyToken, requireRole('SuperAdmin'), updateSettings);

module.exports = router;
