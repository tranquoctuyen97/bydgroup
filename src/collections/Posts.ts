import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Bài viết',
    plural: 'Bài viết',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedAt'],
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
      name: 'category',
      type: 'select',
      label: 'Danh mục',
      options: [
        { label: 'Sự kiện', value: 'su-kien' },
        { label: 'Công nghệ', value: 'cong-nghe' },
        { label: 'Văn hóa', value: 'van-hoa' },
        { label: 'Kinh doanh', value: 'kinh-doanh' },
        { label: 'Vận hành', value: 'van-hanh' },
      ],
    },
    { name: 'excerpt', type: 'textarea', label: 'Tóm tắt' },
    { name: 'content', type: 'richText', label: 'Nội dung' },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh đại diện',
    },
    {
      name: 'externalImageUrl',
      type: 'text',
      label: 'URL ảnh bên ngoài',
      admin: { description: 'URL ảnh bên ngoài (dùng khi không upload ảnh)' },
    },
    { name: 'author', type: 'text', label: 'Tác giả' },
    { name: 'readTime', type: 'text', label: 'Thời gian đọc' },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Nổi bật',
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
