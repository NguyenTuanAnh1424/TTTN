const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Đơn Hàng (Orders)
 */
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_code: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Mã đơn hàng (ví dụ: HV4181)'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Mã người dùng (cho phép null nếu đặt hàng không cần đăng nhập)'
  },
  customer_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Họ tên người nhận hàng'
  },
  customer_email: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: 'khachhang@gmail.com',
    comment: 'Email nhận thông báo đơn hàng'
  },
  customer_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Số điện thoại nhận hàng'
  },
  shipping_address: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Địa chỉ giao hàng'
  },
  shipping_method: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'standard',
    comment: 'Phương thức vận chuyển (Ví dụ: standard, express)'
  },
  total_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0.00,
    comment: 'Tổng tiền thanh toán của đơn hàng'
  },
  payment_method: {
    type: DataTypes.STRING(50),
    defaultValue: 'COD',
    comment: 'Phương thức thanh toán: COD (Tiền mặt), VNPAY, chuyển khoản...'
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'Pending',
    comment: 'Trạng thái đơn hàng (Pending, Paid, Shipping, Completed, Cancelled, Delivered)'
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Ghi chú đơn hàng của khách'
  }
}, {
  tableName: 'orders'
});

module.exports = Order;
