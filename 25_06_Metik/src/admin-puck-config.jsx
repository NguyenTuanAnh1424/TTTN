import React from 'react';
import AdminTrangChuMetik from './components/admin-trangchu-metik';
import AdminGioiThieuMetik from './components/admin-gioithieu-metik';
import AdminSanPhamMetik from './components/admin-sanpham-metik';
import AdminLienHeMetik from './components/admin-lienhe-metik';

// For the scaffold, we define components inline to avoid missing file errors.
// You can move these to src/components/ later.

const AdminHeading = ({ content, level }) => {
  const Tag = `h${level}`;
  return <Tag className="text-2xl font-bold mb-4">{content}</Tag>;
};

const AdminIntro = ({ title, subtitle, paragraph1, paragraph2 }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-white">
      <div className="flex-1">
        <h2 className="text-blue-700 text-3xl font-bold mb-2">{title}</h2>
        <h3 className="text-lg text-gray-700 font-semibold mb-4">{subtitle}</h3>
        <p className="text-gray-600 mb-4 whitespace-pre-wrap">{paragraph1}</p>
        <p className="text-gray-600 whitespace-pre-wrap">{paragraph2}</p>
      </div>
      <div className="flex-1">
        <div className="bg-gray-200 w-full h-64 rounded flex items-center justify-center text-gray-500">
          [Image Placeholder]
        </div>
      </div>
    </div>
  );
};

export const puckConfig = {
  components: {
    TrangChu: {
      label: 'Trang Chủ (Banner + Sản phẩm)',
      fields: {
        bannerTitle: { type: 'text', label: 'Tiêu đề Banner' },
        bannerImageUrl: { type: 'text', label: 'URL Hình ảnh Nền Banner' },
        productsTitle: { type: 'text', label: 'Tiêu đề Phần Sản Phẩm' },
        products: {
          type: 'array',
          label: 'Danh sách sản phẩm',
          arrayFields: {
            title: { type: 'text', label: 'Tên sản phẩm' },
            imageUrl: { type: 'text', label: 'Link hình ảnh' }
          }
        }
      },
      defaultProps: {
        bannerTitle: 'Snack Pellets',
        bannerImageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=2070&auto=format&fit=crop',
        productsTitle: 'SẢN PHẨM MỚI',
        products: [
          { title: 'Snack 1', imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=600&auto=format&fit=crop' },
          { title: 'Snack 2', imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop' },
          { title: 'Snack 3', imageUrl: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=600&auto=format&fit=crop' },
          { title: 'Snack 4', imageUrl: 'https://images.unsplash.com/photo-1623910271038-da1b4b23ce5f?q=80&w=600&auto=format&fit=crop' },
        ]
      },
      render: (props) => <AdminTrangChuMetik {...props} />
    },
    GioiThieu: {
      label: 'Giới thiệu Metik',
      fields: {
        videoUrl: { type: 'text', label: 'Link Video (mp4)' },
        paragraph1: { type: 'textarea', label: 'Đoạn văn 1' },
        paragraph2: { type: 'textarea', label: 'Đoạn văn 2' }
      },
      defaultProps: {
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        paragraph1: 'Với tinh thần "Chạm mê tít – Snap into Joy", metik mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, metik mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.',
        paragraph2: 'metik không chỉ là một sản phẩm snack. metik là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.'
      },
      render: (props) => <AdminGioiThieuMetik {...props} />
    },
    SanPham: {
      label: 'Sản phẩm Metik',
      fields: {
        breadcrumb: { type: 'text', label: 'Đường dẫn (VD: TRANG CHỦ / SẢN PHẨM)' },
        products: {
          type: 'array',
          label: 'Danh sách sản phẩm',
          arrayFields: {
            title: { type: 'text', label: 'Tên sản phẩm' },
            imageUrl: { type: 'text', label: 'Link hình ảnh' }
          }
        }
      },
      defaultProps: {
        breadcrumb: 'TRANG CHỦ / SẢN PHẨM',
        products: [
          { title: 'Snack vị Bắp', imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=600&auto=format&fit=crop' },
          { title: 'Snack vị BBQ', imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop' },
          { title: 'Snack vị Phô mai', imageUrl: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=600&auto=format&fit=crop' },
          { title: 'Snack vị Tảo biển', imageUrl: 'https://images.unsplash.com/photo-1623910271038-da1b4b23ce5f?q=80&w=600&auto=format&fit=crop' },
        ]
      },
      render: (props) => <AdminSanPhamMetik {...props} />
    },
    LienHe: {
      label: 'Liên hệ Metik',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' }
      },
      defaultProps: {
        title: 'Liên hệ Metik'
      },
      render: (props) => <AdminLienHeMetik {...props} />
    },
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung' },
        level: {
          type: 'select', 
          label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        }
      },
      defaultProps: {
        content: 'Tiêu đề mặc định',
        level: 2
      },
      render: ({ content, level }) => <AdminHeading content={content} level={level} />
    },
    Intro: {
      label: 'Giới thiệu (Intro)',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'text', label: 'Tiêu đề phụ' },
        paragraph1: { type: 'textarea', label: 'Đoạn văn 1' },
        paragraph2: { type: 'textarea', label: 'Đoạn văn 2' }
      },
      defaultProps: {
        title: 'Giới thiệu Doanh nhân Đồng Tháp',
        subtitle: 'Kết nối - Đồng hành - Phát triển',
        paragraph1: 'Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối...',
        paragraph2: 'Với tinh thần đổi mới, sáng tạo và phát triển lâu dài...'
      },
      render: (props) => <AdminIntro {...props} />
    }
  }
};
