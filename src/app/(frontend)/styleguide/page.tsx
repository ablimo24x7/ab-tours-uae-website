import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { EnquiryBand } from '@/components/EnquiryBand'
import { FAQList } from '@/components/FAQList'
import { Ornament } from '@/components/Ornament'
import { PageHero } from '@/components/PageHero'
import { PlainHero } from '@/components/PlainHero'
import { sampleFAQs } from '@/lib/sample-shell-data'
import { StyleguideInteractive } from './StyleguideInteractive'

const TOKENS = [
  { name: '--navy', value: '#263259' },
  { name: '--navy-deep', value: '#18213F' },
  { name: '--night', value: '#141A2E' },
  { name: '--blue', value: '#0A66E8' },
  { name: '--blue-deep', value: '#0846A6' },
  { name: '--blue-night', value: '#062F6E' },
  { name: '--green', value: '#14804A' },
  { name: '--green-dark', value: '#0F6A3D' },
  { name: '--green-bright', value: '#1FA463' },
  { name: '--sun', value: '#F8C64B' },
  { name: '--sun-deep', value: '#E5AE2E' },
  { name: '--cream', value: '#F5EFE6' },
  { name: '--sand', value: '#EDE5D8' },
  { name: '--line', value: '#E2D8C8' },
  { name: '--muted', value: '#6A6F7E' },
  { name: '--tint-blue', value: '#E3EFFC' },
  { name: '--tint-green', value: '#E9F5EE' },
  { name: '--ink', value: '#1C2440' },
]

export default function StyleguidePage() {
  return (
    <>
      <PageHero
        image={{
          url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=2000&q=78&auto=format&fit=crop',
          alt: 'Dubai skyline at golden hour',
        }}
        eyebrow="Phase 02 · Design System"
        title="Design C6 Styleguide"
        lead="Visual reference for typography, design tokens, buttons, cards, heroes, enquiry band, FAQs, and shell interactions."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Styleguide' }]}
        ctas={[
          { label: 'Request a quote', quoteItem: 'Styleguide hero enquiry', variant: 'green' },
          { label: 'Explore PlainHero', href: '#plain-hero-demo', variant: 'ghost' },
        ]}
      />

      <section className="pad-s">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Design tokens</span>
              <h2>Colour palette</h2>
              <p>Every token from Design C6 in tokens.css.</p>
            </div>
          </div>

          <div className="cards four">
            {TOKENS.map((t) => (
              <div key={t.name} className="box rv" style={{ padding: '18px' }}>
                <div
                  style={{
                    height: '64px',
                    borderRadius: '12px',
                    backgroundColor: `var(${t.name})`,
                    border: '1px solid var(--line)',
                  }}
                />
                <b style={{ fontFamily: 'var(--mono)', fontSize: '13px' }}>{t.name}</b>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pad-s bg-sand">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Typography &amp; actions</span>
              <h2>Buttons, links &amp; ornaments</h2>
            </div>
            <Link className="link" href="/contact/request-a-quote">
              Mono uppercase link <ArrowIcon />
            </Link>
          </div>

          <div style={{ display: 'grid', gap: '28px' }}>
            <Ornament />
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="button" className="btn btn-green">
                btn-green <ArrowIcon />
              </button>
              <button type="button" className="btn btn-sun">
                btn-sun <ArrowIcon />
              </button>
              <button type="button" className="btn btn-line">
                btn-line <ArrowIcon />
              </button>
              <div style={{ background: 'var(--night)', padding: '10px 14px', borderRadius: '18px' }}>
                <button type="button" className="btn btn-ghost">
                  btn-ghost <ArrowIcon />
                </button>
              </div>
            </div>

            <StyleguideInteractive />
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Cards &amp; tags</span>
              <h2>Card styles</h2>
            </div>
          </div>

          <div className="cards">
            <div className="card rv">
              <div className="ph wide">
                <Image
                  src="https://images.unsplash.com/photo-1506645728556-ac574e628eca?w=900&q=78&auto=format&fit=crop"
                  alt="Desert dunes"
                  width={900}
                  height={675}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tag">Day trip</span>
              </div>
              <span className="meta">Dubai</span>
              <h3>Desert evening</h3>
              <p>Dune drive, sunset and dinner at a desert camp.</p>
              <div className="actions">
                <button type="button" className="link" data-quote="Day trip: Desert evening">
                  Request a quote <ArrowIcon />
                </button>
              </div>
            </div>

            <div className="card rv">
              <div className="ph wide">
                <Image
                  src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=900&q=78&auto=format&fit=crop"
                  alt="Sheikh Zayed Grand Mosque"
                  width={900}
                  height={675}
                  style={{ objectFit: 'cover' }}
                />
                <span className="tag">Culture</span>
              </div>
              <span className="meta">Abu Dhabi</span>
              <h3>Abu Dhabi in a day</h3>
              <p>Sheikh Zayed Grand Mosque, the Corniche and Saadiyat.</p>
              <div className="actions">
                <button type="button" className="link" data-quote="Day trip: Abu Dhabi in a day">
                  Request a quote <ArrowIcon />
                </button>
              </div>
            </div>

            <div className="box rv">
              <span className="eyebrow">Box card</span>
              <h3>DMC Services</h3>
              <p>Ground handling for agencies, tour operators and travel partners across the UAE.</p>
              <Link className="link" href="/b2b-corporate/dmc-services" style={{ marginTop: 'auto' }}>
                Explore <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="plain-hero-demo">
        <PlainHero
          eyebrow="PlainHero component"
          title="Editorial page header"
          lead="Used on text-led pages such as FAQs, Contact, Legal pages, and 404."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Styleguide' }]}
        />
      </div>

      <EnquiryBand
        title="Ready to plan your UAE itinerary?"
        description="Tell us your dates and interests and our travel designers will prepare a proposal."
        defaultInterest="Styleguide sample enquiry"
      />

      <FAQList title="FAQList component" items={sampleFAQs} />
    </>
  )
}
