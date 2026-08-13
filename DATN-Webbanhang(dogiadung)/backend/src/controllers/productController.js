const { Product, Category } = require('../models');
const { Op } = require('sequelize');

/**
 * Hàm chuyển đổi chuỗi Tiếng Việt thành Slug chuẩn SEO
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Controller: Lấy danh sách Sản phẩm (Hỗ trợ Phân trang, Tìm kiếm, Lọc danh mục, Lọc giá, Sắp xếp)
 * Route: GET /api/products
 * Query Params: page, limit, search, category_id, min_price, max_price, sort, is_new, is_sale, is_best
 */
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const { search, category_id, min_price, max_price, sort, is_new, is_sale, is_best } = req.query;

    // Xây dựng điều kiện lọc (Where condition)
    const whereCondition = {};

    // 1. Tìm kiếm theo tên sản phẩm
    if (search) {
      whereCondition.name = { [Op.like]: `%${search.trim()}%` };
    }

    // 2. Lọc theo danh mục
    if (category_id) {
      // Tìm xem danh mục này có danh mục con không
      const category = await Category.findByPk(category_id, {
        include: [{ model: Category, as: 'children' }]
      });
      
      if (category && category.children && category.children.length > 0) {
        // Lấy danh sách ID của danh mục cha VÀ tất cả danh mục con
        const catIds = [category.id, ...category.children.map(c => c.id)];
        whereCondition.category_id = { [Op.in]: catIds };
      } else {
        whereCondition.category_id = category_id;
      }
    }

    // 3. Lọc theo khoảng giá (min_price -> max_price)
    if (min_price || max_price) {
      whereCondition.price = {};
      if (min_price) whereCondition.price[Op.gte] = parseFloat(min_price);
      if (max_price) whereCondition.price[Op.lte] = parseFloat(max_price);
    }

    // 4. Lọc theo các cờ đặc biệt (Sản phẩm mới, giảm giá, bán chạy)
    if (is_new === 'true' || is_new === true) whereCondition.is_new = true;
    if (is_sale === 'true' || is_sale === true) whereCondition.is_sale = true;
    if (is_best === 'true' || is_best === true) whereCondition.is_best = true;

    // 5. Cấu hình tiêu chí Sắp xếp (Sorting)
    let order = [['id', 'DESC']]; // Mặc định sản phẩm mới nhất lên đầu
    if (sort === 'price_asc') {
      order = [[sequelize.literal('CASE WHEN sale_price > 0 THEN sale_price ELSE price END'), 'ASC']];
    } else if (sort === 'price_desc') {
      order = [[sequelize.literal('CASE WHEN sale_price > 0 THEN sale_price ELSE price END'), 'DESC']];
    } else if (sort === 'name_asc') {
      order = [['name', 'ASC']];
    } else if (sort === 'name_desc') {
      order = [['name', 'DESC']];
    }
    else if (sort === 'oldest') order = [['id', 'ASC']];

    // Truy vấn dữ liệu có Phân trang và Đếm tổng số bản ghi
    const { count, rows: products } = await Product.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ],
      order,
      limit,
      offset,
      distinct: true
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        limit
      },
      data: products
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách sản phẩm:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy danh sách sản phẩm!',
      error: error.message
    });
  }
};

/**
 * Controller: Lấy Chi Tiết 1 Sản Phẩm + Sản Phẩm Liên Quan
 * Route: GET /api/products/:id
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm yêu cầu!'
      });
    }

    // Lấy 4 sản phẩm liên quan cùng Danh mục
    const relatedProducts = await Product.findAll({
      where: {
        category_id: product.category_id,
        id: { [Op.ne]: product.id } // Loại trừ sản phẩm hiện tại
      },
      limit: 4
    });

    return res.status(200).json({
      success: true,
      data: product,
      relatedProducts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy chi tiết sản phẩm!',
      error: error.message
    });
  }
};

/**
 * Controller: Thêm Sản Phẩm Mới (Hỗ trợ upload ảnh via Multer)
 * Route: POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      name,
      price,
      sale_price,
      quantity,
      description,
      short_description,
      is_new,
      is_sale,
      is_best,
      image_url
    } = req.body;

    if (!name || !category_id || !price) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ Tên sản phẩm, Danh mục và Giá niêm yết!'
      });
    }

    // Xác định đường dẫn ảnh: Nếu có file upload từ Multer thì lấy path file, ngược lại dùng image_url truyền từ body
    let imagePath = '/uploads/default-product.png';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (image_url) {
      imagePath = image_url;
    }

    const slug = slugify(name) + '-' + Date.now().toString().slice(-4);

    const product = await Product.create({
      category_id: parseInt(category_id),
      name,
      slug,
      image: imagePath,
      price: parseFloat(price),
      sale_price: sale_price ? parseFloat(sale_price) : 0,
      quantity: quantity ? parseInt(quantity) : 0,
      short_description: short_description || '',
      description: description || '',
      is_new: is_new === 'true' || is_new === true,
      is_sale: is_sale === 'true' || is_sale === true,
      is_best: is_best === 'true' || is_best === true
    });

    return res.status(201).json({
      success: true,
      message: 'Thêm mới sản phẩm thành công!',
      data: product
    });
  } catch (error) {
    console.error('Lỗi thêm sản phẩm:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi thêm mới sản phẩm!',
      error: error.message
    });
  }
};

/**
 * Controller: Cập nhật Sản Phẩm
 * Route: PUT /api/products/:id
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      name,
      price,
      sale_price,
      quantity,
      description,
      short_description,
      is_new,
      is_sale,
      is_best,
      image_url,
      status
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm cần cập nhật!'
      });
    }

    if (category_id) product.category_id = parseInt(category_id);
    if (name) {
      product.name = name;
      product.slug = slugify(name);
    }
    if (price !== undefined) product.price = parseFloat(price);
    if (sale_price !== undefined) product.sale_price = parseFloat(sale_price);
    if (quantity !== undefined) product.quantity = parseInt(quantity);
    if (short_description !== undefined) product.short_description = short_description;
    if (description !== undefined) product.description = description;
    if (status !== undefined) product.status = status;

    if (is_new !== undefined) product.is_new = is_new === 'true' || is_new === true;
    if (is_sale !== undefined) product.is_sale = is_sale === 'true' || is_sale === true;
    if (is_best !== undefined) product.is_best = is_best === 'true' || is_best === true;

    // Cập nhật ảnh nếu upload file mới hoặc gửi link ảnh mới
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    } else if (image_url) {
      product.image = image_url;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Cập nhật sản phẩm thành công!',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật sản phẩm!',
      error: error.message
    });
  }
};

/**
 * Controller: Xóa Sản Phẩm
 * Route: DELETE /api/products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm cần xóa!'
      });
    }

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: 'Xóa sản phẩm thành công!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi xóa sản phẩm!',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
