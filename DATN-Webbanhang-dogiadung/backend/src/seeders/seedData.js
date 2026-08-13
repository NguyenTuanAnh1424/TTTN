const { sequelize, User, Category, Product, Banner, News, Setting } = require('../models');

/**
 * Hàm khởi tạo dữ liệu mẫu (Seeder) cho Cơ sở dữ liệu MySQL
 */
const seedDatabase = async () => {
  try {
    console.log('🔄 Đang kiểm tra và khởi tạo dữ liệu mẫu cho Database...');

    // 1. Tạo Tài Khoản Mẫu cho 4 Vai Trò (SuperAdmin, Admin, Editor, User)
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('👤 Đang tạo các tài khoản mẫu...');
      await User.bulkCreate([
        {
          name: 'Quản Trị Viên Tối Cao',
          email: 'superadmin@gmail.com',
          password: '123456', // Tự động hóa bằng bcrypt hook
          role: 'SuperAdmin',
          phone: '0901234567',
          address: 'Hà Nội, Việt Nam'
        },
        {
          name: 'Quản Trị Viên Hệ Thống',
          email: 'admin@gmail.com',
          password: '123456',
          role: 'Admin',
          phone: '0907654321',
          address: 'TP. Hồ Chí Minh'
        },
        {
          name: 'Biên Tập Viên Tin Tức & Sản Phẩm',
          email: 'editor@gmail.com',
          password: '123456',
          role: 'Editor',
          phone: '0988888888',
          address: 'Đà Nẵng'
        },
        {
          name: 'Khách Hàng Nguyễn Văn A',
          email: 'user@gmail.com',
          password: '123456',
          role: 'User',
          phone: '0912345678',
          address: 'Cầu Giấy, Hà Nội'
        }
      ], { individualHooks: true });
      console.log('✅ Đã tạo thành công các tài khoản mẫu!');
    }

    // 2. Tạo Danh Mục Sản Phẩm Gia Dụng Mẫu (Phân cấp)
    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      console.log('📦 Đang tạo các danh mục đồ gia dụng mẫu...');
      
      // Tạo danh mục cha
      const cat1 = await Category.create({ name: 'DỤNG CỤ NẤU ĂN', slug: 'dung-cu-nau-an', parent_id: null });
      const cat2 = await Category.create({ name: 'LƯU TRỮ', slug: 'luu-tru', parent_id: null });
      const cat3 = await Category.create({ name: 'DỤNG CỤ SẮP XẾP', slug: 'dung-cu-sap-xep', parent_id: null });

      // Tạo danh mục con
      await Category.bulkCreate([
        { name: 'NỒI & CHẢO', slug: 'noi-chao', parent_id: cat1.id },
        { name: 'DỤNG CỤ NHÀ BẾP', slug: 'dung-cu-nha-bep', parent_id: cat1.id },
        { name: 'THAU & RỔ', slug: 'thau-ro', parent_id: cat1.id },
        { name: 'DAO & THỚT', slug: 'dao-thot', parent_id: cat1.id },
        { name: 'DỤNG CỤ LÒ NƯỚNG & LÓT NỒI', slug: 'dung-cu-lo-nuong-lot-noi', parent_id: cat1.id },
        { name: 'ĐỒ VẢI NHÀ BẾP', slug: 'do-vai-nha-bep', parent_id: cat1.id },
        { name: 'BẾP ĐIỆN & BẾP TỪ', slug: 'bep-dien-bep-tu', parent_id: cat1.id },

        { name: 'HỘP & HŨ ĐỰNG THỰC PHẨM', slug: 'hop-hu-dung-thuc-pham', parent_id: cat2.id },
        { name: 'HŨ GIA VỊ', slug: 'hu-gia-vi', parent_id: cat2.id },
        { name: 'BÌNH NƯỚC & HỘP CƠM', slug: 'binh-nuoc-hop-com', parent_id: cat2.id },
        { name: 'BÌNH NƯỚC & BÌNH RÓT CÓ VÒI', slug: 'binh-nuoc-binh-rot-co-voi', parent_id: cat2.id },
        { name: 'HỘP ĐỰNG GẠO', slug: 'hop-dung-gao', parent_id: cat2.id },

        { name: 'KỆ BẾP & MÓC TREO', slug: 'ke-bep-moc-treo', parent_id: cat3.id },
        { name: 'ĐỒ SẮP XẾP TRONG TỦ', slug: 'do-sap-xep-trong-tu', parent_id: cat3.id },
        { name: 'ĐỒ SẮP XẾP TỦ LẠNH', slug: 'do-sap-xep-tu-lanh', parent_id: cat3.id },
        { name: 'XE ĐẨY GIA DỤNG', slug: 'xe-day-gia-dung', parent_id: cat3.id },
        { name: 'TRASH BINS & DUST BOXES', slug: 'trash-bins-dust-boxes', parent_id: cat3.id }
      ]);
      console.log('✅ Đã tạo xong danh mục mẫu phân cấp!');
    }

    // 3. Tạo Sản Phẩm Đồ Gia Dụng Mẫu
    const productCount = await Product.count();
    if (productCount === 0) {
      console.log('🛒 Đang tạo sản phẩm đồ gia dụng mẫu...');
      
      // Lấy danh mục con để gắn sản phẩm
      const noiChaoCat = await Category.findOne({ where: { slug: 'noi-chao' } });
      const dungCuBepCat = await Category.findOne({ where: { slug: 'dung-cu-nha-bep' } });
      const thungRacCat = await Category.findOne({ where: { slug: 'trash-bins-dust-boxes' } });

      await Product.bulkCreate([
        {
          category_id: noiChaoCat ? noiChaoCat.id : 1,
          name: 'Nồi Chiên Không Dầu Sunhouse 5.5L SHD4026',
          slug: 'noi-chien-khong-dau-sunhouse-5-5l-shd4026',
          image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop',
          price: 1890000,
          sale_price: 1450000,
          quantity: 50,
          short_description: 'Công nghệ Rapid Air giảm 80% mỡ thừa, dung tích lớn 5.5L phù hợp gia đình 4-6 người.',
          description: 'Nồi chiên không dầu Sunhouse SHD4026 thiết kế hiện đại với mặt kính cường lực chịu nhiệt. Công nghệ chiên Rapid Air tuần hoàn không khí nóng giúp thức ăn chín đều, giòn rụm bên ngoài và mềm mọng bên trong mà không cần dùng dầu mỡ.',
          is_new: true,
          is_sale: true,
          is_best: true
        },
        {
          category_id: noiChaoCat ? noiChaoCat.id : 1,
          name: 'Nồi Cơm Điện Cao Tần Philips 1.8L HD4515',
          slug: 'noi-com-dien-cao-tan-philips-1-8l-hd4515',
          image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=600&auto=format&fit=crop',
          price: 2200000,
          sale_price: 1850000,
          quantity: 35,
          short_description: 'Nấu cơm dẻo thơm với 8 chế độ nấu tự động thông minh.',
          description: 'Nồi cơm điện Philips HD4515 tích hợp công nghệ nấu Smart 3D giúp hạt cơm chín đều từ trong ra ngoài. Lòng nồi phủ lớp chống dính Bakuhanseki bền gấp 6 lần so với lòng nồi thông thường.',
          is_new: false,
          is_sale: true,
          is_best: true
        },
        {
          category_id: dungCuBepCat ? dungCuBepCat.id : 1,
          name: 'Robot Hút Bụi Lau Nhà Xiaomi Vacuum E10',
          slug: 'robot-hut-bui-lau-nha-xiaomi-vacuum-e10',
          image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop',
          price: 4500000,
          sale_price: 3690000,
          quantity: 20,
          short_description: 'Lực hút 4000Pa mạnh mẽ, điều khiển thông minh qua ứng dụng Mi Home.',
          description: 'Robot hút bụi lau nhà Xiaomi Vacuum E10 trang bị động cơ hút cực mạnh 4000Pa cùng hệ thống cảm biến tránh vật cản chính xác. Tự động lập bản đồ căn hộ và dọn dẹp sạch sẽ góc ngách.',
          is_new: true,
          is_sale: true,
          is_best: true
        },
        {
          category_id: dungCuBepCat ? dungCuBepCat.id : 1,
          name: 'Máy Lọc Nước RO Karofi Slim S-s038 8 Lõi',
          slug: 'may-loc-nuoc-ro-karofi-slim-s-s038-8-loi',
          image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop',
          price: 6800000,
          sale_price: 5490000,
          quantity: 15,
          short_description: 'Hệ thống 8 lõi lọc mạnh mẽ, bổ sung khoáng chất chuẩn nước uống trực tiếp.',
          description: 'Máy lọc nước Karofi Slim S-s038 sở hữu thiết kế siêu mỏng tiết kiệm diện tích. Màng lọc RO Purifim Mỹ giúp loại bỏ 99.99% vi khuẩn, kim loại nặng và tạp chất có hại.',
          is_new: false,
          is_sale: false,
          is_best: false
        },
        {
          category_id: thungRacCat ? thungRacCat.id : 1,
          name: 'Quạt Tháp Điện Tử Panasonic F-409K',
          slug: 'quat-thap-dien-tu-panasonic-f-409k',
          image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&auto=format&fit=crop',
          price: 1590000,
          sale_price: 1290000,
          quantity: 40,
          short_description: 'Vận hành êm ái, có điều khiển từ xa thông minh.',
          description: 'Quạt tháp Panasonic mang đến luồng gió mát tự nhiên dịu nhẹ, độ ồn cực thấp không gây ảnh hưởng đến giấc ngủ của gia đình.',
          is_new: true,
          is_sale: false,
          is_best: false
        }
      ]);
      console.log('✅ Đã tạo xong các sản phẩm mẫu!');
    }

    // 4. Tạo Banners Quảng Cáo Mẫu
    const bannerCount = await Banner.count();
    if (bannerCount === 0) {
      console.log('🖼️ Đang tạo Banners mẫu...');
      await Banner.bulkCreate([
        {
          title: 'Đại Tiệc Đồ Gia Dụng - Giảm Giá Đến 50%',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop',
          link: '/products?sale=true',
          status: true
        },
        {
          title: 'Thiết Bị Nhà Bếp Thông Minh Cho Mọi Gia Đình',
          image: 'https://images.unsplash.com/photo-1556911260-ac2f5a5839b2?w=1200&auto=format&fit=crop',
          link: '/category/noi-chien-khong-dau',
          status: true
        }
      ]);
      console.log('✅ Đã tạo xong Banner mẫu!');
    }

    // 5. Tạo Bài Viết Tin Tức Mẫu
    const newsCount = await News.count();
    if (newsCount === 0) {
      console.log('📰 Đang tạo Tin tức mẫu...');
      await News.bulkCreate([
        {
          title: 'Top 5 Nồi Chiên Không Dầu Tốt Nhất Năm 2026',
          slug: 'top-5-noi-chien-khong-dau-tot-nhat-nam-2026',
          image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop',
          summary: 'Nồi chiên không dầu đang là trợ thủ đắc lực trong căn bếp của mọi gia đình hiện đại. Cùng tìm hiểu top 5 sản phẩm đáng mua nhất!',
          content: 'Nồi chiên không dầu mang lại giải pháp ăn uống lành mạnh, hạn chế dầu mỡ. Với dung tích đa dạng và các tính năng hẹn giờ, chỉnh nhiệt độ thông minh...',
          status: true
        },
        {
          title: 'Mẹo Sử Dụng Máy Lọc Nước Bền Lâu Và Tiết Kiệm Lõi Lọc',
          slug: 'meo-su-dung-may-loc-nuoc-ben-lau',
          image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop',
          summary: 'Hướng dẫn vệ sinh và kiểm tra thời gian thay lõi lọc nước định kỳ để duy trì nguồn nước sạch tinh khiết.',
          content: 'Thay lõi lọc nước định kỳ là vô cùng quan trọng đối với sức khỏe cả gia đình. Bạn nên kiểm tra lõi lọc số 1, 2, 3 mỗi 3-6 tháng...',
          status: true
        }
      ]);
      console.log('✅ Đã tạo xong Tin tức mẫu!');
    }

    // 6. Tạo Cấu Hình Giao Diện Hệ Thống Mẫu (Settings)
    const settingCount = await Setting.count();
    if (settingCount === 0) {
      console.log('⚙️ Đang tạo Cấu hình Giao diện mẫu...');
      await Setting.bulkCreate([
        { key_name: 'site_logo', key_value: ' GiaDungStore', description: 'Logo của Website' },
        { key_name: 'primary_color', key_value: '#2563eb', description: 'Màu sắc chủ đạo của Website (Màu Xanh Blue)' },
        { key_name: 'show_new_products', key_value: 'true', description: 'Hiển thị mục Sản phẩm mới ở trang chủ' },
        { key_name: 'show_best_products', key_value: 'true', description: 'Hiển thị mục Sản phẩm bán chạy ở trang chủ' },
        { key_name: 'show_sale_products', key_value: 'true', description: 'Hiển thị mục Sản phẩm giảm giá ở trang chủ' },
        { key_name: 'show_news_section', key_value: 'true', description: 'Hiển thị mục Tin tức ở trang chủ' }
      ]);
      console.log('✅ Đã tạo xong Cấu hình Giao diện!');
    }

    console.log('🎉 Hoàn thành khởi tạo toàn bộ dữ liệu mẫu CSDL!');
  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo dữ liệu mẫu:', error);
  }
};

module.exports = seedDatabase;
