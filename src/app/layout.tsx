import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CHÂU Á THÀNH CÔNG',
  description: 'Kiến tạo tương lai thương mại điện tử đột phá. Công ty TNHH Châu Á CHÂU Á THÀNH CÔNG.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


