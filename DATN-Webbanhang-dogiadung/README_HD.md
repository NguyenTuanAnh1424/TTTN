# HƯỚNG DẪN & TỔNG HỢP TOÀN BỘ CHỨC NĂNG WEBSITE BÁN HÀNG ĐỒ GIA DỤNG

Website Bán Hàng Đồ Gia Dụng cao cấp được xây dựng trên nền tảng **ReactJS + Vite + TailwindCSS** (Frontend) và **NodeJS + ExpressJS + MySQL + Sequelize ORM** (Backend). Hệ thống được thiết kế chia thành 2 phân hệ hoàn chỉnh: **Client (Khách Hàng)** và **Admin (Quản Trị)**.

---

## 🛠️ 1. CÔNG NGHỆ SỬ DỤNG

- **Frontend:** ReactJS (Vite), React Router DOM v6, Redux Toolkit, Axios, TailwindCSS v4, Lucide Icons, Recharts (Biểu đồ).
- **Backend:** NodeJS, ExpressJS, MySQL, Sequelize ORM, JWT Authentication, bcryptjs (Mã hóa mật khẩu), Multer (Upload hình ảnh).

---

## 🛒 2. DANH SÁCH CHỨC NĂNG PHÂN HỆ CLIENT (KHÁCH HÀNG)

### 🏠 2.1. Trang Chủ (HomePage)
- **Banner Slider Quảng Cáo:** Tự động chuyển đổi hình ảnh banner khuyến mãi hot.
- **Thanh Cam Kết Chất Lượng:** Hiển thị thông tin Giao hàng toàn quốc, Hàng chính hãng 100%, Đổi trả 30 ngày, Hỗ trợ 24/7.
- **Danh Mục Nổi Bật:** Quanh danh mục sản phẩm gia dụng chính (Nồi chiên không dầu, Nồi cơm điện, Máy hút bụi, Máy lọc nước, Quạt điện...).
- **Section Sản Phẩm Mới Về (`is_new`):** Hiển thị danh sách sản phẩm mới nhập kho.
- **Section Top Bán Chạy (`is_best`):** Hiển thị các sản phẩm được ưa chuộng nhất.
- **Section Khuyến Mãi Hot (`is_sale`):** Hiển thị các sản phẩm giảm giá cực sốc.
- **Section Tin Tức & Mẹo Hay:** Các bài viết tư vấn sử dụng đồ gia dụng.
- **Động theo Cấu Hình Admin:** Các section trên Trang chủ có thể bật/tắt hiển thị linh hoạt từ trang Quản lý Giao diện của Admin.

### 🛍️ 2.2. Trang Danh Sách Sản Phẩm & Lọc Tìm Kiếm (ProductListPage)
- **Lưới Hiển Thị Sản Phẩm:** Thẻ card sản phẩm đẹp mắt với hình ảnh, giá niêm yết, giá khuyến mãi, % giảm giá và các huy hiệu (Mới, Sale, Best).
- **Tìm Kiếm Sản Phẩm:** Tìm theo từ khóa tên sản phẩm.
- **Lọc Theo Danh Mục:** Chọn xem sản phẩm thuộc danh mục cụ thể.
- **Lọc Theo Khoảng Giá:** Lọc theo các mức giá (Dưới 1 triệu, 1-3 triệu, 3-5 triệu, Trên 5 triệu).
- **Sắp Xếp Sản Phẩm:** Theo Giá (Thấp đến Cao, Cao đến Thấp), Theo Tên (A đến Z), Mới nhất.
- **Phân Trang Nâng Cao (Pagination):** Chuyển trang mượt mà (`page`, `limit`, `totalPages`, `totalItems`).

### 🔍 2.3. Trang Chi Tiết Sản Phẩm (ProductDetailPage)
- **Hiển Thị Thông Tin:** Hình ảnh sản phẩm lớn, tên, tình trạng còn hàng/hết hàng trong kho.
- **Tính Giá Khuyến Mãi:** Tự động tính phần trăm giảm giá (%) dựa trên giá niêm yết và giá sale.
- **Chọn Số Lượng Mua:** Tăng/Giảm số lượng mua (kiểm tra tồn kho trong Database).
- **Nút "Thêm Vào Giỏ Hàng" & "Mua Ngay":** Thêm nhanh vào giỏ hoặc chuyển thẳng tới trang Checkout.
- **Mô Tả Chi Tiết:** Bài viết giới thiệu tính năng và thông số sản phẩm.
- **Sản Phẩm Cùng Danh Mục:** Gợi ý các sản phẩm liên quan.

