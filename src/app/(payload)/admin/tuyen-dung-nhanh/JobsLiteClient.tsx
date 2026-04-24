'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'

import {
  DEFAULT_WORKING_HOURS,
  JOB_CATEGORIES,
  JOB_STATUSES,
  JOB_TAGS,
  JOB_TYPES,
  cleanJDLine,
  slugifyJob,
} from '@/lib/jobs/options'

type JobLiteDoc = {
  id: number | string
  title: string
  slug?: string
  icon?: string
  category?: string
  location?: string
  type?: string
  level?: string
  salary?: string
  tag?: string
  description?: string
  requirementsText?: string
  benefits?: string
  workingHours?: string
  status?: string
}

type FormState = {
  id: number | string | null
  title: string
  slug: string
  icon: string
  category: string
  location: string
  type: string
  level: string
  salary: string
  tag: string
  description: string
  requirementsText: string
  benefits: string
  workingHours: string
  status: string
}

const initialForm: FormState = {
  id: null,
  title: '',
  slug: '',
  icon: '💼',
  category: 'marketing',
  location: 'Hà Nội',
  type: 'full-time',
  level: '',
  salary: '',
  tag: '',
  description: '',
  requirementsText: '',
  benefits: '',
  workingHours: DEFAULT_WORKING_HOURS,
  status: 'active',
}

const normalizeHeading = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()

const detectSection = (line: string) => {
  const heading = normalizeHeading(line)

  if (heading.includes('MO TA CONG VIEC')) return 'description'
  if (heading.includes('YEU CAU')) return 'requirementsText'
  if (heading.includes('QUYEN LOI') || heading.includes('PHUC LOI')) return 'benefits'
  if (heading.includes('THONG TIN KHAC')) return 'other'

  return null
}

const getLabeledValue = (line: string, labels: string[]) => {
  const cleanLine = cleanJDLine(line)
  const normalized = normalizeHeading(cleanLine)
  const matched = labels.find((label) => normalized.startsWith(normalizeHeading(label)))

  if (!matched) return ''

  return cleanLine
    .replace(new RegExp(`^${matched}\\s*:?\\s*`, 'i'), '')
    .replace(/^[:：]\s*/, '')
    .trim()
}

const splitInlineItems = (value: string) =>
  value
    .replace(/\s+\\-\s+/g, '\n- ')
    .replace(/\s+-\s+/g, '\n- ')
    .split('\n')
    .map(cleanJDLine)
    .filter(Boolean)

const getMarkdownTableCells = (line: string) => {
  if (!line.includes('|')) return []
  if (/^\s*\|?\s*-+\s*\|/.test(line)) return []

  return line
    .split('|')
    .map(cleanJDLine)
    .filter(Boolean)
}

const inferCategory = (title: string) => {
  const normalized = normalizeHeading(title)

  if (normalized.includes('MARKETING') || normalized.includes('ADS') || normalized.includes('MEDIA')) {
    return 'marketing'
  }
  if (normalized.includes('KE TOAN') || normalized.includes('TAI CHINH')) return 'tai-chinh'
  if (normalized.includes('TRO LY') || normalized.includes('PMO')) return 'van-hanh'
  if (normalized.includes('PROJECT') || normalized.includes('KINH DOANH')) return 'kinh-doanh'

  return ''
}

const TABLE_ROW_HANDLED = '__handled__'

const applyKnownTableRow = (
  cells: string[],
  parsed: Partial<FormState>,
  buckets: Record<string, string[]>,
) => {
  if (cells.length < 2) return ''

  const label = cells[0]
  const value = cells.slice(1).join('\n')
  const normalizedLabel = normalizeHeading(label)
  const section = detectSection(label)

  if (normalizedLabel.includes('VI TRI') || normalizedLabel.includes('POSITION')) {
    parsed.title = value
    parsed.category = inferCategory(value) || parsed.category
    return TABLE_ROW_HANDLED
  }

  if (normalizedLabel.includes('THOI GIAN LAM VIEC') || normalizedLabel.includes('WORKING TIME')) {
    parsed.workingHours = splitInlineItems(value).join('\n')
    return TABLE_ROW_HANDLED
  }

  if (normalizedLabel.includes('DIA DIEM LAM VIEC') || normalizedLabel.includes('WORKING LOCATION')) {
    parsed.location = value.replace(/^Địa chỉ làm việc:\s*/i, '')
    return TABLE_ROW_HANDLED
  }

  if (normalizedLabel.includes('MUC LUONG') || normalizedLabel.includes('MONTHLY SALARY')) {
    parsed.salary = value
    buckets.benefits.push(...splitInlineItems(`${label}: ${value}`))
    return TABLE_ROW_HANDLED
  }

  if (section) {
    buckets[section].push(...splitInlineItems(value))
    return section
  }

  return ''
}

