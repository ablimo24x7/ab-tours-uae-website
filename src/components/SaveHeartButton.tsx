'use client'

import React from 'react'
import { useSiteShell } from './SiteShellContext'

export function SaveHeartButton({ itemName }: { itemName: string }) {
  const { savedTrips, toggleSaveTrip } = useSiteShell()
  const isSaved = savedTrips.includes(itemName)

  return (
    <button
      type="button"
      className="heart"
      aria-pressed={isSaved}
      aria-label={`Save ${itemName} to my trip`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleSaveTrip(itemName)
      }}
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
        <path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.5 6.6 4.5c2 0 3.4 1.2 4.4 2.6 1-1.4 2.4-2.6 4.4-2.6 3.6 0 5.4 3.7 3.8 6.9C19 15.6 12 20 12 20z" />
      </svg>
    </button>
  )
}
