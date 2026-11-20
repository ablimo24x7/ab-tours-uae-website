import React from 'react'
import { DM_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google'
import './styles/tokens.css'

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

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${dmMono.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
