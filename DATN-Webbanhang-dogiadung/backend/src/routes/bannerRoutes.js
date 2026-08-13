const express = require('express');
const router = express.Router();
const { getBanners, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * BỘ ROUTE QUẢN LÝ BANNERS
 */
router.get('/', getBanners);
router.post('/', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), upload.single('image'), createBanner);
router.put('/:id', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), upload.single('image'), updateBanner);
router.delete('/:id', verifyToken, requireRole('Admin', 'SuperAdmin'), deleteBanner);

module.exports = router;
