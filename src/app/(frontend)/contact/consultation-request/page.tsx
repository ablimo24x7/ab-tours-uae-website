import React from 'react'
import { ConsultationForm } from '@/components/ContactForms'
import { PlainHero } from '@/components/PlainHero'
import { getSiteData } from '@/content'

export default function ConsultationRequestPage() {
  const { consultationFormOptions } = getSiteData()

  return (
    <>
      <PlainHero
        eyebrow="Contact & Enquiries"
        title="Book a Consultation"
        lead="A 20-minute conversation with a travel designer — by phone, WhatsApp or video."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
          { label: 'Consultation Requests' },
        ]}
      />

      <ConsultationForm
        topics={consultationFormOptions.topics}
        channels={consultationFormOptions.channels}
        times={consultationFormOptions.times}
      />
    </>
  )
}
