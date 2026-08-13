// Nạp các biến môi trường từ file .env
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize kết nối tới MySQL Local
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Tắt log SQL để terminal sạch hơn
    timezone: '+07:00',
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

/**
 * Hàm kiểm tra kết nối Database
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối thành công đến Cơ sở dữ liệu MySQL!');
  } catch (error) {
    console.error('❌ Thất bại khi kết nối Cơ sở dữ liệu:', error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };