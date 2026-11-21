import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Ornament } from './Ornament'
import type { PlainHeroProps } from './types'

export function PlainHero({ eyebrow, title, lead, crumbs }: PlainHeroProps) {
  return (
    <section className="plain-hero">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div style={{ marginTop: '22px' }}>
          <Ornament />
        </div>
        {eyebrow ? (
          <p className="eyebrow" style={{ marginTop: '14px' }}>
            {eyebrow}
          </p>
        ) : null}
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
    </section>
  )
}
