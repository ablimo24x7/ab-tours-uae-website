import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { PlainHero } from '@/components/PlainHero'
import { getSiteData } from '@/content'

export default function ContactPage() {
  const { contactDetails } = getSiteData()

  return (
    <>
      <PlainHero
        eyebrow="Contact & Enquiries"
        title="Let’s talk"
        lead="Choose the best way to start. Every request reaches a real person on our UAE team."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="pad-s">
        <div className="wrap">
          <div className="cta3">
            <Link
              className="rv"
              href="/contact/request-a-quote"
              style={{ background: 'var(--green)', color: '#fff' }}
            >
              <h3>Request a Quote</h3>
              <p>Tell us your plans and get a proposal.</p>
              <span className="link" style={{ color: '#fff' }}>
                Start <ArrowIcon />
              </span>
            </Link>
            <Link
              className="rv"
              href="/contact/consultation-request"
              style={{ background: 'var(--blue)', color: '#fff' }}
            >
              <h3>Book a Consultation</h3>
              <p>Speak to a travel designer.</p>
              <span className="link" style={{ color: '#fff' }}>
                Book <ArrowIcon />
              </span>
            </Link>
            <Link
              className="rv"
              href="/contact/partner-enquiries"
              style={{ background: 'var(--tint-blue)', color: 'var(--navy)' }}
            >
              <h3>Partner Enquiries</h3>
              <p>Agencies, suppliers and companies.</p>
              <span className="link">
                Enquire <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="facts rv" style={{ marginTop: '60px' }}>
            <div>
              <span>Office</span>
              <b>{contactDetails.office}</b>
            </div>
            <div>
              <span>Phone</span>
              <b>{contactDetails.phone}</b>
            </div>
            <div>
              <span>WhatsApp</span>
              <b>{contactDetails.whatsapp}</b>
            </div>
            <div>
              <span>Email</span>
              <b>{contactDetails.email}</b>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
