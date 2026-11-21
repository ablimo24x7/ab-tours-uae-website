'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useSiteShell } from '@/components/SiteShellContext'
import type { PriceInfo } from '@/content/types'
import { PriceDisplay } from './PriceDisplay'

export function PackageQuoteAside({
  packageTitle,
  price,
}: {
  packageTitle: string
  price: PriceInfo
}) {
  const { toast } = useSiteShell()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [dates, setDates] = useState('')
  const [travellers, setTravellers] = useState('2 adults')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('[PackageQuoteAside] submit:', {
      packageTitle,
      name,
      contact,
      dates,
      travellers,
    })
    toast('Thank you — in the live site this becomes a lead in the CMS and our team replies.')
    setName('')
    setContact('')
    setDates('')
  }

  return (
    <aside className="aside rv" aria-label="Request a quote">
      <h3>Request a quote</h3>
      <p className="note">
        <PriceDisplay price={price} />. We’ll tailor it and send a proposal.
      </p>
      <form onSubmit={handleSubmit}>
        <label className="field">
          Name
          <input required value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          Email or WhatsApp
          <input required value={contact} onChange={(e) => setContact(e.target.value)} />
        </label>
        <label className="field">
          Travel dates
          <input value={dates} onChange={(e) => setDates(e.target.value)} />
        </label>
        <label className="field">
          Travellers
          <input value={travellers} onChange={(e) => setTravellers(e.target.value)} />
        </label>
        <button className="btn btn-green" type="submit" style={{ justifyContent: 'center' }}>
          Send my request
        </button>
      </form>
      <p className="note" style={{ marginTop: '16px' }}>
        Prefer to talk?{' '}
        <Link className="link" href="/contact/consultation-request">
          Book a consultation
        </Link>
      </p>
    </aside>
  )
}
