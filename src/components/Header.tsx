'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { ArrowIcon } from './ArrowIcon'
import { useSiteShell } from './SiteShellContext'
import type { HeaderProps } from './types'

export function Header({
  tagline,
  topLinks,
  logoPrimary,
  logoSecondary,
  logoSubtext,
  navGroups,
  ctaLabel,
  ctaHref,
}: HeaderProps) {
  const pathname = usePathname()
  const { savedTrips, openQuote } = useSiteShell()

  const [openKey, setOpenKey] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hasHero, setHasHero] = useState(false)

  const syncHeaderState = useCallback(() => {
    const heroExists = Boolean(document.querySelector('main .hero'))
    setHasHero(heroExists)
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(syncHeaderState)
    window.addEventListener('scroll', syncHeaderState, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('scroll', syncHeaderState)
    }
  }, [pathname, syncHeaderState])

  useEffect(() => {
    const handlePopState = () => {
      setOpenKey(null)
      setMobileOpen(false)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenKey(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isSolid = Boolean(openKey) || !hasHero || scrolled

  return (
    <>
      <header
        className={`site-header${isSolid ? ' solid' : ''}`}
        onMouseLeave={() => setOpenKey(null)}
      >
        <div className="topbar">
          <div className="wrap">
            <span>{tagline}</span>
            <nav aria-label="Top links">
              {topLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  lang={link.lang}
                  data-toast={link.toastMessage}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="wrap bar">
          <Link className="logo" href="/" aria-label="AB Tours UAE home">
            <b>
              <span>{logoPrimary}</span>
              <span>{logoSecondary}</span>
            </b>
            <small>{logoSubtext}</small>
          </Link>

          <nav className="mainnav" aria-label="Main">
            {navGroups.map((group) => {
              const isOpen = openKey === group.key
              const isActive = pathname?.startsWith(`/${group.key}`)
              return (
                <div
                  key={group.key}
                  className={`navitem${isOpen ? ' open' : ''}`}
                  onMouseEnter={() => setOpenKey(group.key)}
                >
                  <button
                    type="button"
                    className={isActive ? 'on' : undefined}
                    aria-expanded={isOpen}
                    onClick={() => setOpenKey(isOpen ? null : group.key)}
                  >
                    {group.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <div className="drop">
                    <div className="wrap">
                      <div className="intro">
                        <h3>{group.label}</h3>
                        <p>{group.intro}</p>
                        <p style={{ marginTop: '18px' }}>
                          <Link
                            className="link"
                            href={group.overviewHref}
                            onClick={() => setOpenKey(null)}
                          >
                            Overview <ArrowIcon />
                          </Link>
                        </p>
                      </div>

                      <ul>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={() => setOpenKey(null)}>
                              <b>{item.title}</b>
                              <span>{item.description}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <Link
                        className="feat"
                        href={group.overviewHref}
                        onClick={() => setOpenKey(null)}
                      >
                        <Image
                          src={group.featureImage.url}
                          alt={group.featureImage.alt}
                          width={700}
                          height={480}
                          style={{ objectFit: 'cover' }}
                        />
                        <span>{group.label}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          <div className="bar-actions">
            <button
              type="button"
              className={`mytrip${savedTrips.length > 0 ? ' show' : ''}`}
              onClick={() => openQuote(`My trip: ${savedTrips.join(', ')}`)}
            >
              My trip <b>{savedTrips.length}</b>
            </button>
            <Link className="btn btn-green" href={ctaHref}>
              {ctaLabel}
            </Link>
            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`menu${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
        <button
          type="button"
          className="menu-close"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          ×
        </button>
        <div className="inner">
          {navGroups.map((group) => (
            <details key={group.key}>
              <summary>{group.label}</summary>
              <Link href={group.overviewHref} onClick={() => setMobileOpen(false)}>
                Overview
              </Link>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </details>
          ))}
          <p style={{ marginTop: '30px' }}>
            <Link
              className="btn btn-green"
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
            >
              {ctaLabel}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
