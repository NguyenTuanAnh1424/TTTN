const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Danh Mục Sản Phẩm (Categories)
 * Ví dụ: Nồi chiên không dầu, Máy hút bụi, Tủ lạnh, Quạt điện...
 */
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Mã danh mục tự tăng'
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Mã danh mục cha (Null nếu là danh mục gốc)'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: 'Tên danh mục (ví dụ: Nồi cơm điện, Máy lọc nước)'
  },
  slug: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true,
    comment: 'Đường dẫn SEO (ví dụ: noi-com-dien, may-loc-nuoc)'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Mô tả chi tiết về danh mục'
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Trạng thái hiển thị: true (Hiển thị), false (Ẩn)'
  }
}, {
  tableName: 'categories'
});

module.exports = Category;
