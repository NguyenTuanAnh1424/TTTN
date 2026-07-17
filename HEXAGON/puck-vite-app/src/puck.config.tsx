import type { Config } from "@measured/puck";
import { Hexagon, ArrowUp, MapPin, Mail, Phone, Calendar, CheckCircle } from "lucide-react";
import { CountingStat } from "./components/CountingStat";
import Hero from "./components/Hero";
import ActivityCarousel from "./components/ActivityCarousel";
import PartnerMarquee from "./components/PartnerMarquee";
import { motion } from "framer-motion";

type Props = {
  HeaderBlock: {
    logoText: string;
    navItems: { label: string; href: string }[];
  };
  HeroBlock: {
    badgeText: string;
    titleLine1: string;
    titleLine2: string;
    titleLine2Highlight: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    scrollText: string;
  };
  AboutBlock: {
    title: string;
    description: string;
    slogan: string;
    sloganAuthor: string;
    stats: { value: string; label: string }[];
  };
  ActivityBlock: {
    title: string;
    subtitle: string;
    activities: { title: string; image?: string }[];
  };
  PartnerBlock: {
    title: string;
    partners: { id: string; name: string; logoUrl: string }[];
  };
  NewsBlock: {
    title: string;
    subtitle: string;
    news: { id: string; title: string; excerpt: string; date: string; imageUrl: string; link: string }[];
  };
  ContactBlock: {
    title: string;
    subtitle: string;
    address: string;
    email: string;
    phone: string;
    socials: { name: string; url: string }[];
    mapUrl: string;
  };
  FooterBlock: {
    copyright: string;
  };
  SolutionHeroBlock: {
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
  };
  FeaturedSolutionsBlock: {
    title: string;
    solutions: { title: string; description: string }[];
  };
  ProcessBlock: {
    title: string;
    subtitle: string;
    steps: { title: string }[];
  };
  CTABlock: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
};

