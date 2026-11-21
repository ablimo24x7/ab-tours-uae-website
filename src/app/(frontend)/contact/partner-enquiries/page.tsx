import React from 'react'
import { PartnerEnquiryForm } from '@/components/ContactForms'
import { PlainHero } from '@/components/PlainHero'
import { getSiteData } from '@/content'

export default function PartnerEnquiriesPage() {
  const { partnerFormOptions } = getSiteData()

  return (
    <>
      <PlainHero
        eyebrow="Contact & Enquiries"
        title="Partner Enquiries"
        lead="For travel agencies, tour operators, suppliers and corporate partners."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
          { label: 'Partner Enquiries' },
        ]}
      />

      <PartnerEnquiryForm
        partnerTypes={partnerFormOptions.partnerTypes}
        interests={partnerFormOptions.interests}
      />
    </>
  )
}
