const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Chi Tiết Đơn Hàng (OrderItems)
 */
const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Mã đơn hàng'
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Mã sản phẩm được mua'
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    comment: 'Đơn giá sản phẩm tại thời điểm mua'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: 'Số lượng mua'
  }
}, {
  tableName: 'order_items'
});

module.exports = OrderItem;
