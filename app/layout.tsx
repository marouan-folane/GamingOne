import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PS2 Games Collection',
  description: 'Discover amazing PlayStation 2 games compatible with PCX2 emulator',
  other: {
    'mylead-verification': 'a59c8829723a60cd430c848d302431ca'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      {/* mylead-verification: a59c8829723a60cd430c848d302431ca  */}
      token:a59c8829723a60cd430c848d302431ca
      <body className={inter.className}>{children}</body>
    </html>
  )
}