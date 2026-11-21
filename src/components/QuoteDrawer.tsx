'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Ornament } from './Ornament'
import { useSiteShell } from './SiteShellContext'
import type { QuoteDrawerProps } from './types'

export function QuoteDrawer({ replyTimeText = '[response time]' }: QuoteDrawerProps) {
  const {
    drawerOpen,
    drawerItem,
    setDrawerItem,
    drawerSent,
    closeDrawer,
    markDrawerSent,
  } = useSiteShell()

  const drawerRef = useRef<HTMLElement>(null)
  const itemInputRef = useRef<HTMLInputElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [travelDates, setTravelDates] = useState('')
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!drawerOpen) return

    const focusTimer = setTimeout(() => {
      if (drawerSent) {
        closeButtonRef.current?.focus()
      } else {
        itemInputRef.current?.focus()
      }
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDrawer()
        return
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null)

        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [drawerOpen, drawerSent, closeDrawer])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = {
      interest: drawerItem,
      fullName,
      email,
      phone,
      travelDates,
      adults: Number(adults),
      children: Number(children),
      message,
      sourcePath: typeof window !== 'undefined' ? window.location.pathname : '',
    }
    console.log('[QuoteDrawer] submit:', payload)
    markDrawerSent()
    setFullName('')
    setEmail('')
    setPhone('')
    setTravelDates('')
    setAdults('2')
    setChildren('0')
    setMessage('')
  }

  return (
    <>
      <div
        className={`drawer-bg${drawerOpen ? ' open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`drawer${drawerOpen ? ' open' : ''}${drawerSent ? ' sent' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dTitle"
        aria-hidden={!drawerOpen}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="x"
          onClick={closeDrawer}
          aria-label="Close quote panel"
        >
          ×
        </button>

        <div className="hd">
          <Ornament />
          <h2 id="dTitle">Request a quote</h2>
        </div>

        <p className="about">
          {drawerItem
            ? `About: ${drawerItem}. A travel designer will reply with a proposal.`
            : 'Tell us a little and a travel designer will reply with a proposal.'}
        </p>

        <form onSubmit={handleSubmit}>
          <label className="field">
            I’m interested in
            <input
              ref={itemInputRef}
              value={drawerItem}
              onChange={(e) => setDrawerItem(e.target.value)}
            />
          </label>
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
          </div>
          <div className="grid2">
            <label className="field">
              Phone / WhatsApp
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="field">
              Travel dates
              <input
                placeholder="Approximate is fine"
                value={travelDates}
                onChange={(e) => setTravelDates(e.target.value)}
              />
            </label>
          </div>
          <div className="grid2">
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
          </div>
          <label className="field">
            Anything else?
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button
            className="btn btn-green"
            type="submit"
            style={{ justifyContent: 'center' }}
          >
            Send my request
          </button>
          <p style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
            In the live site every request is saved in the CMS as a lead, with the page it
            came from.
          </p>
        </form>

        <div className="done">
          <svg className="check" viewBox="0 0 90 90" aria-hidden="true">
            <circle cx="45" cy="45" r="40" />
            <path d="M27 46l12 12 24-26" />
          </svg>
          <h2>Your trip is in good hands</h2>
          <p className="about" style={{ display: 'block' }}>
            Our team will reply within {replyTimeText}.
          </p>
          <button type="button" className="btn btn-line" onClick={closeDrawer}>
            Close
          </button>
        </div>
      </aside>
    </>
  )
}
