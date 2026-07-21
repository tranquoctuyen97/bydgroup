export interface NewsItem {
  id: number | string
  img: string
  tag: string
  title: string
  desc: string
  date: string
  content?: string
  author?: string
  contentSections?: NewsSection[]
}

export interface NewsImage {
  src: string
  alt: string
  caption?: string
}

export interface NewsSection {
  heading?: string
  paragraphs: string[]
  images?: NewsImage[]
}

export const categories = ['Tất cả', 'Sự kiện', 'Công nghệ', 'Văn hóa', 'Kinh doanh', 'Vận hành']

export const categoryMap: Record<string, string> = {
  'su-kien': 'Sự kiện',
  'cong-nghe': 'Công nghệ',
  'van-hoa': 'Văn hóa',
  'kinh-doanh': 'Kinh doanh',
  'van-hanh': 'Vận hành',
}

export function extractTextFromRichText(content: any): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (typeof content === 'object') {
    if (content.root?.children) {
      return content.root.children
        .map((node: any) => {
          if (node.text) return node.text
          if (node.children) {
            return node.children.map((c: any) => c.text || '').join('')
          }
          return ''
        })
        .filter(Boolean)
        .join('\n\n')
    }
    try {
      return JSON.stringify(content)
    } catch {
      return ''
    }
  }
  return String(content)
}

