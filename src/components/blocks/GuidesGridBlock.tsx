import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { SaveHeartButton } from '@/components/SaveHeartButton'
import type { GuideItem } from '@/content/types'

export interface GuidesGridBlockProps {
  eyebrow: string
  heading: string
  linkLabel: string
  linkHref: string
  guides: GuideItem[]
}

export function GuidesGridBlock({
  eyebrow,
  heading,
  linkLabel,
  linkHref,
  guides,
}: GuidesGridBlockProps) {
  return (
    <section className="pad-s">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
          </div>
          <Link className="link" href={linkHref}>
            {linkLabel} <ArrowIcon />
          </Link>
        </div>

        <div className="trail">
          {guides.map((guide) => (
            <article key={guide.slug} className="tcard rv">
              <Link className="ph" href={`/resources/travel-guides/${guide.slug}`}>
                <Image
                  src={guide.cardImage.url}
                  alt={guide.cardImage.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 1060px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <SaveHeartButton itemName={`Guide: ${guide.title}`} />
              <div className="body">
                <span className="kind">{guide.tag}</span>
                <h3>
                  <Link href={`/resources/travel-guides/${guide.slug}`}>{guide.title}</Link>
                </h3>
                <div className="actions">
                  <Link className="link" href={`/resources/travel-guides/${guide.slug}`}>
                    Read the guide <ArrowIcon />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
