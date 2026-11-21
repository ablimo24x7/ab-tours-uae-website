'use client'

import React, { useState } from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { useSiteShell } from '@/components/SiteShellContext'

const SAMPLE_TRIPS = ['Dubai — Skyline & Souks', 'Abu Dhabi in a day']

export function StyleguideInteractive() {
  const { savedTrips, toggleSaveTrip } = useSiteShell()
  const [activeChip, setActiveChip] = useState(0)

  const chips = ['All', 'Thrill', 'Culture', 'Relax', 'Family']

  return (
    <div style={{ display: 'grid', gap: '28px' }}>
      <div>
        <p className="eyebrow" style={{ marginBottom: '12px' }}>
          Filter chips
        </p>
        <div className="chips" role="tablist" aria-label="Styleguide sample filter">
          {chips.map((chip, index) => (
            <button
              key={chip}
              type="button"
              role="tab"
              aria-selected={activeChip === index}
              className={activeChip === index ? 'on' : undefined}
              onClick={() => setActiveChip(index)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow" style={{ marginBottom: '12px' }}>
          Quote panel, Toast &amp; My Trip triggers
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-green"
            data-quote="Styleguide: 7-Day UAE Highlights"
          >
            Open Quote Panel <ArrowIcon />
          </button>
          <button
            type="button"
            className="btn btn-sun"
            data-toast="Sample toast notification from the styleguide."
          >
            Trigger Toast
          </button>
          {SAMPLE_TRIPS.map((trip) => {
            const saved = savedTrips.includes(trip)
            return (
              <button
                key={trip}
                type="button"
                className="btn btn-line"
                aria-pressed={saved}
                onClick={() => toggleSaveTrip(trip)}
              >
                {saved ? `Saved: ${trip}` : `Save "${trip}"`}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
