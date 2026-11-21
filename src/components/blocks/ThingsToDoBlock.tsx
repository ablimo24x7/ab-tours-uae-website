'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { SaveHeartButton } from '@/components/SaveHeartButton'
import type { DayTripItem, MoodFilterItem } from '@/content/types'

export interface ThingsToDoBlockProps {
  eyebrow: string
  heading: string
  intro: string
  linkLabel: string
  linkHref: string
  allLabel: string
  moods: MoodFilterItem[]
  dayTrips: DayTripItem[]
}

const MOOD_ICONS: Record<MoodFilterItem['iconKey'], React.ReactNode> = {
  thrill: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  culture: <path d="M4 20h16M6 20V10l6-5 6 5v10M10 20v-5h4v5" />,
  relax: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2 21c0-4 3-7 6-7s6 3 6 7M13 21c0-3 2-5 4-5s4 2 4 5" />
    </>
  ),
  city: <path d="M4 21V9h4v12M10 21V3h4v18M16 21v-8h4v8" />,
}

const PIN_ICON = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export function ThingsToDoBlock({
  eyebrow,
  heading,
  intro,
  linkLabel,
  linkHref,
  allLabel,
  moods,
  dayTrips,
}: ThingsToDoBlockProps) {
  const [selectedMood, setSelectedMood] = useState<number>(-1)
  const [swapKey, setSwapKey] = useState(0)

  const selectMood = (idx: number) => {
    setSelectedMood(idx)
    setSwapKey((k) => k + 1)
  }

  const cards =
    selectedMood < 0
      ? dayTrips.map((t) => ({
          key: t.slug,
          image: t.cardImage,
          kind: 'Day trip',
          title: t.title,
          emirateName: t.emirateName,
          avail: t.availabilityLabel,
          text: t.shortDescription,
          href: `/uae-experiences/day-trips/${t.slug}`,
          quote: `Day trip: ${t.title}`,
        }))
      : moods[selectedMood].items.map((item) => ({
          key: `${moods[selectedMood].name}-${item.title}`,
          image: item.image,
          kind: moods[selectedMood].name,
          title: item.title,
          emirateName: item.emirateName,
          avail: 'Arranged by our team',
          text: undefined,
          href: item.href,
          quote: item.title,
        }))

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

        <div className="chips rv" role="tablist" aria-label="Travel moods">
          <button
            type="button"
            role="tab"
            aria-selected={selectedMood < 0}
            className={selectedMood < 0 ? 'on' : undefined}
            onClick={() => selectMood(-1)}
          >
            {allLabel}
          </button>
          {moods.map((mood, idx) => (
            <button
              key={mood.name}
              type="button"
              role="tab"
              aria-selected={selectedMood === idx}
              className={selectedMood === idx ? 'on' : undefined}
              onClick={() => selectMood(idx)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                {MOOD_ICONS[mood.iconKey]}
              </svg>
              {mood.name}
            </button>
          ))}
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
                {card.emirateName ? (
                  <span className="loc">
                    {PIN_ICON}
                    {card.emirateName}
                  </span>
                ) : null}
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
