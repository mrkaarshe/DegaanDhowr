import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import RootLayoutClient from '@/app/layout-client'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Degaandhowr | Professional Cleaning Services in Somalia',
  description:
    'Degaandhowr offers top-notch cleaning services in Somalia, ensuring a spotless environment for homes and businesses. Contact us for reliable and efficient cleaning solutions.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '32x32',
      }
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
