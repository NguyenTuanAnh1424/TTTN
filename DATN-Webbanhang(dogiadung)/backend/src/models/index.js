const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Banner = require('./Banner');
const News = require('./News');
const Setting = require('./Setting');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

/**
 * ===================================================
 * KHAI BÁO CÁC MỐI QUAN HỆ GIỮA CÁC BẢNG (ASSOCIATIONS)
 * ===================================================
 */

// 1. Danh mục & Sản phẩm (1 - N)
// Một danh mục có nhiều sản phẩm, Mỗi sản phẩm thuộc 1 danh mục
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// 1.1 Danh mục & Danh mục con (1 - N) (Tự tham chiếu)
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'children', onDelete: 'CASCADE' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });

// 2. Người dùng & Giỏ hàng (1 - 1)
// Một người dùng có 1 giỏ hàng
User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 3. Giỏ hàng & Chi tiết giỏ hàng (1 - N)
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });

// 4. Sản phẩm & Chi tiết giỏ hàng (1 - N)
Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'cart_items' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// 5. Người dùng & Đơn hàng (1 - N)
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 6. Đơn hàng & Chi tiết đơn hàng (1 - N)
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// 7. Sản phẩm & Chi tiết đơn hàng (1 - N)
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'order_items' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Banner,
  News,
  Setting,
  Cart,
  CartItem,
  Order,
  OrderItem
};
