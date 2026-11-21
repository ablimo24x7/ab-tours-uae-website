'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { SaveHeartButton } from '@/components/SaveHeartButton'
import type { EmirateItem } from '@/content/types'

export interface EmiratesRailBlockProps {
  eyebrow: string
  heading: string
  intro: string
  emirates: EmirateItem[]
}

function EmirateCard({ emirate }: { emirate: EmirateItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const playVideo = () => {
    const v = videoRef.current
    const card = cardRef.current
    if (!v || !card) return
    v.preload = 'auto'
    v.play()
      .then(() => card.classList.add('vplay'))
      .catch(() => {})
  }

  const pauseVideo = () => {
    const v = videoRef.current
    const card = cardRef.current
    if (!v || !card) return
    v.pause()
    card.classList.remove('vplay')
  }

  useEffect(() => {
    if (!emirate.videoUrl) return
    const card = cardRef.current
    const v = videoRef.current
    if (!card || !v) return

    const isTouch = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isTouch || reduced) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.7) {
            v.preload = 'auto'
            v.play()
              .then(() => card.classList.add('vplay'))
              .catch(() => {})
          } else {
            v.pause()
            card.classList.remove('vplay')
          }
        })
      },
      { threshold: [0, 0.7] },
    )
    io.observe(card)
    return () => io.disconnect()
  }, [emirate.videoUrl])

  return (
    <div
      ref={cardRef}
      className="em-card"
      onMouseEnter={emirate.videoUrl ? playVideo : undefined}
      onMouseLeave={emirate.videoUrl ? pauseVideo : undefined}
      onFocus={emirate.videoUrl ? playVideo : undefined}
      onBlur={emirate.videoUrl ? pauseVideo : undefined}
    >
      {emirate.videoUrl ? (
        <>
          <video ref={videoRef} muted loop playsInline preload="none" src={emirate.videoUrl} />
          <span className="vchip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4l13 8-13 8z" />
            </svg>
            Hover to play
          </span>
        </>
      ) : null}
      <Image
        src={emirate.heroImage.url}
        alt={emirate.heroImage.alt}
        fill
        sizes="(max-width: 760px) 78vw, 300px"
        style={{ objectFit: 'cover' }}
      />
      <Link
        className="cover"
        href={`/uae-experiences/${emirate.slug}`}
        aria-label={emirate.name}
      />
      <SaveHeartButton itemName={emirate.name} />
      <div className="t">
        <b>{emirate.name}</b>
        <p>{emirate.tagline}</p>
      </div>
    </div>
  )
}

export function EmiratesRailBlock({
  eyebrow,
  heading,
  intro,
  emirates,
}: EmiratesRailBlockProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  const move = (dir: number) => {
    const r = railRef.current
    if (!r) return
    r.scrollBy({ left: dir * Math.min(400, r.clientWidth * 0.8), behavior: 'smooth' })
  }

  const handleScroll = () => {
    const r = railRef.current
    if (!r || !r.children[0]) return
    const cardWidth = r.children[0].getBoundingClientRect().width + 22
    const k = Math.round(r.scrollLeft / cardWidth)
    setActiveDot(Math.min(Math.max(0, k), emirates.length - 1))
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
          <div className="rail-nav">
            <button type="button" aria-label="Previous emirates" onClick={() => move(-1)}>
              ←
            </button>
            <button type="button" aria-label="Next emirates" onClick={() => move(1)}>
              →
            </button>
          </div>
        </div>

        <div className="rail rv" ref={railRef} onScroll={handleScroll}>
          {emirates.map((em) => (
            <EmirateCard key={em.slug} emirate={em} />
          ))}
        </div>

        <div className="dots" aria-hidden="true">
          {emirates.map((em, idx) => (
            <i key={em.slug} className={idx === activeDot ? 'on' : undefined} />
          ))}
        </div>
      </div>
    </section>
  )
}
