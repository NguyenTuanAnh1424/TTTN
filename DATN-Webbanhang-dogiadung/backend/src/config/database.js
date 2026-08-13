// Nạp các biến môi trường từ file .env
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize kết nối tới PostgreSQL (sử dụng DATABASE_URL trên Render)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Bắt buộc cho PostgreSQL trên Render
    }
  },
  logging: false, // Tắt log SQL để terminal sạch hơn
  timezone: '+07:00',
  define: {
    timestamps: true,
    underscored: true
  }
});

/**
 * Hàm kiểm tra kết nối Database
 */
const connectDB = async () => {
  try {
    // Chỉ cần xác thực kết nối là đủ với Sequelize + Postgres
    await sequelize.authenticate();
    console.log('✅ Kết nối thành công đến Cơ sở dữ liệu PostgreSQL!');
  } catch (error) {
    console.error('❌ Thất bại khi kết nối Cơ sở dữ liệu:', error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };