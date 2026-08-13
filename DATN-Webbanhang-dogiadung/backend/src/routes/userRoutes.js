const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

/**
 * BỘ ROUTE ADMIN QUẢN LÝ NGƯỜI DÙNG & PHÂN QUYỀN (Chỉ dành riêng cho SuperAdmin)
 */
router.get('/', verifyToken, requireRole('SuperAdmin'), getUsers);
router.put('/:id', verifyToken, requireRole('SuperAdmin'), updateUserRole);
router.delete('/:id', verifyToken, requireRole('SuperAdmin'), deleteUser);

module.exports = router;