export const seededNews: NewsItem[] = [
  {
    id: 'seed-byd-ha-long-2026',
    img: '/images/news-byd-ha-long-2026/dyn08283.webp',
    tag: 'Sự kiện',
    title: 'Châu Á Thành Công Bùng Nổ Năng Lượng Trong Chuỗi Sự Kiện Teambuilding & Gala Dinner 2026: "Đồng Lòng Vươn Xa – Bứt Phá Tỏa Sáng"',
    desc: 'Vừa qua, từ ngày 12/07 đến 13/07/2026, Châu Á Thành Công đã phối hợp cùng Công ty TNHH Nông nghiệp Megatech Việt Nam tổ chức thành công chuỗi sự kiện Teambuilding và Gala Dinner 2026 tại thành phố biển Hạ Long. Với khẩu hiệu chiến lược "Đồng lòng vươn xa - Bứt phá tỏa sáng", hành trình không chỉ là dịp để nhìn lại những cột mốc tự hào mà còn là bệ phóng gắn kết tinh thần, khơi dậy nguồn sức mạnh nội tại mạnh mẽ của toàn thể cán bộ nhân viên.',
    date: '13 Tháng 7, 2026',
    author: 'Châu Á Thành Công',
    contentSections: [
      {
        heading: '1. Rực lửa tinh thần đồng đội trên bãi biển Hạ Long',
        paragraphs: [
          'Nằm trong khuôn khổ ngày hội gắn kết, hoạt động Teambuilding diễn ra dưới cái nắng vàng và làn gió biển mát rượi của Hạ Long đã trở thành tâm điểm của sự cuồng nhiệt. Ngay từ những phút đầu tiên, tinh thần đồng đội và ngọn lửa quyết tâm đã được thắp sáng thông qua hàng loạt các thử thách vận động liên hoàn đòi hỏi sự phối hợp nhịp nhàng và tư duy chiến lược tập thể.',
          'Không có bất kỳ khoảng cách nào giữa các phòng ban, tất cả các thành viên của Châu Á Thành Công và Megatech đã hòa làm một, cùng nhau vượt qua những chướng ngại vật trên cát, cùng hò reo ăn mừng chiến thắng. Những nụ cười rạng rỡ, những cái đập tay vội vã hay khoảnh khắc kịch tính của trận bóng đá bãi biển đã dệt nên một bức tranh văn hóa doanh nghiệp đầy trẻ trung, năng động và tràn đầy nhiệt huyết.',
        ],
        images: [
          {
            src: '/images/news-byd-ha-long-2026/dyn07740.webp',
            alt: 'Các đội của Châu Á Thành Công và Megatech tham gia hoạt động chạy đua trên bãi biển Hạ Long',
            caption: 'Các đội tăng tốc qua thử thách liên hoàn trên bãi biển Hạ Long.',
          },
          {
            src: '/images/news-byd-ha-long-2026/dyn07804.webp',
            alt: 'Trận bóng đá bãi biển sôi động giữa các thành viên Châu Á Thành Công và Megatech',
            caption: 'Khoảnh khắc bùng nổ trong trận bóng đá bãi biển đầy kịch tính.',
          },
        ],
      },
      {
        heading: '2. Đêm Gala Dinner trang trọng – Khơi nguồn sức mạnh, vinh danh những nỗ lực',
        paragraphs: [
          'Sau một ngày dài bùng nổ hết mình với các hoạt động thể chất, không gian đêm tiệc Gala Dinner 2026 lại khoác lên mình vẻ trang trọng, lộng lẫy nhưng không kém phần ấm cúng tại khán phòng đại tiệc.',
          'Phát biểu khai mạc tại buổi tiệc, Ban lãnh đạo Châu Á Thành Công và Megatech Việt Nam đã bày tỏ sự tri ân sâu sắc đối với những cống hiến bền bỉ của tập thể nhân sự trong suốt thời gian qua. Lãnh đạo nhấn mạnh rằng, sự đồng lòng và tinh thần không ngại thử thách chính là chiếc chìa khóa vạn năng giúp doanh nghiệp bứt phá vững vàng trước mọi biến động của thị trường. Khoảnh khắc toàn thể ban lãnh đạo và nhân viên cùng nâng ly chúc mừng cho chặng đường mới đã đẩy cảm xúc của đêm tiệc lên cao trào.',
        ],
        images: [
          {
            src: '/images/news-byd-ha-long-2026/dyn08283.webp',
            alt: 'Toàn cảnh không gian Gala Dinner 2026 lung linh ánh đèn',
            caption: 'Không gian Gala Dinner 2026 sang trọng, ấm cúng và đầy cảm hứng.',
          },
          {
            src: '/images/news-byd-ha-long-2026/dyn08433.webp',
            alt: 'Đại diện ban lãnh đạo Châu Á Thành Công và Megatech Việt Nam trên sân khấu',
            caption: 'Ban lãnh đạo Châu Á Thành Công và Megatech cùng lan tỏa thông điệp bứt phá.',
          },
        ],
      },
      {
        heading: '3. Bứt phá tỏa sáng cùng những giai điệu kết đoàn',
        paragraphs: [
          'Một phần không thể thiếu tạo nên dấu ấn sâu đậm cho Gala Dinner 2026 chính là các tiết mục nghệ thuật "cây nhà lá vườn" nhưng được đầu tư vô cùng công phu. Sân khấu như bùng nổ bởi các vũ điệu sôi động, hiện đại và những ca khúc truyền lửa đầy hào hùng được thể hiện bởi chính các thành viên trong công ty.',
          'Đặc biệt, khoảnh khắc tất cả mọi người cùng nối rộng vòng tay, hòa chung một nhịp đập dưới ánh đèn sân khấu đã minh chứng rõ nét nhất cho tinh thần "Đồng lòng vươn xa". Đêm Gala khép lại với những nụ cười ngập tràn niềm vui, những kỷ niệm vô giá và một niềm tin vững chắc vào tương lai phát triển thịnh vượng của BYD Group.',
          'Đặc biệt, khoảnh khắc tất cả mọi người cùng nối rộng vòng tay, hòa chung một nhịp đập dưới ánh đèn sân khấu đã minh chứng rõ nét nhất cho tinh thần "Đồng lòng vươn xa". Đêm Gala khép lại với những nụ cười ngập tràn niềm vui, những kỷ niệm vô giá và một niềm tin vững chắc vào tương lai phát triển thịnh vượng của Châu Á Thành Công.',
          'Hành trình Teambuilding & Gala Dinner 2026 đã kết thúc, nhưng ngọn lửa năng lượng tích cực và tinh thần kỷ luật, đoàn kết sẽ mãi là hành trang theo chân mỗi thành viên Châu Á Thành Công trên chặng đường chinh phục những đỉnh cao mới phía trước.',
        ],
        images: [
          {
            src: '/images/news-byd-ha-long-2026/dyn08365.webp',
            alt: 'Tiết mục biểu diễn tập thể rực rỡ trên sân khấu Gala Dinner',
            caption: 'Những tiết mục nội bộ được đầu tư kỹ lưỡng đã khuấy động toàn bộ đêm Gala.',
          },
        ],
      },
    ],
  },
]

