import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { PlainHero } from '@/components/PlainHero'
import { getGuides } from '@/content'

export default function TravelGuidesListPage() {
  const guides = getGuides()

  return (
    <>
      <PlainHero
        eyebrow="Resources"
        title="Travel Guides"
        lead="Practical guides to plan with confidence."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Travel Guides' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <div className="cards">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                className="card rv"
                href={`/resources/travel-guides/${guide.slug}`}
              >
                <div className="ph wide" style={{ position: 'relative' }}>
                  <Image
                    src={guide.cardImage.url}
                    alt={guide.cardImage.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="tag">{guide.tag}</span>
                </div>
                <h3>{guide.title}</h3>
                <span className="link">
                  Read the guide <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
