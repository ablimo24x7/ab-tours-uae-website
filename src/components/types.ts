export interface MediaAsset {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface CrumbItem {
  label: string
  href?: string
}

export interface NavLinkItem {
  title: string
  description: string
  href: string
}

export interface NavGroup {
  key: 'uae-experiences' | 'international-holidays' | 'b2b-corporate'
  label: string
  intro: string
  overviewHref: string
  featureImage: MediaAsset
  items: NavLinkItem[]
}

export interface TopBarLink {
  label: string
  href: string
  toastMessage?: string
  lang?: string
}

export interface HeaderProps {
  tagline: string
  topLinks: TopBarLink[]
  logoPrimary: string
  logoSecondary: string
  logoSubtext: string
  navGroups: NavGroup[]
  ctaLabel: string
  ctaHref: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  logoPrimary: string
  logoSecondary: string
  logoSubtext: string
  description: string
  address: string
  phone: string
  email: string
  columns: FooterColumn[]
  copyright: string
  licenceNumbers: string
  legalLinks: FooterLink[]
}

export interface FloatingWhatsAppProps {
  number: string
  smallLabel?: string
  label?: string
}

export interface QuoteDrawerProps {
  replyTimeText?: string
}

export interface HeroCTA {
  label: string
  href?: string
  quoteItem?: string
  variant?: 'green' | 'sun' | 'ghost' | 'line'
}

export interface PageHeroProps {
  image: MediaAsset
  videoUrl?: string
  eyebrow?: string
  title: string
  lead?: string
  crumbs?: CrumbItem[]
  ctas?: HeroCTA[]
}

export interface PlainHeroProps {
  eyebrow?: string
  title: string
  lead?: string
  crumbs?: CrumbItem[]
}

export interface EnquiryBandProps {
  title: string
  description: string
  defaultInterest?: string
  consultationHref?: string
  consultationLabel?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQListProps {
  title?: string
  items: FAQItem[]
}
