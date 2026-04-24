const DEFAULT_NOTIFICATION_EMAIL = 'hr@bydgroup.vn'
const DEFAULT_SERVER_URL = 'http://localhost:3000'

const stripTrailingSlash = (value) => value.replace(/\/+$/, '')

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatDateTime = (value) => {
  if (!value) return 'Không rõ'

  try {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date(value))
  } catch {
    return String(value)
  }
}

const normalizeRecipients = (value) => {
  if (!value) return null

  const recipients = String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (recipients.length === 0) return null
  if (recipients.length === 1) return recipients[0]

  return recipients
}

const toAbsoluteURL = (serverURL, pathOrURL) => {
  if (!pathOrURL) return null
  if (/^https?:\/\//i.test(pathOrURL)) return pathOrURL

  return `${stripTrailingSlash(serverURL)}${pathOrURL.startsWith('/') ? '' : '/'}${pathOrURL}`
}

const relationId = (value) => {
  if (value == null) return null
  if (typeof value === 'object') return value.id ?? null
  return value
}

export const resolveNotificationRecipient = ({
  configuredRecipient,
  jobContactEmail,
  smtpFromAddress,
}) =>
  normalizeRecipients(configuredRecipient) ||
  normalizeRecipients(jobContactEmail) ||
  normalizeRecipients(smtpFromAddress) ||
  DEFAULT_NOTIFICATION_EMAIL

export const resolveServerURL = (req) => {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (fromEnv) return stripTrailingSlash(fromEnv)

  const headers = req?.headers
  const proto =
    headers?.get?.('x-forwarded-proto') ||
    headers?.get?.('x-forwarded-protocol') ||
    'http'
  const host = headers?.get?.('x-forwarded-host') || headers?.get?.('host')

  if (host) {
    return `${proto}://${host}`
  }

  return DEFAULT_SERVER_URL
}

export const buildApplicationNotificationEmail = ({
  application,
  job,
  cv,
  recipient,
  serverURL,
}) => {
  const positionName = job?.title || application.positionText || 'Ứng viên mới'
  const adminURL = `${stripTrailingSlash(serverURL)}/admin/collections/applications/${application.id}`
  const cvURL = toAbsoluteURL(serverURL, cv?.url)
  const submittedAt = formatDateTime(application.createdAt)

  const fields = [
    { label: 'Họ và tên', html: escapeHtml(application.fullName) },
    { label: 'Email', html: escapeHtml(application.email) },
    { label: 'Số điện thoại', html: escapeHtml(application.phone) },
    { label: 'Vị trí ứng tuyển', html: escapeHtml(positionName) },
    {
      label: 'Mức lương mong muốn',
      html: escapeHtml(application.expectedSalary || 'Không có'),
    },
    { label: 'Thời gian nộp', html: escapeHtml(submittedAt) },
    { label: 'Cover letter', html: escapeHtml(application.coverLetter || 'Không có') },
    {
      label: 'CV',
      html: cvURL
        ? `<a href="${escapeHtml(cvURL)}">${escapeHtml(cv?.filename || cvURL)}</a>`
        : escapeHtml(cv?.filename || 'Không có'),
    },
    {
      label: 'Link admin',
      html: `<a href="${escapeHtml(adminURL)}">${escapeHtml(adminURL)}</a>`,
    },
  ]

  const rows = fields
    .map(
      ({ label, html }) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:700;vertical-align:top;">${escapeHtml(
          label,
        )}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">${html}</td></tr>`,
    )
    .join('')

  const subject = `[BYD] CV mới: ${positionName} - ${application.fullName}`
  const text = [
    'BYD vừa nhận một CV mới.',
    `Họ và tên: ${application.fullName}`,
    `Email: ${application.email}`,
    `Số điện thoại: ${application.phone}`,
    `Vị trí ứng tuyển: ${positionName}`,
    `Mức lương mong muốn: ${application.expectedSalary || 'Không có'}`,
    `Thời gian nộp: ${submittedAt}`,
    `Cover letter: ${application.coverLetter || 'Không có'}`,
    `CV: ${cvURL || cv?.filename || 'Không có'}`,
    `Link admin: ${adminURL}`,
  ].join('\n')

  return {
    to: recipient,
    subject,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6;">
        <h2 style="margin:0 0 16px;">BYD vừa nhận một CV mới</h2>
        <p style="margin:0 0 16px;">Bạn có một hồ sơ ứng tuyển mới cần xem xét.</p>
        <table style="border-collapse:collapse;width:100%;max-width:720px;">
          <tbody>${rows}</tbody>
        </table>
      </div>
    `,
    text,
    replyTo: application.email || undefined,
  }
}

export const handleApplicationNotification = async ({ doc, operation, req }) => {
  if (operation !== 'create' || !doc) return false

  const payload = req?.payload
  if (!payload?.sendEmail) return false

  const positionID = relationId(doc.position)
  const cvID = relationId(doc.cv)

  let job = null
  let cv = null

  if (positionID != null) {
    try {
      job = await payload.findByID({
        collection: 'jobs',
        id: positionID,
        depth: 0,
        req,
      })
    } catch {
      job = null
    }
  }

  if (cvID != null) {
    try {
      cv = await payload.findByID({
        collection: 'media',
        id: cvID,
        depth: 0,
        req,
      })
    } catch {
      cv = null
    }
  }

  const recipient = resolveNotificationRecipient({
    configuredRecipient: process.env.APPLICATION_NOTIFICATION_TO,
    jobContactEmail: job?.contactEmail,
    smtpFromAddress: process.env.SMTP_FROM_ADDRESS,
  })

  const serverURL = resolveServerURL(req)
  const message = buildApplicationNotificationEmail({
    application: doc,
    job,
    cv,
    recipient,
    serverURL,
  })

  try {
    await payload.sendEmail(message)
    return true
  } catch (error) {
    payload.logger.error({
      msg: 'Gửi email thông báo CV mới thất bại.',
      applicationId: doc.id,
      error,
    })
    return false
  }
}
