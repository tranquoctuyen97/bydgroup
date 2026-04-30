export interface NewsItem {
  id: number | string
  img: string
  tag: string
  title: string
  desc: string
  date: string
  content?: string
  author?: string
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

export const fallbackNews: NewsItem[] = [
  {
    id: 1,
    img: '/images/sinh-nhat-quy4.webp',
    tag: 'Văn hóa',
    title: 'Happy Birthday – Nhân sự Quý I của BYD 🎉',
    desc: 'Công ty trân trọng gửi lời chúc mừng sinh nhật tới các thành viên có ngày sinh trong tháng 1, 2 và 3.',
    date: '31 Tháng 3, 2025',
    content: 'HAPPY BIRTHDAY – NHÂN SỰ QUÝ I CỦA BYD 🎉\n\nCông ty trân trọng gửi lời chúc mừng sinh nhật tới các thành viên có ngày sinh trong tháng 1, 2 và 3 🎈\n\nTuổi mới, chúc mọi người luôn dồi dào sức khỏe, giữ vững tinh thần tích cực và tiếp tục gặt hái thêm nhiều thành tựu ý nghĩa trong công việc cũng như cuộc sống 🌱✨\n\nMỗi cá nhân là một mảnh ghép quan trọng, góp phần tạo nên một tập thể vững mạnh và không ngừng phát triển 🤝\n\nCảm ơn mọi người đã luôn đồng hành và cống hiến 💙\nChúc các bạn có một ngày sinh nhật thật trọn vẹn và một năm thật rực rỡ phía trước!',
    author: 'HR Team',
  },
  {
    id: 2,
    img: '/images/hoat-dong-20-10.webp',
    tag: 'Sự kiện',
    title: '8/3 – Ngày của hội chị em BYD 🌸',
    desc: 'Nhân ngày Quốc tế Phụ nữ 8/3, BYD gửi lời chúc toàn thể chị em luôn xinh đẹp, ví luôn đầy và mood luôn chill!',
    date: '8 Tháng 3, 2025',
    content: '🌸 8/3 – NGÀY CỦA HỘI CHỊ EM 🌸\n\nHôm nay KPI có thể chưa đạt… Nhưng chị em nhất định phải xinh ✨\n\nNhân ngày Quốc tế Phụ nữ 8/3, chúc toàn thể chị em:\n💄 Luôn xinh đẹp dù deadline dí\n💰 Lương tăng đều – KPI giảm nhẹ\n🧧 Ví luôn đầy – mood luôn chill\n\nCảm ơn vì đã mang đến thật nhiều năng lượng tích cực, sự nhiệt huyết và "độ đáng yêu" cho văn phòng mỗi ngày 💗\n\nChúc chị em ăn ngon – chơi vui – nhận quà mỏi tay hôm nay nha 😆',
    author: 'BYD Media',
  },
  {
    id: 3,
    img: '/images/sinh-nhat-van-phong.webp',
    tag: 'Văn hóa',
    title: 'Cầu lông BYD – Cháy hết mình sau giờ làm 🏸',
    desc: 'Không chỉ hết mình trong công việc, các thành viên BYD còn cháy hết mình trên sân cầu lông!',
    date: '15 Tháng 2, 2025',
    content: 'Không chỉ hết mình trong công việc, các thành viên BYD còn cháy hết mình trên sân cầu lông 🏸🔥\n\nNhững trận đấu đầy năng lượng, những pha cầu "căng đét" cùng vô số tiếng cười đã tạo nên một buổi chiều cực kỳ đáng nhớ. Không quan trọng thắng thua, quan trọng là anh em được vận động, xả stress và gắn kết với nhau hơn sau giờ làm 💪\n\nGia nhập BYD để không chỉ phát triển sự nghiệp mà còn có những khoảng thời gian "cháy" hết mình cùng đồng đội như thế này nhé! 🚀',
    author: 'HR Team',
  },
  {
    id: 4,
    img: '/images/vinh-danh-top1.webp',
    tag: 'Kinh doanh',
    title: 'Vinh danh Top doanh thu – Giải thưởng Everest 🏆',
    desc: 'Lễ trao giải Everest – Top 1 doanh thu tháng. BYD tôn vinh những cá nhân xuất sắc đã cống hiến hết mình.',
    date: '15 Tháng 11, 2024',
    content: 'BYD vinh danh những cá nhân xuất sắc nhất trong tháng!\n\n🏆 Giải thưởng Everest – Top 1 doanh thu được trao cho những chiến binh kinh doanh đã nỗ lực không ngừng nghỉ.\n\nĐây không chỉ là phần thưởng vật chất, mà còn là sự ghi nhận cho tinh thần Kỷ Luật, Tốc Độ và Chuyên Gia trong hành trình tạo ra kết quả xuất sắc.\n\nChúc mừng tất cả các anh chị em đã đạt được thành tích xuất sắc! Hãy tiếp tục chinh phục những đỉnh cao mới! 🚀',
    author: 'BYD Media',
  },
  {
    id: 5,
    img: '/images/du-lich-cua-lo.webp',
    tag: 'Sự kiện',
    title: 'Team Building Cửa Lò 2025 – Kết nối đội ngũ ✈️',
    desc: 'Chuyến du lịch gắn kết đội ngũ tại Cửa Lò, nơi anh em cùng nhau tận hưởng những khoảnh khắc đáng nhớ.',
    date: '20 Tháng 1, 2025',
    content: 'Chuyến Team Building Cửa Lò 2025 đã diễn ra thật tuyệt vời! 🎉\n\nToàn bộ đội ngũ BYD đã cùng nhau tham gia các hoạt động gắn kết, chia sẻ và tạo nên những kỷ niệm đáng nhớ.\n\nĐây là minh chứng cho tinh thần Đoàn Kết – một trong những giá trị cốt lõi mà BYD luôn theo đuổi. Mỗi chuyến đi là cơ hội để anh em hiểu nhau hơn, gắn kết hơn và cùng nhau tiến về phía trước! 🚀',
    author: 'HR Team',
  },
  {
    id: 6,
    img: '/images/ngay-nam-gioi.webp',
    tag: 'Sự kiện',
    title: 'Happy Men\'s Day – Ngày nam giới BYD 🎉',
    desc: 'BYD chúc mừng ngày nam giới – cảm ơn các anh em đã luôn đồng hành và cống hiến!',
    date: '19 Tháng 11, 2024',
    content: 'Happy Men\'s Day! 🎉\n\nBYD gửi lời chúc mừng tới toàn thể các anh em trong công ty nhân ngày Quốc tế Nam giới 19/11!\n\nCảm ơn các anh em đã luôn nỗ lực, cống hiến và là trụ cột vững chắc của đội ngũ BYD. Chúc các anh em luôn mạnh mẽ, thành công và hạnh phúc! 💪',
    author: 'BYD Media',
  },
]
