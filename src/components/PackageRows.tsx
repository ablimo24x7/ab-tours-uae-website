import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { PackageItem } from '@/content/types'
import { ArrowIcon } from './ArrowIcon'

export function PackageRows({ packages }: { packages: PackageItem[] }) {
  return (
    <>
      {packages.map((pkg) => (
        <Link
          key={pkg.slug}
          className="jrow rv"
          href={`/uae-experiences/multi-city-packages/${pkg.slug}`}
        >
          <div className="img" style={{ position: 'relative' }}>
            <Image
              src={pkg.cardImage.url}
              alt={pkg.cardImage.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <span className="eyebrow">
              {pkg.days} days · {pkg.style}
            </span>
            <h3>{pkg.title}</h3>
            <div className="route">
              {pkg.route.map((stop, idx) => (
                <React.Fragment key={`${stop}-${idx}`}>
                  {idx > 0 ? <i aria-hidden="true" /> : null}
                  <span>{stop}</span>
                </React.Fragment>
              ))}
            </div>
            <p style={{ color: '#3C4A66', marginBottom: '22px' }}>{pkg.intro}</p>
            <span className="link">
              See the itinerary <ArrowIcon />
            </span>
          </div>
        </Link>
      ))}
    </>
  )
}
