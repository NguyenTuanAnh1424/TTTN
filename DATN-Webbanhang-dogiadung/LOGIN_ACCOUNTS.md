# DANH SÁCH TÀI KHOẢN ĐĂNG NHẬP (DEV MODE)

Dưới đây là danh sách tài khoản được khởi tạo tự động trong Cơ sở dữ liệu MySQL (`web_dogiadung`) dùng để kiểm tra hệ thống:

---

| VAI TRÒ | EMAIL | MẬT KHẨU | QUYỀN HẠN & TRANG ĐẾN |
| :--- | :--- | :--- | :--- |
| **SuperAdmin** | `superadmin@gmail.com` | `123456` | Toàn quyền hệ thống (Quản lý User, Giao diện, Sản phẩm, Đơn hàng...). |
| **Admin** | `admin@gmail.com` | `123456` | Quản lý Sản phẩm, Danh mục, Đơn hàng, Banner, Tin tức. |
| **Editor** | `editor@gmail.com` | `123456` | Thêm/Sửa Sản phẩm, Banner, Tin tức (Không quản lý User & Settings). |
| **User (Khách)** | `user@gmail.com` | `123456` | Khách hàng mua sắm, đặt hàng Checkout, xem Giỏ hàng & Đơn hàng của tôi. |

---

### 💡 Hướng dẫn chạy nhanh dự án:
1. Chạy **Backend** (NodeJS Express MySQL):
   ```bash
   cd backend
   npm run dev
   ```
2. Chạy **Frontend** (ReactJS Vite):
   ```bash
   cd frontend
   npm run dev
   ```
