const { Order } = require('../models');

/**
 * Xử lý webhook từ SePay
 * @param {Object} data Dữ liệu webhook (gồm transaction, content, amount...)
 */
const processWebhook = async (data) => {
  try {
    const { transferAmount, transferType, content, description } = data;

    // Chỉ xử lý giao dịch nhận tiền (in)
    if (transferType && transferType !== 'in') {
      console.log('Bỏ qua giao dịch không phải chuyển tiền vào (transferType !== "in").');
      return { success: true, message: 'Bỏ qua giao dịch' };
    }
    
    const searchStr = `${content || ''} ${description || ''}`.trim();
    if (!searchStr) {
      return { success: false, message: 'Nội dung chuyển khoản trống' };
    }

    // Tìm mã đơn hàng từ nội dung chuyển khoản (chấp nhận DH123, DH 123, DH-123)
    const regex = /DH\s*[-_]?\s*(\d+)/i;
    const match = searchStr.match(regex);
    
    if (!match) {
      console.log('Không tìm thấy cú pháp DH<ID> trong nội dung chuyển khoản:', searchStr);
      return { success: false, message: 'Không tìm thấy mã đơn hàng' };
    }

    const orderId = parseInt(match[1]);

    // Tìm đơn hàng trong hệ thống
    const order = await Order.findByPk(orderId);
    if (!order) {
      console.log(`Đơn hàng #${orderId} không tồn tại.`);
      return { success: false, message: `Đơn hàng #${orderId} không tồn tại` };
    }

    if (order.status === 'Paid') {
      console.log(`Đơn hàng #${orderId} đã được xác nhận thanh toán trước đó.`);
      return { success: true, message: 'Đơn hàng đã được thanh toán' };
    }

    // Kiểm tra số tiền chuyển
    const amountPaid = parseFloat(transferAmount) || 0;
    const orderTotal = parseFloat(order.total_amount) || 0;

    if (amountPaid >= orderTotal) {
      order.status = 'Paid';
      await order.save();
      console.log(`Đã cập nhật trạng thái "Paid" cho đơn hàng #${orderId}`);
      return { success: true, message: 'Xác nhận thanh toán thành công' };
    } else {
      console.log(`Đơn hàng #${orderId}: Số tiền chuyển (${amountPaid}) không đủ so với tổng đơn (${orderTotal}).`);
      return { success: false, message: 'Số tiền chuyển không đủ' };
    }
  } catch (error) {
    console.error('Lỗi khi xử lý SePay Webhook:', error);
    return { success: false, message: 'Lỗi hệ thống' };
  }
};

module.exports = {
  processWebhook
};
