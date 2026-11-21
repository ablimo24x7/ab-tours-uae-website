'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { FilmChapterItem } from '@/content/types'

export interface FilmChaptersBlockProps {
  anchorId: string
  eyebrow: string
  heading: string
  intro: string
  chapters: FilmChapterItem[]
}

export function FilmChaptersBlock({
  anchorId,
  eyebrow,
  heading,
  intro,
  chapters,
}: FilmChaptersBlockProps) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [runKey, setRunKey] = useState(0)

  const screenRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const selectChapter = (index: number, fromUser: boolean) => {
    setActive(index)
    setRunKey((k) => k + 1)
    if (fromUser) {
      setPlaying(true)
    }
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const chapter = chapters[active]
    v.poster = chapter.posterImage.url
    v.src = chapter.videoUrl
    v.load()
    if (playing) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [active, chapters, playing])

  useEffect(() => {
    const sc = screenRef.current
    const v = videoRef.current
    if (!sc || !v) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (entry.isIntersecting && !reduced) {
            v.preload = 'auto'
            v.play()
              .then(() => setPlaying(true))
              .catch(() => {})
          } else if (!entry.isIntersecting) {
            v.pause()
            setPlaying(false)
          }
        })
      },
      { threshold: 0.45 },
    )
    io.observe(sc)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || chapters.length <= 1) return
    const timer = setInterval(() => {
      setActive((c) => (c + 1) % chapters.length)
      setRunKey((k) => k + 1)
    }, 12000)
    return () => clearInterval(timer)
  }, [playing, chapters.length])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="cinema" id={anchorId}>
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
        </div>

        <div className="cine-grid">
          <div ref={screenRef} className={`screen rv${playing ? ' playing' : ''}`}>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={chapters[0].posterImage.url}
              src={chapters[0].videoUrl}
            />
            <button
              type="button"
              className="play"
              aria-label={playing ? 'Pause film' : 'Play film'}
              onClick={togglePlay}
            >
              {playing ? (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 4l13 8-13 8z" />
                </svg>
              )}
            </button>
            <span className="label">{chapters[active].name}</span>
          </div>

          <div className="chapters rv">
            {chapters.map((chapter, idx) => (
              <button
                key={`${chapter.name}-${idx === active ? runKey : 'idle'}`}
                type="button"
                className={idx === active ? 'on' : undefined}
                onClick={() => selectChapter(idx, true)}
              >
                <small>
                  0{idx + 1} · {chapter.place}
                </small>
                {chapter.name}
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
