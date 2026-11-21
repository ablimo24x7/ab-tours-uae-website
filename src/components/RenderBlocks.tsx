import React from 'react'
import { AdventuresRail } from '@/components/AdventuresRail'
import type {
  AdventureItem,
  B2BServiceItem,
  DayTripItem,
  DestinationItem,
  EmirateItem,
  GuideItem,
  HolidayStyleItem,
  HomepageBlock,
  PackageItem,
} from '@/content/types'
import { B2BAccordionBlock } from './blocks/B2BAccordionBlock'
import { ContactRowsBlock } from './blocks/ContactRowsBlock'
import { EmiratesRailBlock } from './blocks/EmiratesRailBlock'
import { FilmChaptersBlock } from './blocks/FilmChaptersBlock'
import { GuidesGridBlock } from './blocks/GuidesGridBlock'
import { HeroSliderBlock } from './blocks/HeroSliderBlock'
import { HolidayStylesFilterBlock } from './blocks/HolidayStylesFilterBlock'
import { MomentsWallBlock } from './blocks/MomentsWallBlock'
import { PackagesStackBlock } from './blocks/PackagesStackBlock'
import { PartnersStripBlock } from './blocks/PartnersStripBlock'
import { PlanBarBlock } from './blocks/PlanBarBlock'
import { SeasonCampaignBlock } from './blocks/SeasonCampaignBlock'
import { SpinCompassBlock } from './blocks/SpinCompassBlock'
import { StatementBlock } from './blocks/StatementBlock'
import { ThingsToDoBlock } from './blocks/ThingsToDoBlock'

export interface RenderBlocksContextData {
  dayTrips: DayTripItem[]
  packages: PackageItem[]
  adventures: AdventureItem[]
  holidayStyles: HolidayStyleItem[]
  destinations: DestinationItem[]
  emirates: EmirateItem[]
  b2bServices: B2BServiceItem[]
  partners: Array<{ id: string; label: string }>
  guides: GuideItem[]
}

export function RenderBlocks({
  blocks,
  data,
}: {
  blocks: HomepageBlock[]
  data: RenderBlocksContextData
}) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}`
        switch (block.blockType) {
          case 'heroSlider':
            return (
              <HeroSliderBlock
                key={key}
                slides={block.slides}
                filmButtonLabel={block.filmButtonLabel}
                filmAnchorId={block.filmAnchorId}
              />
            )
          case 'planBar':
            return (
              <PlanBarBlock
                key={key}
                exploreLabel={block.exploreLabel}
                datesLabel={block.datesLabel}
                submitLabel={block.submitLabel}
                dateOptions={block.dateOptions}
                exploreGroups={block.exploreGroups}
              />
            )
          case 'thingsToDo':
            return (
              <ThingsToDoBlock
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                linkLabel={block.linkLabel}
                linkHref={block.linkHref}
                allLabel={block.allLabel}
                moods={block.moods}
                dayTrips={data.dayTrips}
              />
            )
          case 'packagesStack':
            return (
              <PackagesStackBlock
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                linkLabel={block.linkLabel}
                linkHref={block.linkHref}
                packages={data.packages}
              />
            )
          case 'adventuresRail':
            return (
              <AdventuresRail
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                items={data.adventures}
              />
            )
          case 'holidayStylesFilter':
            return (
              <HolidayStylesFilterBlock
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                linkLabel={block.linkLabel}
                linkHref={block.linkHref}
                allLabel={block.allLabel}
                styles={data.holidayStyles}
                destinations={data.destinations}
                bespokeCard={block.bespokeCard}
              />
            )
          case 'filmChapters':
            return (
              <FilmChaptersBlock
                key={key}
                anchorId={block.anchorId}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                chapters={block.chapters}
              />
            )
          case 'statement':
            return (
              <StatementBlock
                key={key}
                eyebrow={block.eyebrow}
                prefixText={block.prefixText}
                highlightedPhrase={block.highlightedPhrase}
                suffixText={block.suffixText}
              />
            )
          case 'emiratesRail':
            return (
              <EmiratesRailBlock
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                emirates={data.emirates}
              />
            )
          case 'spinCompass':
            return (
              <SpinCompassBlock
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                line={block.line}
                buttonLabel={block.buttonLabel}
                adventures={data.adventures}
              />
            )
          case 'seasonCampaign':
            return (
              <SeasonCampaignBlock
                key={key}
                tag={block.tag}
                headlinePrefix={block.headlinePrefix}
                headlineHighlight={block.headlineHighlight}
                text={block.text}
                quickLinks={block.quickLinks}
                buttonLabel={block.buttonLabel}
                quoteItem={block.quoteItem}
                backgroundImage={block.backgroundImage}
                bridgeToDark={block.bridgeToDark}
              />
            )
          case 'b2bAccordion':
            return (
              <B2BAccordionBlock
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                intro={block.intro}
                services={data.b2bServices}
              />
            )
          case 'partnersStrip':
            return (
              <PartnersStripBlock
                key={key}
                label={block.label}
                items={data.partners}
              />
            )
          case 'momentsWall':
            return (
              <MomentsWallBlock
                key={key}
                hashtag={block.hashtag}
                heading={block.heading}
                intro={block.intro}
                topRow={block.topRow}
                bottomRow={block.bottomRow}
              />
            )
          case 'guidesGrid':
            return (
              <GuidesGridBlock
                key={key}
                eyebrow={block.eyebrow}
                heading={block.heading}
                linkLabel={block.linkLabel}
                linkHref={block.linkHref}
                guides={data.guides.slice(0, block.count)}
              />
            )
          case 'contactRows':
            return (
              <ContactRowsBlock
                key={key}
                eyebrow={block.eyebrow}
                headingPrefix={block.headingPrefix}
                headingHighlight={block.headingHighlight}
                rows={block.rows}
              />
            )
          default:
            if (process.env.NODE_ENV === 'development') {
              console.warn('Unknown block type:', block)
            }
            return null
        }
      })}
    </>
  )
}
