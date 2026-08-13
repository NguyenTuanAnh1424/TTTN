import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0
};

/**
 * Slice Quản Lý Giỏ Hàng Frontend (Cart Slice)
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action thiết lập toàn bộ danh sách giỏ hàng (Sau khi fetch API thành công)
    setCartData: (state, action) => {
      state.items = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    // Action thêm 1 item cục bộ
    addToCartLocal: (state, action) => {
      const existing = state.items.find(i => i.product_id === action.payload.product_id);
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    // Action dọn sạch giỏ hàng
    clearCartLocal: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    }
  }
});

export const { setCartData, addToCartLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
