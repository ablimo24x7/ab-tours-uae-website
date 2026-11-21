'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowIcon } from './ArrowIcon'
import { Ornament } from './Ornament'
import { useSiteShell } from './SiteShellContext'
import type { EnquiryBandProps } from './types'

export function EnquiryBand({
  title,
  description,
  defaultInterest = '',
  consultationHref = '/contact/consultation-request',
  consultationLabel = 'Book a consultation',
}: EnquiryBandProps) {
  const { toast } = useSiteShell()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [dates, setDates] = useState('')
  const [interest, setInterest] = useState(defaultInterest)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('[EnquiryBand] submit:', { name, contact, dates, interest })
    toast('Thank you — in the live site this becomes a lead in the CMS and our team replies.')
    setName('')
    setContact('')
    setDates('')
  }

  return (
    <section className="pad-s">
      <div className="wrap">
        <div className="enquire rv">
          <div>
            <Ornament light />
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="field">
              Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="field">
              Email or WhatsApp
              <input
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>
            <label className="field">
              Travel dates
              <input
                placeholder="Approximate is fine"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </label>
            <label className="field">
              Interested in
              <input
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </label>
            <div
              className="full"
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                marginTop: '6px',
              }}
            >
              <button className="btn btn-green" type="submit">
                Send my request <ArrowIcon />
              </button>
              <Link className="btn btn-ghost" href={consultationHref}>
                {consultationLabel}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
