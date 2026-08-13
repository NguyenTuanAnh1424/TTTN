const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

/**
 * Route test upload 1 hoặc nhiều ảnh độc lập
 * POST /api/upload
 */
router.post('/', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Vui lòng chọn ít nhất 1 file hình ảnh để upload!' });
    }

    const filePaths = req.files.map(file => `/uploads/${file.filename}`);

    return res.status(200).json({
      success: true,
      message: `Đã upload thành công ${req.files.length} ảnh!`,
      urls: filePaths
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi upload hình ảnh!', error: error.message });
  }
});

module.exports = router;