export const fallbackNews: NewsItem[] = [
  {
    id: 1,
    img: '/images/sinh-nhat-quy4.webp',
    tag: 'Văn hóa',
    title: 'Happy Birthday – Nhân sự Quý I của CHÂU Á THÀNH CÔNG 🎉',
    desc: 'Công ty trân trọng gửi lời chúc mừng sinh nhật tới các thành viên có ngày sinh trong tháng 1, 2 và 3.',
    date: '31 Tháng 3, 2025',
    content: 'HAPPY BIRTHDAY – NHÂN SỰ QUÝ I CỦA CHÂU Á THÀNH CÔNG 🎉\n\nCông ty trân trọng gửi lời chúc mừng sinh nhật tới các thành viên có ngày sinh trong tháng 1, 2 và 3 🎈\n\nTuổi mới, chúc mọi người luôn dồi dào sức khỏe, giữ vững tinh thần tích cực và tiếp tục gặt hái thêm nhiều thành tựu ý nghĩa trong công việc cũng như cuộc sống 🌱✨\n\nMỗi cá nhân là một mảnh ghép quan trọng, góp phần tạo nên một tập thể vững mạnh và không ngừng phát triển 🤝\n\nCảm ơn mọi người đã luôn đồng hành và cống hiến 💙\nChúc các bạn có một ngày sinh nhật thật trọn vẹn và một năm thật rực rỡ phía trước!',
    author: 'HR Team',
  },
  {
    id: 2,
    img: '/images/event-2026/women-day.webp',
    tag: 'Sự kiện',
    title: '8/3 – Ngày của hội chị em CHÂU Á THÀNH CÔNG 🌸',
    desc: 'Nhân ngày Quốc tế Phụ nữ 8/3, CHÂU Á THÀNH CÔNG gửi lời chúc toàn thể chị em luôn xinh đẹp, ví luôn đầy và mood luôn chill!',
    date: '8 Tháng 3, 2025',
    content: '🌸 8/3 – NGÀY CỦA HỘI CHỊ EM 🌸\n\nHôm nay KPI có thể chưa đạt… Nhưng chị em nhất định phải xinh ✨\n\nNhân ngày Quốc tế Phụ nữ 8/3, chúc toàn thể chị em:\n💄 Luôn xinh đẹp dù deadline dí\n💰 Lương tăng đều – KPI giảm nhẹ\n🧧 Ví luôn đầy – mood luôn chill\n\nCảm ơn vì đã mang đến thật nhiều năng lượng tích cực, sự nhiệt huyết và "độ đáng yêu" cho văn phòng mỗi ngày 💗\n\nChúc chị em ăn ngon – chơi vui – nhận quà mỏi tay hôm nay nha 😆',
    author: 'CHÂU Á THÀNH CÔNG Media',
  },
  {
    id: 3,
    img: '/images/badminton.webp',
    tag: 'Văn hóa',
    title: 'Cầu lông CHÂU Á THÀNH CÔNG – Cháy hết mình sau giờ làm 🏸',
    desc: 'Không chỉ hết mình trong công việc, các thành viên CHÂU Á THÀNH CÔNG còn cháy hết mình trên sân cầu lông!',
    date: '15 Tháng 2, 2025',
    content: 'Không chỉ hết mình trong công việc, các thành viên CHÂU Á THÀNH CÔNG còn cháy hết mình trên sân cầu lông 🏸🔥\n\nNhững trận đấu đầy năng lượng, những pha cầu "căng đét" cùng vô số tiếng cười đã tạo nên một buổi chiều cực kỳ đáng nhớ. Không quan trọng thắng thua, quan trọng là anh em được vận động, xả stress và gắn kết với nhau hơn sau giờ làm 💪\n\nGia nhập CHÂU Á THÀNH CÔNG để không chỉ phát triển sự nghiệp và còn có những khoảng thời gian "cháy" hết mình cùng đồng đội như thế này nhé! 🚀',
    author: 'HR Team',
  },
  {
    id: 4,
    img: '/images/vinh-danh-top1.webp',
    tag: 'Kinh doanh',
    title: 'Vinh danh Top doanh thu – Giải thưởng Everest 🏆',
    desc: 'Lễ trao giải Everest – Top 1 doanh thu tháng. CHÂU Á THÀNH CÔNG tôn vinh những cá nhân xuất sắc đã cống hiến hết mình.',
    date: '15 Tháng 11, 2024',
    content: 'CHÂU Á THÀNH CÔNG vinh danh những cá nhân xuất sắc nhất trong tháng!\n\n🏆 Giải thưởng Everest – Top 1 doanh thu được trao cho những chiến binh kinh doanh đã nỗ lực không ngừng nghỉ.\n\nĐây không chỉ là phần thưởng vật chất, mà còn là sự ghi nhận cho tinh thần Kỷ Luật, Tốc Độ và Chuyên Gia trong hành trình tạo ra kết quả xuất sắc.\n\nChúc mừng tất cả các anh chị em đã đạt được thành tích xuất sắc! Hãy tiếp tục chinh phục những đỉnh cao mới! 🚀',
    author: 'CHÂU Á THÀNH CÔNG Media',
  },
  {
    id: 5,
    img: '/images/event-2026/dyn07075.webp',
    tag: 'Sự kiện',
    title: 'Team Building Cửa Lò 2025 – Kết nối đội ngũ ✈️',
    desc: 'Chuyến du lịch gắn kết đội ngũ tại Cửa Lò, nơi anh em cùng nhau tận hưởng những khoảnh khắc đáng nhớ.',
    date: '20 Tháng 1, 2025',
    content: 'Chuyến Team Building Cửa Lò 2025 đã diễn ra thật tuyệt vời! 🎉\n\nToàn bộ đội ngũ CHÂU Á THÀNH CÔNG đã cùng nhau tham gia các hoạt động gắn kết, chia sẻ và tạo nên những kỷ niệm đáng nhớ.\n\nĐây là minh chứng cho tinh thần Đoàn Kết – một trong những giá trị cốt lõi mà CHÂU Á THÀNH CÔNG luôn theo đuổi. Mỗi chuyến đi là cơ hội để anh em hiểu nhau hơn, gắn kết hơn và cùng nhau tiến về phía trước! 🚀',
    author: 'HR Team',
  },
  {
    id: 6,
    img: '/images/ngay-nam-gioi.webp',
    tag: 'Sự kiện',
    title: 'Happy Men\'s Day – Ngày nam giới CHÂU Á THÀNH CÔNG 🎉',
    desc: 'CHÂU Á THÀNH CÔNG chúc mừng ngày nam giới – cảm ơn các anh em đã luôn đồng hành và cống hiến!',
    date: '19 Tháng 11, 2024',
    content: 'Happy Men\'s Day! 🎉\n\nCHÂU Á THÀNH CÔNG gửi lời chúc mừng tới toàn thể các anh em trong công ty nhân ngày Quốc tế Nam giới 19/11!\n\nCảm ơn các anh em đã luôn nỗ lực, cống hiến và là trụ cột vững chắc của đội ngũ CHÂU Á THÀNH CÔNG. Chúc các anh em luôn mạnh mẽ, thành công và hạnh phúc! 💪',
    author: 'CHÂU Á THÀNH CÔNG Media',
  },
]
