import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import type { MediaAsset } from '@/content/types'

export interface SeasonCampaignBlockProps {
  tag: string
  headlinePrefix: string
  headlineHighlight: string
  text: string
  quickLinks: Array<{ label: string; href: string }>
  buttonLabel: string
  quoteItem: string
  backgroundImage: MediaAsset
  bridgeToDark: boolean
}

export function SeasonCampaignBlock({
  tag,
  headlinePrefix,
  headlineHighlight,
  text,
  quickLinks,
  buttonLabel,
  quoteItem,
  backgroundImage,
  bridgeToDark,
}: SeasonCampaignBlockProps) {
  return (
    <section className={`pad-s${bridgeToDark ? ' season-bridge' : ''}`}>
      <div className="wrap">
        <div className="cseason rv">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            sizes="(max-width: 1240px) 100vw, 1240px"
            style={{ objectFit: 'cover' }}
          />
          <div className="t">
            <span className="sun-tag">{tag}</span>
            <h2>
              {headlinePrefix} <em>{headlineHighlight}</em>
            </h2>
            <p>{text}</p>
            <div className="chips2">
              {quickLinks.map((ql) => (
                <Link key={ql.label} href={ql.href}>
                  {ql.label}
                </Link>
              ))}
            </div>
            <button type="button" className="btn btn-sun" data-quote={quoteItem}>
              {buttonLabel} <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
