const { Product, Category, Order, User, sequelize } = require('../models');

/**
 * Controller: Lấy Thống Kê Tổng Quan & Dữ Liệu Biểu Đồ Cho Admin Dashboard
 * Route: GET /api/admin/dashboard/stats
 */
const getDashboardStats = async (req, res) => {
  try {
    // 1. Thống kê tổng số lượng các thực thể
    const totalProducts = await Product.count();
    const totalCategories = await Category.count();
    const totalOrders = await Order.count();
    const totalUsers = await User.count();

    // 2. Tính tổng doanh thu từ các đơn hàng hoàn thành (Status = 'Completed')
    const totalRevenueResult = await Order.sum('total_amount', {
      where: { status: 'Completed' }
    });
    const totalRevenue = totalRevenueResult || 0;

    // 3. Thống kê số lượng đơn hàng theo từng trạng thái (Pending, Processing, Shipping, Completed, Cancelled)
    const ordersByStatus = await Order.findAll({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status']
    });

    // 4. Lấy 5 đơn hàng mới nhất
    const recentOrders = await Order.findAll({
      order: [['id', 'DESC']],
      limit: 5,
      attributes: ['id', 'customer_name', 'total_amount', 'status', 'created_at']
    });

    return res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalOrders,
        totalUsers,
        totalRevenue,
        ordersByStatus,
        recentOrders
      }
    });
  } catch (error) {
    console.error('Lỗi thống kê Dashboard:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy thông tin thống kê Dashboard!',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};
