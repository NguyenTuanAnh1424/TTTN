const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * ===================================================
 * BỘ ROUTE QUẢN LÝ SẢN PHẨM (PRODUCTS)
 * ===================================================
 */

// Route lấy danh sách sản phẩm (Công khai, hỗ trợ lọc, phân trang)
router.get('/', getProducts);

// Route lấy chi tiết 1 sản phẩm (Công khai)
router.get('/:id', getProductById);

// Route tạo sản phẩm mới (Có hỗ trợ Upload ảnh qua field 'image')
router.post('/', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), upload.single('image'), createProduct);

// Route cập nhật sản phẩm (Có hỗ trợ Upload ảnh mới)
router.put('/:id', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), upload.single('image'), updateProduct);

// Route xóa sản phẩm (Chỉ Admin / SuperAdmin)
router.delete('/:id', verifyToken, requireRole('Admin', 'SuperAdmin'), deleteProduct);

module.exports = router;
