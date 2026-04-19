'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

const ENABLE_RUNTIME_FETCH = false

/* ── types ────────────────────────────────────────── */

interface NewsItem {
  id: number | string
  img: string
  tag: string
  title: string
  desc: string
  date: string
  content?: string
  author?: string
}

/* ── categories ───────────────────────────────────── */

const categories = ['Tất cả', 'Sự kiện', 'Công nghệ', 'Văn hóa', 'Kinh doanh', 'Vận hành']

/* ── category mapping ─────────────────────────────── */

const categoryMap: Record<string, string> = {
  'su-kien': 'Sự kiện',
  'cong-nghe': 'Công nghệ',
  'van-hoa': 'Văn hóa',
  'kinh-doanh': 'Kinh doanh',
  'van-hanh': 'Vận hành',
}

/* ── richText JSON → plain text helper ─────────── */
function extractTextFromRichText(content: any): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (typeof content === 'object') {
    // Payload richText format: { root: { children: [...] } }
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
    // If it's some other object shape, try to stringify
    try {
      return JSON.stringify(content)
    } catch {
      return ''
    }
  }
  return String(content)
}

/* ── fallback data ────────────────────────────────── */

const fallbackNews: NewsItem[] = [
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
    content: 'BYD vinh danh những cá nhân xuất sắc nhất trong tháng!\n\n🏆 Giải thưởng Everest – Top 1 doanh thu được trao cho những chiến binh kinh doanh đã nỗ lực không ngừng nghỉ.\n\nĐây không chỉ là phần thưởng vật chất, mà còn là sự ghi nhận cho tinh thần "Vượt Đích" – một trong 8 giá trị cốt lõi của BYD.\n\nChúc mừng tất cả các anh chị em đã đạt được thành tích xuất sắc! Hãy tiếp tục chinh phục những đỉnh cao mới! 🚀',
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

/* ── component ────────────────────────────────────── */

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews)
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [loading, setLoading] = useState(ENABLE_RUNTIME_FETCH)

  useEffect(() => {
    if (!ENABLE_RUNTIME_FETCH) return

    async function fetchNews() {
      try {
        const res = await fetch('/api/posts?sort=-publishedAt&limit=50')
        if (res.ok) {
          const data = await res.json()
          if (data.docs && data.docs.length > 0) {
            const mapped: NewsItem[] = data.docs.map((doc: any) => {
              const contentText = extractTextFromRichText(doc.content)
              return {
                id: doc.id,
                img: doc.featuredImage?.url || doc.externalImageUrl || doc.image?.url || '/images/sinh-nhat-quy4.webp',
                tag: categoryMap[doc.category] || doc.category || 'Tin tức',
                title: doc.title,
                desc: doc.excerpt || doc.description || (contentText ? contentText.slice(0, 150) + '...' : ''),
                date: doc.publishedAt
                  ? new Date(doc.publishedAt).toLocaleDateString('vi-VN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '',
                content: contentText,
                author: doc.author?.name || doc.author || 'BYD Media',
              }
            })
            setNews(mapped)
          }
        }
      } catch {
        // fallback to hardcoded data
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const filteredNews = news.filter(
    (item) => activeCategory === 'Tất cả' || item.tag === activeCategory,
  )

  const featuredArticle = filteredNews[0]
  const restArticles = filteredNews.slice(1)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setNewsletterSubmitted(true)
      setNewsletterEmail('')
    }
  }

  return (
    <div className="bg-white">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EC1313]" />
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">
                Tin tức & Hoạt động
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">
              TIN TỨC BYD
            </h1>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Cập nhật những tin tức mới nhất về hoạt động, sự kiện và công
              nghệ tại BYD.
            </p>
          </div>

          {/* Featured article */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-[#EC1313] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#64748B] mt-4">Đang tải...</p>
            </div>
          ) : featuredArticle ? (
            <button
              type="button"
              onClick={() => setSelectedNews(featuredArticle)}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
            >
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                <ImageWithFallback
                  src={featuredArticle.img}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:pr-10">
                <span className="inline-block bg-[#EC1313] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 w-fit">
                  {featuredArticle.tag}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-[#EC1313] transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-[#475569] leading-relaxed mb-4 line-clamp-3">
                  {featuredArticle.desc}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[#64748B] text-sm">
                    {featuredArticle.date}
                  </span>
                  {featuredArticle.author && (
                    <>
                      <span className="text-[#64748B]">·</span>
                      <span className="text-[#64748B] text-sm">
                        {featuredArticle.author}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>
          ) : null}
        </div>
      </section>

      {/* ═══════════════ CATEGORY FILTER & NEWS GRID ═══════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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

          {/* News cards grid */}
          {restArticles.length === 0 && !loading ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                Chưa có bài viết nào
              </h3>
              <p className="text-[#64748B]">
                Hãy thử chọn danh mục khác để xem thêm bài viết.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restArticles.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedNews(item)}
                  className="group bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 text-left"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#EC1313] text-xs font-bold uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <span className="text-[#64748B] text-xs">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug line-clamp-2 group-hover:text-[#EC1313] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EC1313]/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC1313]/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
            <span className="text-white/80 text-xs font-bold tracking-widest uppercase">
              Newsletter
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            ĐĂNG KÝ NHẬN TIN
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Nhận thông tin mới nhất về BYD, công nghệ và cơ hội nghề nghiệp
            trực tiếp vào email của bạn.
          </p>

          {newsletterSubmitted ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 max-w-md mx-auto">
              <svg
                className="w-10 h-10 text-green-400 mx-auto mb-3"
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
              <p className="text-green-400 font-semibold">
                Đăng ký thành công! Cảm ơn bạn.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <label htmlFor="news-newsletter-email" className="sr-only">
                Email đăng ký nhận tin tức
              </label>
              <input
                id="news-newsletter-email"
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                autoComplete="email"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#d41111] transition-all hover:shadow-lg hover:shadow-red-500/30 whitespace-nowrap"
              >
                Đăng ký
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════ NEWS DETAIL MODAL ═══════════════ */}
      {selectedNews && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
              <ImageWithFallback
                src={selectedNews.img}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Close button */}
              <button
                type="button"
                aria-label="Đóng bài viết"
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
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

              {/* Tag on image */}
              <div className="absolute bottom-4 left-6">
                <span className="inline-block bg-[#EC1313] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {selectedNews.tag}
                </span>
              </div>
            </div>

            {/* Modal body */}
            <div className="px-8 py-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#64748B] text-sm">
                  {selectedNews.date}
                </span>
                {selectedNews.author && (
                  <>
                    <span className="text-[#64748B]">·</span>
                    <span className="text-[#64748B] text-sm">
                      {selectedNews.author}
                    </span>
                  </>
                )}
              </div>

              <h2 id="news-modal-title" className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-6 leading-tight">
                {selectedNews.title}
              </h2>

              <div className="prose prose-slate max-w-none">
                <p className="text-[#475569] leading-relaxed text-lg mb-4">
                  {selectedNews.desc}
                </p>
                {selectedNews.content && (
                  <div className="text-[#475569] leading-relaxed whitespace-pre-line">
                    {selectedNews.content}
                  </div>
                )}
              </div>

              {/* Share / close */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-[#64748B] text-sm font-semibold">
                    Chia sẻ:
                  </span>
                  <button type="button" aria-label="Chia sẻ lên X" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#EC1313] hover:text-white text-[#475569] flex items-center justify-center transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button type="button" aria-label="Chia sẻ lên LinkedIn" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#EC1313] hover:text-white text-[#475569] flex items-center justify-center transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-3 rounded-xl font-bold border-2 border-slate-200 text-[#475569] hover:bg-slate-50 transition-all text-sm"
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
