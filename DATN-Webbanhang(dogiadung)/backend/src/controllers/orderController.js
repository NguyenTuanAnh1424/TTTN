const { Order, OrderItem, Cart, CartItem, Product, User, sequelize } = require('../models');

/**
 * Controller: Đặt Hàng Mới (Checkout)
 * Route: POST /api/orders
 */
const createOrder = async (req, res) => {
  // Dùng Transaction để đảm bảo tính toàn vẹn dữ liệu khi tạo đơn & trừ tồn kho
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user ? req.user.id : null;
    const { customer_name, customer_email, customer_phone, shipping_address, payment_method, note, items } = req.body;

    if (!customer_name || !customer_email || !customer_phone || !shipping_address) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ Thông tin người nhận, Email, Số điện thoại và Địa chỉ giao hàng!'
      });
    }

    let orderItemsToCreate = [];
    let totalAmount = 0;

    // Trường hợp 1: Đặt hàng từ mảng `items` truyền lên trực tiếp
    if (items && Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        const product = await Product.findByPk(item.product_id, { transaction });
        if (!product) {
          await transaction.rollback();
          return res.status(400).json({ success: false, message: `Sản phẩm ID ${item.product_id} không tồn tại!` });
        }

        if (product.quantity < item.quantity) {
          await transaction.rollback();
          return res.status(400).json({
            success: false,
            message: `Sản phẩm "${product.name}" chỉ còn ${product.quantity} sản phẩm trong kho!`
          });
        }

        const price = product.sale_price > 0 ? product.sale_price : product.price;
        totalAmount += price * item.quantity;

        orderItemsToCreate.push({
          product_id: product.id,
          price: price,
          quantity: item.quantity
        });

        // Trừ tồn kho
        product.quantity -= item.quantity;
        await product.save({ transaction });
      }
    } 
    // Trường hợp 2: Lấy sản phẩm từ Giỏ hàng người dùng
    else if (userId) {
      const cart = await Cart.findOne({ where: { user_id: userId }, transaction });
      if (!cart) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Giỏ hàng của bạn đang trống!' });
      }

      const cartItems = await CartItem.findAll({
        where: { cart_id: cart.id },
        include: [{ model: Product, as: 'product' }],
        transaction
      });

      if (cartItems.length === 0) {
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Giỏ hàng của bạn đang trống!' });
      }

      for (const cItem of cartItems) {
        const product = cItem.product;
        if (!product || product.quantity < cItem.quantity) {
          await transaction.rollback();
          return res.status(400).json({
            success: false,
            message: `Sản phẩm "${product ? product.name : 'Unknown'}" không đủ số lượng tồn kho!`
          });
        }

        const price = product.sale_price > 0 ? product.sale_price : product.price;
        totalAmount += price * cItem.quantity;

        orderItemsToCreate.push({
          product_id: product.id,
          price: price,
          quantity: cItem.quantity
        });

        // Trừ tồn kho
        product.quantity -= cItem.quantity;
        await product.save({ transaction });
      }

      // Xóa sạch giỏ hàng sau khi đã chèn vào đơn hàng
      await CartItem.destroy({ where: { cart_id: cart.id }, transaction });
    } else {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Không có sản phẩm nào để đặt hàng!' });
    }

    // Tạo đơn hàng chính (Order)
    const newOrder = await Order.create({
      user_id: userId,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      total_amount: totalAmount,
      payment_method: payment_method || 'COD',
      note: note || '',
      status: 'Pending'
    }, { transaction });

    // Tạo danh sách Chi tiết đơn hàng (OrderItems)
    const itemsWithOrderId = orderItemsToCreate.map(item => ({
      ...item,
      order_id: newOrder.id
    }));
    await OrderItem.bulkCreate(itemsWithOrderId, { transaction });

    // Commit Transaction thành công
    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công! Mã đơn hàng của bạn là #' + newOrder.id,
      data: newOrder
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Lỗi đặt hàng:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi tạo đơn hàng!',
      error: error.message
    });
  }
};

/**
 * Controller: Khách Hàng Xem Lịch Sử Đơn Hàng Của Mình
 * Route: GET /api/orders/my-orders
 */
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'image'] }]
        }
      ],
      order: [['id', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy danh sách đơn hàng cá nhân!',
      error: error.message
    });
  }
};

/**
 * Controller: Xem Chi Tiết 1 Đơn Hàng Theo ID
 * Route: GET /api/orders/:id
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng!' });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi chi tiết đơn hàng!',
      error: error.message
    });
  }
};

/**
 * Controller: Admin Lấy Toàn Bộ Đơn Hàng (Phân trang, Lọc trạng thái)
 * Route: GET /api/admin/orders
 */
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { status, search } = req.query;

    const whereCondition = {};
    if (status) whereCondition.status = status;

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'image'] }]
        }
      ],
      order: [['id', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    return res.status(200).json({
      success: true,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit
      },
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy danh sách đơn hàng quản trị!',
      error: error.message
    });
  }
};

/**
 * Controller: Admin Cập Nhật Trạng Thái Đơn Hàng (Pending -> Processing -> Shipping -> Completed / Cancelled)
 * Route: PUT /api/admin/orders/:id/status
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái đơn hàng không hợp lệ!'
      });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng!' });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: `Đã cập nhật trạng thái đơn hàng #${id} thành: ${status}`,
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật trạng thái đơn hàng!',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};
