'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

const imgLogistics = "/images/c2ccbf1858e405f5122d22037e50428c8430c63f.webp"
const imgEcommerce = "/images/sinh-nhat-outdoor.webp"
const imgPayment = "/images/sinh-nhat-quy4-2.webp"
const imgBigData = "/images/vinh-danh-top3.webp"

const categories = ["Tất cả", "Thương mại điện tử", "Logistics", "Thanh toán", "Dữ liệu & AI"]

interface Service {
  id: number
  title: string
  category: string
  img: string
  shortDesc: string
  fullDesc: string
  features: string[]
}

const services: Service[] = [
  {
    id: 1,
    title: "Nền tảng TMĐT Đa kênh",
    category: "Thương mại điện tử",
    img: imgEcommerce,
    shortDesc: "Xây dựng hệ thống kinh doanh trực tuyến đa nền tảng: Website, Mobile App, tích hợp sàn TMĐT.",
    fullDesc: "Giải pháp thương mại điện tử toàn diện giúp doanh nghiệp bán hàng đa kênh hiệu quả. Tích hợp quản lý đơn hàng, kho hàng, và chăm sóc khách hàng trên một nền tảng duy nhất.",
    features: ["Website thương mại điện tử responsive", "Ứng dụng Mobile iOS & Android", "Tích hợp Shopee, Lazada, TikTok Shop", "Quản lý đơn hàng tập trung"],
  },
  {
    id: 2,
    title: "Hệ thống Logistics 4.0",
    category: "Logistics",
    img: imgLogistics,
    shortDesc: "Vận hành thông minh, giao hàng tốc độ cao trên toàn quốc với công nghệ quản lý chuỗi cung ứng hiện đại.",
    fullDesc: "Hệ thống logistics thông minh sử dụng AI để tối ưu tuyến đường, quản lý kho bãi tự động, và theo dõi đơn hàng real-time trên toàn quốc.",
    features: ["Tối ưu tuyến đường bằng AI", "Theo dõi đơn hàng real-time", "Quản lý kho bãi tự động", "Phủ sóng 63 tỉnh thành"],
  },
  {
    id: 3,
    title: "Giải pháp Thanh toán Số",
    category: "Thanh toán",
    img: imgPayment,
    shortDesc: "Hệ thống thanh toán tích hợp đa phương thức: ví điện tử, thẻ, mã QR, hỗ trợ mua trước trả sau.",
    fullDesc: "Cổng thanh toán số an toàn, nhanh chóng với nhiều phương thức thanh toán phổ biến. Hỗ trợ doanh nghiệp tăng tỷ lệ chuyển đổi và trải nghiệm mua sắm liền mạch.",
    features: ["Ví điện tử & QR Pay", "Thanh toán thẻ quốc tế", "Mua trước trả sau (BNPL)", "Bảo mật chuẩn PCI-DSS"],
  },
  {
    id: 4,
    title: "Phân tích dữ liệu Big Data",
    category: "Dữ liệu & AI",
    img: imgBigData,
    shortDesc: "Thu thập và phân tích hành vi người dùng, tối ưu chiến lược kinh doanh qua dữ liệu thực chiến.",
    fullDesc: "Nền tảng phân tích dữ liệu lớn giúp doanh nghiệp hiểu rõ hành vi khách hàng, dự đoán xu hướng thị trường, và đưa ra quyết định kinh doanh dựa trên dữ liệu.",
    features: ["Dashboard phân tích real-time", "Dự đoán xu hướng bằng ML", "Phân khúc khách hàng thông minh", "Báo cáo tùy chỉnh"],
  },
  {
    id: 5,
    title: "Giám định & Chứng nhận",
    category: "Thương mại điện tử",
    img: imgEcommerce,
    shortDesc: "Dịch vụ giám định sản phẩm, chứng nhận hợp quy theo tiêu chuẩn Việt Nam và quốc tế.",
    fullDesc: "Dịch vụ giám định chất lượng sản phẩm và chứng nhận hợp quy uy tín, đảm bảo hàng hóa đạt tiêu chuẩn trước khi đưa ra thị trường.",
    features: ["Giám định chất lượng sản phẩm", "Chứng nhận hợp quy QCVN", "Kiểm tra tiêu chuẩn quốc tế", "Tư vấn quy trình nhập khẩu"],
  },
  {
    id: 6,
    title: "Tư vấn Chuyển đổi số",
    category: "Dữ liệu & AI",
    img: imgBigData,
    shortDesc: "Đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số toàn diện từ quy trình đến công nghệ.",
    fullDesc: "Dịch vụ tư vấn chuyển đổi số toàn diện, từ đánh giá hiện trạng, xây dựng lộ trình, đến triển khai các giải pháp công nghệ phù hợp với từng doanh nghiệp.",
    features: ["Đánh giá mức độ số hóa", "Xây dựng lộ trình chuyển đổi", "Triển khai giải pháp ERP/CRM", "Đào tạo nhân sự"],
  },
]