const parseJDText = (source: string): Partial<FormState> => {
  const lines = source.split('\n').map((line) => line.trim()).filter(Boolean)
  const parsed: Partial<FormState> = {}
  const buckets: Record<string, string[]> = {
    description: [],
    requirementsText: [],
    benefits: [],
    other: [],
  }
  let currentSection = ''

  for (const rawLine of lines) {
    const tableCells = getMarkdownTableCells(rawLine)
    if (tableCells.length >= 2) {
      const nextSection = applyKnownTableRow(tableCells, parsed, buckets)
      if (nextSection && nextSection !== TABLE_ROW_HANDLED) currentSection = nextSection
      if (!nextSection && currentSection && buckets[currentSection]) {
        buckets[currentSection].push(...splitInlineItems(tableCells.slice(1).join('\n')))
      }
      continue
    }

    const section = detectSection(rawLine)
    if (section) {
      currentSection = section
      continue
    }

    const line = cleanJDLine(rawLine)
    if (!line) continue

    const salary = getLabeledValue(line, ['Mức lương', 'Lương cứng', 'Muc luong'])
    const location = getLabeledValue(line, ['Địa điểm làm việc', 'Địa chỉ làm việc', 'Dia diem lam viec'])
    const workingHours = getLabeledValue(line, ['Thời gian làm việc', 'Thoi gian lam viec'])

    if (salary) parsed.salary = salary
    if (location) parsed.location = location
    if (workingHours) parsed.workingHours = workingHours

    if (currentSection && buckets[currentSection]) {
      buckets[currentSection].push(...splitInlineItems(line))
    }
  }

  const description = buckets.description.join('\n').trim()
  const requirementsText = buckets.requirementsText.join('\n').trim()
  const benefits = buckets.benefits.join('\n').trim()

  if (description) parsed.description = description
  if (requirementsText) parsed.requirementsText = requirementsText
  if (benefits) parsed.benefits = benefits

  return parsed
}

const formFromDoc = (doc: JobLiteDoc): FormState => ({
  id: doc.id,
  title: doc.title || '',
  slug: doc.slug || '',
  icon: doc.icon || '💼',
  category: doc.category || 'marketing',
  location: doc.location || 'Hà Nội',
  type: doc.type || 'full-time',
  level: doc.level || '',
  salary: doc.salary || '',
  tag: doc.tag || '',
  description: doc.description || '',
  requirementsText: doc.requirementsText || '',
  benefits: doc.benefits || '',
  workingHours: doc.workingHours || DEFAULT_WORKING_HOURS,
  status: doc.status || 'active',
})

