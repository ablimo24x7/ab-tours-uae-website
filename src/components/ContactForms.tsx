'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Ornament } from '@/components/Ornament'
import { useSiteShell } from '@/components/SiteShellContext'
import type { MediaAsset } from '@/components/types'

export function ThreeStepQuoteForm({
  options,
}: {
  options: Array<{ label: string; image: MediaAsset }>
}) {
  const { toast } = useSiteShell()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [startDate, setStartDate] = useState('')
  const [nights, setNights] = useState('5')
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [whereTo, setWhereTo] = useState('')
  const [budget, setBudget] = useState('Budget')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredContact, setPreferredContact] = useState('WhatsApp')
  const [notes, setNotes] = useState('')

  const goStep = (n: number) => {
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleOption = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('[ThreeStepQuoteForm] submit:', {
      selected,
      startDate,
      nights: Number(nights),
      adults: Number(adults),
      children: Number(children),
      whereTo,
      budget,
      fullName,
      email,
      phone,
      preferredContact,
      notes,
    })
    toast('Thank you — in the live site this becomes a lead in the CMS and our team replies.')
    setSelected([])
    setStartDate('')
    setWhereTo('')
    setFullName('')
    setEmail('')
    setPhone('')
    setNotes('')
    goStep(0)
  }

  return (
    <section className="pad" style={{ paddingTop: '190px' }}>
      <div className="wrap planner">
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--muted)' }}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Contact', href: '/contact' },
                { label: 'Request a Quote' },
              ]}
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Ornament center />
          </div>
          <h1
            className="serif"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: '16px' }}
          >
            Request a Quote
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '10px' }}>
            Three short steps. A travel designer replies with a tailored proposal.
          </p>
        </div>

        <div className="pbar" aria-hidden="true">
          <span className={step >= 0 ? 'on' : undefined} />
          <span className={step >= 1 ? 'on' : undefined} />
          <span className={step >= 2 ? 'on' : undefined} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`pstep${step === 0 ? ' on' : ''}`}>
            <h2>What are you planning?</h2>
            <div className="pick">
              {options.map((opt) => (
                <label key={opt.label}>
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.label)}
                    onChange={() => toggleOption(opt.label)}
                  />
                  <span className="opt">
                    <Image
                      src={opt.image.url}
                      alt={opt.image.alt}
                      width={500}
                      height={312}
                      style={{ objectFit: 'cover' }}
                    />
                    <b>{opt.label}</b>
                  </span>
                </label>
              ))}
            </div>
            <div className="pnav">
              <span />
              <button type="button" className="btn btn-green" onClick={() => goStep(1)}>
                Next <ArrowIcon />
              </button>
            </div>
          </div>

          <div className={`pstep${step === 1 ? ' on' : ''}`}>
            <h2>When and who?</h2>
            <div className="grid2">
              <label className="field">
                Start date
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label className="field">
                Nights
                <input
                  type="number"
                  min={1}
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
                />
              </label>
              <label className="field">
                Adults
                <input
                  type="number"
                  min={1}
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
              </label>
              <label className="field">
                Children
                <input
                  type="number"
                  min={0}
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                />
              </label>
              <label className="field">
                Where to?
                <input
                  placeholder="Emirates or countries"
                  value={whereTo}
                  onChange={(e) => setWhereTo(e.target.value)}
                />
              </label>
              <label className="field">
                Budget level
                <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option>Budget</option>
                  <option>Midrange</option>
                  <option>Premium</option>
                </select>
              </label>
            </div>
            <div className="pnav">
              <button type="button" className="btn btn-line" onClick={() => goStep(0)}>
                Back
              </button>
              <button type="button" className="btn btn-green" onClick={() => goStep(2)}>
                Next <ArrowIcon />
              </button>
            </div>
          </div>

          <div className={`pstep${step === 2 ? ' on' : ''}`}>
            <h2>Where should we reply?</h2>
            <div className="grid2">
              <label className="field">
                Full name
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
              <label className="field">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="field">
                Phone / WhatsApp
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="field">
                Preferred contact
                <select
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value)}
                >
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>Phone call</option>
                </select>
              </label>
              <label className="field full">
                Anything else?
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </div>
            <div className="pnav">
              <button type="button" className="btn btn-line" onClick={() => goStep(1)}>
                Back
              </button>
              <button type="submit" className="btn btn-green">
                Send my request <ArrowIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export function ConsultationForm({
  topics,
  channels,
  times,
}: {
  topics: string[]
  channels: string[]
  times: string[]
}) {
  const { toast } = useSiteShell()
  const [topic, setTopic] = useState(topics[0] || '')
  const [channel, setChannel] = useState(channels[0] || '')
  const [date, setDate] = useState('')
  const [time, setTime] = useState(times[0] || '')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('[ConsultationForm] submit:', {
      topic,
      channel,
      date,
      time,
      fullName,
      phone,
      notes,
    })
    toast('Thank you — in the live site this becomes a lead in the CMS and our team replies.')
    setDate('')
    setFullName('')
    setPhone('')
    setNotes('')
  }

  return (
    <section className="pad-s">
      <div className="wrap" style={{ maxWidth: '880px' }}>
        <form className="grid2" onSubmit={handleSubmit}>
          <label className="field">
            Topic
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="field">
            How should we talk?
            <select value={channel} onChange={(e) => setChannel(e.target.value)}>
              {channels.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Preferred date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="field">
            Preferred time (UAE)
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              {times.map((tm) => (
                <option key={tm}>{tm}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Full name
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <label className="field">
            Phone / WhatsApp
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label className="field full">
            What would you like to discuss?
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <div className="full">
            <button className="btn btn-green" type="submit">
              Request my consultation <ArrowIcon />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export function PartnerEnquiryForm({
  partnerTypes,
  interests,
}: {
  partnerTypes: string[]
  interests: string[]
}) {
  const { toast } = useSiteShell()
  const [partnerType, setPartnerType] = useState(partnerTypes[0] || '')
  const [company, setCompany] = useState('')
  const [country, setCountry] = useState('')
  const [licence, setLicence] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState(interests[0] || '')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('[PartnerEnquiryForm] submit:', {
      partnerType,
      company,
      country,
      licence,
      contactName,
      email,
      interest,
      notes,
    })
    toast('Thank you — in the live site this becomes a lead in the CMS and our team replies.')
    setCompany('')
    setCountry('')
    setLicence('')
    setContactName('')
    setEmail('')
    setNotes('')
  }

  return (
    <section className="pad-s">
      <div className="wrap" style={{ maxWidth: '880px' }}>
        <form className="grid2" onSubmit={handleSubmit}>
          <label className="field">
            I am a…
            <select value={partnerType} onChange={(e) => setPartnerType(e.target.value)}>
              {partnerTypes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Company name
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
          <label className="field">
            Country
            <input value={country} onChange={(e) => setCountry(e.target.value)} />
          </label>
          <label className="field">
            Licence / registration no.
            <input value={licence} onChange={(e) => setLicence(e.target.value)} />
          </label>
          <label className="field">
            Contact name
            <input
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </label>
          <label className="field">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="field full">
            Interested in
            <select value={interest} onChange={(e) => setInterest(e.target.value)}>
              {interests.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>
          <label className="field full">
            Tell us about your business
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <div className="full">
            <button className="btn btn-green" type="submit">
              Send partner enquiry <ArrowIcon />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
