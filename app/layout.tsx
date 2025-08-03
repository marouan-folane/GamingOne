import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GAMING ONE - Relive PS2 Nostalgia",
  description: "Download classic PlayStation 2 games and relive the nostalgia. Compatible with PCX2 emulator.",
  keywords: "PS2 games, PlayStation 2, retro gaming, PCX2, emulator, classic games",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
