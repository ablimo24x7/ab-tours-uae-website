import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { EnquiryBand } from '@/components/EnquiryBand'
import { Ornament } from '@/components/Ornament'
import { PageHero } from '@/components/PageHero'
import { getB2BService, getB2BServices } from '@/content'

const B2B_STEPS = [
  { title: 'Brief', text: 'Your requirements, dates and volumes.' },
  { title: 'Proposal', text: 'Rates, options and timeline.' },
  { title: 'Delivery', text: 'Our team on the ground.' },
  { title: 'Review', text: 'Reporting and feedback.' },
]

export function generateStaticParams() {
  return getB2BServices().map((s) => ({ service: s.slug }))
}

export default async function B2BServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service: slug } = await params
  const service = getB2BService(slug)
  if (!service) notFound()

  return (
    <>
      <PageHero
        image={service.heroImage}
        eyebrow="B2B & Corporate Solutions"
        title={service.title}
        lead={service.lead}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'B2B & Corporate', href: '/b2b-corporate' },
          { label: service.title },
        ]}
        ctas={[
          {
            label: 'Request a proposal',
            quoteItem: service.title,
            variant: 'green',
          },
          {
            label: 'Partner enquiries',
            href: '/contact/partner-enquiries',
            variant: 'ghost',
          },
        ]}
      />

      <section className="pad">
        <div className="wrap editorial">
          <div className="rv">
            <Ornament />
            <h2>What we handle</h2>
            <p>{service.description}</p>
            <ul>
              {service.whatWeHandle.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {service.externalLinkLabel ? (
              <a
                className="btn btn-line"
                href={service.externalLinkHref || '#'}
                target="_blank"
                rel="noopener noreferrer"
                data-toast={service.externalLinkToast}
              >
                {service.externalLinkLabel}
              </a>
            ) : null}
          </div>

          <div className="img rv" style={{ position: 'relative' }}>
            <Image
              src={service.secondaryImage.url}
              alt={service.secondaryImage.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="pad-s bg-sand" style={{ padding: '100px 0' }}>
        <div className="wrap">
          <div className="head rv">
            <h2>How we work</h2>
          </div>
          <div className="steps rv">
            {B2B_STEPS.map((step) => (
              <div key={step.title}>
                <b>{step.title}</b>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryBand
        title={`Talk to us about ${service.title}`}
        description="Share your brief; we reply with a proposal."
        defaultInterest={service.title}
      />
    </>
  )
}
