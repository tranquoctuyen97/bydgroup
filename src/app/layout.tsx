import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BYD Việt Nam - Build Your Dream',
  description: 'Kiến tạo tương lai thương mại điện tử đột phá. Công ty TNHH BYD Việt Nam.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
