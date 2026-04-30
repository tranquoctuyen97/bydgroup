import Link from 'next/link'

import { CoreValueIcon, coreValues } from './core-values'

const stats = [
  { display: '1000+', label: 'Sản phẩm', icon: 'users' },
  { display: '50+', label: 'Đối tác thương hiệu', icon: 'handshake' },
  { display: '5+', label: 'Ngành hàng', icon: 'trophy' },
  { display: '99%', label: 'Khách hàng hài lòng', icon: 'people' },
]

const services = [
  {
    img: '/images/service_agriculture.webp',
    title: 'Nông nghiệp',
    desc: 'Sản phẩm tốt lành từ thiên nhiên, góp phần cải thiện sức khỏe và nâng cao chất lượng cuộc sống.',
  },
  {
    img: '/images/service_homelife.webp',
    title: 'Gia dụng & Đời sống',
    desc: 'Sản phẩm gia dụng chất lượng cao, mang đến tiện nghi và sự thoải mái cho mỗi gia đình.',
  },
  {
    img: '/images/service_fashion.webp',
    title: 'Thời trang',
    desc: 'Phong cách và xu hướng - cập nhật liên tục các bộ sưu tập thời trang đa dạng.',
  },
  {
    img: '/images/service_brand.webp',
    title: 'Hàng thương hiệu',
    desc: 'Sản phẩm chính hãng, uy tín từ các thương hiệu được yêu thích trong nước và quốc tế.',
  },
  {
    img: '/images/service_beauty.webp',
    title: 'Mỹ phẩm & Làm đẹp',
    desc: 'Sản phẩm chăm sóc sắc đẹp an toàn, giúp khách hàng sống khỏe hơn, đẹp hơn mỗi ngày.',
  },
  {
    img: '/images/service_marketing.webp',
    title: 'Truyền thông thương mại',
    desc: 'Marketing đa nền tảng, tiếp cận khách hàng mục tiêu hiệu quả với chi phí tối ưu.',
  },
]

const teamGallery = [
  { img: '/images/du-lich-cua-lo.webp', title: 'Trải nghiệm & Gắn kết', desc: 'Cùng nhau tạo kỷ niệm - vì đội ngũ mạnh bắt đầu từ sự kết nối' },
  { img: '/images/trao-thuong-byd.webp', title: 'Ghi nhận & Tôn vinh', desc: 'Mỗi nỗ lực đều xứng đáng được công nhận và tưởng thưởng' },
  { img: '/images/sinh-nhat-quy4.webp', title: 'Ấm áp như gia đình', desc: 'BYD là gia đình thứ hai - nơi bạn được quan tâm mỗi ngày' },
  { img: '/images/hoat-dong-20-10.webp', title: 'Yêu thương & Sẻ chia', desc: 'Những khoảnh khắc đặc biệt dành cho những con người đặc biệt' },
]

const defaultNews = [
  {
    img: '/images/sinh-nhat-quy4.webp',
    tag: 'Văn hóa',
    title: 'Happy Birthday - Nhân sự Quý I của BYD',
    desc: 'Công ty trân trọng gửi lời chúc mừng sinh nhật tới các thành viên có ngày sinh trong tháng 1, 2 và 3.',
    date: '31 Tháng 3, 2025',
  },
  {
    img: '/images/hoat-dong-20-10.webp',
    tag: 'Sự kiện',
    title: '8/3 - Ngày của hội chị em BYD',
    desc: 'Nhân ngày Quốc tế Phụ nữ 8/3, BYD gửi lời chúc toàn thể chị em luôn xinh đẹp, ví luôn đầy và mood luôn chill!',
    date: '8 Tháng 3, 2025',
  },
  {
    img: '/images/du-lich-cua-lo.webp',
    tag: 'Sự kiện',
    title: 'Team Building Cửa Lò 2025 - Kết nối đội ngũ',
    desc: 'Chuyến du lịch gắn kết đội ngũ tại Cửa Lò, nơi anh em cùng nhau tận hưởng những khoảnh khắc đáng nhớ.',
    date: '20 Tháng 1, 2025',
  },
]

function StatIcon({ type }: { type: string }) {
  const cls = 'w-10 h-10 text-[#EC1313]'

  switch (type) {
    case 'users':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
    case 'handshake':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.591M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
    case 'trophy':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-3.77 1.522m0 0a6.003 6.003 0 01-3.77-1.522" /></svg>
    case 'people':
      return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
    default:
      return null
  }
}

