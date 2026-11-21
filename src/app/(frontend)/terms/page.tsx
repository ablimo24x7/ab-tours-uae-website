import React from 'react'
import { PlainHero } from '@/components/PlainHero'

export default function TermsPage() {
  return (
    <>
      <PlainHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lead="Website terms and enquiry conditions for AB Tours UAE."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
      />

      <section className="pad">
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <div className="rv">
            <p style={{ color: '#3C4A66', fontSize: '16.5px', marginBottom: '18px' }}>
              [Terms and conditions content from the CMS — covering enquiry proposals,
              pricing notes, and destination management services operated by AB Tours UAE,
              part of AB Group.]
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
