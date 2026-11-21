'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import type { AdventureItem } from '@/content/types'
import { ArrowIcon } from './ArrowIcon'

export interface AdventuresRailProps {
  eyebrow?: string
  heading: string
  intro?: string
  items: AdventureItem[]
  light?: boolean
}

function AdventureCard({ item, index }: { item: AdventureItem; index: number }) {
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
    if (!item.videoUrl) return
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
  }, [item.videoUrl])

  return (
    <div
      ref={cardRef}
      className="adv-card"
      onMouseEnter={item.videoUrl ? playVideo : undefined}
      onMouseLeave={item.videoUrl ? pauseVideo : undefined}
      onFocus={item.videoUrl ? playVideo : undefined}
      onBlur={item.videoUrl ? pauseVideo : undefined}
    >
      {item.videoUrl ? (
        <>
          <video ref={videoRef} muted loop playsInline preload="none" src={item.videoUrl} />
          <span className="vchip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 4l13 8-13 8z" />
            </svg>
            Hover to play
          </span>
        </>
      ) : null}
      <Image
        src={item.cardImage.url}
        alt={item.cardImage.alt}
        fill
        sizes="(max-width: 760px) 78vw, 330px"
        style={{ objectFit: 'cover' }}
      />
      <span className="num">{String(index + 1).padStart(2, '0')}</span>
      <span className="badge">{item.badge}</span>
      <div className="t">
        <small>{item.emirateName}</small>
        <b>{item.title}</b>
        <p>{item.shortDescription}</p>
        <button type="button" className="go" data-quote={item.title}>
          Add to my trip <ArrowIcon />
        </button>
      </div>
    </div>
  )
}

export function AdventuresRail({
  eyebrow = 'Bucket-list adventures',
  heading,
  intro = 'Skies, dunes, mountains and sea — the experiences guests talk about for years.',
  items,
  light = false,
}: AdventuresRailProps) {
  const railRef = useRef<HTMLDivElement>(null)

  if (items.length < 2) return null

  const move = (dir: number) => {
    const r = railRef.current
    if (!r) return
    r.scrollBy({ left: dir * Math.min(360, r.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className={`pad adv${light ? ' light' : ''}`}>
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
            {intro ? <p>{intro}</p> : null}
          </div>
          {items.length > 3 ? (
            <div className="rail-nav">
              <button type="button" aria-label="Previous adventures" onClick={() => move(-1)}>
                ←
              </button>
              <button type="button" aria-label="Next adventures" onClick={() => move(1)}>
                →
              </button>
            </div>
          ) : null}
        </div>
        <div className="adv-rail rv" ref={railRef}>
          {items.map((item, index) => (
            <AdventureCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
