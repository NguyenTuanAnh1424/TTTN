const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

/**
 * ===================================================
 * BỘ ROUTE QUẢN LÝ DANH MỤC SẢN PHẨM (CATEGORIES)
 * ===================================================
 */

// Route xem danh sách tất cả danh mục (Công khai cho mọi khách hàng)
router.get('/', getCategories);

// Route xem chi tiết 1 danh mục (Công khai)
router.get('/:id', getCategoryById);

// Route tạo danh mục mới (Yêu cầu đăng nhập & quyền Editor, Admin, SuperAdmin)
router.post('/', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), createCategory);

// Route cập nhật danh mục (Yêu cầu đăng nhập & quyền Editor, Admin, SuperAdmin)
router.put('/:id', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), updateCategory);

// Route xóa danh mục (Yêu cầu đăng nhập & quyền Admin, SuperAdmin)
router.delete('/:id', verifyToken, requireRole('Admin', 'SuperAdmin'), deleteCategory);

module.exports = router;
