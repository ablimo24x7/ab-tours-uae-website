import React from 'react'
import { RenderBlocks } from '@/components/RenderBlocks'
import {
  getAdventures,
  getB2BServices,
  getDayTrips,
  getDestinations,
  getEmirates,
  getGuides,
  getHolidayStyles,
  getHomepage,
  getHomepagePartners,
  getPackages,
} from '@/content'

export default function HomePage() {
  const blocks = getHomepage()

  return (
    <div className="is-home">
      <RenderBlocks
        blocks={blocks}
        data={{
          dayTrips: getDayTrips(),
          packages: getPackages(),
          adventures: getAdventures(),
          holidayStyles: getHolidayStyles(),
          destinations: getDestinations(),
          emirates: getEmirates(),
          b2bServices: getB2BServices(),
          partners: getHomepagePartners(),
          guides: getGuides(),
        }}
      />
    </div>
  )
}
