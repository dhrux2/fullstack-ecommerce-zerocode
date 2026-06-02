import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import ShoppingBag from '@/components/ShoppingBag'
import CookieConsent from '@/components/CookieConsent'
import Preloader from '@/components/Preloader'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const nohemi = localFont({
  src: '../../fonts/Nohemi-Light-BF6438cc583f70b.otf',
  variable: '--font-nohemi',
  display: 'swap',
})

const thunder = localFont({
  src: '../../fonts/Thunder-BoldHC.ttf',
  variable: '--font-thunder',
  display: 'swap',
})

const thunderItalic = localFont({
  src: '../../fonts/Thunder-BoldHCItalic.ttf',
  variable: '--font-thunder-italic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zero Code | Essentials',
  description: 'Premium curated essentials.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${nohemi.variable} ${thunder.variable} ${thunderItalic.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] selection:bg-[var(--color-primary-dark)] selection:text-[var(--color-primary-light)] antialiased">
        <SmoothScroll>
          <Preloader />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <ShoppingBag />
          <CookieConsent />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
