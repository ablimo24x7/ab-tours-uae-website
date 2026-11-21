import React from 'react'
import { EnquiryBand } from '@/components/EnquiryBand'
import { PackageRows } from '@/components/PackageRows'
import { PageHero } from '@/components/PageHero'
import { getPackages } from '@/content'
import { IMG, img } from '@/content/static/media'

export default function MultiCityPackagesPage() {
  const packages = getPackages()

  return (
    <>
      <PageHero
        image={img(IMG.dunes, 'Multi-City Packages', 1800)}
        eyebrow="UAE Experiences"
        title="Multi-City Packages"
        lead="Routes across two or more emirates, tailored to your dates, pace and budget."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'UAE Experiences', href: '/uae-experiences' },
          { label: 'Multi-City Packages' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          <PackageRows packages={packages} />
        </div>
      </section>

      <EnquiryBand
        title="Prefer a route made from scratch?"
        description="Tell us the emirates you want to see and we’ll design it."
        defaultInterest="Multi-city package"
      />
    </>
  )
}
