'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Giới thiệu', path: '/gioi-thieu' },
  { label: 'Lĩnh vực', path: '/linh-vuc' },
  { label: 'Văn hóa', path: '/van-hoa' },
  { label: 'Tuyển dụng', path: '/tuyen-dung' },
  { label: 'Tin tức', path: '/tin-tuc' },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {/* TOP CONTACT BAR */}
      <div className="bg-[#EC1313] text-white text-xs hidden md:block relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <a href="mailto:hcns.byd@gmail.com" className="flex items-center gap-1.5 hover:text-red-100 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              hcns.byd@gmail.com
            </a>
            <a href="tel:+84281234567" className="flex items-center gap-1.5 hover:text-red-100 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              0969 240 885
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61557780033666"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook BYD"
              className="hover:text-red-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a
              href="https://vt.tiktok.com/ZSuA5QF45/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok BYD"
              className="hover:text-red-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
          ? 'bg-white shadow-lg'
          : isHome
            ? 'bg-white/95 backdrop-blur-md'
            : 'bg-white border-b border-slate-100'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            <Link href="/" aria-label="Trang chủ BYD" className="flex items-center gap-3 shrink-0">
              <img src="/images/byd-logo.png" alt="BYD Logo" className="h-10 lg:h-12 w-auto" loading="eager" decoding="async" width="160" height="48" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${pathname === item.path
                    ? 'text-[#EC1313] bg-[rgba(236,19,19,0.06)]'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button type="button" aria-label="Tìm kiếm" className="p-2.5 rounded-lg text-[#475569] hover:bg-slate-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button
                type="button"
                onClick={() => router.push('/tuyen-dung/ung-tuyen')}
                className="bg-[#EC1313] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d41111] transition-all hover:shadow-lg hover:shadow-red-200 duration-300"
              >
                Ứng tuyển ngay
              </button>
            </div>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden p-2 rounded-lg text-[#475569] hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-1 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-3 rounded-lg text-sm font-semibold ${pathname === item.path
                  ? 'text-[#EC1313] bg-[rgba(236,19,19,0.05)]'
                  : 'text-[#475569]'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => router.push('/tuyen-dung/ung-tuyen')}
              className="mt-2 bg-[#EC1313] text-white px-5 py-3 rounded-lg text-sm font-semibold text-center"
            >
              Ứng tuyển ngay
            </button>
          </div>
        )}
      </header>
    </>
  )
}
