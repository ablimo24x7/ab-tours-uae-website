'use client'

import React, { useState } from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { useSiteShell } from '@/components/SiteShellContext'

export interface PlanBarBlockProps {
  exploreLabel: string
  datesLabel: string
  submitLabel: string
  dateOptions: string[]
  exploreGroups: Array<{
    groupLabel: string
    options: string[]
  }>
}

export function PlanBarBlock({
  exploreLabel,
  datesLabel,
  submitLabel,
  dateOptions,
  exploreGroups,
}: PlanBarBlockProps) {
  const { openQuote } = useSiteShell()
  const [what, setWhat] = useState('Show me everything')
  const [when, setWhen] = useState(dateOptions[0] || 'Flexible')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    openQuote(`${what} · ${when}`)
  }

  return (
    <section className="cplan">
      <div className="wrap">
        <form aria-label="Start planning" onSubmit={handleSubmit}>
          <label>
            {exploreLabel}
            <select value={what} onChange={(e) => setWhat(e.target.value)}>
              <option value="Show me everything">Show me everything</option>
              {exploreGroups.map((group) => (
                <optgroup key={group.groupLabel} label={group.groupLabel}>
                  {group.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label>
            {datesLabel}
            <select value={when} onChange={(e) => setWhen(e.target.value)}>
              {dateOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>

          <button className="btn btn-green" type="submit">
            {submitLabel} <ArrowIcon />
          </button>
        </form>
      </div>
    </section>
  )
}
