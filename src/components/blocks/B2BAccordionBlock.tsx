'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import type { B2BServiceItem } from '@/content/types'

export interface B2BAccordionBlockProps {
  eyebrow: string
  heading: string
  intro: string
  services: B2BServiceItem[]
}

export function B2BAccordionBlock({
  eyebrow,
  heading,
  intro,
  services,
}: B2BAccordionBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="pad cb2b">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
        </div>

        <div className="acc rv">
          {services.map((svc, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={svc.slug} className={`acc-row${isOpen ? ' open' : ''}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  <span className="n">0{idx + 1}</span>
                  <b>{svc.title}</b>
                  <span className="l">{svc.shortLine}</span>
                  <span className="pm" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="acc-body">
                  <div>
                    <div className="acc-inner">
                      <div style={{ position: 'relative', aspectRatio: '16 / 10' }}>
                        <Image
                          src={svc.heroImage.url}
                          alt={svc.heroImage.alt}
                          fill
                          sizes="(max-width: 860px) 100vw, 420px"
                          style={{ objectFit: 'cover', borderRadius: '16px' }}
                        />
                      </div>
                      <div>
                        <p>{svc.lead}</p>
                        <ul>
                          {svc.whatWeHandle.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className="acts">
                          <Link className="btn btn-sun" href={`/b2b-corporate/${svc.slug}`}>
                            Explore {svc.title} <ArrowIcon />
                          </Link>
                          <button type="button" className="link" data-quote={svc.title}>
                            Request a proposal <ArrowIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
