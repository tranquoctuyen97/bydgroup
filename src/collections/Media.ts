import type { CollectionConfig } from 'payload'

import { PAYLOAD_IMAGE_SIZES } from '@/lib/media/imageSizes'

const VARIANT_FIELDS = PAYLOAD_IMAGE_SIZES.map(({ name }) => name)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Tệp đa phương tiện',
    plural: 'Đa phương tiện',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    imageSizes: PAYLOAD_IMAGE_SIZES,
  },
  admin: {
    useAsTitle: 'alt',
  },
  hooks: {
    afterRead: [({ doc }) => {
      const variants = VARIANT_FIELDS.map((name) => {
        const variantData = doc?.sizes?.[name]
        if (!variantData?.url) return null
        return {
          name,
          url: variantData.url,
          width: variantData.width,
          height: variantData.height,
          fileSize: variantData.filesize,
        }
      }).filter(Boolean)

      return {
        ...doc,
        variants,
        originalFileSize: doc?.filesize,
      }
    }],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Mô tả ảnh',
    },
    {
      name: 'originalFileSize',
      type: 'number',
      label: 'Kích thước gốc',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'variants',
      type: 'array',
      label: 'Các phiên bản',
      admin: {
        readOnly: true,
      },
      fields: [
        { name: 'name', type: 'text', label: 'Tên' },
        { name: 'url', type: 'text', label: 'Đường dẫn' },
        { name: 'width', type: 'number', label: 'Chiều rộng' },
        { name: 'height', type: 'number', label: 'Chiều cao' },
        { name: 'fileSize', type: 'number', label: 'Kích thước' },
      ],
    },
  ],
}
