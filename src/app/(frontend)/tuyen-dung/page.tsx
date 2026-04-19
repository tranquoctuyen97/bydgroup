'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

const ENABLE_RUNTIME_FETCH = false

/* ── types ────────────────────────────────────────── */

interface Job {
  id: number | string
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
}

/* ── category mapping ─────────────────────────────── */

const categoryMap: Record<string, string> = {
  'cong-nghe': 'Công nghệ',
  'kinh-doanh': 'Kinh doanh',
  'marketing': 'Marketing',
  'van-hanh': 'Vận hành',
  'nhan-su': 'Nhân sự',
  'tai-chinh': 'Tài chính',
}

const categories = ['Tất cả', 'Marketing', 'Kinh doanh', 'Vận hành', 'Tài chính']

/* ── fallback data ────────────────────────────────── */

const fallbackJobs: Job[] = [
  { id: 1, icon: '📣', title: 'Chuyên viên / Lead Marketing', category: 'Marketing', location: 'Hà Nội', type: 'Toàn thời gian', level: 'Middle – Lead', salary: '10 – 15 triệu + thưởng doanh thu', tag: 'Tuyển gấp', tagColor: 'bg-[#EC1313] text-white', desc: 'Xây dựng kế hoạch Digital Marketing, triển khai quảng cáo Facebook/Google/TikTok, tối ưu funnel chuyển đổi và quản lý đội ngũ Digital.', requirements: ['1–2 năm kinh nghiệm Facebook Ads hoặc TikTok Ads', 'Đã quản lý ngân sách lớn, có kết quả doanh thu tốt', 'Thành thạo phân tích và tối ưu chiến dịch (CPL, CPA, ROAS)', 'Ưu tiên kinh nghiệm thị trường Đông Nam Á'] },
  { id: 2, icon: '🎯', title: 'Nhân viên Marketing (Facebook Ads)', category: 'Marketing', location: 'Hà Nội', type: 'Toàn thời gian', level: 'Junior – Middle', salary: '8 triệu + thưởng doanh thu', tag: 'Mới', tagColor: 'bg-green-100 text-green-700', desc: 'Lập kế hoạch và triển khai chiến dịch Facebook Ads, trực tiếp tối ưu quảng cáo đảm bảo CPM, CTR, CPC, ROAS đạt KPI.', requirements: ['Tối thiểu 6 tháng kinh nghiệm chạy Facebook Ads', 'Tốt nghiệp Marketing, Truyền thông hoặc TMĐT', 'Tư duy phân tích dữ liệu, hiểu hành vi khách hàng online', 'Chủ động, trách nhiệm với KPI'] },
  { id: 3, icon: '📋', title: 'Project Manager (TikTok Shop SEA)', category: 'Kinh doanh', location: 'Hà Nội', type: 'Toàn thời gian', level: 'Middle – Senior', salary: '15 – 25 triệu + thưởng', tag: 'Hot', tagColor: 'bg-orange-100 text-orange-600', desc: 'Xây dựng & triển khai chiến lược TikTok Shop cho thị trường Malaysia, Philippines, Thái Lan. Quản lý quy trình traffic → chuyển đổi → doanh thu.', requirements: ['Có kinh nghiệm TikTok Shop / TikTok Ads / E-commerce thực tế', 'Khả năng quản lý dự án & điều phối team', 'Tư duy data-driven, growth-oriented', 'Hiểu biết thị trường Đông Nam Á là lợi thế'] },
  { id: 4, icon: '🗂️', title: 'Trợ lý CEO / PMO', category: 'Vận hành', location: 'Hà Nội', type: 'Toàn thời gian', level: 'Middle', salary: '15 – 25 triệu', tag: 'Tuyển gấp', tagColor: 'bg-[#EC1313] text-white', desc: 'Quản lý lịch làm việc CEO, theo dõi đầu việc, follow-up tiến độ liên phòng ban, xây dựng hệ thống tracker & dashboard báo cáo.', requirements: ['1–3 năm kinh nghiệm Trợ lý CEO, PMO, Operations', 'Kỹ năng ghi chép, hệ thống hóa thông tin xuất sắc', 'Thành thạo Google Sheets/Excel/Notion', 'Chủ động, kỷ luật, bảo mật thông tin tốt'] },
  { id: 5, icon: '🎬', title: 'Nhân viên Media', category: 'Marketing', location: 'Hà Nội', type: 'Toàn thời gian', level: 'Junior – Middle', salary: '10 – 12 triệu + thưởng KPI', tag: 'Mới', tagColor: 'bg-green-100 text-green-700', desc: 'Lên ý tưởng nội dung, sản xuất & edit video truyền thông cho các nền tảng Facebook, TikTok, YouTube, Website.', requirements: ['1 năm kinh nghiệm vị trí tương đương', 'Thành thạo Photoshop, AI, Canva, Capcut', 'Tư duy content hình ảnh, bố cục, màu sắc tốt', 'Ưu tiên kinh nghiệm truyền thông, TMĐT'] },
  { id: 6, icon: '📊', title: 'Kế toán Nội bộ', category: 'Tài chính', location: 'Hà Nội', type: 'Toàn thời gian', level: 'Junior – Middle', salary: '8 – 10 triệu', tag: 'Mới', tagColor: 'bg-green-100 text-green-700', desc: 'Kiểm tra đối soát chi phí quảng cáo (Ads), đối chiếu tồn kho, theo dõi hàng hoàn và hỗ trợ công việc kế toán nội bộ.', requirements: ['Tốt nghiệp chuyên ngành Kế toán, Tài chính', 'Thành thạo Excel', '6–12 tháng kinh nghiệm đối soát số liệu', 'Ưu tiên hiểu biết về quảng cáo (Facebook, TikTok Ads) hoặc vận hành TMĐT'] },
]

