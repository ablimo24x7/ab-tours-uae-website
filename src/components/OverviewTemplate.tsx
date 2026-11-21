import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { PageHero } from '@/components/PageHero'
import type { StaticOverviewPage } from '@/content/types'

export function OverviewTemplate({ page }: { page: StaticOverviewPage }) {
  return (
    <>
      <PageHero
        image={page.heroImage}
        videoUrl={page.heroVideoUrl}
        title={page.title}
        lead={page.lead}
        crumbs={page.crumbs}
        ctas={page.ctas}
      />
      <section className="pad">
        <div className="wrap">
          <div className="cards">
            {page.cards.map((card) => (
              <Link key={card.href} className="box rv" href={card.href}>
                <span className="eyebrow">{card.eyebrow}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="link" style={{ marginTop: 'auto' }}>
                  Explore <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