### 🛒 2.4. Trang Giỏ Hàng (CartPage)
- **Lưu Trữ Giỏ Hàng:** Tự động lưu trữ và đồng bộ giỏ hàng của từng tài khoản khách hàng trong Cơ sở dữ liệu MySQL.
- **Tăng / Giảm Số Lượng:** Thay đổi số lượng mua trực tiếp tại giỏ hàng.
- **Xóa Sản Phẩm:** Xóa từng sản phẩm khỏi giỏ hàng.
- **Tóm Tắt Đơn Hàng:** Tự động tính tạm tính, phí vận chuyển (Miễn phí) và Tổng thanh toán.

### 💳 2.5. Trang Đặt Hàng & Thanh Toán (CheckoutPage)
- **Điền Thông Tin Giao Hàng:** Họ tên người nhận, Số điện thoại, Email nhận thông báo, Địa chỉ chi tiết, Ghi chú đơn hàng.
- **Phương Thức Thanh Toán:** Thanh toán khi nhận hàng (COD).
- **An Toàn Dữ Liệu Tồn Kho:** Sử dụng **MySQL Transaction** để tự động trừ số lượng tồn kho của sản phẩm khi tạo đơn hàng thành công.
- **Tự Động Dọn Giỏ Hàng:** Xóa sạch sản phẩm trong giỏ sau khi đặt hàng.

### 🎉 2.6. Trang Thông Báo Đặt Hàng Thành Công (OrderSuccessPage)
- Hiển thị thông báo thành công, Mã đơn hàng (`#ID`), Thông tin người nhận, Tổng tiền và các liên kết chuyển hướng.

### 📦 2.7. Trang Lịch Sử Đơn Hàng Của Tôi (MyOrdersPage)
- Theo dõi danh sách tất cả các đơn hàng đã đặt của tài khoản.
- Hiển thị Badge màu sắc trạng thái realtime:
  - 🟡 **Pending**: Chờ xác nhận
  - 🔵 **Processing**: Đang xử lý
  - 🟣 **Shipping**: Đang giao hàng
  - 🟢 **Completed**: Đã hoàn thành
  - 🔴 **Cancelled**: Đã hủy
- Xem chi tiết danh sách từng món hàng trong đơn.

### 📰 2.8. Trang Tin Tức & Mẹo Hay Gia Dụng (NewsListPage & NewsDetailPage)
- Xem danh sách tất cả bài viết tư vấn kinh nghiệm sử dụng đồ gia dụng.
- Đọc chi tiết nội dung bài viết.

### 🔐 2.9. Đăng Ký / Đăng Nhập / Đăng Xuất (Auth Pages)
- **Đăng ký:** Tạo tài khoản khách hàng mới (Họ tên, Email, Mật khẩu, SĐT, Địa chỉ).
- **Đăng nhập:** Xác thực người dùng qua JWT Token, lưu thông tin vào `localStorage`.
- **Đăng xuất:** Xóa Token và chuyển hướng an toàn.
- **Dark / Light Mode:** Công tắc chuyển đổi giao diện Sáng / Tối toàn diện trên trang web.

---

## 👑 3. DANH SÁCH CHỨC NĂNG PHÂN HỆ ADMIN (QUẢN TRỊ)

### 🛡️ 3.1. Phân Quyền Vai Trò Nghiêm Ngặt (RBAC System)
- 👑 **SuperAdmin**: Toàn quyền tối cao (Quản lý User, Phân quyền Role, Cấu hình Giao diện, Toàn bộ CRUD).
- 👔 **Admin**: Quản lý Sản phẩm, Danh mục, Đơn hàng, Banner, Tin tức.
- ✍️ **Editor**: Biên tập Thêm/Sửa Sản phẩm, Banner, Tin tức.
- 🚫 **Bảo vệ Trang Admin:** Khung `AdminLayout` tự động chặn và hiển thị thông báo "Từ Chối Truy Cập (403 Forbidden)" nếu tài khoản là `User` thông thường.

### 📊 3.2. Dashboard Thống Kê Tổng Quan (AdminDashboardPage)
- **Thẻ Chỉ Số Realtime:**
  - 💵 Tổng Doanh Thu (VNĐ từ các đơn hoàn thành).
  - 🛒 Tổng Đơn Hàng.
  - 📦 Tổng Sản Phẩm đang bán.
  - 📂 Tổng Danh Mục.
  - 👥 Tổng Người Dùng đăng ký.
- **Biểu Đồ Trực Quan Recharts:** Biểu đồ cột mô phỏng chi tiết số lượng đơn hàng theo từng trạng thái (Chờ xác nhận, Đang xử lý, Đang giao, Hoàn thành, Đã hủy).
- **Bảng Đơn Hàng Mới Gần Đây:** Xem nhanh 5 đơn hàng vừa đặt từ khách.

