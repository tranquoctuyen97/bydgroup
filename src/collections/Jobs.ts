import type { CollectionConfig } from 'payload'

/** Normalise a Vietnamese title into a URL-safe slug. */
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Tin tuyển dụng',
    plural: 'Tuyển dụng',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', 'level', 'salary', 'status', 'publishedAt'],
    group: 'Nội dung',
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        if (!data) return data

        // Auto-generate slug from title if not manually set
        if (data.title && !data.slug) {
          data.slug = slugify(data.title)
        }

        // Deduplicate slug — append -2, -3… if already taken
        if (data.slug) {
          const baseSlug = data.slug
          let candidate = baseSlug
          let counter = 1
          const currentId = operation === 'update' ? originalDoc?.id : undefined

          // eslint-disable-next-line no-constant-condition
          while (true) {
            const existing = await req.payload.find({
              collection: 'jobs',
              where: {
                slug: { equals: candidate },
                ...(currentId ? { id: { not_equals: currentId } } : {}),
              },
              limit: 1,
              depth: 0,
            })

            if (existing.docs.length === 0) break
            counter++
            candidate = `${baseSlug}-${counter}`
          }

          data.slug = candidate
        }

        // Auto-set publishedAt on first create
        if (!data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }

        return data
      },
    ],
  },
  fields: [
    // ─── Thông tin chính ────────────────────────────────────────
    { name: 'title', type: 'text', required: true, label: 'Tiêu đề' },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      label: 'Đường dẫn',
      admin: {
        position: 'sidebar',
        description: 'Tự động sinh từ tiêu đề. Chỉ sửa khi cần tùy chỉnh.',
        readOnly: false,
      },
    },
    {
      name: 'icon',
      type: 'text',
      defaultValue: '💼',
      label: 'Biểu tượng',
      admin: { description: 'Biểu tượng emoji hiển thị trên thẻ tuyển dụng' },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Danh mục',
      required: true,
      options: [
        { label: 'Công nghệ', value: 'cong-nghe' },
        { label: 'Kinh doanh', value: 'kinh-doanh' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Vận hành', value: 'van-hanh' },
        { label: 'Nhân sự', value: 'nhan-su' },
        { label: 'Tài chính', value: 'tai-chinh' },
      ],
    },
    { name: 'location', type: 'text', label: 'Địa điểm', defaultValue: 'Hà Nội' },
    {
      name: 'type',
      type: 'select',
      label: 'Loại hình',
      options: [
        { label: 'Toàn thời gian', value: 'full-time' },
        { label: 'Bán thời gian', value: 'part-time' },
        { label: 'Hợp đồng', value: 'contract' },
        { label: 'Thực tập', value: 'intern' },
      ],
      defaultValue: 'full-time',
    },
    {
      name: 'level',
      type: 'text',
      label: 'Cấp bậc',
      admin: {
        description: 'Ví dụ: "Junior – Middle", "Middle – Senior", "Middle – Lead"',
      },
    },
    { name: 'salary', type: 'text', label: 'Mức lương', required: true },
    {
      name: 'tag',
      type: 'select',
      label: 'Nhãn',
      options: [
        { label: 'Mới', value: 'Mới' },
        { label: 'Hot', value: 'Hot' },
        { label: 'Tuyển gấp', value: 'Tuyển gấp' },
      ],
      admin: { description: 'Nhãn hiển thị nổi bật trên thẻ tuyển dụng' },
    },

    // ─── Nội dung chi tiết ──────────────────────────────────────
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả công việc',
      required: true,
      admin: {
        rows: 8,
        description: 'Nhập mỗi ý trên một dòng để trang chi tiết dễ đọc.',
      },
    },
    {
      name: 'requirements',
      type: 'array',
      label: 'Yêu cầu',
      fields: [{ name: 'requirement', type: 'text', required: true, label: 'Yêu cầu' }],
    },
    {
      name: 'benefits',
      type: 'textarea',
      label: 'Phúc lợi',
      admin: {
        rows: 8,
        description: 'Có thể copy trực tiếp phần quyền lợi từ JD.',
      },
    },

    // ─── Thông tin bổ sung ──────────────────────────────────────
    {
      name: 'workingHours',
      type: 'textarea',
      label: 'Thời gian làm việc',
      defaultValue:
        'Thứ 2 – Thứ 7, Sáng 8h30 – 12h00, Chiều 13h30 – 17h30\nThứ 7 làm việc đến 16h00\nNghỉ 1 Thứ 7 cuối tháng và 4 Chủ nhật, chính thức nghỉ thêm 1 ngày phép',
      admin: { description: 'Giờ làm việc chi tiết — hiển thị trên trang chi tiết vị trí' },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email liên hệ',
      defaultValue: 'hr@bydgroup.vn',
      admin: { position: 'sidebar' },
    },

    // ─── Trạng thái ─────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái',
      options: [
        { label: 'Đang tuyển', value: 'active' },
        { label: 'Đã đóng', value: 'closed' },
      ],
      defaultValue: 'active',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày đăng',
      admin: {
        position: 'sidebar',
        description: 'Tự động điền khi tạo mới. Có thể sửa thủ công.',
      },
    },
  ],
}
