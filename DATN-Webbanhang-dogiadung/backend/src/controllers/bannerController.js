const { Banner } = require('../models');

/**
 * Controller: Lấy danh sách Banner trang chủ
 * Route: GET /api/banners
 */
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [['id', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: banners
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy danh sách Banner!',
      error: error.message
    });
  }
};

/**
 * Controller: Thêm mới Banner
 * Route: POST /api/banners
 */
const createBanner = async (req, res) => {
  try {
    const { title, link, status, image_url } = req.body;

    let imagePath = '';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (image_url) {
      imagePath = image_url;
    }

    if (!title || !imagePath) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp Tiêu đề và Hình ảnh Banner!'
      });
    }

    const banner = await Banner.create({
      title,
      image: imagePath,
      link: link || '#',
      status: status !== undefined ? (status === 'true' || status === true) : true
    });

    return res.status(201).json({
      success: true,
      message: 'Thêm mới Banner thành công!',
      data: banner
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi thêm mới Banner!',
      error: error.message
    });
  }
};

/**
 * Controller: Cập nhật Banner
 * Route: PUT /api/banners/:id
 */
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, status, image_url } = req.body;

    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy Banner!' });
    }

    if (title) banner.title = title;
    if (link !== undefined) banner.link = link;
    if (status !== undefined) banner.status = status === 'true' || status === true;

    if (req.file) {
      banner.image = `/uploads/${req.file.filename}`;
    } else if (image_url) {
      banner.image = image_url;
    }

    await banner.save();

    return res.status(200).json({
      success: true,
      message: 'Cập nhật Banner thành công!',
      data: banner
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật Banner!',
      error: error.message
    });
  }
};

/**
 * Controller: Xóa Banner
 * Route: DELETE /api/banners/:id
 */
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy Banner!' });
    }

    await banner.destroy();
    return res.status(200).json({ success: true, message: 'Xóa Banner thành công!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi xóa Banner!', error: error.message });
  }
};

module.exports = {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner
};
