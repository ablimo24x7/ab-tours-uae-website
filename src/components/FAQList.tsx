import React from 'react'
import type { FAQListProps } from './types'

export function FAQList({ title, items }: FAQListProps) {
  return (
    <section className="pad-s">
      <div className="wrap">
        {title ? (
          <div className="head">
            <h2>{title}</h2>
          </div>
        ) : null}
        <div className="faq rv">
          {items.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
