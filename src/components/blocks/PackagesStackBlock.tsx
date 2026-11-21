import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import type { PackageItem } from '@/content/types'

export interface PackagesStackBlockProps {
  eyebrow: string
  heading: string
  intro: string
  linkLabel: string
  linkHref: string
  packages: PackageItem[]
}

export function PackagesStackBlock({
  eyebrow,
  heading,
  intro,
  linkLabel,
  linkHref,
  packages,
}: PackagesStackBlockProps) {
  return (
    <section className="pad">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
          <Link className="link" href={linkHref}>
            {linkLabel} <ArrowIcon />
          </Link>
        </div>

        {packages.map((pkg, idx) => (
          <Link
            key={pkg.slug}
            className="spanel"
            style={{ '--k': idx } as React.CSSProperties}
            href={`/uae-experiences/multi-city-packages/${pkg.slug}`}
          >
            <Image
              src={pkg.cardImage.url}
              alt={pkg.cardImage.alt}
              fill
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ objectFit: 'cover' }}
            />
            <div className="t">
              <small>
                {pkg.days} days · {pkg.style}
              </small>
              <b>{pkg.title}</b>
              <p>
                {pkg.route.join(' → ')} · {pkg.intro}
              </p>
            </div>
            <span className="go">
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
