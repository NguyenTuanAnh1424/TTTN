const express = require('express');
const router = express.Router();
const { webhookHandler } = require('../controllers/sepayController');

/**
 * ===================================================
 * BỘ ROUTE SEPAY WEBHOOK
 * ===================================================
 */

// Route nhận webhook thanh toán từ SePay
router.post('/webhook', webhookHandler);

module.exports = router;
