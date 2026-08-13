const { User } = require('../models');

/**
 * Controller: Admin Lấy Danh Sách Người Dùng (Có Phân Trang, Lọc Theo Role)
 * Route: GET /api/admin/users
 */
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { role, search } = req.query;

    const whereCondition = {};
    if (role) whereCondition.role = role;

    const { count, rows: users } = await User.findAndCountAll({
      where: whereCondition,
      attributes: { exclude: ['password'] }, // Không trả về hash password
      order: [['id', 'ASC']],
      limit,
      offset
    });

    return res.status(200).json({
      success: true,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit
      },
      data: users
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi lấy danh sách người dùng!', error: error.message });
  }
};

/**
 * Controller: Cập Nhật Thông Tin Người Dùng & Phân Quyền Role (SuperAdmin / Admin)
 * Route: PUT /api/admin/users/:id
 */
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, status } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng!' });
    }

    // Bảo vệ không cho phép tài khoản Admin thường sửa role của SuperAdmin
    if (user.role === 'SuperAdmin' && req.user.role !== 'SuperAdmin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền sửa thông tin của SuperAdmin!'
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (role) user.role = role;
    if (status !== undefined) user.status = status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Cập nhật người dùng thành công!',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật người dùng!', error: error.message });
  }
};

/**
 * Controller: Xóa Tài Khoản Người Dùng (Chỉ SuperAdmin / Admin)
 * Route: DELETE /api/admin/users/:id
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng!' });
    }

    if (user.role === 'SuperAdmin') {
      return res.status(403).json({ success: false, message: 'Không thể xóa tài khoản SuperAdmin!' });
    }

    await user.destroy();
    return res.status(200).json({ success: true, message: 'Xóa tài khoản thành công!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xóa người dùng!', error: error.message });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
  deleteUser
};
