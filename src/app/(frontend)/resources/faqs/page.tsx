import React from 'react'
import { PlainHero } from '@/components/PlainHero'
import { getFAQGroups } from '@/content'

export default function FAQsPage() {
  const groups = getFAQGroups()

  return (
    <>
      <PlainHero
        eyebrow="Resources"
        title="FAQs"
        lead="Quick answers to common questions."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'FAQs' },
        ]}
      />

      <section className="pad-s">
        <div className="wrap faq">
          {groups.map((group) => (
            <React.Fragment key={group.groupKey}>
              <h3>{group.groupTitle}</h3>
              {group.items.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  )
}
