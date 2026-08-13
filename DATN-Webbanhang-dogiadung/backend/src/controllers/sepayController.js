const sepayService = require('../services/sepayService');

/**
 * Controller: Nhận Webhook từ SePay
 * Route: POST /api/sepay/webhook
 */
const webhookHandler = async (req, res) => {
  try {
    const data = req.body;
    console.log('📩 [SePay Webhook] Nhận dữ liệu:', JSON.stringify(data));

    // Gọi Service để xử lý giao dịch
    const result = await sepayService.processWebhook(data);

    // SePay yêu cầu trả về HTTP status 200 kèm JSON để báo hiệu đã nhận thành công.
    // Dù xử lý thành công hay không thì cũng nên trả về 200 để SePay không gửi lại webhook nhiều lần.
    return res.status(200).json(result);
  } catch (error) {
    console.error('Lỗi controller SePay:', error);
    return res.status(200).json({ success: false, message: 'Lỗi server nội bộ' });
  }
};

module.exports = {
  webhookHandler
};
