const { Setting } = require('../models');

/**
 * Controller: Lấy Danh Sách Cấu Hình Giao Diện Trang Chủ
 * Route: GET /api/settings
 */
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    // Chuyển đổi thành Object dạng Key - Value để Frontend sử dụng tiện lợi
    const settingsObject = {};
    settings.forEach(item => {
      settingsObject[item.key_name] = item.key_value;
    });

    return res.status(200).json({
      success: true,
      data: settingsObject,
      list: settings
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi lấy cấu hình giao diện!', error: error.message });
  }
};

/**
 * Controller: Cập Nhật Cấu Hình Giao Diện (Admin / SuperAdmin)
 * Route: PUT /api/settings
 * Body: { site_logo, primary_color, show_new_products, show_best_products, show_sale_products, show_news_section }
 */
const updateSettings = async (req, res) => {
  try {
    const settingsMap = req.body;

    for (const [key, value] of Object.entries(settingsMap)) {
      await Setting.upsert({
        key_name: key,
        key_value: String(value)
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cập nhật cấu hình giao diện thành công!'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật cấu hình giao diện!', error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
