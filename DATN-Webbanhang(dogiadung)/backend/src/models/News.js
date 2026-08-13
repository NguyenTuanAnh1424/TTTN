const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Tin Tức & Mẹo Hay Gia Dụng
 */
const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Tiêu đề bài viết tin tức'
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Đường dẫn SEO bài viết'
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Ảnh đại diện bài viết'
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Tóm tắt bài viết'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Nội dung chi tiết bài viết (HTML / Markdown)'
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Trạng thái hiển thị bài viết'
  }
}, {
  tableName: 'news'
});

module.exports = News;
