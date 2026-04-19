'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

/* ── images ───────────────────────────────────────── */

const imgCulture = '/images/hoat-dong-20-10.webp'
const imgOffice = '/images/du-lich-cua-lo.webp'
const imgTeam = '/images/sinh-nhat-van-phong.webp'

/* ── data ─────────────────────────────────────────── */

const benefits = [
  { icon: '💰', title: 'LƯƠNG THƯỞNG CẠNH TRANH', desc: 'Chế độ lương thưởng hấp dẫn, review lương 2 lần/năm theo năng lực thực tế.' },
  { icon: '🏥', title: 'BẢO HIỂM SỨC KHỎE', desc: 'Bảo hiểm sức khỏe toàn diện cho nhân viên và người thân, khám sức khỏe định kỳ.' },
  { icon: '📚', title: 'ĐÀO TẠO & PHÁT TRIỂN', desc: 'Ngân sách đào tạo cá nhân, cơ hội tham gia hội thảo và chương trình mentoring.' },
  { icon: '🏖️', title: 'NGHỈ PHÉP LINH HOẠT', desc: '15+ ngày phép/năm, nghỉ phép không giới hạn cho nhân sự cấp Senior trở lên.' },
  { icon: '🏠', title: 'LÀM VIỆC LINH HOẠT', desc: 'Hybrid working, tự chọn giờ làm phù hợp, hỗ trợ thiết bị làm việc tại nhà.' },
  { icon: '🎯', title: 'THƯỞNG HIỆU SUẤT', desc: 'Bonus quý/năm theo kết quả kinh doanh, thưởng dự án và cổ phiếu ưu đãi.' },
  { icon: '🎉', title: 'HOẠT ĐỘNG GẮN KẾT', desc: 'Team building hàng quý, du lịch công ty, tiệc sinh nhật và sự kiện nội bộ.' },
  { icon: '🚀', title: 'LỘ TRÌNH THĂNG TIẾN', desc: 'Career path rõ ràng, cơ hội thăng tiến nhanh dựa trên năng lực và đóng góp.' },
]

const testimonials = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Senior Developer, 3 năm tại BYD',
    avatar: 'MA',
    quote:
      'BYD không chỉ là nơi làm việc — mà là nơi tôi dám mơ lớn và biến ước mơ thành hiện thực. Tinh thần WOW ở đây thực sự truyền cảm hứng cho tôi mỗi ngày.',
  },
  {
    name: 'Trần Thị Hương',
    role: 'Marketing Manager, 4 năm tại BYD',
    avatar: 'TH',
    quote:
      'Văn hóa 8 giá trị cốt lõi tại BYD không chỉ trên giấy — chúng tôi sống với nó mỗi ngày. Sự Tử Tế và Đoàn Kết là điều khen thưởng xứng đáng.',
  },
  {
    name: 'Lê Văn Đức',
    role: 'Product Owner, 2 năm tại BYD',
    avatar: 'VD',
    quote:
      'BYD là nơi mỗi cá nhân đều có cơ hội tỏa sáng. Lộ trình từ Học việc đến Core Leader rất rõ ràng. Đó là điều tôi trân quý nhất.',
  },
]

const culturePrograms = [
  {
    title: 'BYD ACADEMY',
    desc: 'Chương trình đào tạo nội bộ với 100+ khóa học từ kỹ năng cứng đến mềm, do chuyên gia trong và ngoài công ty giảng dạy.',
    icon: '🎓',
  },
  {
    title: 'INNOVATION LAB',
    desc: 'Không gian sáng tạo mở, nơi nhân viên tự do thử nghiệm ý tưởng mới. Các dự án xuất sắc được đầu tư phát triển thành sản phẩm thực.',
    icon: '💡',
  },
  {
    title: 'BYD CARES',
    desc: 'Chương trình CSR với các hoạt động thiện nguyện, bảo vệ môi trường và hỗ trợ cộng đồng xung quanh.',
    icon: '❤️',
  },
  {
    title: 'WELLNESS PROGRAM',
    desc: 'Chương trình chăm sóc sức khỏe toàn diện: yoga, gym, tư vấn tâm lý, và các hoạt động thể thao đội nhóm.',
    icon: '🧘',
  },
]

