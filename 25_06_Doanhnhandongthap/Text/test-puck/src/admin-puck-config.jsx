import React from 'react';
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection from './components/admin-section';
import AdminHero from './components/admin-hero';
import AdminBannerSenHong from './components/admin-banner-senhong';
import AdminDepartments from './components/admin-departments';
import AdminIntro from './components/admin-intro';
import AdminMembers from './components/admin-members';
import AdminAboutUs from './components/admin-about-us';

// Config — đăng ký các components với fields + defaultProps + render.
export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            direction: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            bg_image: { type: 'text', label: 'URL ảnh nền' },
            opacity: { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 }
          }
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' }
      },
      defaultProps: {
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại',
              options: [
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
              ]
            },
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        title: 'Chào mừng đến với website',
        subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
        buttons: [
          { text: 'Tìm hiểu thêm', url: '#', style: 'primary' },
          { text: 'Liên hệ', url: '#contact', style: 'outline' }
        ],
        background: {
          type: 'gradient',
          gradientFrom: '#667eea', gradientTo: '#764ba2',
          gradientDirection: 'to bottom right'
        },
        layout: { align: 'center' }
      },
      render: (props) => <AdminHero {...props} />
    },

    // 1. ĐĂNG KÝ CỤM SEN HỒNG
    BannerSenHong: {
      label: 'Cụm Sen Hồng',
      fields: {
        backgroundType: {
          type: 'radio',
          options: [
            { label: 'Màu nền', value: 'color' },
            { label: 'Hình ảnh/GIF', value: 'image' }
          ],
        },
        backgroundValue: { type: 'text', label: 'Mã màu / URL Ảnh' },
        overlayColor: { type: 'text', label: 'Màu lớp phủ (Dùng mã rgba)' },
        alignment: {
          type: 'select', label: 'Căn lề khối',
          options: [
            { label: 'Trái', value: 'flex-start' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'flex-end' }
          ]
        },

        boxRadius: { type: 'text', label: 'Bo góc khối (CSS string)' },
        title: { type: 'text', label: 'Tiêu đề chính' },
        titleColor: { type: 'text', label: 'Màu tiêu đề' },
        titleSize: { type: 'text', label: 'Cỡ chữ tiêu đề' },
        description: { type: 'textarea', label: 'Mô tả' },
        descColor: { type: 'text', label: 'Màu mô tả' },
        buttonText: { type: 'text', label: 'Chữ trên nút' },
        buttonBgColor: { type: 'text', label: 'Màu nền nút' },
        buttonTextColor: { type: 'text', label: 'Màu chữ nút' },
        buttonRadius: { type: 'text', label: 'Bo góc nút (CSS string)' }
      },
      defaultProps: {
        backgroundType: 'image',
        backgroundValue: 'https://webdemo.hexagon.xyz/medias/hieuunghero.webp',
        overlayColor: '#1e40af',
        alignment: 'flex-start',
        boxRadius: '60px 24px 60px 24px',
        title: 'Sen Hồng',
        titleColor: '#facc15',
        titleSize: '48px',
        description: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác - Đổi mới - Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan toả sẻ chia nghĩa tình quê hương.',
        descColor: '#ffffff',
        buttonText: 'Tham gia cộng đồng',
        buttonBgColor: '#3b82f6',
        buttonTextColor: '#ffffff',
        buttonRadius: '60px 24px 60px 24px'
      },
      render: (props) => <AdminBannerSenHong {...props} />,
    },
    // 2. ĐĂNG KÝ CÁC BAN CHUYÊN MÔN
    Departments: {
      label: 'Các Ban Chuyên Môn',
      fields: {
        backgroundType: {
          type: 'radio', label: 'Loại nền',
          options: [{ label: 'Màu', value: 'color' }, { label: 'Ảnh', value: 'image' }]
        },
        backgroundValue: { type: 'text', label: 'Giá trị nền' },
        mainTitle: { type: 'text', label: 'Tiêu đề chính' },
        titleColor: { type: 'text', label: 'Màu tiêu đề' },
        subTitle: { type: 'text', label: 'Tiêu đề phụ' },
        items: {
          type: 'array', label: 'Danh sách Ban',
          getItemSummary: (item) => item.title || 'Ban chuyên môn',
          arrayFields: {
            title: { type: 'text', label: 'Tên ban' },
            icon: { type: 'text', label: 'Link Icon' },
            btnText: { type: 'text', label: 'Chữ nút' },
            btnRadius: { type: 'text', label: 'Bo góc nút' }
          }
        }
      },
      defaultProps: {
        backgroundType: 'color',
        backgroundValue: '#eef2ff',
        mainTitle: 'CÁC BAN CHUYÊN MÔN',
        titleColor: '#1e3a8a',
        subTitle: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
        items: [
          { title: 'Ban Kinh tế - Đầu tư', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' },
          { title: 'Ban Văn hóa - Thể thao', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' },
          { title: 'Ban Xã hội - Cộng đồng', icon: 'https://via.placeholder.com/50', btnText: 'Xem hoạt động', btnRadius: '20px' }
        ]
      },
      render: (props) => <AdminDepartments {...props} />,
    },

    // 3. ĐĂNG KÝ VỀ CÂU LẠC BỘ & CƠ CẤU
    AboutUs: {
      label: 'Về CLB & Tổ Chức',
      fields: {
        backgroundType: {
          type: 'radio', label: 'Loại nền',
          options: [{ label: 'Màu', value: 'color' }, { label: 'Ảnh', value: 'image' }]
        },
        backgroundValue: { type: 'text', label: 'Giá trị nền' },
        columns: {
          type: 'array', label: 'Các Cột Thông Tin',
          getItemSummary: (item) => item.title || 'Cột thông tin',
          arrayFields: {
            type: {
              type: 'select', label: 'Loại nội dung',
              options: [
                { label: 'Đoạn văn bản', value: 'text' },
                { label: 'Danh sách nhân sự', value: 'team' }
              ]
            },
            title: { type: 'text', label: 'Tiêu đề cột' },
            content: { type: 'textarea', label: 'Nội dung (Text)' },
            image: { type: 'text', label: 'Ảnh góc dưới (Text)' },
          }
        }
      },
      defaultProps: {
        backgroundType: 'color',
        backgroundValue: '#fdf4ff',
        columns: [
          { type: 'text', title: 'VỀ CÂU LẠC BỘ', content: 'Nội dung giới thiệu ở đây...' },
          { type: 'team', title: 'CƠ CẤU TỔ CHỨC', content: '' }
        ]
      },
      render: (props) => <AdminAboutUs {...props} />,
    },
    // ĐĂNG KÝ PHẦN GIỚI THIỆU CHUNG (INTRO)
    Intro: {
      label: 'Giới thiệu (Intro)',
      fields: {
        title: { type: 'text', label: 'Tiêu đề' },
        subtitle: { type: 'text', label: 'Tiêu đề phụ' },
        description1: { type: 'textarea', label: 'Đoạn văn 1' },
        description2: { type: 'textarea', label: 'Đoạn văn 2' },
        coreValues: {
          type: 'array', label: 'Tầm nhìn & Sứ mệnh (có thể thêm bớt)',
          getItemSummary: (item) => item.title || 'Mục',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề (VD: Tầm nhìn)' },
            description: { type: 'textarea', label: 'Nội dung' }
          }
        },
        imageSrc: { type: 'text', label: 'URL Hình ảnh' },
        stats: {
          type: 'array', label: 'Thống kê (Stats)',
          getItemSummary: (item) => item.label || 'Stat',
          arrayFields: {
            value: { type: 'text', label: 'Giá trị (VD: 500+)' },
            label: { type: 'text', label: 'Mô tả (VD: Doanh nghiệp)' }
          }
        }
      },
      defaultProps: {
        title: 'Giới thiệu Doanh nhân Đồng Tháp',
        subtitle: 'Kết nối – Đồng hành – Phát triển',
        description1: 'Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.',
        description2: 'Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh.',
        coreValues: [
          { title: 'Tầm nhìn', description: 'Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập.' },
          { title: 'Sứ mệnh', description: 'Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững.' }
        ],
        imageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stats: [
          { value: '500+', label: 'Doanh nghiệp tham gia' },
          { value: '50+', label: 'Sự kiện kết nối mỗi năm' },
          { value: '100%', label: 'Hướng đến phát triển bền vững' }
        ]
      },
      render: (props) => <AdminIntro {...props} />
    },
    // ĐĂNG KÝ PHẦN HỘI VIÊN (MEMBERS)
    Members: {
      label: 'Hội viên (Members)',
      fields: {
        title: { type: 'text', label: 'Tiêu đề chính' },
        subtitle: { type: 'text', label: 'Tiêu đề phụ' },
        description1: { type: 'textarea', label: 'Đoạn văn 1' },
        description2: { type: 'textarea', label: 'Đoạn văn 2' },
        benefitsTitle: { type: 'text', label: 'Tiêu đề hộp Quyền lợi' },
        benefits: {
          type: 'array', label: 'Danh sách Quyền lợi',
          getItemSummary: (item) => item.text || 'Quyền lợi',
          arrayFields: {
            text: { type: 'text', label: 'Nội dung quyền lợi' }
          }
        },
        imageSrc: { type: 'text', label: 'URL Hình ảnh' },
        stats: {
          type: 'array', label: 'Thống kê (4 cột)',
          getItemSummary: (item) => item.label || 'Stat',
          arrayFields: {
            value: { type: 'text', label: 'Giá trị' },
            label: { type: 'text', label: 'Mô tả' }
          }
        }
      },
      defaultProps: {
        title: 'HỘI VIÊN',
        subtitle: 'Cộng đồng doanh nhân cùng phát triển',
        description1: 'Hội viên là lực lượng nòng cốt tạo nên sự kết nối, chia sẻ và phát triển trong cộng đồng doanh nghiệp Đồng Tháp.',
        description2: 'Việc tham gia hội viên mở ra cơ hội mở rộng mạng lưới, trao đổi kinh nghiệm, tiếp cận chương trình hỗ trợ và đồng hành trong các hoạt động xúc tiến thương mại.',
        benefitsTitle: 'Quyền lợi hội viên',
        benefits: [
          { text: 'Tham gia các chương trình kết nối doanh nghiệp' },
          { text: 'Tiếp cận hoạt động đào tạo và hội thảo chuyên đề' },
          { text: 'Nhận thông tin thị trường và cơ hội hợp tác' },
          { text: 'Tham gia các hoạt động cộng đồng doanh nhân' },
          { text: 'Đồng hành cùng các chương trình phát triển địa phương' }
        ],
        imageSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        stats: [
          { value: '800+', label: 'Hội viên' },
          { value: '120+', label: 'Đối tác' },
          { value: '40+', label: 'Sự kiện / năm' },
          { value: '12', label: 'Nhóm kết nối' }
        ]
      },
      render: (props) => <AdminMembers {...props} />
    }
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero', 'BannerSenHong', 'Departments', 'AboutUs', 'Intro', 'Members'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;