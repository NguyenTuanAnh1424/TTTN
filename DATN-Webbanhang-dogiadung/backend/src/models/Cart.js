const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Giỏ Hàng Người Dùng (Carts)
 */
const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    comment: 'Mã khách hàng sở hữu giỏ hàng'
  }
}, {
  tableName: 'carts'
});

module.exports = Cart;
