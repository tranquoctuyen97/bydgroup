import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: 'Đơn ứng tuyển',
    plural: 'Đơn ứng tuyển',
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'position', 'status', 'createdAt'],
    group: 'Tuyển dụng',
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Họ và tên' },
    { name: 'email', type: 'email', required: true, label: 'Email' },
    { name: 'phone', type: 'text', required: true, label: 'Số điện thoại' },
    { name: 'linkedIn', type: 'text', label: 'LinkedIn' },
    {
      name: 'position',
      type: 'relationship',
      relationTo: 'jobs',
      label: 'Vị trí ứng tuyển',
    },
    {
      name: 'positionText',
      type: 'text',
      label: 'Tên vị trí',
      admin: { description: 'Tên vị trí (dùng khi không có liên kết)' },
    },
    {
      name: 'experience',
      type: 'select',
      label: 'Kinh nghiệm',
      options: [
        { label: 'Dưới 1 năm (Fresher)', value: '0-1' },
        { label: '1 – 3 năm', value: '1-3' },
        { label: '3 – 5 năm', value: '3-5' },
        { label: '5 – 10 năm', value: '5-10' },
        { label: 'Trên 10 năm', value: '10+' },
      ],
    },
    { name: 'expectedSalary', type: 'text', label: 'Mức lương mong muốn' },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      label: 'CV / Hồ sơ',
    },
    { name: 'coverLetter', type: 'textarea', label: 'Thư xin việc' },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái',
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đang xem xét', value: 'reviewing' },
        { label: 'Chấp nhận', value: 'accepted' },
        { label: 'Từ chối', value: 'rejected' },
      ],
      defaultValue: 'new',
      admin: { position: 'sidebar' },
    },
  ],
}
