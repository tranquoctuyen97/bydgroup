import config from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import JobsLiteClient from './JobsLiteClient'

export const dynamic = 'force-dynamic'

export default async function JobsLitePage() {
  const payload = await getPayload({ config })
  const auth = await payload.auth({
    canSetHeaders: false,
    headers: await headers(),
    req: { payload } as any,
  })

  if (!auth.user) {
    redirect('/admin/login?redirect=%2Fadmin%2Ftuyen-dung-nhanh')
  }

  return <JobsLiteClient userEmail={auth.user.email || ''} />
}
