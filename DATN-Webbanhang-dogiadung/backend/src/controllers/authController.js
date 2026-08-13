const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models');

/**
 * Controller: Đăng Ký Tài Khoản Mới
 * Route: POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!'
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được sử dụng! Vui lòng chọn Email khác.'
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phone: phone || null,
      address: address || null,
      role: 'User'
    });

    await Cart.create({ user_id: newUser.id });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'dogiadung_secret_key_2026_super_secure',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        role: newUser.role,
        avatar: newUser.avatar
      }
    });

  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi máy chủ khi đăng ký!',
      error: error.message
    });
  }
};

/**
 * Controller: Đăng Nhập Hệ Thống
 * Route: POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ Email và Mật khẩu!'
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác!'
      });
    }

    if (!user.status) {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản của bạn đã bị khóa! Vui lòng liên hệ Quản trị viên.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác!'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dogiadung_secret_key_2026_super_secure',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi máy chủ khi đăng nhập!',
      error: error.message
    });
  }
};

/**
 * Controller: Lấy thông tin cá nhân
 * Route: GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy thông tin cá nhân!',
      error: error.message
    });
  }
};

/**
 * Controller: Cập nhật thông tin cá nhân & Upload Ảnh Avatar
 * Route: PUT /api/auth/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, avatar } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng!' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email này đã được sử dụng bởi tài khoản khác!'
        });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    // Nếu người dùng chọn file ảnh từ máy tính -> Lưu đường dẫn đầy đủ http://localhost:5000/uploads/...
    if (req.file) {
      const host = req.get('host') || 'localhost:5000';
      const protocol = req.protocol || 'http';
      user.avatar = `${protocol}://${host}/uploads/${req.file.filename}`;
    } else if (avatar) {
      user.avatar = avatar;
    }

    await user.save();

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dogiadung_secret_key_2026_super_secure',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Cập nhật hồ sơ cá nhân thành công!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Lỗi cập nhật profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật thông tin cá nhân!',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
