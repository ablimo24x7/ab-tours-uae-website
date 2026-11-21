import type {
  FAQItem,
  FloatingWhatsAppProps,
  FooterProps,
  HeaderProps,
} from '@/components/types'

const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=78&auto=format&fit=crop`

export const sampleHeaderProps: HeaderProps = {
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
      featureImage: {
        url: unsplash('1489493585363-d69421e0edd3', 700),
        alt: 'UAE desert dunes at golden hour',
      },
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
      featureImage: {
        url: unsplash('1524231757912-21f4fe3a7200', 700),
        alt: 'International holiday skyline at dusk',
      },
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
      featureImage: {
        url: unsplash('1540575467063-178a50c2df87', 700),
        alt: 'Corporate conference and event hall',
      },
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
}

export const sampleFooterProps: FooterProps = {
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
}

export const sampleWhatsAppProps: FloatingWhatsAppProps = {
  number: '[Phone]',
  smallLabel: 'Need help?',
  label: 'Chat with us',
}

export const sampleFAQs: FAQItem[] = [
  {
    question: 'Do I book and pay on this website?',
    answer:
      'No — AB Tours UAE is a brand showcase and enquiry platform. Request a quote or book a consultation and our travel designers reply with a tailored proposal.',
  },
  {
    question: 'Can you arrange private transport across all seven emirates?',
    answer:
      'Yes, transfers and multi-emirate touring are operated with AB Transport, part of AB Group.',
  },
  {
    question: 'How quickly does your team respond to enquiries?',
    answer: 'Our team replies within [response time].',
  },
]