export default function HomePage() {
  const news = defaultNews

  return (
    <div className="bg-white">
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero_banner.webp" alt="BYD Hero" className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" width="1920" height="1080" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/30" />
        </div>

        <div className="absolute top-20 right-20 w-72 h-72 bg-[#EC1313]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#EC1313]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EC1313] animate-pulse" />
              <span className="text-white/90 text-sm font-semibold tracking-wider uppercase">Hệ sinh thái TMĐT đa ngành</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4 tracking-tight">
              BYD - <span className="text-[#EC1313]">Build Your</span>
              <br />
              <span className="text-[#EC1313]">Dream</span>
            </h1>

            <p className="text-xl lg:text-2xl text-white font-semibold mb-4 max-w-xl">
              Thương mại điện tử & phân phối sản phẩm đa nền tảng
            </p>

            <p className="text-base lg:text-lg text-white/85 leading-relaxed mb-10 max-w-xl">
              Hoạt động trong lĩnh vực Thương mại điện tử và Truyền thông đa nền tảng.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/linh-vuc" className="group bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d41111] transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 flex items-center gap-3 cursor-pointer">
                Khám phá ngay
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <Link href="/gioi-thieu" className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm cursor-pointer">
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/du-lich-cua-lo.webp" alt="Đội ngũ BYD" className="w-full h-auto object-cover" loading="lazy" decoding="async" width="1200" height="800" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EC1313]" />
                <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">Về BYD Việt Nam</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-6 leading-tight tracking-tight uppercase">
                Kiến tạo hệ sinh thái thương mại điện tử đa ngành
              </h2>

              <p className="text-[#475569] text-lg leading-relaxed mb-8">
                BYD là doanh nghiệp hoạt động trong lĩnh vực thương mại điện tử đa nền tảng, đa quốc gia, tập trung phát triển mạnh tại thị trường Việt Nam & Đông Nam Á. Công ty kinh doanh đa dạng ngành hàng: nông nghiệp, gia dụng, thời trang, mỹ phẩm và các sản phẩm thương hiệu, mang đến trải nghiệm mua sắm hiện đại - tiện lợi - đáng tin cậy cho khách hàng.
              </p>

              <Link href="/gioi-thieu" className="group inline-flex items-center gap-3 bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#d41111] transition-all duration-300 hover:shadow-lg hover:shadow-red-200 cursor-pointer">
                Xem thêm
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">Dịch vụ nổi bật</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-widest uppercase">Lĩnh vực & Dịch vụ</h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Chúng tôi cung cấp các giải pháp toàn diện cho chuỗi giá trị thương mại điện tử hiện đại.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href="/linh-vuc" className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" width="1200" height="900" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-1 uppercase group-hover:text-[#EC1313] transition-colors">{service.title}</h3>
                  <p className="text-white/85 text-sm leading-relaxed line-clamp-2">{service.desc}</p>
                  <div className="mt-3 h-0.5 bg-[#EC1313] w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/linh-vuc" className="group inline-flex items-center gap-3 border-2 border-[#EC1313] text-[#EC1313] px-8 py-4 rounded-xl font-bold hover:bg-[#EC1313] hover:text-white transition-all duration-300 cursor-pointer">
              Xem tất cả dịch vụ
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#EC1313]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EC1313]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-widest uppercase">Vì sao chọn BYD?</h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">Được hàng triệu khách hàng và hàng trăm đối tác tin tưởng lựa chọn</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                  <StatIcon type={stat.icon} />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-[#EC1313] mb-2">{stat.display}</div>
                <div className="text-[#475569] font-semibold text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#FFF5F5] relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#EC1313]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-sm border border-[#FEE2E2]">
              <span className="h-8 w-1 rounded-full bg-[#EC1313]" />
              <span className="text-[#EC1313] text-xs font-black tracking-widest uppercase">Giá trị cốt lõi</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-wide uppercase">Bộ giá trị định hướng BYD</h2>
            <p className="text-[#475569] text-lg max-w-2xl mx-auto">
              8 nguyên tắc nền tảng giúp BYD thống nhất cách suy nghĩ, hành động và tạo ra giá trị bền vững.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreValues.map((item) => (
              <div
                key={item.title}
                className="group relative min-h-[220px] overflow-hidden rounded-[8px] border border-[#FEE2E2] bg-white p-6 shadow-[0_18px_45px_rgba(236,19,19,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#EC1313]/30 hover:shadow-[0_24px_60px_rgba(236,19,19,0.12)]"
              >
                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#EC1313]" />
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-[#EC1313]">
                    <CoreValueIcon name={item.icon} className="h-11 w-11" />
                  </div>
                  <span className="text-sm font-black text-[#EC1313]/15">{item.number}</span>
                </div>
                <h3 className="mb-3 text-xl font-black uppercase tracking-wide text-[#EC1313]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{item.shortDesc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/gioi-thieu" className="group inline-flex items-center gap-3 rounded-xl bg-[#EC1313] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-[#d41111] hover:shadow-lg hover:shadow-red-200">
              Xem ý nghĩa từng giá trị
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EC1313]" />
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">Cuộc sống tại BYD</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-widest uppercase">Đội ngũ & Văn hóa</h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              BYD không chỉ là nơi làm việc - đó là gia đình thứ hai, nơi mỗi người đều được tỏa sáng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamGallery.map((item) => (
              <Link key={item.title} href="/van-hoa" className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 aspect-[16/10]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" width="1200" height="750" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-1 uppercase group-hover:text-[#EC1313] transition-colors">{item.title}</h3>
                  <p className="text-white/85 text-sm">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/van-hoa" className="group inline-flex items-center gap-3 border-2 border-[#EC1313] text-[#EC1313] px-8 py-4 rounded-xl font-bold hover:bg-[#EC1313] hover:text-white transition-all duration-300 cursor-pointer">
              Khám phá văn hóa BYD
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
                <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">Tin tức mới nhất</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight">Tin tức & Hoạt động</h2>
            </div>
            <Link href="/tin-tuc" className="hidden md:flex items-center gap-2 text-[#EC1313] font-bold hover:gap-3 transition-all text-sm cursor-pointer">
              Xem tất cả
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Link href="/tin-tuc" className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 min-h-[400px] lg:min-h-[500px]" aria-label={`Xem bài viết ${news[0].title}`}>
              <img src={news[0].img} alt={news[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0" loading="lazy" decoding="async" width="1200" height="900" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block bg-[#EC1313] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">{news[0].tag}</span>
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#EC1313] transition-colors">{news[0].title}</h3>
                <p className="text-white/85 leading-relaxed mb-3 line-clamp-2">{news[0].desc}</p>
                <span className="text-white/70 text-sm">{news[0].date}</span>
              </div>
            </Link>

            <div className="flex flex-col gap-6">
              {news.slice(1).map((item) => (
                <Link key={item.title} href="/tin-tuc" className="group flex gap-5 bg-[#FAFAFA] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-slate-100" aria-label={`Xem bài viết ${item.title}`}>
                  <div className="w-48 lg:w-56 shrink-0 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="672" height="448" />
                  </div>
                  <div className="flex flex-col justify-center py-5 pr-5">
                    <span className="text-[#EC1313] text-xs font-bold uppercase tracking-wider mb-2">{item.tag}</span>
                    <h3 className="font-bold text-[#0F172A] mb-2 leading-snug line-clamp-2 group-hover:text-[#EC1313] transition-colors">{item.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-3 line-clamp-2">{item.desc}</p>
                    <span className="text-[#64748B] text-xs">{item.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">Liên hệ</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-widest uppercase">Vị trí của chúng tôi</h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">Ghé thăm văn phòng BYD để được tư vấn trực tiếp</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-slate-100 min-h-[400px]">
              <iframe
                title="BYD Vietnam Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.292576914698!2d105.83138!3d20.98234!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac5b0e66c95d%3A0x1e4bcf42e2f5e0e4!2zTmd1eeG7hW4gWGnhu4NuLCDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1709900000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="group bg-[#FAFAFA] rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-[#EC1313]/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#EC1313]/10 flex items-center justify-center mb-4 group-hover:bg-[#EC1313] transition-colors duration-300">
                  <svg className="w-6 h-6 text-[#EC1313] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">Trụ sở chính</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Số 12, Sunrise K, Đại lộ 10 (10th Ave),<br />
                  Ktral Park, đường Nguyễn Xiển,<br />
                  Phường Định Công, TP. Hà Nội
                </p>
              </div>

              <a href="tel:+84969240885" className="group bg-[#FAFAFA] rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-[#EC1313]/20 transition-all duration-300 block cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#EC1313]/10 flex items-center justify-center mb-4 group-hover:bg-[#EC1313] transition-colors duration-300">
                  <svg className="w-6 h-6 text-[#EC1313] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">Hotline</h3>
                <p className="text-[#475569] text-sm">0969 240 885</p>
                <p className="text-[#64748B] text-xs mt-1">Thứ 2 - Thứ 6, 8:00 - 17:30</p>
              </a>

              <a href="mailto:hcns.byd@gmail.com" className="group bg-[#FAFAFA] rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-[#EC1313]/20 transition-all duration-300 block cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#EC1313]/10 flex items-center justify-center mb-4 group-hover:bg-[#EC1313] transition-colors duration-300">
                  <svg className="w-6 h-6 text-[#EC1313] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">Email</h3>
                <p className="text-[#475569] text-sm">hcns.byd@gmail.com</p>
                <p className="text-[#64748B] text-xs mt-1">Phản hồi trong 24 giờ</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#EC1313] to-[#b91010] rounded-3xl p-12 lg:p-16 text-white shadow-2xl shadow-red-200/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

            <div className="relative text-center">
              <h2 className="text-4xl lg:text-5xl font-black mb-5">Gia nhập đội ngũ BYD</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Chúng tôi đang tìm kiếm những tài năng đam mê công nghệ và thương mại điện tử. Cùng chúng tôi kiến tạo tương lai!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {['Lương thưởng hấp dẫn', 'Đào tạo bài bản', 'Cơ hội thăng tiến'].map((benefit) => (
                  <span key={benefit} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {benefit}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/tuyen-dung" className="bg-white text-[#EC1313] px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors w-full sm:w-auto shadow-lg text-center cursor-pointer">
                  Xem vị trí đang tuyển
                </Link>
                <Link href="/tuyen-dung/ung-tuyen" className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto text-center cursor-pointer">
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
