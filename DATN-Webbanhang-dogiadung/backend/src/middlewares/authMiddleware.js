const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware: Xác thực JWT Token từ Header gửi lên
 * Header mẫu: Authorization: Bearer <TOKEN>
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Bạn chưa đăng nhập hoặc Token không hợp lệ!'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dogiadung_secret_key_2026_super_secure');

    // Tìm thông tin người dùng từ DB theo ID trong token
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] } // Không trả về mật khẩu
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Tài khoản người dùng không tồn tại!'
      });
    }

    if (!user.status) {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản của bạn đã bị khóa!'
      });
    }

    // Đính kèm thông tin user vào request để các controller tiếp theo sử dụng
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token đã hết hạn hoặc không hợp lệ!',
      error: error.message
    });
  }
};

/**
 * Middleware: Phân quyền theo Role (SuperAdmin, Admin, Editor)
 * Trừ danh sách các role được phép truy cập
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Bạn cần đăng nhập để thực hiện thao tác này!'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Quyền hạn của bạn (${req.user.role}) không được phép thực hiện chức năng này!`
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  requireRole
};
