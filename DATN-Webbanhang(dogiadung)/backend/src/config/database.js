// Nạp các biến môi trường từ file .env
require('dotenv').config();

const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const DB_NAME = process.env.DB_NAME || 'web_dogiadung';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;

/**
 * Khởi tạo đối tượng Sequelize kết nối tới MySQL
 */
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  timezone: '+07:00',
  define: {
    timestamps: true,
    underscored: true
  }
});

/**
 * Hàm tự động tạo Database nếu chưa tồn tại & Kiểm tra kết nối MySQL
 */
const connectDB = async () => {
  try {
    // 1. Kết nối tạm vào MySQL Server (không chỉ định db) để tạo CSDL nếu chưa có
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.end();

    // 2. Kết nối CSDL thông qua Sequelize
    await sequelize.authenticate();
    console.log(`✅ Kết nối thành công đến Cơ sở dữ liệu MySQL (${DB_NAME})!`);
  } catch (error) {
    console.error('❌ Thất bại khi kết nối Cơ sở dữ liệu MySQL:', error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };
