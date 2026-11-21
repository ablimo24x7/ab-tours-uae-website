import Image from 'next/image'
import React from 'react'
import { Ornament } from '@/components/Ornament'
import { PageHero } from '@/components/PageHero'
import { IMG, img } from '@/content/static/media'

const GROUP_COMPANIES = [
  {
    title: 'AB Tours UAE',
    description: 'Destination management, holidays and B2B services.',
  },
  {
    title: 'AB Transport',
    description: 'Chauffeur, airport and group transport (ab.limo).',
  },
  {
    title: 'AB Group',
    description: '[Group description]',
  },
]

export default function CompanyProfilePage() {
  return (
    <>
      <PageHero
        image={img(IMG.coffee, 'Company Profile', 1800)}
        eyebrow="About AB Tours UAE"
        title="Company Profile"
        lead="The destination management company of AB Group, based in the UAE."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: 'Company Profile' },
        ]}
      />

      <section className="pad">
        <div className="wrap editorial">
          <div className="rv">
            <Ornament />
            <h2>Who we are</h2>
            <p>[Company story from the CMS: founding, team, licences and what we do.]</p>
            <p>[Second paragraph: our place in AB Group alongside AB Transport.]</p>
            <a
              className="btn btn-line"
              href="#download-company-profile"
              data-toast="Downloads the company profile PDF."
            >
              Download company profile (PDF)
            </a>
          </div>

          <div className="img rv" style={{ position: 'relative' }}>
            <Image
              src={img(IMG.creek, 'Dubai Creek', 1100).url}
              alt="Dubai Creek"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="facts rv">
            <div>
              <span>Founded</span>
              <b>[Year]</b>
            </div>
            <div>
              <span>Licences</span>
              <b>[UAE licences]</b>
            </div>
            <div>
              <span>Team</span>
              <b>[Size]</b>
            </div>
            <div>
              <span>Group</span>
              <b>AB Group</b>
            </div>
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap">
          <div className="head rv">
            <h2>Part of AB Group</h2>
          </div>
          <div className="cards">
            {GROUP_COMPANIES.map((company) => (
              <div key={company.title} className="box rv">
                <h3>{company.title}</h3>
                <p>{company.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
