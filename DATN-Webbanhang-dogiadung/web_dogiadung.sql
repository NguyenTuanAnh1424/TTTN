-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 13, 2026 lúc 07:29 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web_dogiadung`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Tiêu đề banner (VD: Khuyến mãi Hè Bùng Nổ)',
  `image` varchar(255) NOT NULL COMMENT 'Đường dẫn ảnh banner',
  `link` varchar(255) DEFAULT '#' COMMENT 'Đường dẫn khi click vào banner',
  `status` tinyint(1) DEFAULT 1 COMMENT 'Trạng thái ẩn/hiện banner',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `banners`
--

INSERT INTO `banners` (`id`, `title`, `image`, `link`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Đại Tiệc Đồ Gia Dụng - Giảm Giá Đến 50%', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop', '/products?sale=true', 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(2, 'Thiết Bị Nhà Bếp Thông Minh Cho Mọi Gia Đình', '/uploads/file-1785578096279-295759763.png', '/category/noi-chien-khong-dau', 1, '2026-08-01 16:52:08', '2026-08-01 16:54:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'Mã khách hàng sở hữu giỏ hàng',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 5, '2026-08-01 18:08:11', '2026-08-01 18:08:11'),
(2, 3, '2026-08-07 09:24:12', '2026-08-07 09:24:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL COMMENT 'Khóa ngoại trỏ đến Giỏ hàng',
  `product_id` int(11) NOT NULL COMMENT 'Khóa ngoại trỏ đến Sản phẩm',
  `quantity` int(11) NOT NULL DEFAULT 1 COMMENT 'Số lượng mua',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL COMMENT 'Mã danh mục tự tăng',
  `parent_id` int(11) DEFAULT NULL COMMENT 'Mã danh mục cha (Null nếu là danh mục gốc)',
  `name` varchar(100) NOT NULL COMMENT 'Tên danh mục (ví dụ: Nồi cơm điện, Máy lọc nước)',
  `slug` varchar(120) NOT NULL COMMENT 'Đường dẫn SEO (ví dụ: noi-com-dien, may-loc-nuoc)',
  `description` text DEFAULT NULL COMMENT 'Mô tả chi tiết về danh mục',
  `status` tinyint(1) DEFAULT 1 COMMENT 'Trạng thái hiển thị: true (Hiển thị), false (Ẩn)',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`, `slug`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 'DỤNG CỤ NẤU ĂN', 'dung-cu-nau-an', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(2, NULL, 'LƯU TRỮ', 'luu-tru', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(3, NULL, 'DỤNG CỤ SẮP XẾP', 'dung-cu-sap-xep', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(4, 1, 'NỒI & CHẢO', 'noi-chao', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(5, 1, 'DỤNG CỤ NHÀ BẾP', 'dung-cu-nha-bep', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(6, 1, 'THAU & RỔ', 'thau-ro', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(7, 1, 'DAO & THỚT', 'dao-thot', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(8, 1, 'DỤNG CỤ LÒ NƯỚNG & LÓT NỒI', 'dung-cu-lo-nuong-lot-noi', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(9, 1, 'ĐỒ VẢI NHÀ BẾP', 'do-vai-nha-bep', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(10, 1, 'BẾP ĐIỆN & BẾP TỪ', 'bep-dien-bep-tu', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(11, 2, 'HỘP & HŨ ĐỰNG THỰC PHẨM', 'hop-hu-dung-thuc-pham', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(12, 2, 'HŨ GIA VỊ', 'hu-gia-vi', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(13, 2, 'BÌNH NƯỚC & HỘP CƠM', 'binh-nuoc-hop-com', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(14, 2, 'BÌNH NƯỚC & BÌNH RÓT CÓ VÒI', 'binh-nuoc-binh-rot-co-voi', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(15, 2, 'HỘP ĐỰNG GẠO', 'hop-dung-gao', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(16, 3, 'KỆ BẾP & MÓC TREO', 'ke-bep-moc-treo', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(17, 3, 'ĐỒ SẮP XẾP TRONG TỦ', 'do-sap-xep-trong-tu', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(18, 3, 'ĐỒ SẮP XẾP TỦ LẠNH', 'do-sap-xep-tu-lanh', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(19, 3, 'XE ĐẨY GIA DỤNG', 'xe-day-gia-dung', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(20, 3, 'TRASH BINS & DUST BOXES', 'trash-bins-dust-boxes', NULL, 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Tiêu đề bài viết tin tức',
  `slug` varchar(255) NOT NULL COMMENT 'Đường dẫn SEO bài viết',
  `image` varchar(255) NOT NULL COMMENT 'Ảnh đại diện bài viết',
  `summary` text DEFAULT NULL COMMENT 'Tóm tắt bài viết',
  `content` text NOT NULL COMMENT 'Nội dung chi tiết bài viết (HTML / Markdown)',
  `status` tinyint(1) DEFAULT 1 COMMENT 'Trạng thái hiển thị bài viết',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `slug`, `image`, `summary`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Top 5 Nồi Chiên Không Dầu Tốt Nhất Năm 2026', 'top-5-noi-chien-khong-dau-tot-nhat-nam-2026', 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop', 'Nồi chiên không dầu đang là trợ thủ đắc lực trong căn bếp của mọi gia đình hiện đại. Cùng tìm hiểu top 5 sản phẩm đáng mua nhất!', 'Nồi chiên không dầu mang lại giải pháp ăn uống lành mạnh, hạn chế dầu mỡ. Với dung tích đa dạng và các tính năng hẹn giờ, chỉnh nhiệt độ thông minh...', 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(2, 'Mẹo Sử Dụng Máy Lọc Nước Bền Lâu Và Tiết Kiệm Lõi Lọc', 'meo-su-dung-may-loc-nuoc-ben-lau', 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop', 'Hướng dẫn vệ sinh và kiểm tra thời gian thay lõi lọc nước định kỳ để duy trì nguồn nước sạch tinh khiết.', 'Thay lõi lọc nước định kỳ là vô cùng quan trọng đối với sức khỏe cả gia đình. Bạn nên kiểm tra lõi lọc số 1, 2, 3 mỗi 3-6 tháng...', 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_code` varchar(50) DEFAULT NULL COMMENT 'Mã đơn hàng (ví dụ: HV4181)',
  `user_id` int(11) DEFAULT NULL COMMENT 'Mã người dùng (cho phép null nếu đặt hàng không cần đăng nhập)',
  `customer_name` varchar(100) DEFAULT NULL COMMENT 'Họ tên người nhận hàng',
  `customer_email` varchar(150) DEFAULT 'khachhang@gmail.com' COMMENT 'Email nhận thông báo đơn hàng',
  `customer_phone` varchar(20) DEFAULT NULL COMMENT 'Số điện thoại nhận hàng',
  `shipping_address` text DEFAULT NULL COMMENT 'Địa chỉ giao hàng',
  `shipping_method` varchar(50) DEFAULT 'standard' COMMENT 'Phương thức vận chuyển (Ví dụ: standard, express)',
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Tổng tiền thanh toán của đơn hàng',
  `payment_method` varchar(50) DEFAULT 'COD' COMMENT 'Phương thức thanh toán: COD (Tiền mặt), VNPAY, chuyển khoản...',
  `status` varchar(50) DEFAULT 'Pending' COMMENT 'Trạng thái đơn hàng (Pending, Paid, Shipping, Completed, Cancelled, Delivered)',
  `note` text DEFAULT NULL COMMENT 'Ghi chú đơn hàng của khách',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `order_code`, `user_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `shipping_method`, `total_amount`, `payment_method`, `status`, `note`, `created_at`, `updated_at`) VALUES
(1, NULL, 5, 'Tuấn Anh', 'tuananh.reaction@gmail.com', '0967258610', 'TO 1-PHUONG HOA LU-THANH PHO PLEIKU-TINH GIA LAI-VIET NAM, 327 Tôn Thất Thuyết', 'standard', 658000.00, 'COD', 'Completed', '', '2026-08-01 18:11:38', '2026-08-01 19:16:43'),
(2, NULL, 5, 'Tuấn Anh', 'tuananh.reaction@gmail.com', '0967258610', 'TO 1-PHUONG HOA LU-THANH PHO PLEIKU-TINH GIA LAI-VIET NAM, 327 Tôn Thất Thuyết', 'standard', 270000.00, 'COD', 'Shipping', '', '2026-08-01 18:13:41', '2026-08-01 19:16:29'),
(3, NULL, 5, 'Tuấn Anh', 'tuananh.reaction@gmail.com', '0967258610', 'TO 1-PHUONG HOA LU-THANH PHO PLEIKU-TINH GIA LAI-VIET NAM, 327 Tôn Thất Thuyết', 'standard', 129000.00, 'COD', 'Pending', '', '2026-08-01 18:44:49', '2026-08-01 19:16:40'),
(4, NULL, 3, 'Khách Hàng Nguyễn Văn A', 'user@gmail.com', '0912345678', 'Cầu Giấy, Hà Nội', 'standard', 135000.00, 'COD', 'Pending', '', '2026-08-07 09:24:17', '2026-08-07 09:24:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL COMMENT 'Mã đơn hàng',
  `product_id` int(11) NOT NULL COMMENT 'Mã sản phẩm được mua',
  `price` decimal(12,2) NOT NULL COMMENT 'Đơn giá sản phẩm tại thời điểm mua',
  `quantity` int(11) NOT NULL DEFAULT 1 COMMENT 'Số lượng mua',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 12, 329000.00, 2, '2026-08-01 18:11:38', '2026-08-01 18:11:38'),
(2, 2, 44, 135000.00, 2, '2026-08-01 18:13:41', '2026-08-01 18:13:41'),
(3, 3, 25, 129000.00, 1, '2026-08-01 18:44:49', '2026-08-01 18:44:49'),
(4, 4, 44, 135000.00, 1, '2026-08-07 09:24:17', '2026-08-07 09:24:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL COMMENT 'Mã sản phẩm',
  `category_id` int(11) NOT NULL COMMENT 'Mã danh mục thuộc về (Khóa ngoại)',
  `name` varchar(255) NOT NULL COMMENT 'Tên sản phẩm (Ví dụ: Nồi Chiên Không Dầu Sunhouse 5L)',
  `slug` varchar(255) NOT NULL COMMENT 'Đường dẫn SEO sản phẩm',
  `image` varchar(255) NOT NULL COMMENT 'Đường dẫn hình ảnh đại diện chính của sản phẩm',
  `price` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Giá niêm yết (VNĐ)',
  `sale_price` decimal(12,2) DEFAULT 0.00 COMMENT 'Giá khuyến mãi/giảm giá (VNĐ)',
  `quantity` int(11) NOT NULL DEFAULT 0 COMMENT 'Số lượng tồn kho',
  `description` text DEFAULT NULL COMMENT 'Mô tả chi tiết bài viết sản phẩm',
  `short_description` text DEFAULT NULL COMMENT 'Mô tả ngắn gọn hiển thị trên card',
  `is_new` tinyint(1) DEFAULT 0 COMMENT 'Đánh dấu sản phẩm mới về',
  `is_sale` tinyint(1) DEFAULT 0 COMMENT 'Đánh dấu sản phẩm đang giảm giá shock',
  `is_best` tinyint(1) DEFAULT 0 COMMENT 'Đánh dấu sản phẩm bán chạy',
  `status` tinyint(1) DEFAULT 1 COMMENT 'Trạng thái hiển thị sản phẩm',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `image`, `price`, `sale_price`, `quantity`, `description`, `short_description`, `is_new`, `is_sale`, `is_best`, `status`, `created_at`, `updated_at`) VALUES
(6, 4, 'NỒI CHIÊN TEMPURA NR-089 BẰNG THÉP BẾP TỪ/GAS', 'noi-chien-tempura-nr-089-bang-thep-bep-tugas-2841', 'https://www.nitori.com.vn/cdn/shop/files/250894201600_695x695.jpg?v=1697080555', 400000.00, 249000.00, 15, 'Tương thích với đám cháy gas và IH (200V/100V)\r\n\r\n● Đi kèm lưới bán nguyệt thuận tiện cho việc xả dầu\r\n\r\n■ Các loại vật liệu\r\nThân máy: Thép (độ dày đáy 1,0 mm)\r\nLưới: Thép (mạ crom)\r\nTay cầm: Thép (mạ crom)\r\n\r\n\r\n■ Đã xử lý bề mặt\r\nbề mặt bên trong và bên ngoài: Sơn chịu nhiệt\r\nKích thước:\r\n22 cm\r\nDung tích nước đầy đủ:\r\nkhoảng 2,3 lít', '', 1, 1, 1, 1, '2026-08-01 17:06:22', '2026-08-01 17:06:22'),
(7, 4, 'NỒI VUÔNG SÂU TRÁNG MEN 20CM BẾP TỪ', 'noi-vuong-sau-trang-men-20cm-bep-tu-0010', 'https://www.nitori.com.vn/cdn/shop/files/894228501_695x695.jpg?v=1715927497', 699000.00, 400000.00, 15, '● Nồi 5 trong một tiện lợi để ninh, luộc, đảo, chiên và bảo quản\r\n● Có nắp đậy để bảo quản\r\n● Có thể bảo quản trong tủ lạnh sau khi nấu\r\n● Hình chữ nhật giúp tận dụng hiệu quả không gian tủ lạnh và dễ bảo quản\r\n●Lớp tráng men bền đẹp\r\n●Không để lại mùi hoặc màu, hoàn hảo cho các chế phẩm được chuẩn bị sẵn', 'Hình dáng vuông vức giúp tận dụng hiệu quả không gian tủ lạnh và dễ dàng bảo quản.', 0, 1, 0, 1, '2026-08-01 17:07:40', '2026-08-01 17:07:40'),
(8, 4, 'NỒI CHIÊN TEMPURA BẰNG THÉP IW01 BẾP TỪ/GAS', 'noi-chien-tempura-bang-thep-iw01-bep-tugas', 'https://www.nitori.com.vn/cdn/shop/files/894218101_570x570.jpg?v=1704879005', 499000.00, 0.00, 10, 'Kích thước nhỏ gọn giúp bạn dễ dàng mang theo!\r\nNgoài ra để sử dụng ngoài trời.\r\n● Có thể chiên chắc ngay cả khi chỉ dùng một lượng nhỏ dầu\r\n● Nhỏ gọn nên có thể chiên trên bàn\r\n● Loại rộng cho phép bạn chiên thức ăn dài\r\n● Bạn có thể dùng nắp làm thùng để xả dầu\r\n● Tất cả các bộ phận có thể được lưu trữ cùng nhau\r\n● Bảo quản gọn gàng trong không gian nhỏ\r\n● Xử lý bề mặt (chỉ nồi)\r\nBề mặt bên trong: Lớp phủ màng phủ Fluoropolymer Bên ngoài\r\nbề mặt: Sơn nướng\r\n● Loại vật liệu: Nồi: Thép (độ dày đáy 12 mm)\r\nNắp: Lưới chiên bằng đồng inox Dây thép không gỉ\r\n● Công suất chứa nước đầy đủ:\r\n1,7L\r\n● Dung tích phù hợp (xấp xỉ): 0,5 L\r\n● Kích thước 20×12 cm', 'Với một lượng nhỏ dầu, bạn có thể chiên nhanh và kỹ. Vì có hình chữ nhật nên những món dài như tôm, măng tây cũng có thể chiên được.', 1, 0, 0, 1, '2026-08-01 17:12:20', '2026-08-01 17:51:21'),
(9, 4, 'CHẢO NHÔM 28CM KF01 BẾP GAS', 'chao-nhom-28cm-kf01-bep-gas', 'https://www.nitori.com.vn/cdn/shop/files/894452301_695x695.jpg?v=1731922953', 32900.00, 269000.00, 20, '[Kích thước (xấp xỉ)]\r\n28cm\r\n[Xử lý bề mặt]\r\nBên trong: Lớp phủ nhựa Fluorine\r\nBên ngoài: Sơn nướng\r\n[Vật liệu]\r\nThân máy: Hợp kim nhôm (độ dày đáy 2.0mm)\r\nTay cầm: Nhựa phenolic (nhiệt độ chịu nhiệt 150oC), nylon (nhiệt độ chịu nhiệt 150oC)', '●Dễ cầm nắm nên bạn sẽ muốn sử dụng nó hàng ngày ●Tay cầm mềm giúp bạn dễ dàng cầm nắm ●Lớp phủ đá cẩm thạch 2 lớp giúp dễ dàng sử dụng', 0, 1, 1, 1, '2026-08-01 17:13:24', '2026-08-01 17:13:54'),
(10, 4, 'CHẢO GANG SÂU LÒNG SKILLET 15CM', 'chao-gang-sau-long-skillet-15cm-3715', 'https://www.nitori.com.vn/cdn/shop/files/896543101_570x570.avif?v=1767668324', 99000.00, 0.00, 20, '[Vật liệu]\r\nĐúc sắt\r\n[Kích thước]\r\n25×16,5×3,9cm\r\n[Xử lý bề mặt]\r\nLớp phủ nướng\r\n', '●Giữ nhiệt cao, giúp thực phẩm không bị nguội xuống ●Có thể sử dụng trong lò nướng nên có thể mở rộng phạm vi chế biến món ăn ●Mang thức ăn đã hoàn thành đến cái bàn như cũ', 0, 0, 1, 1, '2026-08-01 17:15:13', '2026-08-01 17:15:13'),
(11, 4, 'NỒI NHÔM ĐA NĂNG 2.5L KÈM RÂY LỌC BẾP TỪ/GAS', 'noi-nhom-da-nang-25l-kem-ray-loc-bep-tugas-3651', 'https://www.nitori.com.vn/cdn/shop/files/894218301_570x570.jpg?v=1697016373', 479000.00, 429000.00, 20, '●Xử lý bề mặt Bề mặt bên trong: Xử lý lớp phủ nhựa Flo %)\r\n(Độ dày đáy: 2,6mm (bao gồm cả đáy dầm))\r\n●Vật liệu khác Tay cầm: Nhựa phenolic (nhiệt độ chịu nhiệt: 150°C)\r\n●Kích thước (xấp xỉ): 17cm\r\n●Dung tích chứa nước: 2.5L [Hiển thị chất lượng (bộ lọc)]\r\n● Loại vật liệu: Thép không gỉ', 'Bạn có thể thưởng thức 7 món ăn chỉ với một bộ sản phẩm này nhờ quá trình xử lý flo bên trong mạnh mẽ', 0, 1, 0, 1, '2026-08-01 17:16:53', '2026-08-01 17:16:53'),
(12, 4, 'NỒI CHIÊN TEMPURA BẰNG THÉP 20CM BẾP TỪ/GAS', 'noi-chien-tempura-bang-thep-20cm-bep-tugas', 'https://www.nitori.com.vn/cdn/shop/files/894202101_600x600.jpg?v=1697512816', 329000.00, 0.00, 8, '- IH (200V/100V), tương thích với lửa gas\r\n[Hiển thị chất lượng]\r\n- Loại vật liệu\r\nThân máy: Thép (độ dày đáy 1,0mm)\r\nVỏ: Thép (Độ dày tấm 0,4mm)\r\nTay cầm: Thép (mạ crom)\r\n- Gia công bề mặt Bên trong\r\nbề mặt: Hoàn thiện nướng', '●Có tấm chắn để tránh dầu bắn tung tóe ●Với nhiệt kế cho phép bạn xem nhanh nhiệt độ dầu', 0, 0, 0, 1, '2026-08-01 17:18:03', '2026-08-01 18:11:38'),
(13, 5, 'ĐŨA SILICON DY01 30CM', 'dua-silicon-dy01-30cm', 'https://www.nitori.com.vn/cdn/shop/files/2746_640x640.jpg?v=1697015705', 63000.00, 0.00, 30, '● Có rãnh giúp lấy nguyên liệu dễ dàng\r\n● Đầu đũa tròn giúp tránh làm hỏng bề mặt nồi, chảo\r\n● Hình vuông được hoàn thiện mịn giúp dễ dàng cầm nắm và không bị lăn', '[Chiều dài của đũa (xấp xỉ)] 30cm  [Nhiệt độ chịu nhiệt] 220°C  [Nhiệt độ chịu lạnh] -30°C', 0, 0, 1, 1, '2026-08-01 17:20:11', '2026-08-01 17:40:16'),
(14, 5, 'BỘ DỤNG CỤ CẮT NẠO RAU CỦ KÈM HỘP ĐỰNG DAYS S', 'bo-dung-cu-cat-nao-rau-cu-kem-hop-dung-days-s', 'https://www.nitori.com.vn/cdn/shop/files/897812601_570x570.jpg?v=1697081471', 219000.00, 0.00, 15, '●Bốn loại dụng cụ nấu ăn và hộp đựng trong một bộ\r\n●Một gói để bảo quản thuận tiện\r\n●Với miếng bảo vệ ngón tay để ngăn ngừa thương tích, bạn có thể nấu ăn an toàn ngay cả khi nguyên liệu nhỏ\r\n●Sau khi nấu xong, tháo nắp và để nguyên Có thể bảo quản trong tủ lạnh\r\n', 'Nhựa ABS Thép không gỉ', 0, 0, 0, 1, '2026-08-01 17:21:06', '2026-08-01 17:40:24'),
(15, 5, 'KẸP GẮP SILICON S KT01', 'kep-gap-silicon-s-kt01-7240', 'https://www.nitori.com.vn/cdn/shop/files/897790401_640x640.jpg?v=1704952697', 69000.00, 59000.00, 20, '●Chất liệu silicon đàn hồi giúp bạn dễ dàng cầm nắm mì ống và các nguyên liệu mềm khác Dễ dàng cầm nắm hơn\r\n●Bạn có thể nắm chặt đầu bút\r\n●Vì có chức năng khóa nên có thể bảo quản ở trạng thái đóng mà không bị cồng kềnh. [ Chất liệu] Phần kim loại: Thép không gỉ Mẹo: Cao su silicon (nhiệt độ chịu nhiệt: 260oC) Phần bên, lỗ Phần treo: Chất đàn hồi dẻo nhiệt (nhiệt độ chịu nhiệt: 140oC)', 'SILICON KHÔNG GỈ', 0, 1, 1, 1, '2026-08-01 17:22:17', '2026-08-01 17:22:17'),
(16, 5, 'DỤNG CỤ GỌT VỎ INOX', 'dung-cu-got-vo-inox-2365', 'https://www.nitori.com.vn/cdn/shop/files/250897143800_695x695.jpg?v=1697081440', 99000.00, 69000.00, 30, 'Chiều rộng vừa phải để dễ dàng cầm nắm! Trụ cột inox có bề mặt chống trượt\r\n\r\n● Kết cấu thép không gỉ với độ cứng vừa phải cho phép gọt rau củ mỏng và đều.\r\n● Tay cầm có bề mặt chống trượt để dễ dàng sử dụng.', 'Vật liệu Lưỡi dao: Lưỡi thép không gỉ Thân máy: Thép không gỉ', 0, 1, 1, 1, '2026-08-01 17:23:12', '2026-08-01 17:23:12'),
(17, 5, 'DỤNG CỤ XAY CỦ QUẢ KÉO TAY S KK01', 'dung-cu-xay-cu-qua-keo-tay-s-kk01-3727', 'https://www.nitori.com.vn/cdn/shop/files/897813501_640x640.jpg?v=1730858581', 119000.00, 99000.00, 10, '[Kích thước (xấp xỉ)]\r\n12,5 x 12,5 x 9 cm\r\n\r\n[Vật liệu]\r\nVỏ: Polypropylen (nhiệt độ chịu nhiệt 100 ° C / nhiệt độ chịu lạnh -30 ° C), polyacetal (nhiệt độ chịu nhiệt 100 ° C / nhiệt độ chịu lạnh -30 ° C), thép không gỉ\r\nTay cầm: Polypropylen (nhiệt độ chịu nhiệt 100 ° C / nhiệt độ chịu lạnh -30 ° C)\r\nDây: Polyester (chịu nhiệt 100°C/\r\nnhiệt độ chịu lạnh -30 ° C) Máy cắt: Thép không gỉ, polyetylen (nhiệt độ chịu nhiệt 100 ° C\r\n/ nhiệt độ chịu lạnh -30°C) Thùng chứa: Nhựa AS (nhiệt độ chịu nhiệt 90°C / nhiệt độ chịu lạnh -30°C\r\n) Chống trượt: Chất đàn hồi nhiệt dẻo (nhiệt độ chịu nhiệt 120°C/nhiệt độ chịu lạnh -30°C)', 'Dễ dàng và nhanh chóng mà không cần dùng dao', 0, 1, 1, 1, '2026-08-01 17:24:13', '2026-08-01 17:24:13'),
(18, 5, 'KHAY THÉP KÈM LƯỚI RÁO DẦU BC004-2', 'khay-thep-kem-luoi-rao-dau-bc004-2-2921', 'https://www.nitori.com.vn/cdn/shop/files/250894904900_695x695.jpg?v=1697512668', 169000.00, 0.00, 20, 'Cả chày và chảo đều được phủ một lớp nhựa dẻo, giúp dễ dàng làm sạch và loại bỏ vết dầu.\r\nVui lòng không sử dụng máy chà thép hoặc bột đánh bóng.', '', 0, 0, 0, 1, '2026-08-01 17:25:12', '2026-08-01 17:25:12'),
(19, 5, 'RỔ NHỰA PP QUAY RAU L', 'ro-nhua-pp-quay-rau-l', 'https://www.nitori.com.vn/cdn/shop/files/897810501_570x570.jpg?v=1697076672', 199000.00, 0.00, 24, '[Dung lượng (xấp xỉ)]\r\n3,5L\r\n[Nhiệt độ chịu nhiệt]\r\nBộ phận chính, nắp, chao: 90oC\r\n[Nhiệt độ chịu lạnh]\r\nThân/Nắp/Rây: -30°C\r\n[Vật liệu]\r\nThân: Polypropylen\r\nNắp, rây: Polypropylen', ' Máy trộn salad dễ sử dụng', 1, 0, 0, 1, '2026-08-01 17:26:23', '2026-08-01 17:51:14'),
(20, 5, 'NẮP INOX CHẮN DẦU MỠ CÓ CHÂN DỰNG 30CM', 'nap-inox-chan-dau-mo-co-chan-dung-30cm-6696', 'https://www.nitori.com.vn/cdn/shop/files/894437901_4cac0319-2cd1-4c19-8a66-bfdfdbd68d6d_570x570.jpg?v=1697081444', 159000.00, 0.00, 30, '● Giảm lượng dầu bắn ra lớn đột ngột bằng lưới mịn\r\n● Ngăn dầu bắn tung tóe đồng thời để hơi nước thoát ra từ bên trong nồi\r\nNó cũng làm giảm sự bắn tung tóe của các món ăn dày. Nó thuận tiện cho việc thoát nước nóng.\r\nNó có thể được sử dụng với máy rửa chén.\r\n\r\n[Kích thước tương thích]\r\nTương thích với nồi và chảo rán có kích thước từ 28 cm trở xuống.', 'Loại chân đế thuận tiện cho việc đặt tạm thời', 0, 0, 0, 1, '2026-08-01 17:27:26', '2026-08-01 17:27:26'),
(21, 6, 'BÁT INOX DAYS L 21CM', 'bat-inox-days-l-21cm', 'https://www.nitori.com.vn/cdn/shop/files/897158401_695x695.jpg?v=1697076680', 129000.00, 0.00, 20, '● Lớp phủ silicon ở phía dưới để chống trượt\r\n● Mỏng, nhẹ và dễ cầm nắm\r\n● Dễ dàng xếp chồng lên nhau\r\n● Có cân ở bên trong\r\n\r\n[Nhiệt độ chịu nhiệt]\r\n180℃\r\n\r\n[Nhiệt độ chịu lạnh]\r\n-20℃', '[Vật liệu] Thân máy: Thép không gỉ Đáy: Cao su silicon', 1, 0, 0, 1, '2026-08-01 17:28:36', '2026-08-01 17:51:11'),
(22, 6, 'BÁT INOX DAYS M 18CM', 'bat-inox-days-m-18cm', 'https://www.nitori.com.vn/cdn/shop/files/897158301_695x695.jpg?v=1697076675', 94000.00, 0.00, 20, '●Dễ xếp chồng\r\n●Có vạch chia tỷ lệ ở bên trong\r\n[Kích thước (xấp xỉ)]\r\nĐường kính: 18cm', 'Mỏng, nhẹ và dễ cầm nắm', 1, 0, 0, 1, '2026-08-01 17:29:41', '2026-08-01 17:51:06'),
(23, 6, 'BÁT INOX CHỐNG TRƯỢT DAYS 24CM', 'bat-inox-chong-truot-days-24cm-3685', 'https://www.nitori.com.vn/cdn/shop/files/897158501_695x695.jpg?v=1697076686', 170000.00, 0.00, 20, '●Mỏng, nhẹ và dễ cầm nắm\r\n●Dễ xếp chồng\r\n●Có cân ở bên trong\r\n\r\n[Nhiệt độ chịu nhiệt]\r\n180℃\r\n\r\n[Nhiệt độ chịu lạnh]\r\n-20℃\r\n\r\n[Vật liệu]\r\nThân máy: Thép không gỉ\r\nĐáy: Cao su silicon', 'Có lớp silicon ở phía dưới giúp chống trơn trượt', 0, 0, 0, 1, '2026-08-01 17:30:33', '2026-08-01 17:30:33'),
(24, 6, 'BỘ THAU RỔ NHỰA 2P', 'bo-thau-ro-nhua-2p-8265', 'https://www.nitori.com.vn/cdn/shop/files/250897142800_695x695.jpg?v=1697076662', 59000.00, 49000.00, 20, '- Nhiệt độ chịu nhiệt: 110°C\r\n- Thép không gỉ Không đặt gần lửa hoặc môi trường có nhiệt độ cao.\r\n\r\nKhông đặt gần lửa hoặc ở những nơi có nhiệt độ cao.\r\nKhông sử dụng máy chà sàn kim loại hoặc chất đánh bóng.', 'Dung tích bát (xấp xỉ): 2.0L', 0, 1, 1, 1, '2026-08-01 17:31:28', '2026-08-01 17:31:28'),
(25, 6, 'BỘ THAU RỔ LẬT ÚP NHỎ GY', 'bo-thau-ro-lat-up-nho-gy', 'https://www.nitori.com.vn/cdn/shop/files/897929101_695x695.jpg?v=1748581238', 129000.00, 0.00, 19, '●Có thể sử dụng riêng rây và bát\r\n●Chỉ cần nghiêng bát để xoay rây, giúp việc thoát nước dễ dàng hơn\r\n●Có thể xoay 180 độ\r\n\r\n[Kích thước (xấp xỉ)]\r\nColander (đường kính trong tối đa): 18 cm\r\nBát (đường kính trong tối đa): 19 cm\r\n\r\n[Công suất (xấp xỉ)]\r\nBát: 2,0 L\r\n\r\n[Khả năng chịu lạnh và nhiệt]\r\n-20℃, 120℃\r\n', 'Thuận tiện cho việc vo gạo cần xả nước thường xuyên (1 đến 3 cốc)', 1, 0, 0, 1, '2026-08-01 17:32:28', '2026-08-01 18:44:49'),
(26, 6, 'RỔ LƯỚI INOX N 29CM', 'ro-luoi-inox-n-29cm-4751', 'https://www.nitori.com.vn/cdn/shop/files/897925901_570x570.jpg?v=1697076651', 129000.00, 0.00, 20, '● Thoát nước tốt và dễ sử dụng\r\n● Để làm ráo nguyên liệu trong nồi\r\n● Máy rửa chén an toàn', '', 0, 0, 0, 1, '2026-08-01 17:34:34', '2026-08-01 17:34:34'),
(27, 7, 'THỚT GỖ KIRI NHỎ 37X22', 'thot-go-kiri-nho-37x22', 'https://www.nitori.com.vn/cdn/shop/files/897332401_570x570.jpg?v=1697080088', 69000.00, 0.00, 20, 'Nhẹ, thoát nước tốt, khô nhanh,\r\nmềm mại trên lưỡi dao, nhẹ nhàng trên lưỡi dao,\r\n\r\nvà không thể sử dụng được trong máy rửa chén', '', 1, 0, 0, 1, '2026-08-01 17:35:33', '2026-08-01 17:51:01'),
(28, 6, 'DỤNG CỤ MÀI DAO DOUBLE SHARP', 'dung-cu-mai-dao-double-sharp-1280', 'https://www.nitori.com.vn/cdn/shop/files/897235101_570x570.jpg?v=1697080078', 169000.00, 149000.00, 20, 'Có thể sử dụng cho dao hai lưỡi bằng thép không gỉ, thép, gốm và titan.\r\n* Không thể sử dụng dao làm bằng vật liệu khác ngoài những vật liệu được liệt kê ở trên.\r\n*Không thể sử dụng cho dao một lưỡi.\r\n\r\nChỉ dẫn chất lượng\r\nLoại vật liệu\r\nThân: nhựa ABS (chịu nhiệt 70°C)\r\nPhần kim loại: thép không gỉ\r\nMài sắc phần 1: Để mài thô Kim cương\r\nphần mài 2: Dành cho mài vừa Kim cương khôngtrượt: Cao su silicone (nhiệt độ chịu nhiệt 220°C)', 'Có thể mài dao dễ dàng và an toàn chỉ bằng cách kéo dao về phía bạn', 0, 1, 1, 1, '2026-08-01 17:41:41', '2026-08-01 17:41:41'),
(29, 7, 'GIÁ INOX GÁC THỚT SUS', 'gia-inox-gac-thot-sus-1465', 'https://www.nitori.com.vn/cdn/shop/files/250898748100-2_695x695.jpg?v=1697078178', 99000.00, 0.00, 20, '[Kích thước (xấp xỉ)]\r\nChiều rộng 14,5 × Chiều sâu 29,5 × Chiều cao 10 cm\r\n\r\n[Nhựa nguyên liệu]\r\nPET\r\n\r\n\r\n[Nhiệt độ chịu nhiệt]\r\n\r\n60°C [Nhiệt độ chịu lạnh] -30°C', 'Thuận tiện để đưa vào và lấy ra ở phía sau tủ hoặc ở vị trí cao', 0, 0, 0, 1, '2026-08-01 17:42:31', '2026-08-01 17:42:31'),
(30, 7, 'DAO INOX LIỀN CÁN SHOUSANTOKU DAYS', 'dao-inox-lien-can-shousantoku-days-1184', 'https://www.nitori.com.vn/cdn/shop/files/897244201_570x570.jpg?v=1697080143', 399000.00, 359000.00, 20, '[Vật liệu]\r\nLưỡi dao: Thép không gỉ\r\n(có lưỡi dao/lưỡi hai lưỡi)\r\nTay cầm: thép không gỉ 18-8\r\n\r\n[Thông số kỹ thuật khác]\r\nMáy rửa thực phẩm: Có thể sử dụng', 'Dao vừa tay và dễ cầm', 0, 0, 0, 1, '2026-08-01 17:43:41', '2026-08-01 17:43:41'),
(31, 7, 'DAO INOX PETTY KY017 4.7 INCH', 'dao-inox-petty-ky017-47-inch-0130', 'https://www.nitori.com.vn/cdn/shop/files/imgi_152_897250130_695x695.jpg?v=1759916725', 119000.00, 0.00, 20, '[Nhãn chất lượng]\r\nLưỡi dao: Dao kéo bằng thép không gỉ, Tay cầm: Polypropylene, bọc cao su\r\nĐinh tán: Thép không gỉ, Hình dạng lưỡi dao: Hai lưỡi, Nắp bảo vệ: Polypropylen\r\n\r\n[Xấp xỉ. Kích thước]\r\nRộng 23,3 x Sâu 2,8 x Cao 1,6 cm\r\n\r\n[Nhiệt độ chịu nhiệt/lạnh]\r\n120°C/-30°C', 'Tay cầm mềm giúp cầm nắm dễ dàng', 0, 0, 0, 1, '2026-08-01 17:44:20', '2026-08-01 17:44:20'),
(32, 8, 'BÁT NƯỚNG BỎ LÒ AMEYU JMNS-012', 'bat-nuong-bo-lo-ameyu-jmns-012-2576', 'https://www.nitori.com.vn/cdn/shop/files/2353_640x640.jpg?v=1697080241', 67000.00, 0.00, 20, '-Có thể rửa bằng máy rửa bát\r\nNó thuận tiện vì nó có thể được rửa bằng máy rửa chén.\r\n\r\n- Có thể sử dụng trong lò nướng hoặc lò vi sóng\r\nThật tiện lợi và dễ nấu vì bạn có thể hâm nóng nguyên liệu trong lò vi sóng mà không cần phải di chuyển đĩa và cho vào lò nướng.\r\n\r\n- Trực tiếp từ lò nướng tới bàn ăn\r\nBạn thậm chí có thể nấu và phục vụ món này ngay từ lò nướng tới bàn ăn khi nó còn nóng. Vì không cần phải chuyển sang đĩa nên việc giảm lượng đồ giặt sẽ rất hữu ích!\r\n\r\n', 'Bộ đồ ăn Ame-yu được làm bằng cách phủ men có chứa sắt lên đồ gốm và nướng nó. Thành phẩm có màu nâu vàng bóng (màu hổ phách) rất đẹp. Nó phổ biến vì nó có thể được sử dụng theo cả phong cách Nhật Bản và phương Tây, và món ăn trông rất tuyệt vời.', 0, 0, 0, 1, '2026-08-01 17:46:12', '2026-08-01 17:46:12'),
(33, 8, 'BÁT NƯỚNG BỎ LÒ MỘT QUAI AMEYU JMNS-013', 'bat-nuong-bo-lo-mot-quai-ameyu-jmns-013-6542', 'https://www.nitori.com.vn/cdn/shop/files/896528101_570x570.jpg?v=1704965437', 79000.00, 0.00, 20, '-Có thể rửa bằng máy rửa bát\r\nNó thuận tiện vì nó có thể được rửa bằng máy rửa chén.\r\n\r\n- Có thể sử dụng trong lò nướng hoặc lò vi sóng\r\nBạn có thể hâm nóng nguyên liệu trong lò vi sóng rồi cho vào lò nướng mà không cần phải di chuyển bát đĩa, giúp việc nấu nướng trở nên dễ dàng và thuận tiện.\r\n\r\n- Trực tiếp từ lò nướng tới bàn ăn\r\nBạn thậm chí có thể nấu và phục vụ món ăn ngay khi lấy ra khỏi lò đến bàn ăn khi còn nóng. Vì không cần phải chuyển sang đĩa nên việc giảm lượng đồ giặt sẽ rất hữu ích!', 'Bộ đồ ăn Ame-yu được làm bằng cách phủ men có chứa sắt lên đồ gốm và nướng nó. Thành phẩm có màu nâu vàng bóng (màu hổ phách) rất đẹp. Nó phổ biến vì nó có thể được sử dụng theo cả phong cách Nhật Bản và phương Tây, và món ăn trông rất tuyệt vời.', 0, 0, 0, 1, '2026-08-01 17:47:06', '2026-08-01 17:47:06'),
(34, 8, 'ĐẾ LÓT HÌNH VUÔNG BỘ 2 CÁI HPS14141', 'de-lot-hinh-vuong-bo-2-cai-hps14141-9161', 'https://www.nitori.com.vn/cdn/shop/files/896524301_600x600.jpg?v=1697080221', 49000.00, 0.00, 20, '', 'Thiết kế đơn giản, dễ sử dụng!', 0, 0, 0, 1, '2026-08-01 17:47:39', '2026-08-01 17:47:39'),
(35, 9, 'KHĂN LAU BẾP MICROFIBER DSU 3P', 'khan-lau-bep-microfiber-dsu-3p', 'https://www.nitori.com.vn/cdn/shop/files/898079501_570x570.jpg?v=1697079084', 49000.00, 46000.00, 20, '', '● Có thể sử dụng bằng cách lau khô hoặc ướt. ● Vì là sợi nhỏ nên khả năng hấp thụ nước và dầu rất vượt trội!', 1, 1, 0, 1, '2026-08-01 17:48:36', '2026-08-01 17:50:53'),
(36, 9, 'KHĂN LAU TAY LAHR LGY', 'khan-lau-tay-lahr-lgy-9900', 'https://www.nitori.com.vn/cdn/shop/files/250775052800_695x695.jpg?v=1697014738', 99000.00, 0.00, 20, 'Nút đóng giúp chống trượt!\r\nSử dụng chất làm mềm vải: Nó có thể làm hỏng khả năng thấm hút tự nhiên của khăn và khiến khăn dễ bị xù.\r\nChúng tôi khuyên bạn nên tránh sử dụng chất làm mềm vải bất cứ khi nào có thể.\r\nChúng tôi khuyên bạn nên tránh sử dụng nước xả vải càng nhiều càng tốt mà chỉ nên sử dụng một lượng nhỏ khi bạn cảm thấy khăn trở nên cứng.', 'Hình dáng dễ thương trông giống như quần áo của búp bê.', 1, 0, 0, 1, '2026-08-01 17:49:39', '2026-08-01 17:49:39'),
(37, 9, 'TẠP DỀ VẢI NV INFY', 'tap-de-vai-nv-infy-3953', 'https://www.nitori.com.vn/cdn/shop/files/786084101_695x695.jpg?v=1697079727', 249000.00, 200000.00, 20, 'Tạp dề trơn đơn giản và dễ sử dụng\r\n● Phần ngực có thể gấp lại để làm tạp dề garçon\r\n● Dành cho nam và nữ\r\n\r\n- Máy giặt được (dùng lưới)', 'Tạp dề trơn đơn giản, dễ sử dụng', 1, 1, 0, 1, '2026-08-01 17:50:43', '2026-08-01 17:50:43'),
(38, 10, 'Bếp Từ Xiaomi Induction Cooker Lite EU (BHR8130EU)', 'bep-tu-xiaomi-induction-cooker-lite-eu-bhr8130eu-2797', 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_37714/bep-tu-xiaomi-induction-cooker-lite-eu-bhr8130eu-main-328908.webp', 1370000.00, 1299000.00, 20, 'Tính năng nổi bật:\r\nCông suất 2100W mạnh mẽ giúp làm nóng nhanh\r\nNúm điều khiển tinh tế có đèn LED giúp điều chỉnh nhiệt chính xác và rõ ràng\r\n9 mức điều chỉnh nhiệt để nấu ăn dễ dàng và chính xác\r\nNhiều biện pháp bảo vệ để đảm bảo sử dụng an toàn', 'Bếp từ đơn', 1, 1, 0, 1, '2026-08-01 17:54:02', '2026-08-01 17:54:02'),
(39, 10, 'Bếp điện từ Kaff KF - IH202IC', 'bep-dien-tu-kaff-kf-ih202ic-8205', 'https://kinghome.vn/data/products/1709709904bep-tu-kaff-KF---IH202IC-king-home.jpg', 28800000.00, 21600000.00, 20, 'Loại bếp: Bếp điện từ\r\nCông suất bếp: 2200Wx2300W (Booster 3700W)\r\nMặt kính: Mặt kính Shott Ceran Made in Germany siêu bền, chịu lực chịu sốc nhiệt\r\nĐầu đốt: Đầu đốt EGO Made in Germany\r\nBooster: Chức năng Booster nấu cực nhanh\r\nNút Điều khiển: Điều khiển cảm ứng Slider dạng ẩn trực tiếp trên mặt bếp\r\nChức năng hẹn giờ: Chế độ hẹn giờ, khóa trẻ em thông minh, tiện dụng\r\nChức năng Inverter: Chức năng Inverter và chia công suất tiết kiệm điện năng, bảo vệ bếp', 'Bếp điện từ', 0, 1, 0, 1, '2026-08-01 17:55:28', '2026-08-01 17:55:28'),
(40, 11, 'TÚI ZIP PE TIỆN LỢI CÓ KHÓA KÉO L12 TW-387', 'tui-zip-pe-tien-loi-co-khoa-keo-l12-tw-387-5830', 'https://www.nitori.com.vn/cdn/shop/files/2681_640x640.jpg?v=1697078740', 39000.00, 36000.00, 20, '-Dễ dàng đóng mở nhờ kiểu trượt\r\n-Để lưu trữ và quản lý nguyên liệu và các vật dụng nhỏ khác\r\n- Túi đông lạnh để cấp đông và rã đông\r\n-Đặc tính bịt kín tuyệt vời giúp thuận tiện cho việc đông lạnh thực phẩm dạng lỏng như cà ri và nước sốt thịt.\r\n-Bảo vệ thực phẩm khỏi bị đóng băng và cháy do khô và oxy hóa.\r\n-Ngày tháng và nội dung có thể được ghi trên túi, thuận tiện cho việc quản lý thực phẩm đông lạnh.\r\n- Toàn bộ túi có thể rã đông trong lò vi sóng.\r\n\r\nSố tờ\r\n12 tờ mỗi túi\r\n\r\nNhiệt độ kháng lạnh\r\n-70°C\r\n\r\nNhiệt độ chịu nhiệt\r\n-70°C (-80°C)\r\n\r\nKích thước (xấp xỉ)\r\nRộng 27 cm x Cao 25 cm x Trấn 8 cm', 'Loại có dây đeo có nhiều không gian để lưu trữ', 0, 1, 1, 1, '2026-08-01 17:56:55', '2026-08-01 17:56:55'),
(41, 12, 'BÌNH THỦY TINH ĐỰNG DẦU ĂN VÀ GIẤM OAK 250ML', 'binh-thuy-tinh-dung-dau-an-va-giam-oak-250ml-1879', 'https://www.nitori.com.vn/cdn/shop/files/891074201_695x695.jpg?v=1697512637', 99000.00, 79000.00, 20, 'Dung tích (xấp xỉ): 250mL\r\nChất liệu\r\nThân: Ly Soda\r\nNắp: Không gỉ\r\nĐóng gói: Cao su silicon\r\nNhiệt độ chịu nhiệt Cao su silicone: 180 oC\r\nCao su silicone chịu nhiệt độ lạnh: -30 oC\r\nNắp không được đóng kín hoàn toàn. Không lưu trữ ở vị trí nằm ngang.\r\n', 'KÍNH/KHÔNG GỈ', 0, 1, 0, 1, '2026-08-01 17:58:11', '2026-08-01 17:58:11'),
(42, 13, 'BÌNH NƯỚC INOX 160ML WH PETITLE', 'binh-nuoc-inox-160ml-wh-petitle-7983', 'https://www.nitori.com.vn/cdn/shop/files/899239101_695x695.jpg?v=1704965382', 169000.00, 0.00, 10, 'Cốc di động nhẹ và nhỏ gọn\r\n● Loại 160ml dành cho những lúc bạn chỉ muốn uống một chút\r\n● Dễ uống với nút đá\r\n● Dễ giặt và vệ sinh\r\n\r\n■ Nắm giữ quyền lực\r\nGiữ nhiệt độ trên 56oC trong 6 giờ\r\nGiữ nhiệt độ trên 26oC trong 24 giờ\r\n■ Công suất làm mát\r\nGiữ nhiệt độ dưới 11oC trong 6 giờ Giữ nước ở nhiệt độ 11oC hoặc thấp hơn trong 6 giờ\r\n\r\n■ Dung tích đổ đầy (xấp xỉ): 160ml\r\n\r\n■ Vật liệu\r\nChai bên trong: Thép không gỉ\r\nChai bên ngoài: Thép không gỉ (hoàn thiện nướng)\r\nNắp: Polypropylene\r\nĐóng gói: Cao su silicon\r\n\r\n■ Kích thước (xấp xỉ): 4,5×4,5×14 4,5×4,5×14,4cm', 'Cốc di động nhẹ và nhỏ gọn', 1, 0, 0, 1, '2026-08-01 17:59:17', '2026-08-01 17:59:17'),
(43, 14, 'BÌNH NƯỚC ĐỂ TỦ LẠNH CÓ THỂ ĐẶT NẰM NGANG 1.1L', 'binh-nuoc-de-tu-lanh-co-the-dat-nam-ngang-11l-6527', 'https://www.nitori.com.vn/cdn/shop/files/899520601_570x570.jpg?v=1705478014', 129000.00, 119000.00, 10, 'Thiết kế mỏng vừa vặn trong túi cửa tủ lạnh\r\n(* Tùy theo loại của tủ lạnh, có thể không cất được vào ngăn cửa.)\r\n- Hoàn toàn kín có thể đặt theo chiều dọc và chiều ngang.\r\n-Một hình thức đặc biệt về tính dễ cầm.\r\n● Cấu trúc đơn giản nó dễ dàng để làm sạch\r\n● Xử lý chống bám dính bắn nước trà (nút chặn vít)\r\n・ Không có lò vi sóng và máy rửa chén có sẵn\r\n■ Công suất (xấp xỉ):\r\n1,1L\r\n■ Chất liệu\r\nThân: nhựa AS\r\nNút chặn vít: Polypropylen\r\nĐóng gói: Cao su silicon', 'Loại công suất nhỏ, dễ cầm bằng một tay', 0, 0, 0, 1, '2026-08-01 18:00:16', '2026-08-01 18:00:16'),
(44, 15, 'HỘP NHỰA PP ĐỰNG GẠO ĐỂ TỦ LẠNH 2KG', 'hop-nhua-pp-dung-gao-de-tu-lanh-2kg-8455', 'https://www.nitori.com.vn/cdn/shop/files/250898773900_695x695.jpg?v=1697078777', 169000.00, 135000.00, 7, '● Có tay cầm thuận tiện cho việc đưa vào và lấy ra khỏi tủ lạnh\r\n● Có thể được lưu trữ theo chiều dọc hoặc chiều ngang\r\n● Với cốc dễ tháo ra và cho phép cân chính xác\r\n', 'Được đệm và khóa để bảo vệ chống ẩm và oxy hóa', 0, 1, 0, 1, '2026-08-01 18:01:08', '2026-08-07 09:24:17'),
(45, 16, 'GIỎ TREO TỦ TRÊN FLAT', 'gio-treo-tu-tren-flat-5929', 'https://www.nitori.com.vn/cdn/shop/files/898779601_600x600.jpg?v=1697012865', 219000.00, 0.00, 10, 'Dễ dàng cài đặt mà không cần thêm công việc\r\nĐộ dày của cửa có thể lên tới 15-25mm.', '', 0, 0, 0, 1, '2026-08-01 18:01:55', '2026-08-01 18:01:55'),
(46, 17, 'KỆ GẦM BỒN CO GIÃN 7540 WH', 'ke-gam-bon-co-gian-7540-wh-4901', 'https://www.nitori.com.vn/cdn/shop/files/898783901_695x695.jpg?v=1697079550', 449000.00, 0.00, 10, 'Nó cũng có thể được lắp đặt ở những nơi có bẫy thoát nước\r\n● Chiều rộng có thể được điều chỉnh tùy theo vị trí lắp đặt\r\n● Kệ có thể lắp đặt ở mọi vị trí\r\n● Chiều cao của kệ có thể được điều chỉnh tùy theo vật dụng được cất giữ', '', 0, 0, 0, 1, '2026-08-01 18:02:54', '2026-08-01 18:02:54'),
(47, 18, 'KHAY ĐỰNG LON TỦ LẠNH 350ML NBLANC　', 'khay-dung-lon-tu-lanh-350ml-nblanc-3829', 'https://www.nitori.com.vn/cdn/shop/files/892038512_570x570.jpg?v=1697078756', 99000.00, 0.00, 30, '●Hoàn hảo để đựng lon 350mL\r\n●Để sử dụng hiệu quả không gian bên trong tủ lạnh\r\n●Có thể sử dụng lâu dài nhờ độ dày chắc chắn và chất liệu khó gãy\r\n●Đế dốc giúp lấy lon dễ dàng bằng cách lăn về phía trước\r\n\r\n[Kích thước (xấp xỉ)]\r\nChiều rộng 13,5 x Chiều sâu 29,5 x Chiều cao 7,5cm', '', 0, 0, 0, 1, '2026-08-01 18:03:43', '2026-08-01 18:03:43'),
(48, 19, 'KỆ THÉP DI ĐỘNG TOROLLEY4 S WH', 'ke-thep-di-dong-torolley4-s-wh-3358', 'https://www.nitori.com.vn/cdn/shop/files/211120000382601_570x570.jpg?v=1750044548', 699000.00, 0.00, 10, 'Kích thước nhỏ gọn, đặt gọn dưới gầm bàn ăn\r\n●Vừa vặn ngay cả khi kết hợp với bàn làm việc\r\n●Có bánh xe di chuyển dễ dàng\r\n●Có thể đặt sự kết hợp giữa khay bảo quản và giỏ N-cám (bán riêng) mà không có khoảng trống, thuận tiện cho việc bảo quản riêng các vật dụng nhỏ\r\n\r\n[Yêu cầu lắp ráp của khách hàng]\r\n●Ước tính Thời gian lắp ráp (1 người): Khoảng 20 phút\r\n●Bao gồm các bộ phận lắp ráp\r\n*Vì kích thước của các giá đỡ khác nhau nên các giá đỡ có thể không khớp với nhau nếu chúng không được lắp đặt theo tên viết tắt tiếng Anh.\r\n\r\n[Kích thước (xấp xỉ)]\r\nRộng 39 x Sâu 30 x Cao 60,3 cm\r\n\r\n[Khả năng tải (xấp xỉ)]\r\nMỗi kệ: 5 kg\r\n\r\n[Vật liệu]\r\nThép', '', 0, 0, 0, 1, '2026-08-01 18:04:23', '2026-08-01 18:04:23'),
(49, 20, 'THÙNG RÁC NHỰA PP ĐẠP CHÂN KHỬ MÙI NHỎ GỌN 30L BK', 'thung-rac-nhua-pp-dap-chan-khu-mui-nho-gon-30l-bk-1808', 'https://www.nitori.com.vn/cdn/shop/files/845099701_570x570.jpg?v=1705291931', 399000.00, 0.00, 10, '[Công suất (xấp xỉ)]\r\n30L\r\n\r\n[Kích thước cơ thể (xấp xỉ)]\r\nChiều rộng 23,5 × Sâu 41,5 × Cao 49,5 cm\r\n\r\n[Kích thước túi nhựa áp dụng (xấp xỉ)]\r\nChiều rộng miệng 60 × chiều cao 70 cm trở lên\r\n\r\n[Vật liệu]\r\nPolypropylen\r\n\r\n[Nhiệt độ chịu nhiệt]\r\n120°C\r\n\r\n[Nhiệt độ chịu lạnh]\r\n-10°C\r\n\r\n[Các biện pháp phòng ngừa khi xử lý]\r\n● Nếu bụi bẩn vẫn còn trên bề mặt, hiệu quả khử mùi sẽ không được phát huy hết.\r\n● Tác dụng khử mùi không loại bỏ hoàn toàn mùi hôi.\r\n● Không đặt gần lửa.\r\n● Nếu bạn chà bằng cọ hoặc bột đánh răng, có thể gây trầy xước.', '● Thùng khử mùi ngăn chặn mùi hôi ● Phần nhào có tác dụng khử mùi: Thân/nắp', 0, 0, 0, 1, '2026-08-01 18:05:11', '2026-08-01 18:05:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key_name` varchar(100) NOT NULL COMMENT 'Tên cấu hình (Ví dụ: site_logo, primary_color, show_new_products)',
  `key_value` text DEFAULT NULL COMMENT 'Giá trị tương ứng',
  `description` varchar(255) DEFAULT NULL COMMENT 'Mô tả ý nghĩa của cấu hình này',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `settings`
--

INSERT INTO `settings` (`id`, `key_name`, `key_value`, `description`, `created_at`, `updated_at`) VALUES
(1, 'site_logo', ' GiaDungStore', 'Logo của Website', '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(2, 'primary_color', '#2563eb', 'Màu sắc chủ đạo của Website (Màu Xanh Blue)', '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(3, 'show_new_products', 'true', 'Hiển thị mục Sản phẩm mới ở trang chủ', '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(4, 'show_best_products', 'true', 'Hiển thị mục Sản phẩm bán chạy ở trang chủ', '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(5, 'show_sale_products', 'true', 'Hiển thị mục Sản phẩm giảm giá ở trang chủ', '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(6, 'show_news_section', 'true', 'Hiển thị mục Tin tức ở trang chủ', '2026-08-01 16:52:08', '2026-08-01 16:52:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'Khóa chính tự tăng',
  `name` varchar(100) NOT NULL COMMENT 'Họ và tên người dùng',
  `email` varchar(150) NOT NULL COMMENT 'Địa chỉ Email (Dùng để đăng nhập)',
  `password` varchar(255) NOT NULL COMMENT 'Mật khẩu đã được mã hóa bằng bcrypt',
  `phone` varchar(20) DEFAULT NULL COMMENT 'Số điện thoại liên hệ',
  `address` text DEFAULT NULL COMMENT 'Địa chỉ giao hàng mặc định',
  `avatar` varchar(255) DEFAULT '/uploads/default-avatar.png' COMMENT 'Đường dẫn ảnh đại diện',
  `role` enum('SuperAdmin','Admin','Editor','User') DEFAULT 'User' COMMENT 'Phân quyền người dùng: SuperAdmin (Toàn quyền), Admin (Quản trị), Editor (Biên tập), User (Khách)',
  `status` tinyint(1) DEFAULT 1 COMMENT 'Trạng thái tài khoản: true (Hoạt động), false (Bị khóa)',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `avatar`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Quản Trị Viên Tối Cao', 'superadmin@gmail.com', '$2a$10$gcqb8XIEkR0OQFCe9qNacuFXlwvaiRCUrMvyjeaa72DNAiwnpdPQW', '0901234567', 'Hà Nội, Việt Nam', '/uploads/default-avatar.png', 'SuperAdmin', 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(2, 'Quản Trị Viên Hệ Thống', 'admin@gmail.com', '$2a$10$CYsew.3ojeUlyGHjc4EgGeYlIL56CmiVZKXm5zeqJq0reVnVm767G', '0907654321', 'TP. Hồ Chí Minh', '/uploads/default-avatar.png', 'Admin', 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(3, 'Khách Hàng Nguyễn Văn A', 'user@gmail.com', '$2a$10$W/ePEeMvnVVzqUbHfbeAc.iT8r1WCS3GwJwylSYQ/3FoooOz2d7Em', '0912345678', 'Cầu Giấy, Hà Nội', '/uploads/default-avatar.png', 'User', 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(4, 'Biên Tập Viên Tin Tức & Sản Phẩm', 'editor@gmail.com', '$2a$10$gLElmiZ35pXDTWCG0OtaeOlhE.xu4aTC2tRFVD6Hvj8J5LI8wPKgi', '0988888888', 'Đà Nẵng', '/uploads/default-avatar.png', 'Editor', 1, '2026-08-01 16:52:08', '2026-08-01 16:52:08'),
(5, 'Tuấn Anh', 'tuananh.reaction@gmail.com', '$2a$10$h5EhFKCHAIHrtxf1YV5sgeCgPstuf5b6T6uEZDZuEvl14ga5vmU2O', '0967258610', 'TO 1-PHUONG HOA LU-THANH PHO PLEIKU-TINH GIA LAI-VIET NAM, 327 Tôn Thất Thuyết', 'http://localhost:5000/uploads/file-1785582509405-629268268.jpg', 'User', 1, '2026-08-01 18:08:11', '2026-08-01 18:08:29');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `slug_2` (`slug`),
  ADD UNIQUE KEY `name_3` (`name`),
  ADD UNIQUE KEY `slug_3` (`slug`),
  ADD UNIQUE KEY `name_4` (`name`),
  ADD UNIQUE KEY `slug_4` (`slug`),
  ADD UNIQUE KEY `name_5` (`name`),
  ADD UNIQUE KEY `slug_5` (`slug`),
  ADD UNIQUE KEY `name_6` (`name`),
  ADD UNIQUE KEY `slug_6` (`slug`),
  ADD UNIQUE KEY `name_7` (`name`),
  ADD UNIQUE KEY `slug_7` (`slug`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key_name` (`key_name`),
  ADD UNIQUE KEY `key_name_2` (`key_name`),
  ADD UNIQUE KEY `key_name_3` (`key_name`),
  ADD UNIQUE KEY `key_name_4` (`key_name`),
  ADD UNIQUE KEY `key_name_5` (`key_name`),
  ADD UNIQUE KEY `key_name_6` (`key_name`),
  ADD UNIQUE KEY `key_name_7` (`key_name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Mã danh mục tự tăng', AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Mã sản phẩm', AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT cho bảng `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính tự tăng', AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_13` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_14` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_13` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_14` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
