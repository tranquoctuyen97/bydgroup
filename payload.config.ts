import { buildConfig } from 'payload'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { vi } from '@payloadcms/translations/languages/vi'

import { Jobs } from './src/collections/Jobs'
import { Posts } from './src/collections/Posts'
import { Applications } from './src/collections/Applications'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
  secret: process.env.PAYLOAD_SECRET || 'bydgroup-super-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: 'BYD_DB' }),
})
