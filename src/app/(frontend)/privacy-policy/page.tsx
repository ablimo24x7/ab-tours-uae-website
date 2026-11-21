import React from 'react'
import { PlainHero } from '@/components/PlainHero'

export default function PrivacyPolicyPage() {
  return (
    <>
      <PlainHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How AB Tours UAE collects and handles enquiry details."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="pad">
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <div className="rv">
            <p style={{ color: '#3C4A66', fontSize: '16.5px', marginBottom: '18px' }}>
              [Privacy policy content from the CMS — explaining what enquiry data is
              collected, how it is used to prepare travel proposals, and how visitors can
              contact AB Tours UAE regarding their data.]
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
