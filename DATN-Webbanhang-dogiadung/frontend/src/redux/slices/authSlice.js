import { createSlice } from '@reduxjs/toolkit';

// Lấy thông tin user và token đã lưu trong localStorage nếu có
const token = localStorage.getItem('token') || null;
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null
};

/**
 * Slice Quản Lý Trạng Thái Đăng Nhập & Người Dùng (Auth Slice)
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action khi Đăng nhập thành công
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      // Lưu thông tin vào bộ nhớ trình duyệt
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    // Action khi Đăng xuất
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Xóa thông tin khỏi localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    // Action cập nhật thông tin User Profile
    updateUserSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }
});

export const { loginSuccess, logout, updateUserSuccess } = authSlice.actions;
export default authSlice.reducer;
