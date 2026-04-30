import Link from 'next/link'

import { CoreValueIcon, coreValues } from '../core-values'

const imgHero = '/images/du-lich-cua-lo.webp'

const timeline = [
  {
    year: '08/2024',
    title: 'THÀNH LẬP BYD',
    desc: 'Với sứ mệnh chinh phục lĩnh vực thương mại điện tử và truyền thông thương mại đa nền tảng, lấy con người làm trung tâm.',
    color: 'bg-[#EC1313]',
  },
  {
    year: '2024 - NAY',
    title: 'MỞ RỘNG HỆ SINH THÁI',
    desc: 'Xây dựng hệ sinh thái kinh doanh đa ngành: nông nghiệp, gia dụng, thời trang, hàng thương hiệu, mỹ phẩm. Đội ngũ nhân sự trẻ trung, năng động không ngừng mở rộng quy mô.',
    color: 'bg-[#EC1313]',
  },
]

const stats = [
  { value: '1000+', label: 'Sản phẩm' },
  { value: '50+', label: 'Đối tác thương hiệu' },
  { value: '5+', label: 'Ngành hàng' },
  { value: '99%', label: 'Khách hàng hài lòng' },
]

export default function GioiThieuPage() {
  return (
    <div className="bg-white">
      <section className="relative flex min-h-[500px] items-center overflow-hidden lg:min-h-[600px]">
        <div className="absolute inset-0">
          <img
            src={imgHero}
            alt="BYD About Hero"
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/30" />
        </div>

        <div className="pointer-events-none absolute right-20 top-20 h-72 w-72 rounded-full bg-[#EC1313]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-56 w-56 rounded-full bg-[#EC1313]/5 blur-2xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-[#EC1313] animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider text-white/90">Về chúng tôi</span>
            </div>

            <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Giới thiệu <span className="text-[#EC1313]">BYD</span>
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/85 lg:text-xl">
              Hành trình kiến tạo hệ sinh thái thương mại điện tử đa nền tảng, nơi mỗi cá nhân đều có cơ hội tỏa sáng và tạo ra những thành tựu vĩ đại.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/linh-vuc"
                className="group flex items-center gap-3 rounded-xl bg-[#EC1313] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-[#d41111] hover:shadow-2xl hover:shadow-red-500/30"
              >
                Khám phá dịch vụ
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a
                href="mailto:hcns.byd@gmail.com"
                className="inline-block rounded-xl border-2 border-white/40 px-8 py-4 text-center text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Liên hệ ngay
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="bg-[#FAFAFA] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(236,19,19,0.08)] px-4 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#EC1313]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#EC1313]">Về chúng tôi</span>
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0F172A] lg:text-4xl">BYD GROUP VIỆT NAM</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#475569]">Hành trình xây dựng hệ sinh thái thương mại điện tử đa ngành tại Việt Nam & Đông Nam Á</p>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/images/du-lich-cua-lo.webp"
                  alt="Đội ngũ BYD"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                />
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                <p className="text-lg leading-relaxed text-[#475569]">
                  BYD là doanh nghiệp hoạt động trong lĩnh vực <strong className="text-[#0F172A]">thương mại điện tử đa nền tảng, đa quốc gia</strong>, tập trung phát triển mạnh tại thị trường Việt Nam & Đông Nam Á. Công ty kinh doanh đa dạng ngành hàng: nông nghiệp, gia dụng, thời trang, mỹ phẩm và các sản phẩm thương hiệu, mang đến trải nghiệm mua sắm <strong className="text-[#0F172A]">hiện đại - tiện lợi - đáng tin cậy</strong> cho khách hàng.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-slate-200" />
              <div className="space-y-10">
                {timeline.map((item) => (
                  <div key={item.year} className="relative pl-12">
                    <div className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full ${item.color} shadow-lg shadow-red-200`}>
                      <div className="h-3 w-3 rounded-full bg-white" />
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
                      <span className="mb-3 inline-block rounded-full bg-[rgba(236,19,19,0.08)] px-3 py-1.5 text-xs font-bold text-[#EC1313]">{item.year}</span>
                      <h3 className="mb-2 text-xl font-bold text-[#0F172A]">{item.title}</h3>
                      <p className="leading-relaxed text-[#475569]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="group text-center">
                <div className="mb-2 text-4xl font-black text-[#EC1313] transition-transform duration-300 group-hover:scale-110 lg:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold uppercase tracking-wider text-[#475569]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0F172A] py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#EC1313]/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white lg:text-4xl">TẦM NHÌN</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">Định hướng chiến lược dẫn dắt mọi hoạt động của BYD</p>
          </div>

          <div className="mx-auto mb-10 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#EC1313]/30 hover:bg-white/10">
              <div className="mb-8 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EC1313] text-white">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                </div>
              </div>
              <p className="text-xl font-bold uppercase leading-relaxed tracking-wide text-white lg:text-2xl">
                Xây dựng BYD thành doanh nghiệp toàn cầu, phân phối sản phẩm Việt ra quốc tế, góp phần nâng cao vị thế kinh tế Việt Nam
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FBFF] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-white px-4 py-2 shadow-sm">
              <span className="h-8 w-1 rounded-full bg-[#F6C400]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0074E8]">Văn hóa doanh nghiệp</span>
            </div>
            <h2 className="mb-4 text-3xl font-black uppercase tracking-wide text-[#0074E8] lg:text-4xl">8 GIÁ TRỊ CỐT LÕI</h2>
            <p className="mx-auto max-w-3xl text-lg text-[#475569]">
              Bộ giá trị định hình cách BYD suy nghĩ, ra quyết định, phối hợp và phục vụ khách hàng mỗi ngày.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {coreValues.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[8px] border border-[#E5EFFD] bg-white p-7 shadow-[0_18px_45px_rgba(0,74,173,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0074E8]/30 hover:shadow-[0_24px_60px_rgba(0,116,232,0.15)]"
              >
                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#F6C400]" />
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] bg-[#EAF4FF] text-[#0074E8]">
                    <CoreValueIcon name={item.icon} className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-black uppercase tracking-widest text-[#0074E8]/50">{item.number}</div>
                    <h3 className="text-2xl font-black uppercase tracking-wide text-[#0074E8]">{item.title}</h3>
                  </div>
                </div>
                <p className="mb-4 text-base font-semibold leading-relaxed text-[#0F172A]">{item.shortDesc}</p>
                <p className="mb-4 text-sm leading-relaxed text-[#475569]">{item.longDesc}</p>
                <div className="rounded-[8px] bg-[#F8FBFF] p-4 text-sm leading-relaxed text-[#334155]">
                  <span className="font-bold text-[#0074E8]">Trong công việc: </span>
                  {item.workMeaning}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EC1313] to-[#b91010] p-12 text-white shadow-2xl shadow-red-200/50 lg:p-16">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/3 rounded-full bg-white/5" />

            <div className="relative text-center">
              <h2 className="mb-5 text-4xl font-black lg:text-5xl">Cùng BYD kiến tạo giá trị vĩ đại</h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/90">
                Phụng sự xã hội qua những sản phẩm tốt lành - cùng chúng tôi nâng cao chất lượng cuộc sống cho mọi người.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/lien-he"
                  className="w-full rounded-xl bg-white px-8 py-4 text-center text-lg font-bold text-[#EC1313] shadow-lg transition-colors hover:bg-red-50 sm:w-auto"
                >
                  Liên hệ tư vấn
                </Link>
                <Link
                  href="/linh-vuc"
                  className="w-full rounded-xl border-2 border-white/50 px-8 py-4 text-center text-lg font-bold text-white transition-all hover:border-white hover:bg-white/10 sm:w-auto"
                >
                  Xem dịch vụ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
