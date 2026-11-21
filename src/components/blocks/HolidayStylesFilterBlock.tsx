'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { SaveHeartButton } from '@/components/SaveHeartButton'
import type { DestinationItem, HolidayStyleItem, MediaAsset } from '@/content/types'

export interface HolidayStylesFilterBlockProps {
  eyebrow: string
  heading: string
  intro: string
  linkLabel: string
  linkHref: string
  allLabel: string
  styles: HolidayStyleItem[]
  destinations: DestinationItem[]
  bespokeCard: {
    title: string
    text: string
    avail: string
    href: string
    image: MediaAsset
  }
}

export function HolidayStylesFilterBlock({
  eyebrow,
  heading,
  intro,
  linkLabel,
  linkHref,
  allLabel,
  styles,
  destinations,
  bespokeCard,
}: HolidayStylesFilterBlockProps) {
  const [selected, setSelected] = useState<string>('all')
  const [swapKey, setSwapKey] = useState(0)

  const pick = (key: string) => {
    setSelected(key)
    setSwapKey((k) => k + 1)
  }

  let cards: Array<{
    key: string
    image: MediaAsset
    kind: string
    title: string
    loc?: string
    avail?: string
    text?: string
    href: string
    quote: string
  }>

  if (selected === 'all') {
    cards = [
      ...styles.map((s) => ({
        key: s.slug,
        image: s.heroImage,
        kind: 'Holiday style',
        title: s.title,
        avail: destinations
          .filter((d) => d.styleSlug === s.slug)
          .slice(0, 2)
          .map((d) => d.name)
          .join(' · '),
        text: s.lead,
        href: `/international-holidays/${s.slug}`,
        quote: s.title,
      })),
      {
        key: 'bespoke-itineraries',
        image: bespokeCard.image,
        kind: 'Holiday style',
        title: bespokeCard.title,
        avail: bespokeCard.avail,
        text: bespokeCard.text,
        href: bespokeCard.href,
        quote: bespokeCard.title,
      },
    ]
  } else if (selected === 'bespoke-itineraries') {
    cards = [
      {
        key: 'bespoke-itineraries',
        image: bespokeCard.image,
        kind: 'Bespoke',
        title: bespokeCard.title,
        avail: bespokeCard.avail,
        text: bespokeCard.text,
        href: bespokeCard.href,
        quote: bespokeCard.title,
      },
    ]
  } else {
    cards = destinations
      .filter((d) => d.styleSlug === selected)
      .map((d) => ({
        key: d.slug,
        image: d.cardImage,
        kind: d.styleTitle,
        title: d.name,
        loc: d.name,
        avail: d.cardNote,
        href: `/international-holidays/${d.styleSlug}`,
        quote: `${d.styleTitle}: ${d.name}`,
      }))
  }

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

        <div className="chips rv" role="tablist" aria-label="Holiday styles">
          <button
            type="button"
            role="tab"
            aria-selected={selected === 'all'}
            className={selected === 'all' ? 'on' : undefined}
            onClick={() => pick('all')}
          >
            {allLabel}
          </button>
          {styles.map((s) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={selected === s.slug}
              className={selected === s.slug ? 'on' : undefined}
              onClick={() => pick(s.slug)}
            >
              {s.title}
            </button>
          ))}
          <button
            type="button"
            role="tab"
            aria-selected={selected === 'bespoke-itineraries'}
            className={selected === 'bespoke-itineraries' ? 'on' : undefined}
            onClick={() => pick('bespoke-itineraries')}
          >
            {bespokeCard.title}
          </button>
        </div>

        <div key={swapKey} className="trail swap">
          {cards.map((card) => (
            <article key={card.key} className="tcard">
              <Link className="ph" href={card.href}>
                <Image
                  src={card.image.url}
                  alt={card.image.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 1060px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </Link>
              <SaveHeartButton itemName={card.title} />
              <div className="body">
                <span className="kind">{card.kind}</span>
                <h3>
                  <Link href={card.href}>{card.title}</Link>
                </h3>
                {card.avail ? <span className="avail">{card.avail}</span> : null}
                {card.text ? <p>{card.text}</p> : null}
                <div className="actions">
                  <button type="button" className="link" data-quote={card.quote}>
                    Request a quote <ArrowIcon />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
