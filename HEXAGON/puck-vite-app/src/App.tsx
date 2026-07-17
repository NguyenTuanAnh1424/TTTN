import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "./puck.config";

// Initial data for the Hexagon Interface
const initialData = {
  content: [
    {
      type: "HeaderBlock",
      props: {
        id: "HeaderBlock-1",
        logoText: "HEXAGON",
        navItems: [
          { label: "Trang chủ", href: "#" },
          { label: "Giới thiệu", href: "#" },
          { label: "Dịch vụ", href: "#" },
          { label: "Hỗ trợ", href: "#" },
          { label: "Liên hệ", href: "#" },
        ],
      },
    },
    {
      type: "HeroBlock",
      props: {
        id: "HeroBlock-1",
        badgeText: "CÔNG NGHỆ TƯƠNG LAI",
        titleLine1: "Dịch vụ",
        titleLine2: "HEXAGON ",
        titleLine2Highlight: "Solutions",
        description:
          "HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp Internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.",
        primaryButtonText: "Khám phá Dịch vụ",
        secondaryButtonText: "Liên hệ Tư vấn",
        scrollText: "Cuộn xuống để khám phá",
      },
    },
    {
      type: "AboutBlock",
      props: {
        id: "AboutBlock-1",
        title: "Về Hexagon",
        description: "Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.",
        slogan: `"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"`,
        sloganAuthor: "HEXAGON CULTURE",
        stats: [
          { value: "100+", label: "Dự án đã thực hiện" },
          { value: "30+", label: "Đối tác đồng hành" },
          { value: "25+", label: "Đội ngũ kỹ thuật" },
          { value: "24/7", label: "Hỗ trợ xuyên suốt" },
        ],
      },
    },
    {
      type: "ActivityBlock",
      props: {
        id: "ActivityBlock-1",
        title: "Lĩnh vực hoạt động",
        subtitle: "Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:",
        activities: [
          { title: "Giải pháp công nghệ", image: "https://placehold.co/400x300/115b40/ffffff?text=Tech" },
          { title: "Giải pháp thi công & lắp đặt", image: "https://placehold.co/400x300/115b40/ffffff?text=Install" },
          { title: "Cung cấp thiết bị CNTT", image: "https://placehold.co/400x300/115b40/ffffff?text=IT" },
          { title: "Dịch vụ Công nghệ thông tin", image: "https://placehold.co/400x300/115b40/ffffff?text=Service" },
        ],
      },
    },
    {
      type: "PartnerBlock",
      props: {
        id: "PartnerBlock-1",
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
    },
    {
      type: "NewsBlock",
      props: {
        id: "NewsBlock-1",
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
    },
    {
      type: "ContactBlock",
      props: {
        id: "ContactBlock-1",
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
    },
    {
      type: "FooterBlock",
      props: {
        id: "FooterBlock-1",
        copyright: "Copyright 2026 © Hexagon Corporation. All rights reserved."
      },
    }
  ],
  root: {},
};

function App() {
  const save = (data: any) => {
    console.log("Saving...", data);
  };

  return (
    <div className="w-full min-h-screen">
      <Puck config={config} data={initialData} onPublish={save} iframe={{ enabled: false }} />
    </div>
  );
}

export default App;