export const config: Config<Props> = {
  components: {
    HeaderBlock: {
      label: "Menu Điều Hướng",
      fields: {
        logoText: { type: "text" },
        navItems: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            href: { type: "text" },
          },
        },
      },
      defaultProps: {
        logoText: "HEXAGON",
        navItems: [
          { label: "Trang chủ", href: "#" },
          { label: "Giới thiệu", href: "#" },
          { label: "Dịch vụ", href: "#" },
          { label: "Hỗ trợ", href: "#" },
          { label: "Liên hệ", href: "#" },
        ],
      },
      render: ({ logoText, navItems }) => (
        <header className="w-full bg-[#115b40] text-white py-4 px-8 flex justify-between items-center z-50 relative border-b border-teal-800/50">
          <div className="flex items-center space-x-2">
            <img 
              src="https://hunghau.vn/wp-content/uploads/2019/06/HHC-logo.png" 
              alt="HHC Logo" 
              className="h-10 object-contain mix-blend-screen brightness-0 invert" 
            />
            <span className="font-bold text-xl tracking-wider">{logoText}</span>
          </div>
          <nav className="flex space-x-6 text-sm font-medium">
            {navItems.map((item, i) => (
              <a key={i} href={item.href} className="hover:text-teal-300 transition-colors">
                {item.label}
              </a>
            ))}
            <div className="flex space-x-2 ml-4 pl-4 border-l border-teal-700">
              <span className="cursor-pointer" title="Vietnamese">🇻🇳</span>
              <span className="cursor-pointer opacity-50 hover:opacity-100" title="English">🇬🇧</span>
            </div>
          </nav>
        </header>
      ),
    },
    HeroBlock: {
      label: "Banner Trang Chủ",
      fields: {
        badgeText: { type: "text" },
        titleLine1: { type: "text" },
        titleLine2: { type: "text" },
        titleLine2Highlight: { type: "text" },
        description: { type: "textarea" },
        primaryButtonText: { type: "text" },
        secondaryButtonText: { type: "text" },
        scrollText: { type: "text" },
      },
      defaultProps: {
        badgeText: "CÔNG NGHỆ TƯƠNG LAI",
        titleLine1: "Dịch vụ",
        titleLine2: "HEXAGON ",
        titleLine2Highlight: "Solutions",
        description: "HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp Internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.",
        primaryButtonText: "Khám phá Dịch vụ",
        secondaryButtonText: "Liên hệ Tư vấn",
        scrollText: "Cuộn xuống để khám phá",
      },
      render: (props) => <Hero {...props} />,
    },
    AboutBlock: {
      label: "Giới Thiệu",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        slogan: { type: "textarea" },
        sloganAuthor: { type: "text" },
        stats: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
            label: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Về Hexagon",
        description: "Hexagon Corporation - Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.",
        stats: [
          { value: "97+", label: "Dự án đã thực hiện" },
          { value: "29+", label: "Đối tác đồng hành" },
          { value: "24+", label: "Đội ngũ kỹ thuật" },
          { value: "24/7", label: "Hỗ trợ xuyên suốt" },
        ],
        slogan: "Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^",
        sloganAuthor: "HEXAGON CULTURE",
      },
      render: ({ title, description, slogan, sloganAuthor, stats }) => (
        <section className="bg-white w-full py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10 max-w-[1280px]">
            {/* Left Image Area */}
            <div className="w-full md:w-1/2 relative">
              {/* Light Green Offset Background */}
              <div className="absolute -inset-4 bg-[#e6f4ea] rounded-xl z-0 transform -rotate-1"></div>
              
              <div className="relative rounded-xl overflow-hidden shadow-md z-10 border border-gray-100 bg-white">
                <img 
                  src="https://house.hunghau.vn/wp-content/uploads/2019/11/VPX16.jpg" 
                  alt="Hexagon Building" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating Slogan Card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 max-w-[280px] z-20">
                <p className="text-gray-800 italic mb-4 font-medium leading-relaxed">"{slogan}"</p>
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-6 h-[2px] bg-orange-500"></div>
                  <span className="text-orange-500 font-bold text-xs tracking-wider uppercase">{sloganAuthor}</span>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="w-full md:w-1/2 flex flex-col justify-center pt-16 md:pt-0 pl-0 md:pl-10">
              <h2 className="text-4xl font-bold text-[#115b40] mb-6">{title}</h2>
              <p className="text-gray-600 leading-relaxed mb-10 text-base">
                {description}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <CountingStat key={idx} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
    },
    ActivityBlock: {
      label: "Lĩnh Vực Hoạt Động",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        activities: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            image: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Lĩnh vực hoạt động",
        subtitle: "Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:",
        activities: [
          { title: "Giải pháp công nghệ", image: "" },
          { title: "Giải pháp thi công & lắp đặt", image: "" },
          { title: "Cung cấp thiết bị CNTT", image: "" },
          { title: "Dịch vụ Công nghệ thông tin", image: "" },
          { title: "Bảo mật & Giám sát", image: "" },
        ],
      },
      render: ({ title, subtitle, activities }) => (
        <section className="bg-green-50/50 w-full py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl font-bold text-[#115b40] mb-4">{title}</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">{subtitle}</p>
            
            <ActivityCarousel activities={activities} />
          </div>

          {/* Scroll to Top Button */}
          <div className="absolute bottom-10 right-10">
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </section>
      ),
    },
    PartnerBlock: {
      label: "Đối Tác Liên Kết",
      fields: {
        title: { type: "text" },
        partners: {
          type: "array",
          arrayFields: {
            id: { type: "text" },
            name: { type: "text" },
            logoUrl: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Các đối tác liên kết",
        partners: [
          { id: "1", name: "COMOON", logoUrl: "" },
          { id: "2", name: "Hexagon 1", logoUrl: "" },
          { id: "3", name: "Hexagon 2", logoUrl: "" },
          { id: "4", name: "Hexagon 3", logoUrl: "" },
          { id: "5", name: "Hexagon 4", logoUrl: "" },
          { id: "6", name: "Hexagon 5", logoUrl: "" },
        ],
      },
      render: ({ title, partners }) => (
        <section className="bg-green-50/30 w-full py-24 relative overflow-hidden">
          <div className="container mx-auto max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-4"
            >
              <h2 className="text-3xl font-bold text-[#115b40]">{title}</h2>
            </motion.div>
            
            <PartnerMarquee partners={partners} />
          </div>
        </section>
      ),
    },
    NewsBlock: {
      label: "Tin Tức",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        news: {
          type: "array",
          arrayFields: {
            id: { type: "text" },
            title: { type: "text" },
            excerpt: { type: "textarea" },
            date: { type: "text" },
            imageUrl: { type: "text" },
            link: { type: "text" },
          }
        }
      },
      defaultProps: {
        title: "Tin tức",
        subtitle: "Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.",
        news: [
          { 
            id: "1", 
            title: "Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu", 
            excerpt: "Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...", 
            date: "26 thg 6, 2026", 
            imageUrl: "https://placehold.co/800x400/115b40/ffffff?text=Team+Building", 
            link: "#" 
          },
          { 
            id: "2", 
            title: "Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên", 
            excerpt: "Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trọn...", 
            date: "26 thg 6, 2026", 
            imageUrl: "https://placehold.co/800x400/115b40/ffffff?text=University+Event", 
            link: "#" 
          }
        ]
      },
      render: ({ title, subtitle, news }) => (
        <section className="bg-white w-full py-24 relative">
          <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#115b40] mb-4">{title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{item.excerpt}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center text-orange-500 text-sm font-medium">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{item.date}</span>
                      </div>
                      <a href={item.link} className="text-orange-500 text-sm font-semibold hover:underline">
                        Xem chi tiết →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    },
    ContactBlock: {
      label: "Liên Hệ",
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        address: { type: "text" },
        email: { type: "text" },
        phone: { type: "text" },
        mapUrl: { type: "text" },
        socials: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            url: { type: "text" },
          },
        },
      },
      defaultProps: {
        title: "Liên hệ với chúng tôi",
        subtitle: "Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.",
        address: "615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh",
        email: "info@hexagon.xyz",
        phone: "096 446 0333",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3919.4602324211!2d106.6436!3d10.7937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzM3LjMiTiAxMDbCsDM4JzM3LjAiRQ!5e0!3m2!1sen!2s!4v1630000000000!5m2!1sen!2s",
        socials: [
          { name: "Facebook", url: "#" },
          { name: "LinkedIn", url: "#" },
          { name: "YouTube", url: "#" },
          { name: "Zalo", url: "#" },
        ]
      },
      render: ({ title, subtitle, address, email, phone, mapUrl, socials }) => (
        <section className="bg-white w-full py-24 relative">
          <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between gap-12 max-w-[1280px]">
            {/* Left Info */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-[#115b40] mb-4">{title}</h2>
              <p className="text-gray-600 mb-10 leading-relaxed">{subtitle}</p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-cyan-50 text-cyan-600 rounded-full flex-shrink-0 border border-cyan-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#115b40] text-sm">Trụ sở chính</h4>
                    <p className="text-gray-600 text-sm mt-1">{address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-cyan-50 text-cyan-600 rounded-full flex-shrink-0 border border-cyan-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#115b40] text-sm">Email</h4>
                    <p className="text-gray-600 text-sm mt-1">{email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-cyan-50 text-cyan-600 rounded-full flex-shrink-0 border border-cyan-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#115b40] text-sm">Hotline</h4>
                    <p className="text-gray-600 text-sm mt-1">{phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.url}
                    className="px-4 py-2 bg-cyan-50 text-[#115b40] font-semibold text-sm rounded hover:bg-cyan-100 transition-colors border border-cyan-100"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Map */}
            <div className="w-full lg:w-7/12 min-h-[400px]">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <iframe 
                  src={mapUrl} 
                  className="w-full h-full min-h-[400px]" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      ),
    },
    SolutionHeroBlock: {
      label: "Banner Giải Pháp",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
        imageUrl: { type: "text" }
      },
      defaultProps: {
        title: "Giải pháp công nghệ",
        description: "Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.",
        buttonText: "Liên hệ tư vấn",
        imageUrl: "https://house.hunghau.vn/wp-content/uploads/2019/11/VPX16.jpg"
      },
      render: ({ title, description, buttonText, imageUrl }) => (
        <section className="bg-white w-full py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 max-w-[1280px]">
            <div className="w-full md:w-1/2">
              <div className="text-sm text-gray-400 mb-8 font-medium">Trang chủ &gt; Dịch vụ &gt; <span className="text-gray-600">{title}</span></div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#f59e0b] mb-6 tracking-tight">{title}</h1>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-lg">{description}</p>
              <button className="px-8 py-3.5 bg-[#f59e0b] hover:bg-orange-500 text-white font-semibold rounded-md shadow-md transition-colors">
                {buttonText}
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-green-500/10">
                <img src={imageUrl} alt={title} className="w-full h-auto object-cover min-h-[300px]" style={{ filter: "hue-rotate(-20deg) saturate(1.5)" }} />
              </div>
            </div>
          </div>
        </section>
      )
    },
    FeaturedSolutionsBlock: {
      label: "Giải Pháp Nổi Bật",
      fields: {
        title: { type: "text" },
        solutions: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" }
          }
        }
      },
      defaultProps: {
        title: "Giải pháp nổi bật",
        solutions: [
          { title: "Phát triển phần mềm theo yêu cầu", description: "Thiết kế và xây dựng phần mềm \"đo ni đóng giày\" theo quy trình vận hành riêng của doanh nghiệp, giúp tối ưu hiệu suất và tăng khả năng cạnh tranh." },
          { title: "Giải pháp chuyển đổi số doanh nghiệp", description: "Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa quy trình và nâng cao trải nghiệm khách hàng." },
          { title: "Xây dựng hệ thống nền tảng & tích hợp", description: "Phát triển hệ thống trung tâm (CRM, ERP, Dashboard...) và kết nối các nền tảng hiện có thành một hệ sinh thái đồng bộ, dữ liệu xuyên suốt." }
        ]
      },
      render: ({ title, solutions }) => (
        <section className="bg-white w-full py-16 md:py-24 relative">
          <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#115b40] mb-4">{title}</h2>
              <div className="w-16 h-1 bg-[#f59e0b] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-shadow flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6 border border-green-100">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    },
    ProcessBlock: {
      label: "Quy Trình Thực Hiện",
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        steps: {
          type: "array",
          arrayFields: {
            title: { type: "text" }
          }
        }
      },
      defaultProps: {
        title: "Quy trình thực hiện",
        subtitle: "Quy trình chuyên nghiệp, minh bạch và hiệu quả.",
        steps: [
          { title: "Khảo sát & phân tích yêu cầu" },
          { title: "Thiết kế giải pháp & kiến trúc hệ thống" },
          { title: "Phát triển & Thử nghiệm" },
          { title: "Triển khai & Bảo trì" }
        ]
      },
      render: ({ title, subtitle, steps }) => (
        <section className="bg-white w-full py-16 md:py-24 relative">
          <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#115b40] mb-4">{title}</h2>
              <p className="text-gray-500">{subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {steps.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center hover:shadow-xl transition-shadow flex flex-col items-center justify-center min-h-[160px]">
                  <div className="text-4xl font-bold text-[#f59e0b] mb-4">{String(idx + 1).padStart(2, '0')}</div>
                  <h3 className="text-sm md:text-base font-bold text-gray-800 px-2">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    },
    CTABlock: {
      label: "Kêu Gọi Hành Động (CTA)",
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        primaryButtonText: { type: "text" },
        secondaryButtonText: { type: "text" }
      },
      defaultProps: {
        title: "Sẵn sàng triển khai?",
        description: "Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.",
        primaryButtonText: "Liên hệ ngay",
        secondaryButtonText: "Về trang chủ"
      },
      render: ({ title, description, primaryButtonText, secondaryButtonText }) => (
        <section className="w-full bg-white pt-10 pb-0">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-[1280px]">
            <div className="bg-[#115b40] py-20 px-6 relative overflow-hidden text-center rounded-t-[32px] sm:rounded-t-[48px]">
              <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
                <p className="text-teal-100/90 text-base md:text-lg mb-10 leading-relaxed">{description}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-3.5 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-md transition-colors w-full sm:w-auto">
                    {secondaryButtonText}
                  </button>
                  <button className="px-8 py-3.5 bg-[#f59e0b] hover:bg-orange-500 text-white font-semibold rounded-md shadow-lg transition-colors w-full sm:w-auto">
                    {primaryButtonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    FooterBlock: {
      label: "Chân Trang (Footer)",
      fields: {
        copyright: { type: "text" }
      },
      defaultProps: {
        copyright: "Copyright 2026 © Hexagon Corporation. All rights reserved."
      },
      render: ({ copyright }) => (
        <footer className="w-full bg-[#115b40] py-6 relative">
          <div className="container mx-auto px-6 text-center">
            <p className="text-teal-100 text-sm">{copyright}</p>
          </div>
          
          {/* Global Scroll to top button */}
          <div className="absolute -top-6 right-10">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </footer>
      )
    }
  },
};
