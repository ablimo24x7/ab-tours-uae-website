import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from './ArrowIcon'
import { Breadcrumbs } from './Breadcrumbs'
import { Ornament } from './Ornament'
import type { PageHeroProps } from './types'

export function PageHero({
  image,
  videoUrl,
  eyebrow,
  title,
  lead,
  crumbs,
  ctas,
}: PageHeroProps) {
  return (
    <section className="hero page-hero">
      <div className="slide on">
        {videoUrl ? (
          <video
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={image.url}
            src={videoUrl}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="hero-copy">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <div style={{ marginTop: '26px' }}>
            <Ornament light />
          </div>
          {eyebrow ? (
            <p className="eyebrow" style={{ color: '#DCE3EE', marginTop: '16px' }}>
              {eyebrow}
            </p>
          ) : null}
          <h1>{title}</h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {ctas && ctas.length > 0 ? (
            <div className="ctas">
              {ctas.map((cta) => {
                const variant = cta.variant || 'green'
                const className = `btn btn-${variant}`
                if (cta.quoteItem) {
                  return (
                    <button
                      key={cta.label}
                      type="button"
                      className={className}
                      data-quote={cta.quoteItem}
                    >
                      {cta.label} <ArrowIcon />
                    </button>
                  )
                }
                return (
                  <Link key={cta.label} className={className} href={cta.href || '#'}>
                    {cta.label} <ArrowIcon />
                  </Link>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
