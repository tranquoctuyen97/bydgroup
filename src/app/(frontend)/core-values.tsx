export type CoreValueIconName =
  | 'rocket'
  | 'bolt'
  | 'team'
  | 'happy'
  | 'kindness'
  | 'discipline'
  | 'expert'
  | 'creative'

export type CoreValue = {
  number: string
  title: string
  shortDesc: string
  longDesc: string
  workMeaning: string
  icon: CoreValueIconName
}

export const coreValues: CoreValue[] = [
  {
    number: '01',
    title: 'NGHĨ LỚN',
    shortDesc: 'Dám đặt mục tiêu lớn, nhìn xa hơn giới hạn hiện tại.',
    longDesc:
      'BYD khuyến khích mỗi thành viên đặt mục tiêu lớn hơn điều đang có, nhìn rộng hơn phạm vi công việc trước mắt và tìm cách tạo ra giá trị có quy mô lớn hơn cho khách hàng, đội ngũ và thị trường.',
    workMeaning:
      'Trong công việc, Nghĩ Lớn là chủ động đề xuất hướng đi mới, không tự giới hạn bởi cách làm cũ và luôn gắn mục tiêu cá nhân với tầm nhìn phát triển dài hạn của công ty.',
    icon: 'rocket',
  },
  {
    number: '02',
    title: 'TỐC ĐỘ',
    shortDesc: 'Hành động nhanh, phản hồi nhanh, học nhanh và cải tiến nhanh.',
    longDesc:
      'Tốc độ giúp BYD thích nghi với thị trường thương mại điện tử thay đổi liên tục. Nhanh không có nghĩa là vội vàng, mà là rút ngắn thời gian từ quan sát đến hành động và từ hành động đến cải tiến.',
    workMeaning:
      'Mỗi đội nhóm ưu tiên phản hồi rõ ràng, xử lý việc quan trọng đúng lúc, thử nghiệm nhanh và đo lường kết quả để điều chỉnh kịp thời.',
    icon: 'bolt',
  },
  {
    number: '03',
    title: 'ĐOÀN KẾT',
    shortDesc: 'Cùng hướng về mục tiêu chung và hỗ trợ lẫn nhau.',
    longDesc:
      'BYD tin rằng sức mạnh tập thể luôn lớn hơn nỗ lực riêng lẻ. Đoàn Kết là cách các phòng ban phối hợp, chia sẻ thông tin, bảo vệ mục tiêu chung và cùng chịu trách nhiệm với kết quả.',
    workMeaning:
      'Trong vận hành hằng ngày, Đoàn Kết thể hiện qua sự phối hợp đúng vai trò, chủ động hỗ trợ đồng đội và ưu tiên lợi ích chung khi ra quyết định.',
    icon: 'team',
  },
  {
    number: '04',
    title: 'HẠNH PHÚC',
    shortDesc: 'Xây dựng môi trường tích cực, biết ơn và tôn trọng.',
    longDesc:
      'Hạnh Phúc tại BYD bắt đầu từ sự biết ơn, tinh thần tích cực và cảm giác được tôn trọng. Một đội ngũ hạnh phúc sẽ có năng lượng tốt hơn để phục vụ khách hàng và phát triển bền vững.',
    workMeaning:
      'BYD hướng đến môi trường nơi mỗi thành viên được ghi nhận, có động lực học hỏi, được chia sẻ khó khăn và được đồng hành trong quá trình trưởng thành.',
    icon: 'happy',
  },
  {
    number: '05',
    title: 'TỬ TẾ',
    shortDesc: 'Làm điều đúng, giữ chữ tín và hướng tới kết quả cùng thắng.',
    longDesc:
      'Tử Tế là nền tảng trong cách BYD làm việc với khách hàng, đối tác và đồng đội. Giá trị này yêu cầu sự trung thực, giữ cam kết và tôn trọng lợi ích của các bên liên quan.',
    workMeaning:
      'Mỗi quyết định cần hướng đến tinh thần win-win-win: khách hàng nhận được giá trị, đối tác được tôn trọng và BYD phát triển bền vững.',
    icon: 'kindness',
  },
  {
    number: '06',
    title: 'KỶ LUẬT',
    shortDesc: 'Giữ cam kết, làm việc có kế hoạch và theo đuổi kết quả đến cùng.',
    longDesc:
      'Kỷ Luật giúp ý tưởng trở thành kết quả. BYD đề cao sự chuẩn bị, tuân thủ quy trình, đúng tiến độ và trách nhiệm với cam kết đã đưa ra.',
    workMeaning:
      'Trong công việc, Kỷ Luật là biết ưu tiên, bám sát mục tiêu, báo cáo minh bạch và hoàn thành việc đã nhận với chất lượng rõ ràng.',
    icon: 'discipline',
  },
  {
    number: '07',
    title: 'CHUYÊN GIA',
    shortDesc: 'Làm chủ chuyên môn để tạo ra giá trị vượt trội.',
    longDesc:
      'BYD xây dựng đội ngũ có năng lực chuyên sâu trong ngành hàng, nền tảng và hành vi khách hàng. Chuyên Gia không chỉ là biết nhiều, mà là hiểu sâu và giải quyết vấn đề hiệu quả.',
    workMeaning:
      'Mỗi thành viên cần liên tục học hỏi, cập nhật kiến thức, chuẩn hóa cách làm và biến chuyên môn thành kết quả thực tế cho khách hàng và công ty.',
    icon: 'expert',
  },
  {
    number: '08',
    title: 'SÁNG TẠO',
    shortDesc: 'Tìm cách làm mới và biến ý tưởng thành hành động thực tế.',
    longDesc:
      'Sáng Tạo giúp BYD khác biệt trong thị trường cạnh tranh. Công ty khuyến khích thử nghiệm giải pháp mới, cải tiến quy trình và tìm ra cách phục vụ khách hàng tốt hơn.',
    workMeaning:
      'Sáng Tạo được đo bằng hành động: phát hiện vấn đề, đề xuất giải pháp, thử nghiệm có mục tiêu và nhân rộng những cách làm hiệu quả.',
    icon: 'creative',
  },
]