const Field = ({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-800">
      {label}
      {required ? <span className="text-[#EC1313]"> *</span> : null}
    </span>
    {children}
  </label>
)

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#EC1313] focus:ring-2 focus:ring-[#EC1313]/15'

const textareaClass = `${inputClass} min-h-32 leading-relaxed`

export default function JobsLiteClient({ userEmail }: { userEmail: string }) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [jobs, setJobs] = useState<JobLiteDoc[]>([])
  const [quickPaste, setQuickPaste] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const slugPreview = useMemo(
    () => form.slug.trim() || slugifyJob(form.title),
    [form.slug, form.title],
  )

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const loadJobs = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/jobs-lite?limit=30')
      if (res.status === 401) {
        window.location.href = '/admin/login?redirect=%2Fadmin%2Ftuyen-dung-nhanh'
        return
      }

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Không tải được danh sách tin')
      setJobs(Array.isArray(data.docs) ? data.docs : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách tin')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadJobs()
  }, [])

  const applyQuickPaste = () => {
    const parsed = parseJDText(quickPaste)
    setForm((prev) => ({ ...prev, ...parsed }))
    setMessage('Đã tách JD vào form, bạn kiểm tra lại trước khi lưu.')
  }

  const resetForm = () => {
    setForm(initialForm)
    setQuickPaste('')
    setMessage('')
    setError('')
  }

  const saveJob = async () => {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const method = form.id ? 'PATCH' : 'POST'
      const res = await fetch('/api/admin/jobs-lite', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug: slugPreview,
        }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data?.error || 'Không lưu được tin tuyển dụng')

      const doc = data.doc as JobLiteDoc
      setForm(formFromDoc(doc))
      setMessage(`Đã lưu: ${doc.title}`)
      await loadJobs()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không lưu được tin tuyển dụng')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <header className="mb-7 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#EC1313]">BYD Admin</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Tuyển dụng nhanh
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Nhập JD bằng form gọn, lưu vào Payload và hiển thị ngay trên trang tuyển dụng.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600">
              {userEmail}
            </span>
            <a
              href="/admin"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 transition hover:border-[#EC1313] hover:text-[#EC1313]"
            >
              Payload admin
            </a>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-950">Dán nhanh JD</h2>
                <button
                  type="button"
                  onClick={applyQuickPaste}
                  disabled={!quickPaste.trim()}
                  className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Tách JD
                </button>
              </div>
              <textarea
                value={quickPaste}
                onChange={(event) => setQuickPaste(event.target.value)}
                className={`${textareaClass} min-h-44`}
                placeholder="Dán nội dung JD có các mục MÔ TẢ CÔNG VIỆC, YÊU CẦU, QUYỀN LỢI..."
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-slate-950">
                  {form.id ? 'Sửa tin tuyển dụng' : 'Tạo tin tuyển dụng'}
                </h2>
                <div className="text-sm text-slate-500">
                  Link: <span className="font-semibold text-slate-800">/tuyen-dung/{slugPreview || '...'}</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Tiêu đề" required>
                  <input
                    value={form.title}
                    onChange={(event) => updateForm('title', event.target.value)}
                    className={inputClass}
                    placeholder="Chuyên viên / Lead Marketing"
                  />
                </Field>

                <Field label="Slug">
                  <input
                    value={form.slug}
                    onChange={(event) => updateForm('slug', slugifyJob(event.target.value))}
                    className={inputClass}
                    placeholder={slugifyJob(form.title)}
                  />
                </Field>

                <Field label="Danh mục" required>
                  <select
                    value={form.category}
                    onChange={(event) => updateForm('category', event.target.value)}
                    className={inputClass}
                  >
                    {JOB_CATEGORIES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Mức lương" required>
                  <input
                    value={form.salary}
                    onChange={(event) => updateForm('salary', event.target.value)}
                    className={inputClass}
                    placeholder="10 - 15 triệu + thưởng"
                  />
                </Field>

                <Field label="Địa điểm">
                  <input
                    value={form.location}
                    onChange={(event) => updateForm('location', event.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Loại hình">
                  <select
                    value={form.type}
                    onChange={(event) => updateForm('type', event.target.value)}
                    className={inputClass}
                  >
                    {JOB_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Cấp bậc">
                  <input
                    value={form.level}
                    onChange={(event) => updateForm('level', event.target.value)}
                    className={inputClass}
                    placeholder="Junior – Middle"
                  />
                </Field>

                <Field label="Nhãn">
                  <select
                    value={form.tag}
                    onChange={(event) => updateForm('tag', event.target.value)}
                    className={inputClass}
                  >
                    {JOB_TAGS.map((option) => (
                      <option key={option.value || 'none'} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Biểu tượng">
                  <input
                    value={form.icon}
                    onChange={(event) => updateForm('icon', event.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Trạng thái">
                  <select
                    value={form.status}
                    onChange={(event) => updateForm('status', event.target.value)}
                    className={inputClass}
                  >
                    {JOB_STATUSES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5 grid gap-4">
                <Field label="Mô tả công việc" required>
                  <textarea
                    value={form.description}
                    onChange={(event) => updateForm('description', event.target.value)}
                    className={textareaClass}
                  />
                </Field>

                <Field label="Yêu cầu">
                  <textarea
                    value={form.requirementsText}
                    onChange={(event) => updateForm('requirementsText', event.target.value)}
                    className={textareaClass}
                  />
                </Field>

                <Field label="Phúc lợi">
                  <textarea
                    value={form.benefits}
                    onChange={(event) => updateForm('benefits', event.target.value)}
                    className={textareaClass}
                  />
                </Field>

                <Field label="Thời gian làm việc">
                  <textarea
                    value={form.workingHours}
                    onChange={(event) => updateForm('workingHours', event.target.value)}
                    className={`${textareaClass} min-h-24`}
                  />
                </Field>
              </div>

              {error ? (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              {message ? (
                <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  {message}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void saveJob()}
                  disabled={saving}
                  className="rounded-lg bg-[#EC1313] px-5 py-3 text-sm font-black text-white shadow-sm shadow-red-200 transition hover:bg-[#d41111] disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  {saving ? 'Đang lưu...' : form.id ? 'Cập nhật tin' : 'Lưu tin mới'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#EC1313] hover:text-[#EC1313]"
                >
                  Làm mới form
                </button>
                {slugPreview ? (
                  <a
                    href={`/tuyen-dung/${slugPreview}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#EC1313] hover:text-[#EC1313]"
                  >
                    Mở trang chi tiết
                  </a>
                ) : null}
              </div>
            </div>
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:self-start">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Tin gần đây</h2>
              <button
                type="button"
                onClick={() => void loadJobs()}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-[#EC1313] hover:text-[#EC1313]"
              >
                Tải lại
              </button>
            </div>

            {loading ? (
              <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Đang tải...</div>
            ) : jobs.length === 0 ? (
              <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Chưa có tin tuyển dụng.</div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="font-bold leading-snug text-slate-900">{job.title}</div>
                    <div className="mt-1 text-xs text-slate-500">/{job.slug}</div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setForm(formFromDoc(job))
                          setMessage(`Đang sửa: ${job.title}`)
                        }}
                        className="rounded-md bg-slate-950 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
                      >
                        Sửa
                      </button>
                      <a
                        href={`/tuyen-dung/${job.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-[#EC1313] hover:text-[#EC1313]"
                      >
                        Mở
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}
