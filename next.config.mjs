import { withPayload } from '@payloadcms/next/withPayload'

const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
]

const mediaBaseURL =
  process.env.R2_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ||
  'https://media.bydgroup.vn'

try {
  const parsedMediaURL = new URL(mediaBaseURL)
  remotePatterns.push({
    hostname: parsedMediaURL.hostname,
    port: parsedMediaURL.port || '',
    protocol: parsedMediaURL.protocol.replace(':', ''),
  })
} catch {
  // Ignore invalid media URL during local setup; fallback patterns still work.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    'payload',
    '@payloadcms/db-postgres',
    'graphql',
  ],
  images: {
    remotePatterns,
  },
}

export default withPayload(nextConfig)