export function CoreValueIcon({
  name,
  className = 'h-10 w-10',
}: {
  name: CoreValueIconName
  className?: string
}) {
  const commonProps = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 2.2,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  switch (name) {
    case 'rocket':
      return (
        <svg {...commonProps}>
          <path d="M4.5 16.5c-1.2 1.2-1.5 3-1.5 4.5 1.5 0 3.3-.3 4.5-1.5" />
          <path d="M9 15 7 17l-4-4 2-2" />
          <path d="M14.5 4.5C17 3.2 19.4 3 21 3c0 1.6-.2 4-1.5 6.5C18 12.4 15.3 15 12 16l-4-4c1-3.3 3.6-6 6.5-7.5Z" />
          <path d="M15 9h.01" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...commonProps}>
          <path d="m13 2-8 11h6l-1 9 9-12h-6l0-8Z" />
        </svg>
      )
    case 'team':
      return (
        <svg {...commonProps}>
          <path d="M16 11a4 4 0 1 0-8 0" />
          <path d="M4 19a8 8 0 0 1 16 0" />
          <path d="M6.5 10.5a3 3 0 0 0-4.5 2.6" />
          <path d="M17.5 10.5a3 3 0 0 1 4.5 2.6" />
        </svg>
      )
    case 'happy':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 10h.01" />
          <path d="M15.5 10h.01" />
          <path d="M8.5 14.5a5 5 0 0 0 7 0" />
        </svg>
      )
    case 'kindness':
      return (
        <svg {...commonProps}>
          <path d="M4 19h5.5c1.8 0 3.5-.6 4.9-1.7l4.1-3.3a1.8 1.8 0 0 0-2.1-2.9l-3.2 2.1" />
          <path d="M4 14h4.8c1.2 0 2.2 1 2.2 2.2H8" />
          <path d="M12 6.8C12 4.9 13.5 3.5 15.2 3.5c1 0 1.9.5 2.4 1.3.5-.8 1.4-1.3 2.4-1.3 1.7 0 3 1.4 3 3.3 0 3-5.4 5.8-5.4 5.8S12 9.8 12 6.8Z" />
        </svg>
      )
    case 'discipline':
      return (
        <svg {...commonProps}>
          <path d="M14 4 20 10" />
          <path d="M12 6 18 12" />
          <path d="M6 13 11 18" />
          <path d="M8 11 13 16" />
          <path d="m4 20 4.5-4.5" />
          <path d="m15.5 8.5 3-3" />
        </svg>
      )
    case 'expert':
      return (
        <svg {...commonProps}>
          <path d="M12 3 14.1 7.2 18.8 7.9 15.4 11.2 16.2 16 12 13.7 7.8 16 8.6 11.2 5.2 7.9 9.9 7.2 12 3Z" />
          <path d="m8.5 15.5-1.2 5 4.7-2.7 4.7 2.7-1.2-5" />
        </svg>
      )
    case 'creative':
      return (
        <svg {...commonProps}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8.5 14.5c-1.5-1.2-2.5-3-2.5-5A6 6 0 0 1 18 9.5c0 2-1 3.8-2.5 5-.9.7-1.5 1.7-1.5 2.8v.7h-4v-.7c0-1.1-.6-2.1-1.5-2.8Z" />
        </svg>
      )
    default:
      return null
  }
}
