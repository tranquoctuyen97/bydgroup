import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildApplicationNotificationEmail,
  handleApplicationNotification,
  resolveNotificationRecipient,
} from './sendApplicationNotification.js'

test('resolveNotificationRecipient ưu tiên env recipient', () => {
  const result = resolveNotificationRecipient({
    configuredRecipient: 'ops@byd.vn',
    jobContactEmail: 'job@byd.vn',
    smtpFromAddress: 'smtp@byd.vn',
  })

  assert.equal(result, 'ops@byd.vn')
})

test('resolveNotificationRecipient fallback về job rồi SMTP rồi HR mặc định', () => {
  assert.equal(
    resolveNotificationRecipient({
      configuredRecipient: '',
      jobContactEmail: 'job@byd.vn',
      smtpFromAddress: 'smtp@byd.vn',
    }),
    'job@byd.vn',
  )

  assert.equal(
    resolveNotificationRecipient({
      configuredRecipient: '',
      jobContactEmail: '',
      smtpFromAddress: 'smtp@byd.vn',
    }),
    'smtp@byd.vn',
  )

  assert.equal(
    resolveNotificationRecipient({
      configuredRecipient: '',
      jobContactEmail: '',
      smtpFromAddress: '',
    }),
    'hr@bydgroup.vn',
  )
})

test('buildApplicationNotificationEmail chứa subject, reply-to và link CV', () => {
  const email = buildApplicationNotificationEmail({
    application: {
      id: 42,
      fullName: 'Nguyễn Văn A',
      email: 'candidate@example.com',
      phone: '0900000000',
      expectedSalary: '20 triệu',
      coverLetter: 'Tôi rất phù hợp',
      positionText: 'Fallback title',
      createdAt: '2026-04-24T03:00:00.000Z',
    },
    job: {
      title: 'Trợ lý CEO / PMO',
    },
    cv: {
      filename: 'cv-nguyen-van-a.pdf',
      url: '/media/cv-nguyen-van-a.pdf',
    },
    recipient: 'ops@byd.vn',
    serverURL: 'https://www.bydgroup.vn',
  })

  assert.equal(email.to, 'ops@byd.vn')
  assert.equal(email.replyTo, 'candidate@example.com')
  assert.match(email.subject, /\[BYD\] CV mới: Trợ lý CEO \/ PMO - Nguyễn Văn A/)
  assert.match(email.html, /https:\/\/www\.bydgroup\.vn\/media\/cv-nguyen-van-a\.pdf/)
  assert.match(email.text, /Link admin: https:\/\/www\.bydgroup\.vn\/admin\/collections\/applications\/42/)
})

test('handleApplicationNotification gửi mail đúng 1 lần khi create', async () => {
  const calls = []
  const payload = {
    findByID: async ({ collection, id }) => {
      if (collection === 'jobs' && id === 7) {
        return { id: 7, title: 'Kế toán Nội bộ', contactEmail: 'finance@byd.vn' }
      }

      if (collection === 'media' && id === 9) {
        return { id: 9, filename: 'cv.pdf', url: '/media/cv.pdf' }
      }

      return null
    },
    sendEmail: async (message) => {
      calls.push(message)
    },
    logger: {
      error: () => {},
    },
  }

  const originalEnv = process.env.APPLICATION_NOTIFICATION_TO
  delete process.env.APPLICATION_NOTIFICATION_TO

  try {
    const result = await handleApplicationNotification({
      operation: 'create',
      doc: {
        id: 99,
        fullName: 'Ứng viên test',
        email: 'ungvien@example.com',
        phone: '0912345678',
        position: 7,
        cv: 9,
        positionText: 'Kế toán Nội bộ',
        createdAt: '2026-04-24T03:00:00.000Z',
      },
      req: {
        payload,
        headers: new Headers({
          host: 'www.bydgroup.vn',
          'x-forwarded-proto': 'https',
        }),
      },
    })

    assert.equal(result, true)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].to, 'finance@byd.vn')
    assert.equal(calls[0].replyTo, 'ungvien@example.com')
  } finally {
    process.env.APPLICATION_NOTIFICATION_TO = originalEnv
  }
})

test('handleApplicationNotification không gửi mail khi update', async () => {
  let called = false

  const result = await handleApplicationNotification({
    operation: 'update',
    doc: { id: 1 },
    req: {
      payload: {
        sendEmail: async () => {
          called = true
        },
      },
    },
  })

  assert.equal(result, false)
  assert.equal(called, false)
})

test('handleApplicationNotification nuốt lỗi SMTP và không throw', async () => {
  let logged = false

  const result = await handleApplicationNotification({
    operation: 'create',
    doc: {
      id: 5,
      fullName: 'Ứng viên lỗi SMTP',
      email: 'smtp-error@example.com',
      phone: '0901234567',
      positionText: 'Marketing FB Ads',
      createdAt: '2026-04-24T03:00:00.000Z',
    },
    req: {
      payload: {
        findByID: async () => null,
        sendEmail: async () => {
          throw new Error('smtp down')
        },
        logger: {
          error: () => {
            logged = true
          },
        },
      },
      headers: new Headers({
        host: 'localhost:3000',
      }),
    },
  })

  assert.equal(result, false)
  assert.equal(logged, true)
})
