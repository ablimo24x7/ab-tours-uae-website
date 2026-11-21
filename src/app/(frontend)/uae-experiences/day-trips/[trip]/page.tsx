import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { EnquiryBand } from '@/components/EnquiryBand'
import { FAQList } from '@/components/FAQList'
import { PageHero } from '@/components/PageHero'
import { PriceDisplay } from '@/components/PriceDisplay'
import { getDayTrip, getDayTrips } from '@/content'

export function generateStaticParams() {
  return getDayTrips().map((t) => ({ trip: t.slug }))
}

export default async function DayTripDetailPage({
  params,
}: {
  params: Promise<{ trip: string }>
}) {
  const { trip: slug } = await params
  const trip = getDayTrip(slug)
  if (!trip) notFound()

  return (
    <>
      <PageHero
        image={trip.cardImage}
        eyebrow={`${trip.emirateName} · Day Trip`}
        title={trip.title}
        lead={trip.shortDescription}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'UAE Experiences', href: '/uae-experiences' },
          { label: 'Day Trips', href: '/uae-experiences/day-trips' },
          { label: trip.title },
        ]}
        ctas={[
          {
            label: 'Request a quote',
            quoteItem: `Day trip: ${trip.title}`,
            variant: 'green',
          },
          {
            label: 'Book a consultation',
            href: '/contact/consultation-request',
            variant: 'ghost',
          },
        ]}
      />

      <section className="pad-s">
        <div className="wrap">
          <div className="facts rv">
            <div>
              <span>Duration &amp; transport</span>
              <b>{trip.durationAndTransport}</b>
            </div>
            <div>
              <span>Pickup</span>
              <b>{trip.pickupNote}</b>
            </div>
            <div>
              <span>Emirate</span>
              <b>{trip.emirateName}</b>
            </div>
            <div>
              <span>Price</span>
              <b>
                <PriceDisplay price={trip.price} />
              </b>
            </div>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="inc rv">
            <div style={{ background: 'var(--tint-green)' }}>
              <b>Highlights</b>
              <ul>
                {trip.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'var(--sand)' }}>
              <b>Included</b>
              <ul>
                {trip.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {trip.gallery.length > 0 ? (
        <section className="pad-s">
          <div className="wrap">
            <div className="cards">
              {trip.gallery.map((photo, idx) => (
                <div key={idx} className="card rv">
                  <div className="ph wide" style={{ position: 'relative' }}>
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {trip.faqs.length > 0 ? (
        <FAQList title="About this day trip" items={trip.faqs} />
      ) : null}

      <EnquiryBand
        title={`Plan ${trip.title}`}
        description="A travel designer replies with availability and a tailored quote."
        defaultInterest={`Day trip: ${trip.title}`}
      />
    </>
  )
}
