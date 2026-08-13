const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Chi Tiết Sản Phẩm Trong Giỏ Hàng (CartItems)
 */
const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Khóa ngoại trỏ đến Giỏ hàng'
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Khóa ngoại trỏ đến Sản phẩm'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: 'Số lượng mua'
  }
}, {
  tableName: 'cart_items'
});

module.exports = CartItem;
