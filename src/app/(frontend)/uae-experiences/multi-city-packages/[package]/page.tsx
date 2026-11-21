import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { FAQList } from '@/components/FAQList'
import { Ornament } from '@/components/Ornament'
import { PackageQuoteAside } from '@/components/PackageQuoteAside'
import { PageHero } from '@/components/PageHero'
import { getPackage, getPackages } from '@/content'

export function generateStaticParams() {
  return getPackages().map((p) => ({ package: p.slug }))
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ package: string }>
}) {
  const { package: slug } = await params
  const pkg = getPackage(slug)
  if (!pkg) notFound()

  return (
    <>
      <PageHero
        image={pkg.cardImage}
        eyebrow={`${pkg.days} days · ${pkg.style}`}
        title={pkg.title}
        lead={pkg.intro}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'UAE Experiences', href: '/uae-experiences' },
          {
            label: 'Multi-City Packages',
            href: '/uae-experiences/multi-city-packages',
          },
          { label: pkg.title },
        ]}
      />

      <section className="pad">
        <div className="wrap detail">
          <div>
            <div className="rv">
              <Ornament />
              <div className="route" style={{ fontSize: '16px', marginTop: '22px' }}>
                {pkg.route.map((stop, idx) => (
                  <React.Fragment key={`${stop}-${idx}`}>
                    {idx > 0 ? <i aria-hidden="true" /> : null}
                    <span>{stop}</span>
                  </React.Fragment>
                ))}
              </div>
              <p style={{ fontSize: '18px', color: '#3C4A66', maxWidth: '680px' }}>
                {pkg.summary}
              </p>
            </div>

            <div className="timeline">
              {pkg.itinerary.map((day, idx) => (
                <div key={idx} className="day rv">
                  <span className="n">Day {idx + 1}</span>
                  <div>
                    <p className="place">{day.place}</p>
                    <h3>{day.title}</h3>
                    <p>{day.text}</p>
                    {day.image ? (
                      <div className="ph" style={{ position: 'relative' }}>
                        <Image
                          src={day.image.url}
                          alt={day.image.alt}
                          fill
                          sizes="(max-width: 980px) 100vw, 720px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="inc rv">
              <div style={{ background: 'var(--tint-green)' }}>
                <b>Included</b>
                <ul>
                  {pkg.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--sand)' }}>
                <b>Shaped around you</b>
                <ul>
                  {pkg.shapedAroundYou.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <PackageQuoteAside packageTitle={pkg.title} price={pkg.price} />
        </div>
      </section>

      <FAQList title="About this package" items={pkg.faqs} />
    </>
  )
}
