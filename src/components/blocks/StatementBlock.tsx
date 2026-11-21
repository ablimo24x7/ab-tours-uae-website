'use client'

import React, { useEffect, useRef, useState } from 'react'

export interface StatementBlockProps {
  eyebrow: string
  prefixText: string
  highlightedPhrase: string
  suffixText: string
}

export function StatementBlock({
  eyebrow,
  prefixText,
  highlightedPhrase,
  suffixText,
}: StatementBlockProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [litCount, setLitCount] = useState(0)

  const prefixWords = prefixText.trim().split(/\s+/).filter(Boolean)
  const highlightWords = highlightedPhrase.trim().split(/\s+/).filter(Boolean)
  const suffixWords = suffixText.trim().split(/\s+/).filter(Boolean)
  const totalWords = prefixWords.length + highlightWords.length + suffixWords.length

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => setLitCount(totalWords))
      return () => cancelAnimationFrame(id)
    }

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const prog = Math.max(
        0,
        Math.min(1, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)),
      )
      setLitCount(Math.round(prog * totalWords))
    }

    window.addEventListener('scroll', update, { passive: true })
    const raf = requestAnimationFrame(update)
    return () => {
      window.removeEventListener('scroll', update)
      cancelAnimationFrame(raf)
    }
  }, [totalWords])

  let wordIdx = 0

  return (
    <section className="cstate">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <p className="fill" ref={ref}>
          {prefixWords.map((w, i) => {
            const idx = wordIdx++
            return (
              <React.Fragment key={`p-${i}`}>
                <span className={idx < litCount ? 'lit' : undefined}>{w}</span>{' '}
              </React.Fragment>
            )
          })}
          {highlightWords.map((w, i) => {
            const idx = wordIdx++
            return (
              <React.Fragment key={`h-${i}`}>
                <span className={`em${idx < litCount ? ' lit' : ''}`}>{w}</span>{' '}
              </React.Fragment>
            )
          })}
          {suffixWords.map((w, i) => {
            const idx = wordIdx++
            return (
              <React.Fragment key={`s-${i}`}>
                <span className={idx < litCount ? 'lit' : undefined}>{w}</span>
                {i < suffixWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            )
          })}
        </p>
      </div>
    </section>
  )
}
