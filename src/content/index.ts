import { adventures } from './static/adventures'
import { b2bServices } from './static/b2bServices'
import { blogPosts } from './static/blogPosts'
import { dayTrips } from './static/dayTrips'
import { destinations } from './static/destinations'
import { emirates } from './static/emirates'
import { faqGroups } from './static/faqs'
import { guides } from './static/guides'
import { holidayStyles } from './static/holidayStyles'
import { homepageBlocks } from './static/homepage'
import { packages } from './static/packages'
import { homepagePartnerPlaceholders, partners } from './static/partners'
import { overviewPages, siteData } from './static/site'
import { testimonials } from './static/testimonials'
import { tickets } from './static/tickets'
import type {
  AdventureItem,
  B2BServiceItem,
  BlogPostItem,
  DayTripItem,
  DestinationItem,
  EmirateItem,
  FAQGroupItem,
  GuideItem,
  HolidayStyleItem,
  HomepageBlock,
  PackageItem,
  PartnerItem,
  SiteData,
  StaticOverviewPage,
  TestimonialItem,
  TicketItem,
} from './types'

export function getSiteData(): SiteData {
  return siteData
}

export function getHomepage(): HomepageBlock[] {
  return homepageBlocks
}

export function getOverviewPage(key: string): StaticOverviewPage | undefined {
  return overviewPages[key]
}

export function getEmirates(): EmirateItem[] {
  return emirates
}

export function getEmirate(slug: string): EmirateItem | undefined {
  return emirates.find((e) => e.slug === slug)
}

export function getDayTrips(filter?: { emirate?: string }): DayTripItem[] {
  if (!filter?.emirate) return dayTrips
  return dayTrips.filter((t) => t.emirate === filter.emirate)
}

export function getDayTrip(slug: string): DayTripItem | undefined {
  return dayTrips.find((t) => t.slug === slug)
}

export function getPackages(filter?: { emirateName?: string }): PackageItem[] {
  if (!filter?.emirateName) return packages
  return packages.filter((p) => p.route.includes(filter.emirateName!))
}

export function getPackage(slug: string): PackageItem | undefined {
  return packages.find((p) => p.slug === slug)
}

export function getTickets(filter?: { emirateName?: string }): TicketItem[] {
  if (!filter?.emirateName) return tickets
  return tickets.filter((t) => t.emirate === filter.emirateName)
}

export function getAdventures(filter?: { emirate?: string }): AdventureItem[] {
  if (!filter?.emirate) return adventures
  return adventures.filter((a) => a.emirate === filter.emirate)
}

export function getHolidayStyles(): HolidayStyleItem[] {
  return holidayStyles
}

export function getHolidayStyle(slug: string): HolidayStyleItem | undefined {
  return holidayStyles.find((s) => s.slug === slug)
}

export function getDestinations(filter?: { styleSlug?: string }): DestinationItem[] {
  if (!filter?.styleSlug) return destinations
  return destinations.filter((d) => d.styleSlug === filter.styleSlug)
}

export function getB2BServices(): B2BServiceItem[] {
  return b2bServices
}

export function getB2BService(slug: string): B2BServiceItem | undefined {
  return b2bServices.find((s) => s.slug === slug)
}

export function getGuides(limit?: number): GuideItem[] {
  return typeof limit === 'number' ? guides.slice(0, limit) : guides
}

export function getGuide(slug: string): GuideItem | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getBlogPosts(): BlogPostItem[] {
  return blogPosts
}

export function getBlogPost(slug: string): BlogPostItem | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getFAQGroups(): FAQGroupItem[] {
  return faqGroups
}

export function getPartners(): PartnerItem[] {
  return partners
}

export function getHomepagePartners() {
  return homepagePartnerPlaceholders
}

export function getTestimonials(): TestimonialItem[] {
  return testimonials
}
