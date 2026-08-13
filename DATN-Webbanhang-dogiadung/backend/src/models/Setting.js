const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Cấu Hình Giao Diện & Hệ Thống (Settings)
 * Lưu dạng Key - Value để Admin dễ thay đổi Logo, Màu sắc, Trạng thái Ẩn/Hiện Section...
 */
const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: 'Tên cấu hình (Ví dụ: site_logo, primary_color, show_new_products)'
  },
  key_value: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Giá trị tương ứng'
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Mô tả ý nghĩa của cấu hình này'
  }
}, {
  tableName: 'settings'
});

module.exports = Setting;
