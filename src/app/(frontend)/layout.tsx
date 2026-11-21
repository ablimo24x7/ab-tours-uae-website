import { DM_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google'
import React from 'react'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { QuoteDrawer } from '@/components/QuoteDrawer'
import { RevealObserver } from '@/components/RevealObserver'
import { SiteShellProvider } from '@/components/SiteShellContext'
import { Toast } from '@/components/Toast'
import { getCMSSiteShell } from '@/content/globals'
import './styles/tokens.css'
import './styles/base.css'
import './styles/sections.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--serif',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--mono',
  display: 'swap',
})

export const metadata = {
  title: 'AB Tours UAE',
  description: 'AB Tours UAE — Destination Management Company',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { header, footer, whatsappNumber, replyTimeText, colourStyle } =
    await getCMSSiteShell()

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${dmMono.variable}`}
      style={colourStyle as React.CSSProperties}
    >
      <body>
        <SiteShellProvider>
          <a className="sr" href="#main">
            Skip to content
          </a>
          <Header {...header} />
          <main id="main">{children}</main>
          <Footer {...footer} />
          <FloatingWhatsApp number={whatsappNumber} />
          <QuoteDrawer replyTimeText={replyTimeText} />
          <Toast />
          <RevealObserver />
        </SiteShellProvider>
      </body>
    </html>
  )
}
