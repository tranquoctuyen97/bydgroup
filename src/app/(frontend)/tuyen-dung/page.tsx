import { getPayload } from 'payload'
import configPromise from '@payload-config'
import JobsClient from './JobsClient'
import { fallbackJobs, mapJobDocToJob, type Job } from './jobs-data'

export const dynamic = 'force-dynamic'

export default async function RecruitmentPage() {
  const payload = await getPayload({ config: configPromise })
  
  let jobs: Job[] = []
  
  try {
    const { docs } = await payload.find({
      collection: 'jobs',
      where: {
        status: { equals: 'active' },
      },
      sort: '-publishedAt',
      limit: 50,
    })
    
    if (docs && docs.length > 0) {
      jobs = docs.map(doc => mapJobDocToJob(doc))
    }
  } catch (error) {
    // If Payload DB fails, fallback
    console.error('Error fetching jobs server-side:', error)
  }

  if (jobs.length === 0) {
    jobs = fallbackJobs
  }

  return <JobsClient initialJobs={jobs} />
}
