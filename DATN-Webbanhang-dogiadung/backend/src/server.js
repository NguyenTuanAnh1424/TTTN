// Nạp các biến môi trường từ .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, sequelize } = require('./config/database');
const seedDatabase = require('./seeders/seedData');
const apiRoutes = require('./routes');
const sepayRoutes = require('./routes/sepayRoutes');

// Khởi tạo ứng dụng ExpressJS
const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình Middleware CORS cho phép Frontend truy cập API
app.use(cors({
  origin: '*', // Cho phép kết nối từ mọi tên miền trong giai đoạn phát triển
  credentials: true
}));

// Middleware đọc dữ liệu JSON và URL-encoded gửi lên trong Body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình thư mục tĩnh 'uploads' để khách hàng/admin xem được ảnh sản phẩm/banner đã upload
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route kiểm tra trạng thái hoạt động của Backend (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend NodeJS Express cho Website Gia Dụng đang chạy ổn định!',
    timestamp: new Date()
  });
});

// Gắn toàn bộ các API Routes vào tiền tố '/api'
app.use('/api', apiRoutes);
// Gắn routes SePay vào prefix /api/sepay
app.use('/api/sepay', sepayRoutes);

/**
 * Hàm khởi chạy Server Backend và đồng bộ Cơ sở dữ liệu MySQL
 */
const startServer = async () => {
  try {
    // 1. Kiểm tra kết nối MySQL
    await connectDB();

    // 2. Đồng bộ hóa cấu trúc Models với các bảng trong MySQL Database
    // alter: true sẽ tự động cập nhật/tạo bảng mới mà không xóa dữ liệu cũ
    await sequelize.sync();
    console.log('🔄 Đã đồng bộ cấu trúc tất cả Bảng (Tables) vào MySQL Database!');

    // 3. Khởi tạo dữ liệu mẫu (Admin, Categories, Products, Banners, News, Settings)
    await seedDatabase();

    // 4. Lắng nghe yêu cầu kết nối từ Cổng (PORT)
    app.listen(PORT, () => {
      console.log(`🚀 Backend Server đang khởi chạy thành công tại địa chỉ: http://localhost:${PORT}`);
      console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Thất bại khi khởi động Server:', error);
  }
};

startServer();