### 📦 3.3. Quản Lý Sản Phẩm (AdminProductManager)
- **CRUD Đầy Đủ:** Thêm mới, Xem danh sách, Cập nhật và Xóa sản phẩm.
- **Upload Hình Ảnh:** Hỗ trợ Upload file ảnh trực tiếp từ máy tính lên Server Backend (lưu vào thư mục `/uploads` via Multer) hoặc nhập link URL ảnh.
- **Thông Tin Sản Phẩm:** Tên, Danh mục, Giá niêm yết, Giá sale, Số lượng tồn kho, Mô tả ngắn, Bài viết mô tả chi tiết.
- **Đánh Dấu Huy Hiệu:** Tích chọn đánh dấu sản phẩm `Mới về`, `Bán chạy`, `Giảm giá`.
- **Tìm Kiếm & Phân Trang:** Tìm theo tên và phân trang danh sách.

### 📂 3.4. Quản Lý Danh Mục (AdminCategoryManager)
- **CRUD Danh Mục:** Thêm, Sửa, Xóa danh mục đồ gia dụng.
- **Tự Động Tạo Slug SEO:** Chuyển đổi tên danh mục Tiếng Việt có dấu thành Slug chuẩn SEO (Ví dụ: `Nồi Chiên Không Dầu` -> `noi-chien-khong-dau`).

### 🛒 3.5. Quản Lý Đơn Hàng (AdminOrderManager)
- **Danh Sách Đơn Hàng:** Xem chi tiết họ tên, SĐT, email, địa chỉ giao hàng và danh sách món của khách.
- **Bộ Lọc Trạng Thái:** Lọc đơn theo các trạng thái `Pending`, `Processing`, `Shipping`, `Completed`, `Cancelled`.
- **Cập Nhật Trạng Thái:** Thay đổi trạng thái đơn hàng trực tiếp ngay tại bảng quản lý.

### 🖼️ 3.6. Quản Lý Banner Quảng Cáo (AdminBannerManager)
- **CRUD Banner:** Thêm, Sửa, Xóa banner slider trang chủ.
- Upload ảnh banner, Tiêu đề và Link liên kết chuyển hướng.

### 📰 3.7. Quản Lý Tin Tức (AdminNewsManager)
- **CRUD Bài Viết:** Thêm, Sửa, Xóa bài viết tư vấn & mẹo hay gia dụng.
- Upload ảnh đại diện bài viết, Tiêu đề, Tóm tắt và Nội dung bài viết.

### 👥 3.8. Quản Lý Người Dùng & Phân Quyền (AdminUserManager)
- **Danh Sách Tài Khoản:** Xem danh sách người dùng trong hệ thống.
- **Phân Quyền Role:** Thay đổi vai trò trực tiếp giữa `SuperAdmin`, `Admin`, `Editor`, `User`.
- **Khóa / Mở Khóa Tài Khoản:** Khóa tài khoản vi phạm hoặc mở khóa hoạt động.
- **Bảo Vệ SuperAdmin:** Không cho phép Admin thường xóa hoặc đổi quyền của tài khoản `SuperAdmin`.

### ⚙️ 3.9. Quản Lý Cấu Hình Giao Diện (AdminSettingManager)
- **Thay Đổi Logo Website:** Đổi tên/logo hiển thị trên Header và Footer.
- **Thay Đổi Màu Chủ Đạo:** Tùy chọn bảng màu Primary Color của website.
- **Bật / Ẩn Các Mục Trang Chủ:** Công tắc bật hoặc ẩn 4 khối giao diện ở trang chủ (Sản phẩm mới, Sản phẩm bán chạy, Sản phẩm giảm giá, Tin tức).

---

## ⚡ 4. HƯỚNG DẪN KHỞI CHẠY HỆ THỐNG

### Cách 1: Chạy Nhanh Bằng File `start.bat` (Khuyên Dùng)
Click đúp chuột vào file `start.bat` ở thư mục gốc. Hệ thống sẽ tự động mở 2 cửa sổ Terminal để bật cả **Backend (Port 5000)** và **Frontend (Port 3000)**.

### Cách 2: Chạy Thủ Công Qua Terminal
1. **Khởi động Backend (Port 5000):**
   ```bash
   cd backend
   npm run dev
   ```
2. **Khởi động Frontend (Port 3000):**
   ```bash
   cd frontend
   npm run dev
   ```
3. Truy cập địa chỉ Website: **http://localhost:3000**

---

## 🔑 5. DANH SÁCH TÀI KHOẢN DÙNG THỬ (SEED DATA)

Cơ sở dữ liệu MySQL đã được tự động chèn sẵn 4 tài khoản thử nghiệm:

| VAI TRÒ | EMAIL | MẬT KHẨU | GHI CHÚ |
| :--- | :--- | :--- | :--- |
| **SuperAdmin** | `superadmin@gmail.com` | `123456` | Toàn quyền Quản trị tối cao |
| **Admin** | `admin@gmail.com` | `123456` | Quản lý Sản phẩm, Đơn hàng, Danh mục |
| **Editor** | `editor@gmail.com` | `123456` | Biên tập Sản phẩm, Tin tức |
| **User (Khách)** | `user@gmail.com` | `123456` | Khách hàng mua sắm |
