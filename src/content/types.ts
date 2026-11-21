import type {
  CrumbItem,
  FAQItem,
  FloatingWhatsAppProps,
  FooterProps,
  HeaderProps,
  HeroCTA,
  MediaAsset,
} from '@/components/types'

export type { MediaAsset }

export type PriceType = 'from_aed' | 'on_request'

export interface PriceInfo {
  priceType: PriceType
  amountAED?: number
  unit?: string
}

export interface EmirateItem {
  slug: string
  name: string
  tagline: string
  heroImage: MediaAsset
  secondaryImage: MediaAsset
  videoUrl?: string
  storyParagraphs: string[]
  bestTime: string
  gettingThere: string
  visaNote: string
  transfersNote: string
  faqs: FAQItem[]
}

export interface DayTripItem {
  slug: string
  title: string
  emirate: string
  emirateName: string
  shortDescription: string
  availabilityLabel: string
  cardImage: MediaAsset
  durationAndTransport: string
  pickupNote: string
  price: PriceInfo
  highlights: string[]
  included: string[]
  gallery: MediaAsset[]
  faqs: FAQItem[]
}

export interface PackageDayItem {
  place: string
  title: string
  text: string
  image?: MediaAsset
}

export interface PackageItem {
  slug: string
  title: string
  days: number
  style: string
  cardImage: MediaAsset
  route: string[]
  intro: string
  summary: string
  price: PriceInfo
  itinerary: PackageDayItem[]
  included: string[]
  shapedAroundYou: string[]
  faqs: FAQItem[]
  pdfLabel?: string
}

export interface TicketItem {
  slug: string
  title: string
  emirate: string
  cardImage: MediaAsset
  metaLabel: string
}

export interface AdventureItem {
  slug: string
  title: string
  emirate: string
  emirateName: string
  badge: string
  shortDescription: string
  cardImage: MediaAsset
  videoUrl?: string
}

export interface HolidayStyleItem {
  slug: string
  title: string
  shortLine: string
  lead: string
  cardNote: string
  heroImage: MediaAsset
  disclaimerNote: string
}

export interface DestinationItem {
  slug: string
  name: string
  styleSlug: string
  styleTitle: string
  cardImage: MediaAsset
  cardNote: string
  shortDescription: string
}

export interface B2BServiceItem {
  slug: string
  title: string
  shortLine: string
  lead: string
  heroImage: MediaAsset
  secondaryImage: MediaAsset
  description: string
  whatWeHandle: string[]
  externalLinkLabel?: string
  externalLinkHref?: string
  externalLinkToast?: string
}

export interface GuideItem {
  slug: string
  title: string
  tag: string
  cardImage: MediaAsset
  intro: string
  bodyParagraphs: string[]
}

export interface BlogPostItem {
  slug: string
  title: string
  date: string
  category: string
  summary: string
  cardImage: MediaAsset
  bodyParagraphs: string[]
}

export interface FAQGroupItem {
  groupKey: 'uae' | 'international' | 'b2b'
  groupTitle: string
  items: FAQItem[]
}

export interface PartnerItem {
  id: string
  name: string
  category: 'Hotels & resorts' | 'Attractions' | 'Airlines & cruise lines'
  showOnHomepage?: boolean
}

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  locationOrCompany: string
}

export interface HeroSlide {
  videoUrl: string
  fallbackImage: MediaAsset
  locationLabel: string
  headline: string
}

export interface MoodFilterItem {
  name: string
  line: string
  iconKey: 'thrill' | 'culture' | 'relax' | 'family' | 'city'
  items: Array<{
    title: string
    emirateSlug: string
    emirateName: string
    image: MediaAsset
    href: string
  }>
}

export interface FilmChapterItem {
  name: string
  place: string
  videoUrl: string
  posterImage: MediaAsset
}

export interface MomentPhotoItem {
  image: MediaAsset
  caption: string
}

export type HomepageBlock =
  | {
      blockType: 'heroSlider'
      slides: HeroSlide[]
      filmButtonLabel: string
      filmAnchorId: string
    }
  | {
      blockType: 'planBar'
      exploreLabel: string
      datesLabel: string
      submitLabel: string
      dateOptions: string[]
      exploreGroups: Array<{
        groupLabel: string
        options: string[]
      }>
    }
  | {
      blockType: 'thingsToDo'
      eyebrow: string
      heading: string
      intro: string
      linkLabel: string
      linkHref: string
      allLabel: string
      moods: MoodFilterItem[]
    }
  | {
      blockType: 'packagesStack'
      eyebrow: string
      heading: string
      intro: string
      linkLabel: string
      linkHref: string
    }
  | {
      blockType: 'adventuresRail'
      eyebrow: string
      heading: string
      intro: string
    }
  | {
      blockType: 'holidayStylesFilter'
      eyebrow: string
      heading: string
      intro: string
      linkLabel: string
      linkHref: string
      allLabel: string
      bespokeCard: {
        title: string
        text: string
        avail: string
        href: string
        image: MediaAsset
      }
    }
  | {
      blockType: 'filmChapters'
      anchorId: string
      eyebrow: string
      heading: string
      intro: string
      chapters: FilmChapterItem[]
    }
  | {
      blockType: 'statement'
      eyebrow: string
      prefixText: string
      highlightedPhrase: string
      suffixText: string
    }
  | {
      blockType: 'emiratesRail'
      eyebrow: string
      heading: string
      intro: string
    }
  | {
      blockType: 'spinCompass'
      eyebrow: string
      heading: string
      line: string
      buttonLabel: string
    }
  | {
      blockType: 'seasonCampaign'
      tag: string
      headlinePrefix: string
      headlineHighlight: string
      text: string
      quickLinks: Array<{ label: string; href: string }>
      buttonLabel: string
      quoteItem: string
      backgroundImage: MediaAsset
      bridgeToDark: boolean
    }
  | {
      blockType: 'b2bAccordion'
      eyebrow: string
      heading: string
      intro: string
    }
  | {
      blockType: 'partnersStrip'
      label: string
    }
  | {
      blockType: 'momentsWall'
      hashtag: string
      heading: string
      intro: string
      topRow: MomentPhotoItem[]
      bottomRow: MomentPhotoItem[]
    }
  | {
      blockType: 'guidesGrid'
      eyebrow: string
      heading: string
      linkLabel: string
      linkHref: string
      count: number
    }
  | {
      blockType: 'contactRows'
      eyebrow: string
      headingPrefix: string
      headingHighlight: string
      rows: Array<{
        title: string
        line: string
        href: string
      }>
    }

export interface SiteData {
  header: HeaderProps
  footer: FooterProps
  whatsapp: FloatingWhatsAppProps
  replyTimeText: string
  contactDetails: {
    office: string
    phone: string
    whatsapp: string
    email: string
  }
  quotePlannerOptions: Array<{
    label: string
    image: MediaAsset
  }>
  consultationFormOptions: {
    topics: string[]
    channels: string[]
    times: string[]
  }
  partnerFormOptions: {
    partnerTypes: string[]
    interests: string[]
  }
  notFound: {
    title: string
    lead: string
  }
}

export interface StaticOverviewCard {
  eyebrow: string
  title: string
  description: string
  href: string
}

export interface StaticOverviewPage {
  key: string
  title: string
  lead: string
  heroImage: MediaAsset
  heroVideoUrl?: string
  crumbs: CrumbItem[]
  cards: StaticOverviewCard[]
  ctas?: HeroCTA[]
}
