import React from 'react'
import { EnquiryBand } from '@/components/EnquiryBand'
import { PageHero } from '@/components/PageHero'
import { IMG, img } from '@/content/static/media'

const BESPOKE_STEPS = [
  { title: 'Consultation', text: 'A conversation about what you love.' },
  { title: 'First draft', text: 'A route, hotels and experiences.' },
  { title: 'Refine', text: 'We adjust until it feels right.' },
  { title: 'Travel', text: 'Every detail arranged and supported.' },
]

export default function BespokeItinerariesPage() {
  return (
    <>
      <PageHero
        image={img(IMG.map, 'Bespoke Itineraries', 1800)}
        eyebrow="International Outbound Holidays"
        title="Bespoke Itineraries"
        lead="A holiday designed from a blank page — around your dates, interests and budget."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'International Holidays', href: '/international-holidays' },
          { label: 'Bespoke Itineraries' },
        ]}
        ctas={[
          {
            label: 'Book a consultation',
            href: '/contact/consultation-request',
            variant: 'green',
          },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <div className="head rv">
            <h2>How a bespoke trip comes together</h2>
          </div>
          <div className="steps rv">
            {BESPOKE_STEPS.map((step) => (
              <div key={step.title}>
                <b>{step.title}</b>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryBand
        title="Start your bespoke itinerary"
        description="Share a few ideas and a travel designer will be in touch."
        defaultInterest="Bespoke itinerary"
      />
    </>
  )
}
