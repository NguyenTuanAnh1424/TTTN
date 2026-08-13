const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Banner Quảng Cáo Trang Chủ
 */
const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Tiêu đề banner (VD: Khuyến mãi Hè Bùng Nổ)'
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Đường dẫn ảnh banner'
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: '#',
    comment: 'Đường dẫn khi click vào banner'
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Trạng thái ẩn/hiện banner'
  }
}, {
  tableName: 'banners'
});

module.exports = Banner;
