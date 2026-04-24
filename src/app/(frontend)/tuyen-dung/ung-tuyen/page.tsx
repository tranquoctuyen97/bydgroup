'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

interface PositionOption {
  id?: number | string
  title: string
}

interface ApplicationFormData {
  fullName: string
  email: string
  phone: string
  position: string
  expectedSalary: string
  coverLetter: string
  cvFile: File | null
}

const fallbackPositions: PositionOption[] = [
  { title: 'Nhân viên TMĐT (E-commerce)' },
  { title: 'Chuyên viên Marketing' },
  { title: 'Senior Frontend Developer' },
  { title: 'Data Analyst' },
  { title: 'Quản lý Vận hành Logistics' },
  { title: 'Business Development Manager' },
  { title: 'HR Business Partner' },
  { title: 'Mobile Developer (iOS/Android)' },
]

export default function ApplyPage() {
  const router = useRouter()
  const [positions, setPositions] = useState<PositionOption[]>(fallbackPositions)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    expectedSalary: '',
    coverLetter: '',
    cvFile: null,
  })

  useEffect(() => {
    async function fetchPositions() {
      try {
        const res = await fetch('/api/jobs?where[status][equals]=active&limit=50')
        if (res.ok) {
          const data = await res.json()
          if (data.docs && data.docs.length > 0) {
            const nextPositions: PositionOption[] = data.docs.map((doc: any) => ({
              id: doc.id,
              title: doc.title,
            }))
            setPositions(nextPositions)
          }
        }
      } catch {
        // Keep fallback positions when API fails.
      }
    }
    fetchPositions()
  }, [])

  useEffect(() => {
    const initialPosition =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('position')?.trim()
        : ''

    if (!initialPosition) return

    setForm((prev) => {
      if (prev.position) return prev
      return { ...prev, position: initialPosition }
    })
  }, [])

  const updateField = <K extends keyof ApplicationFormData>(field: K, value: ApplicationFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const canSubmit = Boolean(
    form.fullName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.position.trim(),
  )

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Vui lòng điền đủ Họ tên, Email, Số điện thoại và Vị trí.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      let cvMediaId: string | null = null

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

      const normalizedPosition = form.position.trim()
      const matchedPosition = positions.find(
        (pos) =>
          pos.id != null &&
          pos.title.trim().toLowerCase() === normalizedPosition.toLowerCase(),
      )

      const payload: Record<string, any> = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        expectedSalary: form.expectedSalary.trim() || undefined,
        coverLetter: form.coverLetter.trim() || undefined,
        positionText: normalizedPosition,
      }

      if (matchedPosition?.id != null) {
        payload.position = matchedPosition.id
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
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

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
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
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-3">
            Ứng tuyển tại BYD
          </h1>
          <p className="text-[#64748B] text-lg">
            Form đã được rút gọn để bạn gửi hồ sơ nhanh hơn.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 lg:p-10 space-y-7">
          <div className="bg-[rgba(236,19,19,0.06)] border border-[rgba(236,19,19,0.18)] rounded-xl px-4 py-3 text-sm text-[#334155]">
            Trường có dấu <span className="text-[#EC1313] font-semibold">*</span> là bắt buộc.
          </div>

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

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Vị trí ứng tuyển <span className="text-[#EC1313]">*</span>
            </label>
            <input
              list="job-position-list"
              value={form.position}
              onChange={(e) => updateField('position', e.target.value)}
              placeholder="Nhập hoặc chọn vị trí"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
            />
            <datalist id="job-position-list">
              {positions.map((pos) => (
                <option key={`${pos.id ?? 'fallback'}-${pos.title}`} value={pos.title} />
              ))}
            </datalist>
          </div>



          <details className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4">
            <summary className="cursor-pointer list-none font-semibold text-[#0F172A] flex items-center justify-between">
              <span>Thông tin bổ sung (không bắt buộc)</span>
              <span className="text-[#64748B] text-sm">Mở rộng</span>
            </summary>

            <div className="pt-5 space-y-6">
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
                    className="flex items-center justify-center gap-3 w-full px-6 py-7 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#EC1313] cursor-pointer transition-colors bg-white hover:bg-red-50/30"
                  >
                    {form.cvFile ? (
                      <div className="text-center">
                        <span className="text-[#0F172A] font-semibold">
                          {form.cvFile.name}
                        </span>
                        <p className="text-[#94A3B8] text-xs mt-1">
                          Nhấn để thay đổi file
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-[#475569] font-semibold">
                          Nhấn để tải lên CV
                        </span>
                        <p className="text-[#94A3B8] text-xs mt-1">
                          PDF, DOC, DOCX
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Mức lương mong muốn
                  </label>
                  <input
                    type="text"
                    value={form.expectedSalary}
                    onChange={(e) => updateField('expectedSalary', e.target.value)}
                    placeholder="VD: 20 – 30 triệu"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Thư giới thiệu ngắn
                </label>
                <textarea
                  value={form.coverLetter}
                  onChange={(e) => updateField('coverLetter', e.target.value)}
                  placeholder="Giới thiệu ngắn về bạn và lý do ứng tuyển..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all text-[#0F172A] placeholder:text-[#94A3B8] resize-none"
                />
              </div>
            </div>
          </details>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                setForm({
                  fullName: '',
                  email: '',
                  phone: '',
                  position: '',
                  expectedSalary: '',
                  coverLetter: '',
                  cvFile: null,
                })
              }
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-[#475569] border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Làm lại
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !canSubmit}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold bg-[#EC1313] text-white hover:bg-[#d41111] hover:shadow-lg hover:shadow-red-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  Gửi hồ sơ ngay
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
          </div>
        </div>
      </div>
    </div>
  )
}
