import React from 'react'
import { PlainHero } from '@/components/PlainHero'
import { getTestimonials } from '@/content'

export default function TestimonialsPage() {
  const testimonials = getTestimonials()

  return (
    <>
      <PlainHero
        eyebrow="About AB Tours UAE"
        title="Testimonials"
        lead="What guests and partners say about travelling with us."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Testimonials' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <div className="quotes">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="quote rv"
                style={{ border: '1px solid var(--line)' }}
              >
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  {t.author}, {t.locationOrCompany}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
