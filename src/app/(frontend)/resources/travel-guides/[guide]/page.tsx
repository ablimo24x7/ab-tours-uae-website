import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { EnquiryBand } from '@/components/EnquiryBand'
import { Ornament } from '@/components/Ornament'
import { PageHero } from '@/components/PageHero'
import { getGuide, getGuides } from '@/content'

export function generateStaticParams() {
  return getGuides().map((g) => ({ guide: g.slug }))
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ guide: string }>
}) {
  const { guide: slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const related = getGuides().filter((g) => g.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        image={guide.cardImage}
        eyebrow={guide.tag}
        title={guide.title}
        lead={guide.intro}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Travel Guides', href: '/resources/travel-guides' },
          { label: guide.title },
        ]}
      />

      <section className="pad">
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <div className="rv">
            <Ornament />
            <p style={{ fontSize: '19px', color: 'var(--navy)', marginTop: '20px', marginBottom: '24px' }}>
              {guide.intro}
            </p>
            {guide.bodyParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                style={{ color: '#3C4A66', fontSize: '16.5px', marginBottom: '18px' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="pad-s bg-sand">
          <div className="wrap">
            <div className="head rv">
              <h2>More travel guides</h2>
              <Link className="link" href="/resources/travel-guides">
                All guides <ArrowIcon />
              </Link>
            </div>
            <div className="cards">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  className="card rv"
                  href={`/resources/travel-guides/${item.slug}`}
                >
                  <div className="ph wide" style={{ position: 'relative' }}>
                    <Image
                      src={item.cardImage.url}
                      alt={item.cardImage.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="tag">{item.tag}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <span className="link">
                    Read the guide <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <EnquiryBand
        title="Planning a trip to the UAE?"
        description="Tell us your dates and interests and our travel designers will prepare a proposal."
        defaultInterest={guide.title}
      />
    </>
  )
}
