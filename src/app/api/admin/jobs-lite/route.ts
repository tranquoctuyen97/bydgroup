import config from '@payload-config'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import {
  DEFAULT_WORKING_HOURS,
  arrayToRequirementsText,
  jobCategoryValues,
  jobStatusValues,
  jobTagValues,
  jobTypeValues,
  requirementsTextToArray,
} from '@/lib/jobs/options'
import { richTextToPlainText } from '@/lib/richTextToPlainText'

type JobInput = Record<string, unknown>

const getAuthenticatedPayload = async () => {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const auth = await payload.auth({
    canSetHeaders: false,
    headers: requestHeaders,
    req: { payload } as any,
  })

  return { payload, user: auth.user }
}

const textValue = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const optionalTextValue = (value: unknown) => {
  const text = textValue(value)
  return text || undefined
}

const validateSelect = (
  value: unknown,
  allowed: Set<string>,
  field: string,
  fallback?: string,
) => {
  const text = textValue(value) || fallback || ''
  if (!text || allowed.has(text)) return text || undefined
  throw new Error(`${field} không hợp lệ`)
}

const normalizeJobInput = (input: JobInput, partial = false) => {
  const data: Record<string, unknown> = {}

  const requiredText = (field: string, label: string) => {
    const value = textValue(input[field])
    if (!partial && !value) throw new Error(`${label} là bắt buộc`)
    if (value || field in input) data[field] = value
  }

  requiredText('title', 'Tiêu đề')
  requiredText('salary', 'Mức lương')
  requiredText('description', 'Mô tả công việc')

  if ('slug' in input) data.slug = optionalTextValue(input.slug)
  if ('icon' in input || !partial) data.icon = textValue(input.icon) || '💼'
  if ('location' in input || !partial) data.location = textValue(input.location) || 'Hà Nội'
  if ('level' in input) data.level = optionalTextValue(input.level)
  if ('benefits' in input) data.benefits = optionalTextValue(input.benefits)
  if ('workingHours' in input || !partial) {
    data.workingHours = textValue(input.workingHours) || DEFAULT_WORKING_HOURS
  }

  if ('category' in input || !partial) {
    data.category = validateSelect(input.category, jobCategoryValues, 'Danh mục', 'marketing')
  }

  if ('type' in input || !partial) {
    data.type = validateSelect(input.type, jobTypeValues, 'Loại hình', 'full-time')
  }

  if ('status' in input || !partial) {
    data.status = validateSelect(input.status, jobStatusValues, 'Trạng thái', 'active')
  }

  if ('tag' in input) {
    data.tag = validateSelect(input.tag, jobTagValues, 'Nhãn') || null
  }

  if ('requirementsText' in input || 'requirements' in input || !partial) {
    const requirementsText =
      typeof input.requirementsText === 'string'
        ? input.requirementsText
        : arrayToRequirementsText(input.requirements)

    data.requirements = requirementsTextToArray(requirementsText)
  }

  return data
}

const normalizeJobDoc = (doc: Record<string, any>) => {
  const description = richTextToPlainText(doc.description)
  const benefits = richTextToPlainText(doc.benefits)

  return {
    ...doc,
    description,
    benefits,
    requirementsText: arrayToRequirementsText(doc.requirements),
  }
}

export async function GET(request: Request) {
  const { payload, user } = await getAuthenticatedPayload()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(request.url)
  const limit = Number(url.searchParams.get('limit') || 30)

  const result = await payload.find({
    collection: 'jobs',
    depth: 0,
    limit: Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 100) : 30,
    sort: '-publishedAt',
  })

  return NextResponse.json({
    ...result,
    docs: result.docs.map((doc) => normalizeJobDoc(doc as Record<string, any>)),
  })
}

export async function POST(request: Request) {
  const { payload, user } = await getAuthenticatedPayload()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = (await request.json()) as JobInput
    const doc = await payload.create({
      collection: 'jobs',
      data: normalizeJobInput(body) as any,
    })

    return NextResponse.json({ doc: normalizeJobDoc(doc as Record<string, any>) }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể tạo tin tuyển dụng'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function PATCH(request: Request) {
  const { payload, user } = await getAuthenticatedPayload()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = (await request.json()) as JobInput
    const id = typeof body.id === 'number' ? body.id : Number(textValue(body.id))
    if (!Number.isFinite(id)) throw new Error('ID tin tuyển dụng không hợp lệ')

    const doc = await payload.update({
      collection: 'jobs',
      id,
      data: normalizeJobInput(body, true) as any,
    })

    return NextResponse.json({ doc: normalizeJobDoc(doc as Record<string, any>) })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể cập nhật tin tuyển dụng'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
