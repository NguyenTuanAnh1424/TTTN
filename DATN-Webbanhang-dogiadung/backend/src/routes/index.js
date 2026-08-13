const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const bannerRoutes = require('./bannerRoutes');
const newsRoutes = require('./newsRoutes');
const userRoutes = require('./userRoutes');
const settingRoutes = require('./settingRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const uploadRoutes = require('./uploadRoutes');
const sepayRoutes = require('./sepayRoutes');

/**
 * ===================================================
 * GẮN CÁC ROUTER THÀNH PHẦN VÀO TIỀN TỐ API CHÍNH
 * ===================================================
 */

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/banners', bannerRoutes);
router.use('/news', newsRoutes);
router.use('/admin/users', userRoutes);
router.use('/settings', settingRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/upload', uploadRoutes);
router.use('/sepay', sepayRoutes);

module.exports = router;
