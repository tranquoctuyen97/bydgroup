export const DEFAULT_WORKING_HOURS =
  'Thứ 2 – Thứ 7, Sáng 8h30 – 12h00, Chiều 13h30 – 17h30\nThứ 7 làm việc đến 16h00\nNghỉ 1 Thứ 7 cuối tháng và 4 Chủ nhật, chính thức nghỉ thêm 1 ngày phép'

export const JOB_CATEGORIES = [
  { label: 'Công nghệ', value: 'cong-nghe' },
  { label: 'Kinh doanh', value: 'kinh-doanh' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Vận hành', value: 'van-hanh' },
  { label: 'Nhân sự', value: 'nhan-su' },
  { label: 'Tài chính', value: 'tai-chinh' },
] as const

export const JOB_TYPES = [
  { label: 'Toàn thời gian', value: 'full-time' },
  { label: 'Bán thời gian', value: 'part-time' },
  { label: 'Hợp đồng', value: 'contract' },
  { label: 'Thực tập', value: 'intern' },
] as const

export const JOB_TAGS = [
  { label: 'Không có', value: '' },
  { label: 'Mới', value: 'Mới' },
  { label: 'Hot', value: 'Hot' },
  { label: 'Tuyển gấp', value: 'Tuyển gấp' },
] as const

export const JOB_STATUSES = [
  { label: 'Đang tuyển', value: 'active' },
  { label: 'Đã đóng', value: 'closed' },
] as const

export type JobCategory = (typeof JOB_CATEGORIES)[number]['value']
export type JobType = (typeof JOB_TYPES)[number]['value']
export type JobTag = Exclude<(typeof JOB_TAGS)[number]['value'], ''>
export type JobStatus = (typeof JOB_STATUSES)[number]['value']

const createValueSet = (options: readonly { value: string }[]) =>
  new Set(options.map((option) => option.value))

export const jobCategoryValues = createValueSet(JOB_CATEGORIES)
export const jobTypeValues = createValueSet(JOB_TYPES)
export const jobTagValues = createValueSet(JOB_TAGS)
export const jobStatusValues = createValueSet(JOB_STATUSES)

export const slugifyJob = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const cleanJDLine = (line: string) =>
  line
    .replace(/\*\*/g, '')
    .replace(/\\-/g, '-')
    .replace(/^\s*[-*•–—✓]+\s*/g, '')
    .replace(/^\s*\d+[.)]\s*/g, '')
    .trim()

export const splitTextLines = (value: string) =>
  value
    .split('\n')
    .map(cleanJDLine)
    .filter(Boolean)

export const requirementsTextToArray = (value: string) =>
  splitTextLines(value).map((requirement) => ({ requirement }))

export const arrayToRequirementsText = (value: unknown) => {
  if (!Array.isArray(value)) return ''

  return value
    .map((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object' && 'requirement' in item) {
        return String((item as { requirement?: unknown }).requirement || '')
      }
      return ''
    })
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
}
