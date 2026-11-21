import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { PlainHero } from '@/components/PlainHero'
import { getSiteData } from '@/content'

export default function NotFound() {
  const { notFound } = getSiteData()

  return (
    <>
      <PlainHero
        title={notFound.title}
        lead={notFound.lead}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Not found' }]}
      />
      <section className="pad-s">
        <div className="wrap">
          <div className="cards four">
            <Link className="box rv" href="/">
              <span className="eyebrow">Start</span>
              <h3>Homepage</h3>
              <p>Return to the main AB Tours UAE showcase.</p>
              <span className="link" style={{ marginTop: 'auto' }}>
                Go home <ArrowIcon />
              </span>
            </Link>
            <Link className="box rv" href="/uae-experiences">
              <span className="eyebrow">Section</span>
              <h3>UAE Experiences</h3>
              <p>Emirates, day trips, packages and tickets.</p>
              <span className="link" style={{ marginTop: 'auto' }}>
                Explore <ArrowIcon />
              </span>
            </Link>
            <Link className="box rv" href="/international-holidays">
              <span className="eyebrow">Section</span>
              <h3>International Holidays</h3>
              <p>Holidays beyond the UAE for residents and families.</p>
              <span className="link" style={{ marginTop: 'auto' }}>
                Explore <ArrowIcon />
              </span>
            </Link>
            <Link className="box rv" href="/b2b-corporate">
              <span className="eyebrow">Section</span>
              <h3>B2B &amp; Corporate</h3>
              <p>DMC, transport, MICE, visas and corporate travel.</p>
              <span className="link" style={{ marginTop: 'auto' }}>
                Explore <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
