import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { AdventuresRail } from '@/components/AdventuresRail'
import { ArrowIcon } from '@/components/ArrowIcon'
import { EnquiryBand } from '@/components/EnquiryBand'
import { FAQList } from '@/components/FAQList'
import { Ornament } from '@/components/Ornament'
import { PackageRows } from '@/components/PackageRows'
import { PageHero } from '@/components/PageHero'
import {
  getAdventures,
  getDayTrips,
  getEmirate,
  getEmirates,
  getPackages,
  getTickets,
} from '@/content'

export function generateStaticParams() {
  return getEmirates().map((e) => ({ emirate: e.slug }))
}

export default async function EmiratePage({
  params,
}: {
  params: Promise<{ emirate: string }>
}) {
  const { emirate: slug } = await params
  const emirate = getEmirate(slug)
  if (!emirate) notFound()

  const trips = getDayTrips({ emirate: slug })
  const packages = getPackages({ emirateName: emirate.name })
  const tickets = getTickets({ emirateName: emirate.name })
  const adventures = getAdventures({ emirate: slug })

  return (
    <>
      <PageHero
        image={emirate.heroImage}
        videoUrl={emirate.videoUrl}
        eyebrow="UAE Experiences"
        title={emirate.name}
        lead={emirate.tagline}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'UAE Experiences', href: '/uae-experiences' },
          { label: emirate.name },
        ]}
        ctas={[
          {
            label: 'Request a quote',
            quoteItem: `${emirate.name} experience`,
            variant: 'green',
          },
          {
            label: 'Book a consultation',
            href: '/contact/consultation-request',
            variant: 'ghost',
          },
        ]}
      />

      <nav className="jump" aria-label="On this page">
        <div className="wrap">
          <a href="#story">The story</a>
          {trips.length > 0 ? <a href="#trips">Day trips</a> : null}
          {packages.length > 0 ? <a href="#packages">Packages</a> : null}
          {tickets.length > 0 ? <a href="#tickets">Tickets</a> : null}
          <a href="#know">Good to know</a>
          <a href="#faq">FAQs</a>
        </div>
      </nav>

      <section className="pad" id="story">
        <div className="wrap editorial">
          <div className="rv">
            <Ornament />
            <h2>{emirate.name}, our way</h2>
            {emirate.storyParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          <div className="img rv" style={{ position: 'relative' }}>
            <Image
              src={emirate.secondaryImage.url}
              alt={emirate.secondaryImage.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <AdventuresRail
        heading={`Thrills in ${emirate.name}`}
        items={adventures}
      />

      {trips.length > 0 ? (
        <section className="pad-s bg-sand" id="trips" style={{ padding: '100px 0' }}>
          <div className="wrap">
            <div className="head rv">
              <h2>Day trips in {emirate.name}</h2>
              <Link className="link" href="/uae-experiences/day-trips">
                All day trips <ArrowIcon />
              </Link>
            </div>
            <div className="cards">
              {trips.map((trip) => (
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
                      <span className="tag">Day trip</span>
                    </div>
                  </Link>
                  <span className="meta">{emirate.name}</span>
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
      ) : null}

      {packages.length > 0 ? (
        <section className="pad" id="packages">
          <div className="wrap">
            <div className="head rv">
              <h2>Packages including {emirate.name}</h2>
            </div>
            <PackageRows packages={packages.slice(0, 2)} />
          </div>
        </section>
      ) : null}

      {tickets.length > 0 ? (
        <section className="pad-s" id="tickets">
          <div className="wrap">
            <div className="head rv">
              <h2>Attraction tickets in {emirate.name}</h2>
              <Link className="link" href="/uae-experiences/attraction-tickets">
                All tickets <ArrowIcon />
              </Link>
            </div>
            <div className="cards">
              {tickets.slice(0, 3).map((ticket) => (
                <div key={ticket.slug} className="card rv">
                  <div className="ph wide" style={{ position: 'relative' }}>
                    <Image
                      src={ticket.cardImage.url}
                      alt={ticket.cardImage.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="tag">Tickets</span>
                  </div>
                  <span className="meta">{ticket.emirate}</span>
                  <h3>{ticket.title}</h3>
                  <div className="actions">
                    <button
                      type="button"
                      className="link"
                      data-quote={`Tickets: ${ticket.title}`}
                    >
                      Request a quote <ArrowIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pad-s" id="know">
        <div className="wrap">
          <div className="facts rv">
            <div>
              <span>Best time</span>
              <b>{emirate.bestTime}</b>
            </div>
            <div>
              <span>Getting there</span>
              <b>{emirate.gettingThere}</b>
            </div>
            <div>
              <span>Visa</span>
              <b>{emirate.visaNote}</b>
            </div>
            <div>
              <span>Transfers</span>
              <b>{emirate.transfersNote}</b>
            </div>
          </div>
        </div>
      </section>

      <div id="faq">
        <FAQList title={`${emirate.name} — your questions`} items={emirate.faqs} />
      </div>

      <EnquiryBand
        title={`Plan your ${emirate.name} experience`}
        description="A travel designer replies with ideas and a quote."
        defaultInterest={emirate.name}
      />
    </>
  )
}
