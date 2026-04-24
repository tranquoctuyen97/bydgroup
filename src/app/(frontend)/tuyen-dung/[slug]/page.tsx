'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  fallbackJobs,
  getJobSlug,
  mapJobDocToJob,
  type Job,
} from '../jobs-data'

interface ApplyFormData {
  fullName: string
  email: string
  phone: string
  expectedSalary: string
  coverLetter: string
  cvFile: File | null
}

export default function JobDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = useMemo(() => params?.slug ?? '', [params?.slug])
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<ApplyFormData>({
    fullName: '',
    email: '',
    phone: '',
    expectedSalary: '',
    coverLetter: '',
    cvFile: null,
  })

  useEffect(() => {
    if (!slug) return

    let isMounted = true

    const fallback = fallbackJobs.find((item) => getJobSlug(item) === slug) || null
    if (fallback && isMounted) {
      setJob(fallback)
      setLoading(false)
    }

    async function fetchBySlug() {
      try {
        const res = await fetch(`/api/jobs?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`)
        if (!res.ok) return

        const data = await res.json()
        const doc = data?.docs?.[0]
        if (!doc || !isMounted) return
        setJob(mapJobDocToJob(doc))
      } catch {
        // Keep fallback when API is unavailable.
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    void fetchBySlug()

    return () => {
      isMounted = false
    }
  }, [slug])

  const shareLink = useMemo(() => {
    if (!job) return ''
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://bydgroup.vn'
    return `${base}/tuyen-dung/${encodeURIComponent(getJobSlug(job))}`
  }, [job])

  const canSubmit = Boolean(
    form.fullName.trim() &&
      form.email.trim() &&
      form.phone.trim(),
  )

  const updateField = <K extends keyof ApplyFormData>(field: K, value: ApplyFormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const copyShareLink = async () => {
    if (!shareLink) return

    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = shareLink
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  const scrollToApply = () => {
    const formElement = document.getElementById('apply-form')
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async () => {
    if (!job) return
    if (!canSubmit) {
      setError('Vui lòng điền đủ Họ tên, Email và Số điện thoại.')
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

      const payload: Record<string, any> = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        positionText: job.title,
        expectedSalary: form.expectedSalary.trim() || undefined,
        coverLetter: form.coverLetter.trim() || undefined,
      }

      if (job.fromAPI && job.id != null) {
        payload.position = job.id
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

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-[#EC1313] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-black text-[#0F172A] mb-4">Không tìm thấy vị trí tuyển dụng</h1>
        <p className="text-[#64748B] mb-8">Liên kết có thể đã hết hạn hoặc vị trí đã đóng.</p>
        <Link
          href="/tuyen-dung"
          className="inline-flex items-center gap-2 bg-[#EC1313] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#d41111] transition-colors"
        >
          Quay lại danh sách tuyển dụng
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFAFA] py-14 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/tuyen-dung" className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#EC1313] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại tuyển dụng
          </Link>
        </div>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 lg:p-10 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-5 mb-7">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-[#0F172A] mb-3">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block bg-[rgba(236,19,19,0.08)] text-[#EC1313] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {job.category}
                </span>
                {job.tag && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${job.tagColor}`}>
                    {job.tag}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToApply}
              className="bg-[#EC1313] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#d41111] transition-colors"
            >
              Ứng tuyển ngay
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-7">
            <div className="bg-[#FAFAFA] rounded-xl p-4">
              <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">Địa điểm</div>
              <div className="text-[#0F172A] font-semibold text-sm">{job.location}</div>
            </div>
            <div className="bg-[#FAFAFA] rounded-xl p-4">
              <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">Hình thức</div>
              <div className="text-[#0F172A] font-semibold text-sm">{job.type}</div>
            </div>
            <div className="bg-[#FAFAFA] rounded-xl p-4">
              <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">Mức lương</div>
              <div className="text-[#EC1313] font-bold text-sm">{job.salary}</div>
            </div>
            <div className="bg-[#FAFAFA] rounded-xl p-4">
              <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-1">Cấp bậc</div>
              <div className="text-[#0F172A] font-semibold text-sm">{job.level || 'N/A'}</div>
            </div>
          </div>

          <div className="mb-7">
            <div className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-2">
              Link tuyển dụng để chia sẻ
            </div>
            <div className="flex gap-2">
              <input
                value={shareLink}
                readOnly
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-[#334155]"
                aria-label="Link tuyển dụng"
              />
              <button
                type="button"
                onClick={() => void copyShareLink()}
                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold hover:border-[#EC1313] hover:text-[#EC1313] transition-colors"
              >
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            </div>
          </div>

          <div className="mb-7">
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">Mô tả công việc</h2>
            <p className="text-[#475569] leading-relaxed whitespace-pre-line">{job.desc || 'Đang cập nhật.'}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-7">
              <h2 className="text-lg font-bold text-[#0F172A] mb-3">Yêu cầu</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#EC1313] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#475569]">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits && (
            <div className="mb-7">
              <h2 className="text-lg font-bold text-[#0F172A] mb-3">Phúc lợi</h2>
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">{job.benefits}</p>
            </div>
          )}

          {job.workingHours && (
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-3">Thời gian làm việc</h2>
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">{job.workingHours}</p>
            </div>
          )}
        </section>

        <section id="apply-form" className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 lg:p-10">
          <h2 className="text-2xl font-black text-[#0F172A] mb-3">Ứng tuyển vị trí: {job.title}</h2>
          <p className="text-[#64748B] mb-8">Điền nhanh thông tin bên dưới, không cần chuyển trang.</p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-700">
              Gửi hồ sơ thành công. BYD sẽ phản hồi cho bạn sớm.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Họ và tên <span className="text-[#EC1313]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Email <span className="text-[#EC1313]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                    Số điện thoại <span className="text-[#EC1313]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="0901 234 567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Mức lương mong muốn
                </label>
                <input
                  type="text"
                  value={form.expectedSalary}
                  onChange={(e) => updateField('expectedSalary', e.target.value)}
                  placeholder="VD: 20 – 30 triệu"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  CV / Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => updateField('cvFile', e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Thư giới thiệu
                </label>
                <textarea
                  rows={4}
                  value={form.coverLetter}
                  onChange={(e) => updateField('coverLetter', e.target.value)}
                  placeholder="Giới thiệu ngắn về bạn..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/20 outline-none transition-all resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EC1313] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#d41111] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Đang gửi...' : 'Gửi hồ sơ ngay'}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
