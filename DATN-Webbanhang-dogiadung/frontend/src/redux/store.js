import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';
import settingReducer from './slices/settingSlice';

/**
 * Khởi tạo Redux Store tổng hợp toàn bộ Slices trong ứng dụng
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    cart: cartReducer,
    setting: settingReducer
  }
});