/* ── why join data ────────────────────────────────── */

const whyJoinItems = [
  {
    icon: '🚀',
    title: 'TĂNG TRƯỞNG VƯỢT BẬC',
    desc: 'Tham gia vào hành trình phát triển nhanh chóng của tập đoàn công nghệ hàng đầu, nơi bạn có cơ hội phát triển sự nghiệp theo cấp số nhân.',
  },
  {
    icon: '💡',
    title: 'CÔNG NGHỆ TIÊN PHONG',
    desc: 'Làm việc với các công nghệ mới nhất: AI, Big Data, Cloud Computing. Được tiếp cận và phát triển trên những nền tảng công nghệ hàng đầu thế giới.',
  },
  {
    icon: '🌏',
    title: 'TẦM NHÌN QUỐC TẾ',
    desc: 'Cơ hội làm việc trong môi trường đa quốc gia, hợp tác với đối tác toàn cầu và mở rộng tầm nhìn nghề nghiệp ra phạm vi khu vực và quốc tế.',
  },
]

/* ── component ────────────────────────────────────── */

export default function RecruitmentPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>(fallbackJobs)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(ENABLE_RUNTIME_FETCH)

  useEffect(() => {
    if (!ENABLE_RUNTIME_FETCH) return

    async function fetchJobs() {
      try {
        const res = await fetch(
          '/api/jobs?where[status][equals]=active&sort=-publishedAt&limit=50',
        )
        if (res.ok) {
          const data = await res.json()
          if (data.docs && data.docs.length > 0) {
            const mapped: Job[] = data.docs.map((doc: any) => ({
              id: doc.id,
              icon: doc.icon || '💼',
              title: doc.title,
              category: categoryMap[doc.category] || doc.category || 'Khác',
              location: doc.location || 'Việt Nam',
              type: doc.type || 'Toàn thời gian',
              level: doc.level || '',
              salary: doc.salary || 'Thỏa thuận',
              tag: doc.tag || '',
              tagColor: doc.tagColor || '',
              desc: doc.description || '',
              requirements: doc.requirements || [],
            }))
            setJobs(mapped)
          }
        }
      } catch {
        // fallback to hardcoded data
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      search === '' ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.desc.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      activeCategory === 'Tất cả' || job.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-white">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/recruitment_hero.webp"
            alt="Tuyển dụng BYD"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/30" />
        </div>

        <div className="absolute top-20 right-20 w-72 h-72 bg-[#EC1313]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#EC1313]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EC1313] animate-pulse" />
              <span className="text-white/90 text-sm font-semibold tracking-wider uppercase">
                Cơ hội nghề nghiệp
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Tuyển dụng{' '}
              <span className="text-[#EC1313]">BYD</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Gia nhập đội ngũ BYD — nơi mỗi cá nhân đều có cơ hội tỏa sáng,
              dám Nghĩ Lớn và tạo ra những thành tựu vĩ đại.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('job-list')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d41111] transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 flex items-center gap-3"
              >
                Xem vị trí
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <Link
                href="/tuyen-dung/ung-tuyen"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm text-center"
              >
                Nộp hồ sơ ngay
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══════════════ SEARCH & FILTER ═══════════════ */}
      <section id="job-list" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EC1313]" />
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">
                Vị trí đang tuyển
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">
              TÌM CÔNG VIỆC PHÙ HỢP
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Khám phá các vị trí đang tuyển dụng tại BYD và bắt đầu hành trình
              sự nghiệp của bạn.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <label htmlFor="job-search" className="sr-only">
                Tìm kiếm vị trí tuyển dụng
              </label>
              <input
                id="job-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm vị trí, từ khóa..."
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#64748B]"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#EC1313] text-white shadow-lg shadow-red-200'
                    : 'bg-slate-100 text-[#475569] hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Job cards grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-[#EC1313] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#64748B] mt-4">Đang tải...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                Không tìm thấy vị trí phù hợp
              </h3>
              <p className="text-[#64748B]">
                Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
              <button
                type="button"
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:border-[#EC1313]/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                aria-label={`Xem chi tiết vị trí ${job.title}`}
              >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] border border-slate-100 flex items-center justify-center text-2xl">
                      {job.icon}
                    </div>
                    {job.tag && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${job.tagColor}`}
                      >
                        {job.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#EC1313] transition-colors line-clamp-2">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-[rgba(236,19,19,0.08)] text-[#EC1313] text-xs font-semibold px-2.5 py-1 rounded-full">
                      {job.category}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#64748B] text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-[#64748B] text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-[#64748B] text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2">
                    {job.desc}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ WHY JOIN ═══════════════ */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">
                Vì sao chọn BYD
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">
              LÝ DO GIA NHẬP BYD
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              BYD mang đến môi trường làm việc lý tưởng cho những ai đam mê
              công nghệ và muốn tạo ra tác động lớn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyJoinItems.map((item) => (
              <div
                key={item.title}
                className="group bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:border-[#EC1313]/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#EC1313] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tuyen-dung/ung-tuyen"
              className="group inline-flex items-center gap-3 bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d41111] transition-all duration-300 hover:shadow-lg hover:shadow-red-200"
            >
              Ứng tuyển ngay
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ JOB DETAIL MODAL ═══════════════ */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="job-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-8 py-6 flex items-start justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] border border-slate-100 flex items-center justify-center text-2xl">
                  {selectedJob.icon}
                </div>
                <div>
                  <h3 id="job-modal-title" className="text-xl font-bold text-[#0F172A]">
                    {selectedJob.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block bg-[rgba(236,19,19,0.08)] text-[#EC1313] text-xs font-semibold px-2.5 py-1 rounded-full">
                      {selectedJob.category}
                    </span>
                    {selectedJob.tag && (
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedJob.tagColor}`}
                      >
                        {selectedJob.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Đóng chi tiết vị trí tuyển dụng"
                onClick={() => setSelectedJob(null)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 text-[#475569]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="px-8 py-6">
              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#FAFAFA] rounded-xl p-4">
                  <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">
                    Địa điểm
                  </div>
                  <div className="text-[#0F172A] font-semibold text-sm">
                    {selectedJob.location}
                  </div>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-4">
                  <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">
                    Hình thức
                  </div>
                  <div className="text-[#0F172A] font-semibold text-sm">
                    {selectedJob.type}
                  </div>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-4">
                  <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">
                    Mức lương
                  </div>
                  <div className="text-[#EC1313] font-bold text-sm">
                    {selectedJob.salary}
                  </div>
                </div>
                <div className="bg-[#FAFAFA] rounded-xl p-4">
                  <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">
                    Cấp bậc
                  </div>
                  <div className="text-[#0F172A] font-semibold text-sm">
                    {selectedJob.level || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-[#0F172A] mb-3">
                  Mô tả công việc
                </h4>
                <p className="text-[#475569] leading-relaxed">
                  {selectedJob.desc}
                </p>
              </div>

              {/* Requirements */}
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-[#0F172A] mb-3">
                    Yêu cầu
                  </h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[#EC1313] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-[#475569]">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-3">
                <Link
                  href="/tuyen-dung/ung-tuyen"
                  className="flex-1 bg-[#EC1313] text-white px-6 py-4 rounded-xl font-bold text-center hover:bg-[#d41111] transition-all duration-300 hover:shadow-lg hover:shadow-red-200"
                >
                  Ứng tuyển ngay
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-4 rounded-xl font-bold border-2 border-slate-200 text-[#475569] hover:bg-slate-50 transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
