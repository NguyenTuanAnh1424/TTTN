const { Category, Product } = require('../models');

/**
 * Hàm chuyển đổi chuỗi Tiếng Việt thành Slug chuẩn SEO
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Controller: Lấy danh sách tất cả Danh Mục
 * Route: GET /api/categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { parent_id: null },
      include: [{ model: Category, as: 'children' }],
      order: [['id', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy danh sách danh mục!',
      error: error.message
    });
  }
};

/**
 * Controller: Lấy chi tiết 1 Danh Mục theo ID hoặc Slug
 * Route: GET /api/categories/:id
 */
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục yêu cầu!'
      });
    }

    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy thông tin danh mục!',
      error: error.message
    });
  }
};

/**
 * Controller: Thêm mới Danh Mục (Dành cho Admin / Editor)
 * Route: POST /api/categories
 */
const createCategory = async (req, res) => {
  try {
    const { name, description, status, parent_id } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Tên danh mục không được để trống!'
      });
    }

    const slug = slugify(name);

    // Kiểm tra tên hoặc slug trùng lặp
    const existing = await Category.findOne({ where: { slug } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Danh mục này đã tồn tại!'
      });
    }

    const category = await Category.create({
      name,
      slug,
      description: description || null,
      status: status !== undefined ? status : true,
      parent_id: parent_id || null
    });

    return res.status(201).json({
      success: true,
      message: 'Thêm danh mục mới thành công!',
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi thêm danh mục!',
      error: error.message
    });
  }
};

/**
 * Controller: Cập nhật Danh Mục (Admin / Editor)
 * Route: PUT /api/categories/:id
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, parent_id } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục cần sửa!'
      });
    }

    if (name) {
      category.name = name;
      category.slug = slugify(name);
    }
    if (description !== undefined) category.description = description;
    if (status !== undefined) category.status = status;
    if (parent_id !== undefined) category.parent_id = parent_id || null;

    await category.save();

    return res.status(200).json({
      success: true,
      message: 'Cập nhật danh mục thành công!',
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật danh mục!',
      error: error.message
    });
  }
};

/**
 * Controller: Xóa Danh Mục (Chỉ Admin / SuperAdmin)
 * Route: DELETE /api/categories/:id
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục cần xóa!'
      });
    }

    await category.destroy();

    return res.status(200).json({
      success: true,
      message: 'Xóa danh mục thành công!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi xóa danh mục!',
      error: error.message
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
