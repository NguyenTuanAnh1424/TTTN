import axios from 'axios';

/**
 * Khởi tạo Instance Axios kết nối tới Backend NodeJS Express (PORT 5000)
 */
const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api' // Địa chỉ Backend API
});

/**
 * Interceptor trước khi gửi Request: Tự động đính kèm JWT Token từ localStorage nếu có
 * Tự động chuyển đổi Header cho FormData khi upload file ảnh
 */
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Nếu gửi FormData (upload file) -> Xóa Content-Type để Trình duyệt tự sinh boundary multipart/form-data
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor sau khi nhận Response: Xử lý dữ liệu hoặc bắt lỗi toàn cục
 */
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default axiosClient;
