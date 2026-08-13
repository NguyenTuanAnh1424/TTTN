const express = require('express');
const router = express.Router();
const { webhookHandler } = require('../controllers/sepayController');
/**
 * ===================================================
 * BỘ ROUTE SEPAY WEBHOOK (Xử lý thanh toán tự động)
 * ===================================================
 */

// Route nhận webhook thanh toán từ SePay: POST /api/sepay/webhook
router.post('/webhook', webhookHandler);

module.exports = router;