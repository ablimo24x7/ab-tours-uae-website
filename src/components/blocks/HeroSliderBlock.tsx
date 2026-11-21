'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { HeroSlide } from '@/content/types'

export interface HeroSliderBlockProps {
  slides: HeroSlide[]
  filmButtonLabel: string
  filmAnchorId: string
}

export function HeroSliderBlock({
  slides,
  filmButtonLabel,
  filmAnchorId,
}: HeroSliderBlockProps) {
  const [active, setActive] = useState(0)
  const [prevSlide, setPrevSlide] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [barRunKey, setBarRunKey] = useState(0)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  const total = slides.length
  const nextIndex = total > 0 ? (active + 1) % total : 0

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => setPaused(true))
      return () => cancelAnimationFrame(id)
    }
  }, [])

  const go = useCallback(
    (delta: number) => {
      if (total === 0) return
      setActive((current) => {
        setPrevSlide(current)
        return (current + delta + total) % total
      })
      setBarRunKey((k) => k + 1)
    },
    [total],
  )

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return
      if (idx === active) {
        video.preload = 'auto'
        try {
          video.currentTime = 0
        } catch {
          // Ignore seek errors before metadata loads
        }
        if (!paused) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      } else {
        video.pause()
      }
    })
  }, [active, paused])

  useEffect(() => {
    if (paused || total <= 1) return
    const timer = setInterval(() => {
      go(1)
    }, 8000)
    return () => clearInterval(timer)
  }, [paused, total, go])

  const scrollToFilm = () => {
    const el = document.getElementById(filmAnchorId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero ch" id="hero" aria-label="AB Tours UAE video showcase">
      {slides.map((slide, index) => {
        const isOn = index === active
        const isNext = index === nextIndex && total > 1
        const isOut = index === prevSlide && !isOn
        const cls = [
          'ch-slide',
          isOn ? 'on' : '',
          isNext ? 'next' : '',
          isOut ? 'out' : '',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <div
            key={slide.headline}
            className={cls}
            onClick={isNext ? () => go(1) : undefined}
          >
            <Image
              src={slide.fallbackImage.url}
              alt={slide.fallbackImage.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
            <video
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              muted
              loop
              playsInline
              autoPlay={index === 0}
              preload={index === 0 ? 'auto' : 'none'}
              poster={slide.fallbackImage.url}
              src={slide.videoUrl}
            />
            <div className="ch-copy">
              <span className="eyebrow">{slide.locationLabel}</span>
              <h1>{slide.headline}</h1>
            </div>
          </div>
        )
      })}

      <div className="ch-ui">
        <div className="wrap">
          <button type="button" className="ch-film" onClick={scrollToFilm}>
            <i>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4l13 8-13 8z" />
              </svg>
            </i>
            {filmButtonLabel}
          </button>

          <button
            type="button"
            className="ch-chip"
            aria-label={paused ? 'Play video' : 'Pause video'}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4l13 8-13 8z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            )}
            <span>{paused ? 'Play' : 'Pause'}</span>
          </button>

          <div className="ch-count">
            <span>{String(active + 1).padStart(2, '0')}</span>
            <i key={barRunKey} className={paused ? undefined : 'run'} />
            <span>{String(total).padStart(2, '0')}</span>
            <button type="button" aria-label="Previous slide" onClick={() => go(-1)}>
              ←
            </button>
            <button type="button" aria-label="Next slide" onClick={() => go(1)}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
