import { richTextToPlainText } from '@/lib/richTextToPlainText'

export interface Job {
  id: number | string
  slug?: string
  icon: string
  title: string
  category: string
  location: string
  type: string
  level?: string
  salary: string
  tag: string
  tagColor: string
  desc: string
  requirements: string[]
  benefits?: string
  workingHours?: string
  fromAPI?: boolean
}

export const categoryMap: Record<string, string> = {
  'cong-nghe': 'Công nghệ',
  'kinh-doanh': 'Kinh doanh',
  marketing: 'Marketing',
  'van-hanh': 'Vận hành',
  'nhan-su': 'Nhân sự',
  'tai-chinh': 'Tài chính',
}

export const categories = ['Tất cả', 'Marketing', 'Kinh doanh', 'Vận hành', 'Tài chính']

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getJobSlug = (job: Job) => job.slug || slugify(job.title) || String(job.id)

const typeMap: Record<string, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  contract: 'Hợp đồng',
  intern: 'Thực tập',
}

const tagColorMap: Record<string, string> = {
  'Tuyển gấp': 'bg-[#EC1313] text-white',
  Hot: 'bg-orange-100 text-orange-600',
  'Mới': 'bg-green-100 text-green-700',
}

export const mapJobDocToJob = (doc: any): Job => ({
  id: doc.id,
  slug: doc.slug || slugify(doc.title || ''),
  icon: doc.icon || '💼',
  title: doc.title,
  category: categoryMap[doc.category] || doc.category || 'Khác',
  location: doc.location || 'Việt Nam',
  type: typeMap[doc.type] || doc.type || 'Toàn thời gian',
  level: doc.level || '',
  salary: doc.salary || 'Thỏa thuận',
  tag: doc.tag || '',
  tagColor: tagColorMap[doc.tag] || '',
  desc: richTextToPlainText(doc.description),
  requirements: Array.isArray(doc.requirements)
    ? doc.requirements.map((item: any) =>
        typeof item === 'string' ? item : item?.requirement || '',
      ).filter(Boolean)
    : [],
  benefits: richTextToPlainText(doc.benefits),
  workingHours: doc.workingHours || '',
  fromAPI: true,
})

