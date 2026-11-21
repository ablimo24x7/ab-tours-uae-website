import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AdventuresRail } from '@/components/AdventuresRail'
import { ArrowIcon } from '@/components/ArrowIcon'
import { EnquiryBand } from '@/components/EnquiryBand'
import { PageHero } from '@/components/PageHero'
import { getAdventures, getDayTrips } from '@/content'
import { IMG, V, img } from '@/content/static/media'

export default function DayTripsPage() {
  const dayTrips = getDayTrips()
  const adventures = getAdventures()

  return (
    <>
      <PageHero
        image={img(IMG.buggy, 'UAE Day Trips', 1800)}
        videoUrl={V('35309672/14959728_1280_720_25fps')}
        eyebrow="UAE Experiences"
        title="Day Trips"
        lead="Full days out from Dubai with a guide and private transport — the easiest way to see more of the Emirates."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'UAE Experiences', href: '/uae-experiences' },
          { label: 'Day Trips' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <div className="cards">
            {dayTrips.map((trip) => (
              <div key={trip.slug} className="card rv">
                <Link
                  href={`/uae-experiences/day-trips/${trip.slug}`}
                  style={{ display: 'contents' }}
                >
                  <div className="ph wide" style={{ position: 'relative' }}>
                    <Image
                      src={trip.cardImage.url}
                      alt={trip.cardImage.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="tag">{trip.emirateName}</span>
                  </div>
                </Link>
                <span className="meta">{trip.availabilityLabel}</span>
                <h3>
                  <Link
                    href={`/uae-experiences/day-trips/${trip.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {trip.title}
                  </Link>
                </h3>
                <p>{trip.shortDescription}</p>
                <div className="actions">
                  <button
                    type="button"
                    className="link"
                    data-quote={`Day trip: ${trip.title}`}
                  >
                    Request a quote <ArrowIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdventuresRail heading="Go big. The UAE does." items={adventures} light />

      <EnquiryBand
        title="Planning several days out?"
        description="We can link day trips into one smooth plan."
        defaultInterest="Day trips"
      />
    </>
  )
}
