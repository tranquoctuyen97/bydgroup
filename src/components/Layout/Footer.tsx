import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src="/images/byd-logo.png" alt="BYD" className="h-12 w-auto mb-5 rounded-lg" width="160" height="48" />
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Công ty TNHH BYD Việt Nam
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong className="text-slate-300">Email:</strong> hcns.byd@gmail.com</p>
              <p><strong className="text-slate-300">Hotline:</strong> 0969 240 885</p>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/profile.php?id=61557780033666" target="_blank" rel="noopener noreferrer" aria-label="Facebook BYD" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-[#EC1313] transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://vt.tiktok.com/ZSuA5QF45/" target="_blank" rel="noopener noreferrer" aria-label="TikTok BYD" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-[#EC1313] transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Liên kết nhanh</h3>
            <ul className="space-y-3">
              {[
                { label: 'Về chúng tôi', path: '/gioi-thieu' },
                { label: 'Dịch vụ giải pháp', path: '/linh-vuc' },
                { label: 'Văn hóa doanh nghiệp', path: '/van-hoa' },
                { label: 'Cơ hội nghề nghiệp', path: '/tuyen-dung' },
                { label: 'Tin tức & Sự kiện', path: '/tin-tuc' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="text-slate-300 hover:text-[#EC1313] text-sm transition-colors duration-200 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Văn phòng</h3>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#EC1313]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <strong className="text-slate-300 block mb-1">Trụ sở chính:</strong>
                  Số 12, 10TH AVE, Sunrise K – Khu Đô Thị The Manor Central Park – Đường Nguyễn Xiển – Phường Định Công – TP Hà Nội
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Đăng ký nhận tin</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">Nhận những tin tức và cơ hội việc làm mới nhất từ BYD.</p>
            <div className="flex gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email đăng ký nhận tin
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Email của bạn"
                autoComplete="email"
                className="flex-1 bg-slate-800 text-white placeholder:text-slate-500 text-sm px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-[#EC1313] transition-colors"
              />
              <button type="button" aria-label="Đăng ký nhận tin" className="bg-[#EC1313] text-white px-4 py-3 rounded-lg hover:bg-[#d41111] transition-colors shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

            <div className="mt-6 space-y-2">
              <a href="tel:+84969240885" className="flex items-center gap-3 bg-slate-800 hover:bg-[#EC1313] rounded-lg px-4 py-3 transition-colors duration-300 group">
                <svg className="w-5 h-5 text-[#EC1313] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-sm font-semibold">Gọi ngay</span>
              </a>
              <a href="mailto:hcns.byd@gmail.com" className="flex items-center gap-3 bg-slate-800 hover:bg-[#EC1313] rounded-lg px-4 py-3 transition-colors duration-300 group">
                <svg className="w-5 h-5 text-[#EC1313] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-sm font-semibold">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} BYD Việt Nam. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <span className="text-slate-400">Chính sách bảo mật</span>
            <span className="text-slate-400">Điều khoản sử dụng</span>
            <span className="text-slate-400">Trợ giúp</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
