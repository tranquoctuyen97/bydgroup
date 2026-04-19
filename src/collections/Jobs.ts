import type { CollectionConfig } from 'payload'

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
    defaultColumns: ['title', 'category', 'location', 'status', 'publishedAt'],
    group: 'Nội dung',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Tiêu đề' },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      label: 'Đường dẫn',
      admin: { position: 'sidebar' },
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
      options: [
        { label: 'Công nghệ', value: 'cong-nghe' },
        { label: 'Kinh doanh', value: 'kinh-doanh' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Vận hành', value: 'van-hanh' },
        { label: 'Nhân sự', value: 'nhan-su' },
        { label: 'Tài chính', value: 'tai-chinh' },
      ],
    },
    { name: 'location', type: 'text', label: 'Địa điểm' },
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
      type: 'select',
      label: 'Cấp bậc',
      options: [
        { label: 'Fresher', value: 'fresher' },
        { label: 'Junior', value: 'junior' },
        { label: 'Middle', value: 'middle' },
        { label: 'Senior', value: 'senior' },
        { label: 'Manager', value: 'manager' },
      ],
    },
    { name: 'salary', type: 'text', label: 'Mức lương' },
    {
      name: 'tag',
      type: 'text',
      label: 'Nhãn',
      admin: { description: 'Ví dụ: "Mới", "Hot", "Gấp"' },
    },
    { name: 'description', type: 'richText', label: 'Mô tả công việc' },
    {
      name: 'requirements',
      type: 'array',
      label: 'Yêu cầu',
      fields: [{ name: 'requirement', type: 'text', required: true, label: 'Yêu cầu' }],
    },
    {
      name: 'benefits',
      type: 'richText',
      label: 'Phúc lợi',
    },
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
      admin: { position: 'sidebar' },
    },
  ],
}
