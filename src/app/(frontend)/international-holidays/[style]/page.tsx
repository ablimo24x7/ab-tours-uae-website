import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { EnquiryBand } from '@/components/EnquiryBand'
import { PageHero } from '@/components/PageHero'
import {
  getDestinations,
  getHolidayStyle,
  getHolidayStyles,
} from '@/content'

export function generateStaticParams() {
  return getHolidayStyles().map((s) => ({ style: s.slug }))
}

export default async function HolidayStylePage({
  params,
}: {
  params: Promise<{ style: string }>
}) {
  const { style: slug } = await params
  const style = getHolidayStyle(slug)
  if (!style) notFound()

  const destinations = getDestinations({ styleSlug: slug })

  return (
    <>
      <PageHero
        image={style.heroImage}
        eyebrow="International Outbound Holidays"
        title={style.title}
        lead={style.lead}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'International Holidays', href: '/international-holidays' },
          { label: style.title },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <div className="cards">
            {destinations.map((dest) => (
              <div key={dest.slug} className="card rv">
                <div className="ph wide" style={{ position: 'relative' }}>
                  <Image
                    src={dest.cardImage.url}
                    alt={dest.cardImage.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="tag">{style.title}</span>
                </div>
                <span className="meta">{dest.cardNote}</span>
                <h3>{dest.name}</h3>
                <p>{dest.shortDescription}</p>
                <div className="actions">
                  <button
                    type="button"
                    className="link"
                    data-quote={`${style.title}: ${dest.name}`}
                  >
                    Request a quote <ArrowIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="rv" style={{ color: 'var(--muted)', marginTop: '40px' }}>
            {style.disclaimerNote}
          </p>
        </div>
      </section>

      <EnquiryBand
        title={`Ask about ${style.title.toLowerCase()}`}
        description="Tell us where and when; we’ll send options that fit your budget."
        defaultInterest={style.title}
      />
    </>
  )
}