const products = [
  {
    title: "Nông nghiệp & Thực phẩm",
    desc: "Sản phẩm nông nghiệp sạch, chất lượng cao từ các vùng trồng uy tín",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
  {
    title: "Gia dụng & Đời sống",
    desc: "Sản phẩm gia dụng chất lượng, mang đến tiện nghi cho mọi gia đình",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Thời trang & Phong cách",
    desc: "Cập nhật xu hướng thời trang, phong cách sống hiện đại",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    title: "Mỹ phẩm & Chăm sóc sắc đẹp",
    desc: "Sản phẩm làm đẹp an toàn, giúp khách hàng tự tin tỏa sáng",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v-5.5m3 5.5V8.25m3 3v-2" />
      </svg>
    ),
  },
]

export default function LinhVucPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("Tất cả")
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const filteredServices = activeCategory === "Tất cả"
    ? services
    : services.filter((s) => s.category === activeCategory)

  return (
    <div className="bg-white">

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-[400px] lg:min-h-[500px] flex items-center overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EC1313]/15 via-transparent to-[#0F172A]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#EC1313]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#EC1313]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EC1313] animate-pulse" />
              <span className="text-white/90 text-sm font-semibold tracking-wider uppercase">Lĩnh vực hoạt động</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Lĩnh vực{" "}
              <span className="text-[#EC1313]">& Dịch vụ</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Chúng tôi cung cấp các giải pháp toàn diện cho chuỗi giá trị thương mại điện tử hiện đại, từ nền tảng bán hàng đến logistics và thanh toán.
            </p>

            <button
              type="button"
              onClick={() => router.push('/lien-he')}
              className="group bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#d41111] transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 flex items-center gap-3"
            >
              Liên hệ tư vấn
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORY FILTER & SERVICE CARDS ═══════════════ */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">Dịch vụ nổi bật</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">CÁC DỊCH VỤ CỦA CHÚNG TÔI</h2>
            <p className="text-[#475569] text-lg max-w-2xl mx-auto">
              Khám phá hệ sinh thái giải pháp công nghệ toàn diện cho doanh nghiệp của bạn
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#EC1313] text-white shadow-lg shadow-red-200"
                    : "bg-white text-[#475569] border border-slate-200 hover:border-[#EC1313]/30 hover:text-[#EC1313]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <button
                type="button"
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-slate-100"
                aria-label={`Xem chi tiết dịch vụ ${service.title}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-[#EC1313] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#EC1313] transition-colors">{service.title}</h3>
                  <p className="text-white/85 text-sm leading-relaxed line-clamp-2">{service.shortDesc}</p>
                  <div className="mt-3 flex items-center gap-2 text-white/80 text-sm group-hover:text-[#EC1313] transition-colors">
                    <span>Xem chi tiết</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                  <div className="mt-2 h-0.5 bg-[#EC1313] w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICE DETAIL MODAL ═══════════════ */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Đóng chi tiết dịch vụ"
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="aspect-video overflow-hidden rounded-t-3xl">
              <ImageWithFallback src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-8">
              <span className="inline-block bg-[rgba(236,19,19,0.08)] text-[#EC1313] text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                {selectedService.category}
              </span>
              <h3 id="service-modal-title" className="text-2xl font-black text-[#0F172A] mb-4">{selectedService.title}</h3>
              <p className="text-[#475569] leading-relaxed mb-6">{selectedService.fullDesc}</p>

              <h4 className="font-bold text-[#0F172A] mb-3">Tính năng nổi bật</h4>
              <ul className="space-y-2 mb-8">
                {selectedService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[#475569]">
                    <div className="w-5 h-5 rounded-full bg-[#EC1313]/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-[#EC1313]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(null)
                    router.push('/lien-he')
                  }}
                  className="bg-[#EC1313] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#d41111] transition-colors flex-1 text-center"
                >
                  Liên hệ tư vấn
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="border-2 border-slate-200 text-[#475569] px-6 py-3 rounded-xl font-bold hover:border-slate-300 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PRODUCTS SECTION ═══════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[rgba(236,19,19,0.08)] px-4 py-2 rounded-full mb-4">
              <span className="text-[#EC1313] text-xs font-bold tracking-widest uppercase">Sản phẩm</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-4 tracking-tight">HỆ SINH THÁI SẢN PHẨM BYD</h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Bộ giải pháp công nghệ tích hợp, đáp ứng mọi nhu cầu kinh doanh số
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.title} className="group bg-[#FAFAFA] rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:border-[#EC1313]/20 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#EC1313]/10 flex items-center justify-center text-[#EC1313] group-hover:bg-[#EC1313] group-hover:text-white transition-all duration-300">
                  {product.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">{product.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#EC1313] to-[#b91010] rounded-3xl p-12 lg:p-16 text-white shadow-2xl shadow-red-200/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

            <div className="relative text-center">
              <h2 className="text-4xl lg:text-5xl font-black mb-5">Bạn cần giải pháp phù hợp?</h2>
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Đội ngũ chuyên gia BYD sẵn sàng tư vấn và đồng hành cùng doanh nghiệp của bạn trong hành trình chuyển đổi số.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/lien-he" className="bg-white text-[#EC1313] px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors w-full sm:w-auto shadow-lg text-center">
                  Liên hệ tư vấn miễn phí
                </Link>
                <Link href="/gioi-thieu" className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto text-center">
                  Tìm hiểu về BYD
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