export const fallbackJobs: Job[] = [
  {
    id: 1,
    slug: 'chuyen-vien-lead-marketing',
    icon: '📣',
    title: 'Chuyên viên / Lead Marketing',
    category: 'Marketing',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    level: 'Middle – Lead',
    salary: '10 – 15 triệu + thưởng doanh thu',
    tag: 'Tuyển gấp',
    tagColor: 'bg-[#EC1313] text-white',
    desc: 'Xây dựng kế hoạch Digital Marketing theo tháng/quý bám sát mục tiêu doanh thu. Triển khai và quản lý quảng cáo Facebook, Google, TikTok. Tối ưu funnel chuyển đổi, phân bổ ngân sách Ads và quản lý đội ngũ Digital.',
    requirements: [
      'Có kinh nghiệm chạy Facebook Ads hoặc TikTok Ads từ 1 – 2 năm trở lên',
      'Đã từng quản lý ngân sách lớn và chạy chiến dịch có doanh thu tốt',
      'Thành thạo đọc số – phân tích – tối ưu – scale chiến dịch (CPL, CPA, ROAS)',
      'Có kinh nghiệm chạy chuyển đổi (conversion) hoặc tin nhắn (mess)',
      'Ưu tiên ứng viên đã từng chạy thị trường Đông Nam Á',
      'Với vị trí Lead: có khả năng định hướng, lập kế hoạch và nâng hiệu suất team',
    ],
  },
  {
    id: 2,
    slug: 'nhan-vien-marketing-facebook-ads',
    icon: '🎯',
    title: 'Nhân viên Marketing (Facebook Ads)',
    category: 'Marketing',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    level: 'Junior – Middle',
    salary: '8 triệu + thưởng % doanh thu',
    tag: 'Mới',
    tagColor: 'bg-green-100 text-green-700',
    desc: 'Lập kế hoạch và triển khai các chiến dịch Facebook Ads theo sản phẩm/chiến dịch được giao. Trực tiếp thiết lập, quản lý và tối ưu quảng cáo nhằm đảm bảo hiệu quả chi phí và doanh thu. Phối hợp với team Media/Design đề xuất ý tưởng hình ảnh, video quảng cáo.',
    requirements: [
      'Có tối thiểu 6 tháng kinh nghiệm trực tiếp triển khai và tối ưu Facebook Ads',
      'Ưu tiên tốt nghiệp chuyên ngành Marketing, Truyền thông, Thương mại điện tử',
      'Có tư duy phân tích dữ liệu và hiểu hành vi khách hàng online',
      'Chủ động, có trách nhiệm với KPI, tư duy logic và tinh thần học hỏi',
      'Phối hợp làm việc nhóm tốt',
    ],
  },
  {
    id: 3,
    slug: 'nhan-vien-tiktok-ads',
    icon: '🎵',
    title: 'Nhân viên TikTok Ads',
    category: 'Marketing',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    level: 'Junior – Middle',
    salary: '8 – 10 triệu + thưởng % doanh thu',
    tag: 'Mới',
    tagColor: 'bg-green-100 text-green-700',
    desc: 'Lên kế hoạch chiến dịch truyền thông thương hiệu sản phẩm trên TikTok. Lên ý tưởng content, video, hình ảnh, landing cho các sản phẩm của công ty. Triển khai chiến dịch và tối ưu chi phí quảng cáo mang lại hiệu quả.',
    requirements: [
      'Kinh nghiệm TikTok Ads trên 1 năm',
      'Ưu tiên đã từng triển khai các brand gia dụng, thời trang',
      'Ưu tiên học Đại học/Cao đẳng các ngành Marketing, Truyền thông',
      'Kỹ năng cơ bản sử dụng các phần mềm chỉnh sửa: PTS, AI, Canva, Capcut Pro',
      'Tư duy content, brand thương hiệu tốt',
      'Sáng tạo, học hỏi, đổi mới, không ngại đề xuất ý tưởng',
    ],
  },
  {
    id: 4,
    slug: 'project-manager-tiktok-shop-sea',
    icon: '📋',
    title: 'Project Manager (TikTok Shop SEA)',
    category: 'Kinh doanh',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    level: 'Middle – Senior',
    salary: '15 – 25 triệu + thưởng chiến dịch',
    tag: 'Hot',
    tagColor: 'bg-orange-100 text-orange-600',
    desc: 'Xây dựng & triển khai chiến lược TikTok Shop cho thị trường Malaysia, Philippines, Thái Lan. Setup, vận hành & tối ưu gian hàng. Quản lý toàn bộ quy trình traffic → chuyển đổi → doanh thu (GMV). Điều phối team content, ads, vận hành.',
    requirements: [
      'Có kinh nghiệm TikTok Shop / TikTok Ads / E-commerce (đã triển khai thực tế, có kết quả)',
      'Có khả năng quản lý dự án & điều phối team',
      'Tư duy data-driven, growth-oriented',
      'Hiểu hoặc có kinh nghiệm thị trường Đông Nam Á (MY/PH/TH) là lợi thế',
      'Ưu tiên có kinh nghiệm build brand & hệ thống KOL/KOC',
    ],
  },
  {
    id: 5,
    slug: 'tro-ly-ceo-pmo',
    icon: '🗂️',
    title: 'Trợ lý CEO / PMO',
    category: 'Vận hành',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    level: 'Middle',
    salary: '15 – 25 triệu',
    tag: 'Tuyển gấp',
    tagColor: 'bg-[#EC1313] text-white',
    desc: 'Quản lý & tối ưu lịch làm việc của CEO. Chuẩn bị tài liệu, agenda, checklist cho các cuộc họp. Theo dõi toàn bộ đầu việc CEO giao, nhắc việc & cảnh báo deadline. Follow-up execution với các phòng ban, xây dựng & quản lý hệ thống tracker, dashboard, báo cáo.',
    requirements: [
      'Có từ 1–3 năm kinh nghiệm Trợ lý CEO, PMO, Project Coordinator, Operations',
      'Ưu tiên từng làm việc trong startup, e-commerce, agency, vận hành, sales',
      'Kỹ năng ghi chép, tóm tắt & hệ thống hóa thông tin tốt',
      'Thành thạo Google Sheets / Excel / Docs / Slides / Notion',
      'Chủ động, bám việc, trách nhiệm cao, chịu áp lực tốt',
      'Tính cách kỷ luật, kín kẽ, đáng tin cậy, bảo mật thông tin tốt',
    ],
  },
  {
    id: 6,
    slug: 'nhan-vien-media',
    icon: '🎬',
    title: 'Nhân viên Media',
    category: 'Marketing',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    level: 'Junior – Middle',
    salary: '10 – 12 triệu + thưởng KPI',
    tag: 'Mới',
    tagColor: 'bg-green-100 text-green-700',
    desc: 'Lên ý tưởng kế hoạch nội dung hình ảnh, video truyền thông theo định hướng thương hiệu. Sản xuất & edit video cho bộ phận Marketing trên các nền tảng Facebook, Website, TikTok, YouTube. Nghiên cứu cập nhật xu hướng media mới.',
    requirements: [
      'Đại học/Cao đẳng ngành thiết kế, truyền thông đa phương tiện hoặc chứng chỉ liên quan',
      '1 năm kinh nghiệm ở vị trí tương đương',
      'Ưu tiên kinh nghiệm làm tại các công ty truyền thông, TMĐT',
      'Thành thạo Photoshop, AI, Canva, CapCut',
      'Tư duy content hình ảnh, bố cục, màu sắc tốt',
      'Sáng tạo, đổi mới, không ngại đề xuất ý tưởng',
    ],
  },
  {
    id: 7,
    slug: 'ke-toan-noi-bo',
    icon: '📊',
    title: 'Kế toán Nội bộ',
    category: 'Tài chính',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    level: 'Junior – Middle',
    salary: '8 – 10 triệu',
    tag: 'Mới',
    tagColor: 'bg-green-100 text-green-700',
    desc: 'Kiểm tra và đối soát chi phí quảng cáo (Ads) từ các nền tảng Facebook, Google, TikTok. Đối chiếu và kiểm kê số lượng hàng tồn kho. Theo dõi và xử lý hàng hoàn. Hỗ trợ công việc kế toán nội bộ khác.',
    requirements: [
      'Tốt nghiệp chuyên ngành Kế toán, Tài chính hoặc các ngành liên quan',
      'Thành thạo Excel',
      'Có kinh nghiệm đối soát số liệu, kiểm tra chi phí hoặc tồn kho (6–12 tháng là lợi thế)',
      'Cẩn thận, chi tiết, có tư duy kiểm soát và phát hiện sai lệch số liệu',
      'Ưu tiên có hiểu biết về quảng cáo (Facebook, TikTok Ads) hoặc vận hành TMĐT',
    ],
  },
]
