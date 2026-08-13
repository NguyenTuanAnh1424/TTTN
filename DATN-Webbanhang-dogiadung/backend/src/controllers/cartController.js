const { Cart, CartItem, Product } = require('../models');

/**
 * Controller: Lấy Giỏ Hàng Của Người Dùng Đang Đăng Nhập
 * Route: GET /api/cart
 */
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Tìm giỏ hàng của user (Nếu chưa có thì tự động tạo)
    let [cart] = await Cart.findOrCreate({
      where: { user_id: userId }
    });

    // Lấy chi tiết danh sách sản phẩm trong giỏ kèm thông tin sản phẩm
    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'image', 'price', 'sale_price', 'quantity']
        }
      ]
    });

    // Tính tổng tiền giỏ hàng
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product ? (item.product.sale_price > 0 ? item.product.sale_price : item.product.price) : 0;
      return sum + (price * item.quantity);
    }, 0);

    return res.status(200).json({
      success: true,
      cartId: cart.id,
      totalPrice,
      items: cartItems
    });
  } catch (error) {
    console.error('Lỗi lấy giỏ hàng:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi lấy giỏ hàng!',
      error: error.message
    });
  }
};

/**
 * Controller: Thêm Sản Phẩm Vào Giỏ Hàng
 * Route: POST /api/cart/add
 */
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    const qty = parseInt(quantity) || 1;

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại!' });
    }

    // Lấy hoặc tạo giỏ hàng cho user
    const [cart] = await Cart.findOrCreate({ where: { user_id: userId } });

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id }
    });

    if (cartItem) {
      // Nếu đã có thì cộng dồn số lượng
      cartItem.quantity += qty;
      await cartItem.save();
    } else {
      // Nếu chưa có thì tạo item mới trong giỏ
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id,
        quantity: qty
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Đã thêm sản phẩm vào giỏ hàng thành công!',
      data: cartItem
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi thêm sản phẩm vào giỏ hàng!',
      error: error.message
    });
  }
};

/**
 * Controller: Cập Nhật Số Lượng Item Trong Giỏ Hàng
 * Route: PUT /api/cart/items/:id
 */
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: 'Số lượng phải lớn hơn 0!' });
    }

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Mục trong giỏ hàng không tồn tại!' });
    }

    cartItem.quantity = qty;
    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: 'Cập nhật số lượng thành công!',
      data: cartItem
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi cập nhật số lượng giỏ hàng!',
      error: error.message
    });
  }
};

/**
 * Controller: Xóa 1 Sản Phẩm Khỏi Giỏ Hàng
 * Route: DELETE /api/cart/items/:id
 */
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Mục trong giỏ hàng không tồn tại!' });
    }

    await cartItem.destroy();

    return res.status(200).json({
      success: true,
      message: 'Đã xóa sản phẩm khỏi giỏ hàng!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi xóa sản phẩm khỏi giỏ hàng!',
      error: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
};
