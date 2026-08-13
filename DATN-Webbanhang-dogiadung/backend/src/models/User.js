const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * Model Người Dùng (Users)
 * Quản lý tài khoản khách hàng và ban quản trị (SuperAdmin, Admin, Editor, User)
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Khóa chính tự tăng'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Họ và tên người dùng'
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    comment: 'Địa chỉ Email (Dùng để đăng nhập)'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Mật khẩu đã được mã hóa bằng bcrypt'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'Số điện thoại liên hệ'
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Địa chỉ giao hàng mặc định'
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: '/uploads/default-avatar.png',
    comment: 'Đường dẫn ảnh đại diện'
  },
  role: {
    type: DataTypes.ENUM('SuperAdmin', 'Admin', 'Editor', 'User'),
    defaultValue: 'User',
    comment: 'Phân quyền người dùng: SuperAdmin (Toàn quyền), Admin (Quản trị), Editor (Biên tập), User (Khách)'
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Trạng thái tài khoản: true (Hoạt động), false (Bị khóa)'
  }
}, {
  tableName: 'users',
  hooks: {
    // Tự động mã hóa mật khẩu trước khi lưu vào CSDL khi Tạo mới người dùng
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    // Tự động mã hóa mật khẩu trước khi lưu khi Cập nhật mật khẩu
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

/**
 * Phương thức kiểm tra mật khẩu khớp với hash trong DB
 */
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
