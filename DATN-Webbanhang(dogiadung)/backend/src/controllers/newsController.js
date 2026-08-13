const { News } = require('../models');

/**
 * Hàm tạo Slug cho bài viết
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
 * Controller: Lấy danh sách Bài viết Tin Tức (Có phân trang)
 * Route: GET /api/news
 */
const getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows: newsList } = await News.findAndCountAll({
      where: { status: true },
      order: [['id', 'DESC']],
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
      data: newsList
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi lấy danh sách tin tức!', error: error.message });
  }
};

/**
 * Controller: Xem Chi Tiết 1 Bài Viết
 * Route: GET /api/news/:id
 */
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết!' });
    }

    return res.status(200).json({ success: true, data: news });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xem tin tức!', error: error.message });
  }
};

/**
 * Controller: Thêm Bài Viết Mới
 * Route: POST /api/news
 */
const createNews = async (req, res) => {
  try {
    const { title, summary, content, status, image_url } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền Tiêu đề và Nội dung bài viết!' });
    }

    let imagePath = '/uploads/default-news.png';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (image_url) {
      imagePath = image_url;
    }

    const slug = slugify(title) + '-' + Date.now().toString().slice(-4);

    const news = await News.create({
      title,
      slug,
      image: imagePath,
      summary: summary || '',
      content,
      status: status !== undefined ? (status === 'true' || status === true) : true
    });

    return res.status(201).json({ success: true, message: 'Thêm bài viết mới thành công!', data: news });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi thêm bài viết!', error: error.message });
  }
};

/**
 * Controller: Cập nhật Bài Viết
 * Route: PUT /api/news/:id
 */
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, status, image_url } = req.body;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết!' });
    }

    if (title) {
      news.title = title;
      news.slug = slugify(title);
    }
    if (summary !== undefined) news.summary = summary;
    if (content !== undefined) news.content = content;
    if (status !== undefined) news.status = status === 'true' || status === true;

    if (req.file) {
      news.image = `/uploads/${req.file.filename}`;
    } else if (image_url) {
      news.image = image_url;
    }

    await news.save();

    return res.status(200).json({ success: true, message: 'Cập nhật bài viết thành công!', data: news });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật bài viết!', error: error.message });
  }
};

/**
 * Controller: Xóa Bài Viết
 * Route: DELETE /api/news/:id
 */
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết!' });
    }

    await news.destroy();
    return res.status(200).json({ success: true, message: 'Xóa bài viết thành công!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xóa bài viết!', error: error.message });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
};
