import type { CollectionConfig } from 'payload'
import { handleApplicationNotification } from '@/lib/applications/sendApplicationNotification'

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
  hooks: {
    afterChange: [handleApplicationNotification],
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Họ và tên' },
    { name: 'email', type: 'email', required: true, label: 'Email' },
    { name: 'phone', type: 'text', required: true, label: 'Số điện thoại' },
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
