const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

/**
 * BỘ ROUTE THỐNG KÊ DASHBOARD QUẢN TRỊ
 */
router.get('/stats', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), getDashboardStats);

module.exports = router;
