'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import {
  categories,
  getJobSlug,
  slugify,
  type Job,
} from './jobs-data'

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

export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const router = useRouter()
  const [jobs] = useState<Job[]>(initialJobs)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [copiedJobSlug, setCopiedJobSlug] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const legacyJobParam = new URLSearchParams(window.location.search).get('job')
    if (!legacyJobParam) return

    const normalizedLegacy = slugify(legacyJobParam)
    if (!normalizedLegacy) return

    const matched = jobs.find((job) => {
      const slug = getJobSlug(job).toLowerCase()
      return slug === normalizedLegacy || String(job.id).toLowerCase() === normalizedLegacy
    })

    const targetSlug = matched ? getJobSlug(matched) : normalizedLegacy
    router.replace(`/tuyen-dung/${encodeURIComponent(targetSlug)}`)
  }, [jobs, router])

  const openJobDetail = (job: Job) => {
    router.push(`/tuyen-dung/${encodeURIComponent(getJobSlug(job))}`)
  }

  const getJobShareLink = (job: Job) => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://bydgroup.vn'
    return `${base}/tuyen-dung/${encodeURIComponent(getJobSlug(job))}`
  }

  const copyJobLink = async (job: Job) => {
    const link = getJobShareLink(job)

    try {
      await navigator.clipboard.writeText(link)
      setCopiedJobSlug(getJobSlug(job))
      setTimeout(() => setCopiedJobSlug(''), 1800)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = link
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedJobSlug(getJobSlug(job))
      setTimeout(() => setCopiedJobSlug(''), 1800)
    }
  }

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
              Tuyển dụng <span className="text-[#EC1313]">BYD</span>
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
                Nộp hồ sơ nhanh
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

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
              Mỗi vị trí có trang chi tiết riêng để bạn dễ chia sẻ và nộp hồ sơ trực tiếp.
            </p>
          </div>

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

          {filteredJobs.length === 0 ? (
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
                <article
                  key={job.id}
                  onClick={() => openJobDetail(job)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openJobDetail(job)
                    }
                  }}
                  className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:border-[#EC1313]/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Xem chi tiết vị trí ${job.title}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAFAFA] border border-slate-100 flex items-center justify-center text-2xl">
                      {job.icon}
                    </div>
                    {job.tag && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.tagColor}`}>
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

                  <div className="space-y-2 mb-4 text-[#64748B] text-sm">
                    <p>{job.location}</p>
                    <p>{job.type}</p>
                    <p>{job.salary}</p>
                  </div>

                  <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2">
                    {job.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#EC1313] group-hover:underline">
                      Mở trang chi tiết
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        void copyJobLink(job)
                      }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#EC1313] hover:text-[#EC1313] transition-colors"
                      aria-label={`Sao chép link tuyển dụng ${job.title}`}
                    >
                      {copiedJobSlug === getJobSlug(job) ? 'Đã sao chép' : 'Copy link'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

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
        </div>
      </section>
    </div>
  )
}
