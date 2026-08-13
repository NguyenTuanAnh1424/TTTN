const express = require('express');
const router = express.Router();
const { getNews, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * BỘ ROUTE QUẢN LÝ TIN TỨC
 */
router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), upload.single('image'), createNews);
router.put('/:id', verifyToken, requireRole('Editor', 'Admin', 'SuperAdmin'), upload.single('image'), updateNews);
router.delete('/:id', verifyToken, requireRole('Admin', 'SuperAdmin'), deleteNews);

module.exports = router;
