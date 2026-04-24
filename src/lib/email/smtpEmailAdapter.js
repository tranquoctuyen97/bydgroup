import nodemailer from 'nodemailer'

const DEFAULT_FROM_ADDRESS = 'hr@bydgroup.vn'
const DEFAULT_FROM_NAME = 'BYD Việt Nam'

const normalizeBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value
  if (typeof value !== 'string') return fallback

  const normalized = value.trim().toLowerCase()
  if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true
  if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false

  return fallback
}

export const createSMTPEmailAdapter = () => ({ payload }) => {
  const host = process.env.SMTP_HOST?.trim()
  const port = Number.parseInt(process.env.SMTP_PORT || '', 10)
  const secure = normalizeBoolean(process.env.SMTP_SECURE, port === 465)
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS
  const defaultFromAddress = process.env.SMTP_FROM_ADDRESS?.trim() || DEFAULT_FROM_ADDRESS
  const defaultFromName = process.env.SMTP_FROM_NAME?.trim() || DEFAULT_FROM_NAME

  if (!host || !Number.isFinite(port)) {
    payload.logger.warn({
      msg: 'SMTP chưa được cấu hình đầy đủ. Email thông báo CV mới sẽ không được gửi.',
    })

    return {
      name: 'smtp-disabled',
      defaultFromAddress,
      defaultFromName,
      sendEmail: async (message) => {
        payload.logger.warn({
          msg: 'Bỏ qua gửi email vì thiếu SMTP config.',
          to: message.to,
          subject: message.subject,
        })
      },
    }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  })

  return {
    name: 'smtp',
    defaultFromAddress,
    defaultFromName,
    sendEmail: async (message) =>
      transporter.sendMail({
        from: message.from || `"${defaultFromName}" <${defaultFromAddress}>`,
        ...message,
      }),
  }
}
