import React from 'react'
import type { FloatingWhatsAppProps } from './types'

export function FloatingWhatsApp({
  number,
  smallLabel = 'Need help?',
  label = 'Chat with us',
}: FloatingWhatsAppProps) {
  const digits = number.replace(/[^0-9]/g, '')
  const href = digits ? `https://wa.me/${digits}` : 'https://wa.me/'

  return (
    <a
      className="wa"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-toast={
        digits
          ? undefined
          : 'WhatsApp opens a chat with the AB Tours UAE team.'
      }
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />
      </svg>
      <span>
        <small>{smallLabel}</small>
        {label}
      </span>
    </a>
  )
}
