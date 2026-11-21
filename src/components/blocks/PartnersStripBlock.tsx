import React from 'react'

export interface PartnersStripBlockProps {
  label: string
  items: Array<{ id: string; label: string }>
}

export function PartnersStripBlock({ label, items }: PartnersStripBlockProps) {
  return (
    <section className="pad-s partners-strip">
      <div className="wrap">
        <div className="rv">
          <span className="eyebrow">{label}</span>
          <div className="logos">
            {items.map((item) => (
              <span key={item.id}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
