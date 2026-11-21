import type { SiteData, StaticOverviewPage } from '../types'
import { IMG, V, img } from './media'

export const siteData: SiteData = {
  header: {
    tagline: 'A UAE destination management company · Part of AB Group',
    topLinks: [
      { label: 'Partner Enquiries', href: '/contact/partner-enquiries' },
      { label: 'Book a Consultation', href: '/contact/consultation-request' },
      {
        label: 'WhatsApp [number]',
        href: '#whatsapp',
        toastMessage: 'WhatsApp opens a chat with the AB Tours UAE team.',
      },
      {
        label: 'العربية',
        href: '#arabic',
        lang: 'ar',
        toastMessage: 'The Arabic site mirrors every page right-to-left.',
      },
    ],
    logoPrimary: 'AB.',
    logoSecondary: 'TOURS',
    logoSubtext: 'UAE',
    ctaLabel: 'Request a Quote',
    ctaHref: '/contact/request-a-quote',
    navGroups: [
      {
        key: 'uae-experiences',
        label: 'UAE Experiences',
        intro:
          'Emirates, day trips, multi-city packages and attraction tickets — all arranged by our UAE team.',
        overviewHref: '/uae-experiences',
        featureImage: img(IMG.desert, 'UAE desert dunes', 700),
        items: [
          {
            title: 'Dubai',
            description: 'City, souks and desert',
            href: '/uae-experiences/dubai',
          },
          {
            title: 'Abu Dhabi',
            description: 'Capital, culture, Al Ain',
            href: '/uae-experiences/abu-dhabi',
          },
          {
            title: 'Sharjah',
            description: 'Heritage and museums',
            href: '/uae-experiences/sharjah',
          },
          {
            title: 'Ras Al Khaimah',
            description: 'Mountains and coast',
            href: '/uae-experiences/ras-al-khaimah',
          },
          {
            title: 'Fujairah',
            description: 'The east coast',
            href: '/uae-experiences/fujairah',
          },
          {
            title: 'Umm Al Quwain',
            description: 'Lagoons and mangroves',
            href: '/uae-experiences/umm-al-quwain',
          },
          {
            title: 'Day Trips',
            description: 'Full days from Dubai',
            href: '/uae-experiences/day-trips',
          },
          {
            title: 'Multi-City Packages',
            description: 'Two or more emirates',
            href: '/uae-experiences/multi-city-packages',
          },
          {
            title: 'Attraction Tickets',
            description: 'Arranged by our team',
            href: '/uae-experiences/attraction-tickets',
          },
        ],
      },
      {
        key: 'international-holidays',
        label: 'International Holidays',
        intro:
          'Holidays beyond the UAE for residents and families — from easy-visa escapes to premium journeys.',
        overviewHref: '/international-holidays',
        featureImage: img(IMG.istanbul, 'International holidays', 700),
        items: [
          {
            title: 'Easy Visa Destinations',
            description: 'Simple trips from the UAE',
            href: '/international-holidays/easy-visa-destinations',
          },
          {
            title: 'Budget Packages',
            description: 'Great value',
            href: '/international-holidays/budget-packages',
          },
          {
            title: 'Midrange Packages',
            description: 'Comfort and value',
            href: '/international-holidays/midrange-packages',
          },
          {
            title: 'Premium Packages',
            description: 'Luxury, end to end',
            href: '/international-holidays/premium-packages',
          },
          {
            title: 'Cruises',
            description: 'At sea, in style',
            href: '/international-holidays/cruises',
          },
          {
            title: 'Bespoke Itineraries',
            description: 'Designed from scratch',
            href: '/international-holidays/bespoke-itineraries',
          },
        ],
      },
      {
        key: 'b2b-corporate',
        label: 'B2B & Corporate',
        intro:
          'A local partner for agencies, companies and event organisers working in the UAE.',
        overviewHref: '/b2b-corporate',
        featureImage: img(IMG.conference, 'B2B & Corporate', 700),
        items: [
          {
            title: 'DMC Services',
            description: 'Ground handling for agencies',
            href: '/b2b-corporate/dmc-services',
          },
          {
            title: 'Transportation Services',
            description: 'With AB Transport',
            href: '/b2b-corporate/transportation-services',
          },
          {
            title: 'MICE',
            description: 'Meetings, incentives, events',
            href: '/b2b-corporate/mice',
          },
          {
            title: 'Visa Services',
            description: 'UAE visa support',
            href: '/b2b-corporate/visa-services',
          },
          {
            title: 'Corporate Travel',
            description: 'Business trips handled',
            href: '/b2b-corporate/corporate-travel',
          },
        ],
      },
    ],
  },
  footer: {
    logoPrimary: 'AB.',
    logoSecondary: 'TOURS',
    logoSubtext: 'UAE',
    description: 'A destination management company in the UAE. Part of AB Group.',
    address: '[Office address]',
    phone: '[Phone]',
    email: '[Email]',
    columns: [
      {
        title: 'B2B & Corporate',
        links: [
          { label: 'DMC Services', href: '/b2b-corporate/dmc-services' },
          {
            label: 'Transportation Services',
            href: '/b2b-corporate/transportation-services',
          },
          { label: 'MICE', href: '/b2b-corporate/mice' },
          { label: 'Visa Services', href: '/b2b-corporate/visa-services' },
          { label: 'Corporate Travel', href: '/b2b-corporate/corporate-travel' },
        ],
      },
      {
        title: 'About Us',
        links: [
          { label: 'Company Profile', href: '/about/company-profile' },
          { label: 'Why AB Tours', href: '/about/why-ab-tours' },
          { label: 'Strategic Partners', href: '/about/strategic-partners' },
          { label: 'Testimonials', href: '/about/testimonials' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Travel Guides', href: '/resources/travel-guides' },
          { label: 'Blog', href: '/resources/blog' },
          { label: 'FAQs', href: '/resources/faqs' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { label: 'Request a Quote', href: '/contact/request-a-quote' },
          { label: 'Consultation Requests', href: '/contact/consultation-request' },
          { label: 'Partner Enquiries', href: '/contact/partner-enquiries' },
        ],
      },
    ],
    copyright: '© AB Tours UAE · Part of AB Group',
    licenceNumbers: '[UAE tourism licence numbers]',
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  whatsapp: {
    number: '[Phone]',
    smallLabel: 'Need help?',
    label: 'Chat with us',
  },
  replyTimeText: '[response time]',
  contactDetails: {
    office: '[Address, Dubai]',
    phone: '[Number]',
    whatsapp: '[Number]',
    email: '[Address]',
  },
  quotePlannerOptions: [
    { label: 'UAE experience', image: img(IMG.desert, 'UAE experience', 500) },
    { label: 'Multi-city package', image: img(IMG.mosque, 'Multi-city package', 500) },
    { label: 'Attraction tickets', image: img(IMG.frame, 'Attraction tickets', 500) },
    { label: 'International holiday', image: img(IMG.istanbul, 'International holiday', 500) },
    { label: 'Cruise', image: img(IMG.cruise, 'Cruise', 500) },
    { label: 'Corporate or MICE', image: img(IMG.conference, 'Corporate or MICE', 500) },
  ],
  consultationFormOptions: {
    topics: [
      'UAE experience',
      'International holiday',
      'Bespoke itinerary',
      'Corporate / MICE',
    ],
    channels: ['WhatsApp call', 'Phone call', 'Video call'],
    times: ['Morning', 'Afternoon', 'Evening'],
  },
  partnerFormOptions: {
    partnerTypes: [
      'Travel agency / tour operator',
      'Hotel or attraction',
      'Corporate client',
      'Other supplier',
    ],
    interests: [
      'DMC services',
      'Transportation',
      'MICE',
      'Visa services',
      'Corporate travel',
    ],
  },
  notFound: {
    title: 'Page not found',
    lead: 'The page you are looking for is not available. Choose one of the sections below to continue.',
  },
}

export const overviewPages: Record<string, StaticOverviewPage> = {
  'uae-experiences': {
    key: 'uae-experiences',
    title: 'UAE Experiences',
    lead: 'Emirates, day trips, multi-city packages and attraction tickets — all arranged by our UAE team.',
    heroImage: img(IMG.desert, 'UAE Experiences', 1800),
    heroVideoUrl: V('37412322/15845259_1280_720_60fps'),
    crumbs: [{ label: 'Home', href: '/' }, { label: 'UAE Experiences' }],
    cards: siteData.header.navGroups[0].items.map((item) => ({
      eyebrow: 'UAE Experiences',
      title: item.title,
      description: item.description,
      href: item.href,
    })),
  },
  'international-holidays': {
    key: 'international-holidays',
    title: 'International Holidays',
    lead: 'Holidays beyond the UAE for residents and families — from easy-visa escapes to premium journeys.',
    heroImage: img(IMG.istanbul, 'International Holidays', 1800),
    heroVideoUrl: V('20760797/20760797-hd_1280_720_50fps'),
    crumbs: [{ label: 'Home', href: '/' }, { label: 'International Holidays' }],
    cards: siteData.header.navGroups[1].items.map((item) => ({
      eyebrow: 'International Holidays',
      title: item.title,
      description: item.description,
      href: item.href,
    })),
  },
  'b2b-corporate': {
    key: 'b2b-corporate',
    title: 'B2B & Corporate',
    lead: 'A local partner for agencies, companies and event organisers working in the UAE.',
    heroImage: img(IMG.conference, 'B2B & Corporate', 1800),
    crumbs: [{ label: 'Home', href: '/' }, { label: 'B2B & Corporate' }],
    cards: siteData.header.navGroups[2].items.map((item) => ({
      eyebrow: 'B2B & Corporate',
      title: item.title,
      description: item.description,
      href: item.href,
    })),
  },
  about: {
    key: 'about',
    title: 'About Us',
    lead: 'AB Tours UAE is the destination management company of AB Group.',
    heroImage: img(IMG.coffee, 'About Us', 1800),
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About Us' }],
    cards: [
      {
        eyebrow: 'About Us',
        title: 'Company Profile',
        description: 'Who we are',
        href: '/about/company-profile',
      },
      {
        eyebrow: 'About Us',
        title: 'Why AB Tours',
        description: 'What makes us different',
        href: '/about/why-ab-tours',
      },
      {
        eyebrow: 'About Us',
        title: 'Strategic Partners',
        description: 'Who we work with',
        href: '/about/strategic-partners',
      },
      {
        eyebrow: 'About Us',
        title: 'Testimonials',
        description: 'What guests say',
        href: '/about/testimonials',
      },
    ],
  },
  resources: {
    key: 'resources',
    title: 'Resources',
    lead: 'Guides, stories and answers to help you plan.',
    heroImage: img(IMG.map, 'Resources', 1800),
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Resources' }],
    cards: [
      {
        eyebrow: 'Resources',
        title: 'Travel Guides',
        description: 'Plan with confidence',
        href: '/resources/travel-guides',
      },
      {
        eyebrow: 'Resources',
        title: 'Blog',
        description: 'Stories from the team',
        href: '/resources/blog',
      },
      {
        eyebrow: 'Resources',
        title: 'FAQs',
        description: 'Quick answers',
        href: '/resources/faqs',
      },
    ],
  },
}
