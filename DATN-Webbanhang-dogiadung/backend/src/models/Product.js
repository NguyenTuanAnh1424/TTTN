const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Model Sản Phẩm Đồ Gia Dụng (Products)
 */
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Mã sản phẩm'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Mã danh mục thuộc về (Khóa ngoại)'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Tên sản phẩm (Ví dụ: Nồi Chiên Không Dầu Sunhouse 5L)'
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Đường dẫn SEO sản phẩm'
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Đường dẫn hình ảnh đại diện chính của sản phẩm'
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0.00,
    comment: 'Giá niêm yết (VNĐ)'
  },
  sale_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    defaultValue: 0.00,
    comment: 'Giá khuyến mãi/giảm giá (VNĐ)'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Số lượng tồn kho'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Mô tả chi tiết bài viết sản phẩm'
  },
  short_description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Mô tả ngắn gọn hiển thị trên card'
  },
  is_new: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Đánh dấu sản phẩm mới về'
  },
  is_sale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Đánh dấu sản phẩm đang giảm giá shock'
  },
  is_best: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Đánh dấu sản phẩm bán chạy'
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Trạng thái hiển thị sản phẩm'
  }
}, {
  tableName: 'products'
});

module.exports = Product;
