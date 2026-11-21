import React from 'react'
import { PlainHero } from '@/components/PlainHero'

const REASONS = [
  { title: 'A local team', text: 'Planned and guided by people based in the UAE.' },
  { title: 'Licensed DMC', text: '[UAE tourism licences].' },
  { title: 'Own transport', text: 'Transfers by our sister company AB Transport.' },
  { title: 'One contact', text: 'A travel designer from first message to last transfer.' },
  { title: 'Tailored, not off a shelf', text: 'Every package adjusted to you.' },
  { title: 'Business ready', text: 'DMC, MICE, visa and corporate support.' },
]

export default function WhyABToursPage() {
  return (
    <>
      <PlainHero
        eyebrow="About AB Tours UAE"
        title="Why AB Tours"
        lead="Six reasons guests and partners choose us."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Why AB Tours' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <div className="cards">
            {REASONS.map((reason, idx) => (
              <div key={reason.title} className="box rv">
                <span className="ic">0{idx + 1}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
