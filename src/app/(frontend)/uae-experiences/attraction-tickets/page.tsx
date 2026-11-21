import Image from 'next/image'
import React from 'react'
import { AdventuresRail } from '@/components/AdventuresRail'
import { ArrowIcon } from '@/components/ArrowIcon'
import { PageHero } from '@/components/PageHero'
import { getAdventures, getTickets } from '@/content'
import { IMG, img } from '@/content/static/media'

export default function AttractionTicketsPage() {
  const tickets = getTickets()
  const adventures = getAdventures()

  return (
    <>
      <PageHero
        image={img(IMG.frame, 'Attraction Tickets', 1800)}
        eyebrow="UAE Experiences"
        title="Attraction Tickets"
        lead="Tickets for the UAE’s best-known attractions, arranged by our team — on their own or as part of your trip."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'UAE Experiences', href: '/uae-experiences' },
          { label: 'Attraction Tickets' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <div className="cards">
            {tickets.map((ticket) => (
              <div key={ticket.slug} className="card rv">
                <div className="ph wide" style={{ position: 'relative' }}>
                  <Image
                    src={ticket.cardImage.url}
                    alt={ticket.cardImage.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="tag">{ticket.emirate}</span>
                </div>
                <span className="meta">{ticket.metaLabel}</span>
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
          <p className="rv" style={{ color: 'var(--muted)', marginTop: '40px' }}>
            Ticket requests are confirmed by our team with dates, times and the best
            combination for your group.
          </p>
        </div>
      </section>

      <AdventuresRail heading="Go big. The UAE does." items={adventures} light />
    </>
  )
}