const activityHighlights = [
  {
    img: '/images/sinh-nhat-quy4.webp',
    title: 'HAPPY BIRTHDAY – NHÂN SỰ QUÝ I',
    desc: 'Công ty trân trọng gửi lời chúc mừng sinh nhật tới các thành viên có ngày sinh trong quý. Tuổi mới, chúc mọi người luôn dồi dào sức khỏe!',
    tag: '🎂 Sinh nhật',
    date: 'Quý I/2025',
  },
  {
    img: '/images/hoat-dong-20-10.webp',
    title: '8/3 – NGÀY CỦA HỘI CHỊ EM',
    desc: 'Nhân ngày Quốc tế Phụ nữ, BYD gửi lời chúc toàn thể chị em luôn xinh đẹp, ví luôn đầy và mood luôn chill!',
    tag: '🌸 Sự kiện',
    date: '08/03/2025',
  },
  {
    img: '/images/du-lich-cua-lo.webp',
    title: 'TEAM BUILDING – CỬA LÒ 2025',
    desc: 'Chuyến du lịch gắn kết đội ngũ tại Cửa Lò, nơi anh em cùng nhau tận hưởng những khoảnh khắc đáng nhớ.',
    tag: '✈️ Du lịch',
    date: '2025',
  },
  {
    img: '/images/sinh-nhat-van-phong.webp',
    title: 'CẦU LÔNG – GIẢI TỎA NĂNG LƯỢNG',
    desc: 'Không chỉ hết mình trong công việc, các thành viên BYD còn cháy hết mình trên sân cầu lông!',
    tag: '🏸 Thể thao',
    date: '2025',
  },
  {
    img: '/images/vinh-danh-top1.webp',
    title: 'VINH DANH TOP DOANH THU',
    desc: 'Lễ trao giải Everest – Top 1 doanh thu. BYD tôn vinh những cá nhân xuất sắc đã cống hiến hết mình.',
    tag: '🏆 Vinh danh',
    date: 'T10/2024',
  },
  {
    img: '/images/ngay-nam-gioi.webp',
    title: 'HAPPY MEN\'S DAY',
    desc: 'BYD chúc mừng ngày nam giới – cảm ơn các anh em đã luôn đồng hành và cống hiến!',
    tag: '🎉 Sự kiện',
    date: '11/2024',
  },
]

/* ── component ────────────────────────────────────── */

