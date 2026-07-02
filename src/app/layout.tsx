import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thành Công 45 - Build Your Dream',
  description: 'Kiến tạo tương lai thương mại điện tử đột phá. Công ty TNHH Châu Á Thành Công 45.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


