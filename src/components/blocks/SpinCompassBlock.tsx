'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import type { AdventureItem } from '@/content/types'

export interface SpinCompassBlockProps {
  eyebrow: string
  heading: string
  line: string
  buttonLabel: string
  adventures: AdventureItem[]
}

export function SpinCompassBlock({
  eyebrow,
  heading,
  line,
  buttonLabel,
  adventures,
}: SpinCompassBlockProps) {
  const [deg, setDeg] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [picked, setPicked] = useState<AdventureItem | null>(null)
  const [resultKey, setResultKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const spin = () => {
    if (adventures.length === 0) return
    if (timerRef.current) clearTimeout(timerRef.current)

    const nextPick = adventures[Math.floor(Math.random() * adventures.length)]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setPicked(nextPick)
      setResultKey((k) => k + 1)
      return
    }

    setSpinning(true)
    setDeg((d) => d + 1080 + Math.floor(Math.random() * 360))
    timerRef.current = setTimeout(() => {
      setSpinning(false)
      setPicked(nextPick)
      setResultKey((k) => k + 1)
    }, 2400)
  }

  return (
    <section className="pad-s">
      <div className="wrap">
        <div className="spin cspin rv">
          <div className="spin-wrap">
            <div className="dial" style={{ transform: `rotate(${deg}deg)` }}>
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8l-2.5 5.5L8 16l2.5-5.5z" />
              </svg>
            </div>
          </div>

          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h3>{heading}</h3>
            <p>{line}</p>

            <div className={`spin-out${picked && !spinning ? ' show' : ''}`} key={resultKey}>
              {spinning ? (
                <span style={{ color: 'var(--muted)' }}>Spinning…</span>
              ) : picked ? (
                <>
                  <div className="pic" style={{ position: 'relative' }}>
                    <Image
                      src={picked.cardImage.url}
                      alt={picked.cardImage.alt}
                      fill
                      sizes="150px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <b>{picked.title}</b>
                    <span style={{ color: 'var(--muted)', fontSize: '14.5px' }}>
                      {picked.shortDescription}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        marginTop: '10px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <button type="button" className="link" data-quote={picked.title}>
                        Add to my trip <ArrowIcon />
                      </button>
                      <button type="button" className="link" onClick={spin}>
                        Spin again
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button type="button" className="btn btn-sun" onClick={spin}>
                  {buttonLabel} <ArrowIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