export default function CulturePage() {
  const router = useRouter()
  const [galleryImage, setGalleryImage] = useState<string | null>(null)

  return (
    <div className="bg-white">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imgCulture}
            alt="Văn hóa BYD"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
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
                Văn hóa doanh nghiệp
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Văn hóa{' '}
              <span className="text-[#EC1313]">BYD</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Nơi mỗi cá nhân được tôn trọng, phát triển và cùng nhau kiến tạo
              những giá trị bền vững cho cộng đồng.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => router.push('/tuyen-dung')}
                className="group bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d41111] transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 flex items-center gap-3"
              >
                Gia nhập ngay
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
              <button
                type="button"
                onClick={() => router.push('/gioi-thieu')}
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
              >
                Về BYD
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══════════════ CULTURE VALUES ═══════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EC1313]" />
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">
                Giá trị văn hóa
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">
              NHỮNG GIÁ TRỊ CHÚNG TÔI THEO ĐUỔI
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              BYD xây dựng văn hóa doanh nghiệp dựa trên nền tảng con người,
              sáng tạo và trách nhiệm cộng đồng.
            </p>
          </div>

          {/* Row 1: text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-6">
                Nghĩ Lớn — Tốc Độ — WOW
              </h3>
              <p className="text-[#475569] text-lg leading-relaxed mb-6">
                Tại BYD, mỗi nhân viên đều là một cá nhân độc đáo với tiềm năng
                riêng. Chúng tôi tạo môi trường để mỗi người có thể phát huy tối
                đa khả năng của mình, đóng góp vào sự phát triển chung của tổ
                chức.
              </p>
              <p className="text-[#475569] leading-relaxed">
                Chính sách nhân sự linh hoạt, chương trình mentoring 1-1, và văn
                hóa feedback mở giúp mọi thành viên luôn cảm thấy được lắng
                nghe và trân trọng.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imgOffice}
                alt="Văn phòng BYD"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Row 2: image left, text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imgTeam}
                alt="Đội ngũ BYD"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-6">
                Tử Tế — Đoàn Kết — Vượt Đích
              </h3>
              <p className="text-[#475569] text-lg leading-relaxed mb-6">
                Sáng tạo là DNA của BYD. Chúng tôi khuyến khích mọi ý tưởng mới
                và tạo không gian an toàn để thử nghiệm. Thất bại được xem là
                bài học quý giá trên hành trình đổi mới.
              </p>
              <p className="text-[#475569] leading-relaxed">
                Hackathon nội bộ hàng quý, Innovation Lab, và chương trình
                Intrapreneurship giúp nhân viên biến ý tưởng thành sản phẩm thực
                tế có tác động lớn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BENEFITS ═══════════════ */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">
                Quyền lợi
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">
              PHÚC LỢI VƯỢT TRỘI
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              BYD cam kết mang đến chế độ đãi ngộ tốt nhất để nhân viên yên tâm
              cống hiến và phát triển sự nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:border-[#EC1313]/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#EC1313] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CULTURE PROGRAMS ═══════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">
                Chương trình nổi bật
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">
              CHƯƠNG TRÌNH VĂN HÓA
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Những chương trình đặc biệt giúp BYD trở thành nơi làm việc tuyệt
              vời nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {culturePrograms.map((program) => (
              <div
                key={program.title}
                className="group bg-[#FAFAFA] rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:border-[#EC1313]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="text-4xl flex-shrink-0">{program.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#EC1313] transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-[#475569] leading-relaxed">
                      {program.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ACTIVITY HIGHLIGHTS ═══════════════ */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EC1313]" />
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">
                Hoạt động nổi bật
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">
              KHOẢNH KHẮC BYD
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Những khoảnh khắc đáng nhớ từ các hoạt động gắn kết, vinh danh và
              sự kiện nội bộ tại BYD.
            </p>
          </div>

          {/* Masonry-style grid: 2 large + 4 small */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activityHighlights.map((item, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setGalleryImage(item.img)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  idx < 2
                    ? 'lg:col-span-1 md:col-span-1 aspect-[4/3]'
                    : 'aspect-[4/3]'
                } ${idx === 0 ? 'lg:row-span-2 lg:aspect-auto lg:min-h-[500px]' : ''} text-left`}
                aria-label={`Xem ảnh: ${item.title}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-[#EC1313] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <span className="text-white/60 text-xs">{item.date}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm lg:text-base leading-snug mb-1 group-hover:text-[#EC1313] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-xs lg:text-sm leading-relaxed line-clamp-2 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY LIGHTBOX ═══════════════ */}
      {galleryImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Thư viện ảnh hoạt động BYD"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setGalleryImage(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImage}
              alt="BYD Activity"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              loading="eager"
              decoding="async"
            />
            <button
              type="button"
              aria-label="Đóng thư viện ảnh"
              onClick={() => setGalleryImage(null)}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0F172A] hover:bg-[#EC1313] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-20 lg:py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EC1313]/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC1313]/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4 border border-white/10">
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase">
                Tiếng nói từ đội ngũ
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
              BYD QUA LỜI KỂ NHÂN VIÊN
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Lắng nghe chia sẻ thực tế từ những thành viên đang đồng hành cùng
              BYD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-[#EC1313]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  className="w-10 h-10 text-[#EC1313]/40 mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-white/80 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#EC1313] flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-slate-400 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#EC1313] to-[#b91010] rounded-3xl p-12 lg:p-16 text-white shadow-2xl shadow-red-200/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

            <div className="relative text-center">
              <h2 className="text-4xl lg:text-5xl font-black mb-5">
                Bạn muốn trở thành một phần của BYD?
              </h2>
              <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Khám phá cơ hội nghề nghiệp và cùng chúng tôi xây dựng tương
                lai thương mại điện tử Việt Nam.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/tuyen-dung"
                  className="bg-white text-[#EC1313] px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors w-full sm:w-auto shadow-lg text-center"
                >
                  Xem vị trí tuyển dụng
                </Link>
                <Link
                  href="/tuyen-dung/ung-tuyen"
                  className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto text-center"
                >
                  Nộp hồ sơ ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
