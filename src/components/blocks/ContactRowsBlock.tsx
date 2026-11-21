import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'

export interface ContactRowsBlockProps {
  eyebrow: string
  headingPrefix: string
  headingHighlight: string
  rows: Array<{
    title: string
    line: string
    href: string
  }>
}

export function ContactRowsBlock({
  eyebrow,
  headingPrefix,
  headingHighlight,
  rows,
}: ContactRowsBlockProps) {
  return (
    <section className="cend">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="huge rv">
          {headingPrefix} <em>{headingHighlight}</em>
        </h2>
        <div className="crows">
          {rows.map((row) => (
            <Link key={row.href} className="rv" href={row.href}>
              <b>{row.title}</b>
              <span>{row.line}</span>
              <i>
                <ArrowIcon />
              </i>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
