import { createSlice } from '@reduxjs/toolkit';

// Kiểm tra chế độ Dark Mode từ localStorage hoặc cấu hình hệ thống
const savedTheme = localStorage.getItem('theme');
const isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

// Thêm class 'dark' vào thẻ <html> nếu bật Dark Mode
if (isDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

/**
 * Slice Quản Lý Chuyển Đổi Dark / Light Mode (Theme Slice)
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: isDark
  },
  reducers: {
    // Action bật/tắt công tắc Dark Mode
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
