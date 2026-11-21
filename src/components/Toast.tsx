'use client'

import React from 'react'
import { useSiteShell } from './SiteShellContext'

export function Toast() {
  const { toastMessage, toastVisible } = useSiteShell()

  return (
    <div
      className={`toast${toastVisible ? ' show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {toastMessage}
    </div>
  )
}
