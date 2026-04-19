'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

/* ── types ────────────────────────────────────────── */

interface FormData {
  fullName: string
  email: string
  phone: string
  birthDate: string
  gender: string
  address: string
  position: string
  experience: string
  currentCompany: string
  expectedSalary: string
  startDate: string
  coverLetter: string
  cvFile: File | null
  portfolioUrl: string
  linkedinUrl: string
  referralSource: string
}

/* ── fallback positions ───────────────────────────── */

const fallbackPositions = [
  'Nhân viên TMĐT (E-commerce)',
  'Chuyên viên Marketing',
  'Senior Frontend Developer',
  'Data Analyst',
  'Quản lý Vận hành Logistics',
  'Business Development Manager',
  'HR Business Partner',
  'Mobile Developer (iOS/Android)',
]

/* ── steps ────────────────────────────────────────── */

const steps = [
  { label: 'Thông tin cá nhân', icon: '👤' },
  { label: 'Vị trí & Kinh nghiệm', icon: '💼' },
  { label: 'Hồ sơ đính kèm', icon: '📎' },
  { label: 'Hoàn tất', icon: '✅' },
]

/* ── component ────────────────────────────────────── */

export default function ApplyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [positions, setPositions] = useState<string[]>(fallbackPositions)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    position: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    startDate: '',
    coverLetter: '',
    cvFile: null,
    portfolioUrl: '',
    linkedinUrl: '',
    referralSource: '',
  })

  /* fetch positions from API */
  useEffect(() => {
    async function fetchPositions() {
      try {
        const res = await fetch(
          '/api/jobs?where[status][equals]=active&limit=50',
        )
        if (res.ok) {
          const data = await res.json()
          if (data.docs && data.docs.length > 0) {
            const titles = data.docs.map((doc: any) => doc.title)
            setPositions(titles)
          }
        }
      } catch {
        // use fallback
      }
    }
    fetchPositions()
  }, [])

  const updateField = (field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const canGoNext = () => {
    switch (currentStep) {
      case 0:
        return form.fullName && form.email && form.phone
      case 1:
        return form.position && form.experience
      case 2:
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    try {
      let cvMediaId: string | null = null

      /* upload CV if provided */
      if (form.cvFile) {
        const uploadData = new FormData()
        uploadData.append('file', form.cvFile)
        const uploadRes = await fetch('/api/media', {
          method: 'POST',
          body: uploadData,
        })
        if (uploadRes.ok) {
          const uploadJson = await uploadRes.json()
          cvMediaId = uploadJson.doc?.id || null
        }
      }

      /* submit application */
      const payload: Record<string, any> = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        birthDate: form.birthDate || undefined,
        gender: form.gender || undefined,
        address: form.address || undefined,
        position: form.position,
        experience: form.experience,
        currentCompany: form.currentCompany || undefined,
        expectedSalary: form.expectedSalary || undefined,
        startDate: form.startDate || undefined,
        coverLetter: form.coverLetter || undefined,
        portfolioUrl: form.portfolioUrl || undefined,
        linkedinUrl: form.linkedinUrl || undefined,
        referralSource: form.referralSource || undefined,
      }

      if (cvMediaId) {
        payload.cv = cvMediaId
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const errData = await res.json().catch(() => null)
        setError(
          errData?.errors?.[0]?.message ||
            'Gửi hồ sơ thất bại. Vui lòng thử lại.',
        )
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── success screen ─────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" aria-label="Về trang chủ BYD" className="flex items-center gap-3">
              <ImageWithFallback
                src="/images/byd-logo.png"
                alt="BYD"
                className="h-8 w-auto"
              />
            </Link>
            <Link
              href="/tuyen-dung"
              className="text-[#475569] hover:text-[#EC1313] text-sm font-semibold transition-colors"
            >
              Xem vị trí khác
            </Link>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <div className="text-center max-w-lg">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-50 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-500"
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
            </div>
            <h1 className="text-3xl font-black text-[#0F172A] mb-4">
              Gửi hồ sơ thành công!
            </h1>
            <p className="text-[#475569] text-lg leading-relaxed mb-8">
              Cảm ơn bạn đã quan tâm đến cơ hội tại BYD. Chúng tôi sẽ xem xét
              hồ sơ của bạn và phản hồi trong vòng 5-7 ngày làm việc.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tuyen-dung"
                className="bg-[#EC1313] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#d41111] transition-all w-full sm:w-auto text-center"
              >
                Xem vị trí khác
              </Link>
              <Link
                href="/"
                className="border-2 border-slate-200 text-[#475569] px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all w-full sm:w-auto text-center"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── main form ──────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Về trang chủ BYD" className="flex items-center gap-3">
            <ImageWithFallback
              src="/images/byd-logo.png"
              alt="BYD"
              className="h-8 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={() => router.push('/tuyen-dung')}
            className="flex items-center gap-2 text-[#475569] hover:text-[#EC1313] text-sm font-semibold transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Quay lại tuyển dụng
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-3">
            Ứng tuyển tại BYD
          </h1>
          <p className="text-[#64748B] text-lg">
            Hoàn thành form bên dưới để gửi hồ sơ ứng tuyển của bạn.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            {/* Progress bar background */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200" />
            <div
              className="absolute top-6 left-0 h-0.5 bg-[#EC1313] transition-all duration-500"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />

            {steps.map((step, i) => (
              <div key={step.label} className="relative flex flex-col items-center z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    i <= currentStep
                      ? 'bg-[#EC1313] text-white shadow-lg shadow-red-200'
                      : 'bg-white border-2 border-slate-200 text-[#94A3B8]'
                  }`}
                >
                  {i < currentStep ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-semibold whitespace-nowrap ${
                    i <= currentStep ? 'text-[#EC1313]' : 'text-[#94A3B8]'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 lg:p-10">
          {/* Step 0: Personal Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">
                Thông tin cá nhân
              </h2>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Họ và tên <span className="text-[#EC1313]">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Email <span className="text-[#EC1313]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Số điện thoại <span className="text-[#EC1313]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="0901 234 567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Giới tính
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A]"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Quận/Huyện, Thành phố"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                />
              </div>
            </div>
          )}

          {/* Step 1: Position & Experience */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">
                Vị trí & Kinh nghiệm
              </h2>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Vị trí ứng tuyển <span className="text-[#EC1313]">*</span>
                </label>
                <select
                  value={form.position}
                  onChange={(e) => updateField('position', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A]"
                >
                  <option value="">Chọn vị trí</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Số năm kinh nghiệm <span className="text-[#EC1313]">*</span>
                </label>
                <select
                  value={form.experience}
                  onChange={(e) => updateField('experience', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A]"
                >
                  <option value="">Chọn kinh nghiệm</option>
                  <option value="fresher">Fresher (Chưa có kinh nghiệm)</option>
                  <option value="1-2">1 – 2 năm</option>
                  <option value="3-5">3 – 5 năm</option>
                  <option value="5-10">5 – 10 năm</option>
                  <option value="10+">Trên 10 năm</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Công ty hiện tại
                </label>
                <input
                  type="text"
                  value={form.currentCompany}
                  onChange={(e) =>
                    updateField('currentCompany', e.target.value)
                  }
                  placeholder="Tên công ty hiện tại (nếu có)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Mức lương mong muốn
                  </label>
                  <input
                    type="text"
                    value={form.expectedSalary}
                    onChange={(e) =>
                      updateField('expectedSalary', e.target.value)
                    }
                    placeholder="VD: 25 – 35 triệu"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Ngày có thể bắt đầu
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateField('startDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Thư giới thiệu
                </label>
                <textarea
                  value={form.coverLetter}
                  onChange={(e) => updateField('coverLetter', e.target.value)}
                  placeholder="Chia sẻ lý do bạn muốn gia nhập BYD và điểm mạnh của bạn..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8] resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Attachments */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">
                Hồ sơ đính kèm
              </h2>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  CV / Resume
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      updateField('cvFile', file)
                    }}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="flex items-center justify-center gap-3 w-full px-6 py-8 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#EC1313] cursor-pointer transition-colors bg-[#FAFAFA] hover:bg-red-50/30"
                  >
                    {form.cvFile ? (
                      <div className="text-center">
                        <svg
                          className="w-8 h-8 text-green-500 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-[#0F172A] font-semibold">
                          {form.cvFile.name}
                        </span>
                        <p className="text-[#94A3B8] text-xs mt-1">
                          Nhấn để thay đổi file
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg
                          className="w-8 h-8 text-[#94A3B8] mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-[#475569] font-semibold">
                          Nhấn để tải lên CV
                        </span>
                        <p className="text-[#94A3B8] text-xs mt-1">
                          PDF, DOC, DOCX (tối đa 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={form.portfolioUrl}
                  onChange={(e) => updateField('portfolioUrl', e.target.value)}
                  placeholder="https://portfolio.com/your-name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => updateField('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/your-name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Bạn biết đến BYD qua đâu?
                </label>
                <select
                  value={form.referralSource}
                  onChange={(e) =>
                    updateField('referralSource', e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A]"
                >
                  <option value="">Chọn nguồn</option>
                  <option value="website">Website BYD</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="referral">Người quen giới thiệu</option>
                  <option value="jobsite">Trang tuyển dụng (VietnamWorks, TopCV...)</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">
                Xác nhận thông tin
              </h2>

              <div className="space-y-4">
                <div className="bg-[#FAFAFA] rounded-xl p-5 border border-slate-100">
                  <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-3">
                    Thông tin cá nhân
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-[#94A3B8]">Họ và tên</span>
                      <p className="text-[#0F172A] font-semibold">
                        {form.fullName}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-[#94A3B8]">Email</span>
                      <p className="text-[#0F172A] font-semibold">
                        {form.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-[#94A3B8]">
                        Số điện thoại
                      </span>
                      <p className="text-[#0F172A] font-semibold">
                        {form.phone}
                      </p>
                    </div>
                    {form.address && (
                      <div>
                        <span className="text-xs text-[#94A3B8]">Địa chỉ</span>
                        <p className="text-[#0F172A] font-semibold">
                          {form.address}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#FAFAFA] rounded-xl p-5 border border-slate-100">
                  <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-3">
                    Vị trí & Kinh nghiệm
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-[#94A3B8]">
                        Vị trí ứng tuyển
                      </span>
                      <p className="text-[#0F172A] font-semibold">
                        {form.position}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-[#94A3B8]">
                        Kinh nghiệm
                      </span>
                      <p className="text-[#0F172A] font-semibold">
                        {form.experience}
                      </p>
                    </div>
                    {form.expectedSalary && (
                      <div>
                        <span className="text-xs text-[#94A3B8]">
                          Mức lương mong muốn
                        </span>
                        <p className="text-[#0F172A] font-semibold">
                          {form.expectedSalary}
                        </p>
                      </div>
                    )}
                    {form.currentCompany && (
                      <div>
                        <span className="text-xs text-[#94A3B8]">
                          Công ty hiện tại
                        </span>
                        <p className="text-[#0F172A] font-semibold">
                          {form.currentCompany}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#FAFAFA] rounded-xl p-5 border border-slate-100">
                  <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-3">
                    Hồ sơ đính kèm
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-[#94A3B8]">CV</span>
                      <p className="text-[#0F172A] font-semibold">
                        {form.cvFile ? form.cvFile.name : 'Chưa tải lên'}
                      </p>
                    </div>
                    {form.portfolioUrl && (
                      <div>
                        <span className="text-xs text-[#94A3B8]">
                          Portfolio
                        </span>
                        <p className="text-[#0F172A] font-semibold truncate">
                          {form.portfolioUrl}
                        </p>
                      </div>
                    )}
                    {form.linkedinUrl && (
                      <div>
                        <span className="text-xs text-[#94A3B8]">LinkedIn</span>
                        <p className="text-[#0F172A] font-semibold truncate">
                          {form.linkedinUrl}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentStep === 0
                  ? 'text-[#94A3B8] cursor-not-allowed'
                  : 'text-[#475569] hover:bg-slate-100'
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Quay lại
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canGoNext()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                  canGoNext()
                    ? 'bg-[#EC1313] text-white hover:bg-[#d41111] hover:shadow-lg hover:shadow-red-200'
                    : 'bg-slate-200 text-[#94A3B8] cursor-not-allowed'
                }`}
              >
                Tiếp theo
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-[#EC1313] text-white hover:bg-[#d41111] hover:shadow-lg hover:shadow-red-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi hồ sơ
                    <svg
                      className="w-4 h-4"
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
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
