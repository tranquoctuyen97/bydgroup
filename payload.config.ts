import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import { vi } from '@payloadcms/translations/languages/vi'

import { Jobs } from './src/collections/Jobs'
import { Posts } from './src/collections/Posts'
import { Applications } from './src/collections/Applications'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import { createSMTPEmailAdapter } from './src/lib/email/smtpEmailAdapter'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING

const r2PublicBaseURL = (
  process.env.R2_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ||
  'https://media.bydgroup.vn'
).replace(/\/+$/, '')

const hasR2StorageConfig = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ENDPOINT &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)

if (!databaseURL) {
  throw new Error(
    'Missing Postgres connection string. Set DATABASE_URL or POSTGRES_URL before starting Payload.',
  )
}

const buildPublicMediaURL = ({
  filename,
  prefix,
}: {
  filename: string
  prefix?: string
}) => {
  const cleanPrefix = prefix?.replace(/^\/+|\/+$/g, '')
  const prefixPath = cleanPrefix ? `${cleanPrefix}/` : ''

  return `${r2PublicBaseURL}/${prefixPath}${filename}`
}

/* ── Custom Vietnamese overrides for untranslated Payload strings ── */
const viCustom = {
  ...vi,
  translations: {
    ...vi.translations,
    general: {
      ...vi.translations.general,
      dashboard: 'Bảng điều khiển',
      createNew: 'Tạo mới',
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      edit: 'Chỉnh sửa',
      loading: 'Đang tải',
      close: 'Đóng',
      back: 'Quay lại',
      backToDashboard: 'Quay lại bảng điều khiển',
      yes: 'Có',
      no: 'Không',
      confirm: 'Xác nhận',
      thisLanguage: 'Tiếng Việt',
    },
    authentication: {
      ...vi.translations.authentication,
      login: 'Đăng nhập',
      logout: 'Đăng xuất',
      account: 'Tài khoản',
    },
  },
} as typeof vi

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | BYD Việt Nam',
      description: 'Bảng quản trị nội bộ BYD Việt Nam',
    },
    components: {
      graphics: {
        Logo: '/src/components/admin/Logo',
        Icon: '/src/components/admin/Icon',
      },
    },
  },
  i18n: {
    fallbackLanguage: 'vi',
    supportedLanguages: { vi: viCustom },
  },
  collections: [Jobs, Posts, Applications, Media, Users],
  editor: lexicalEditor(),
  email: createSMTPEmailAdapter(),
  secret: process.env.PAYLOAD_SECRET || 'bydgroup-super-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,
    },
  }),
  plugins: [
    s3Storage({
      acl: 'public-read',
      bucket: process.env.S3_BUCKET || 'bydgroup-media',
      clientUploads: true,
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) =>
            buildPublicMediaURL({
              filename,
              prefix,
            }),
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: false,
        region: process.env.S3_REGION || 'auto',
      },
      enabled: hasR2StorageConfig,
    }),
  ],
  logger: {
    options: {
      browser: {
        asObject: true,
      },
    },
  },
})
