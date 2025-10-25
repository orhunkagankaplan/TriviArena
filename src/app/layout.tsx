import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TriviArena - Quiz Battles on Base',
  description: 'Skill-based quiz battles with real stakes on Base blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
