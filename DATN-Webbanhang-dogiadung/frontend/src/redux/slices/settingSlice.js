import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  site_logo: 'GiaDungStore',
  primary_color: '#2563eb',
  show_new_products: 'true',
  show_best_products: 'true',
  show_sale_products: 'true',
  show_news_section: 'true'
};

/**
 * Slice Quản Lý Cấu Hình Giao Diện Website (Setting Slice)
 */
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    // Action cập nhật lại cấu hình cài đặt giao diện
    setSettings: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setSettings } = settingSlice.actions;
export default settingSlice.reducer;
