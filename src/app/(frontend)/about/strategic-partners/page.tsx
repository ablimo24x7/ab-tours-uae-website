import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { PlainHero } from '@/components/PlainHero'
import { getPartners } from '@/content'
import type { PartnerItem } from '@/content/types'

const GROUPS: PartnerItem['category'][] = [
  'Hotels & resorts',
  'Attractions',
  'Airlines & cruise lines',
]

export default function StrategicPartnersPage() {
  const partners = getPartners()

  return (
    <>
      <PlainHero
        eyebrow="About AB Tours UAE"
        title="Strategic Partners"
        lead="Hotels, attractions, airlines and suppliers we work with."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Strategic Partners' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          {GROUPS.map((group) => {
            const items = partners.filter((p) => p.category === group)
            return (
              <div key={group} className="rv" style={{ marginBottom: '50px' }}>
                <span className="eyebrow">{group}</span>
                <div className="logos">
                  {items.map((partner) => (
                    <span key={partner.id}>{partner.name}</span>
                  ))}
                </div>
              </div>
            )
          })}

          <Link className="btn btn-green" href="/contact/partner-enquiries">
            Become a partner <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  )
}
