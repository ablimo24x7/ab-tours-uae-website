import type { EmirateItem } from '../types'
import { IMG, V, img } from './media'

export const emirates: EmirateItem[] = [
  {
    slug: 'dubai',
    name: 'Dubai',
    tagline: 'Skyline, souks and the creek where the city began.',
    heroImage: img(IMG.dubai, 'Dubai', 1800),
    secondaryImage: img(IMG.burjArab, 'Dubai coastline and Burj Al Arab', 1100),
    videoUrl: V('34529274/14629593_1280_720_60fps'),
    storyParagraphs: [
      'Dubai moves fast, but its oldest stories sit along the creek: wind-tower houses, abra crossings and the spice and gold souks.',
      'Our team plans Dubai around you — a sunrise in the dunes, an evening on the water, or a family day built around the city’s parks and beaches.',
    ],
    bestTime: '[Months]',
    gettingThere: '[From Dubai: time]',
    visaNote: 'Depends on passport',
    transfersNote: 'AB Transport',
    faqs: [
      {
        question: 'How many days do I need in Dubai?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'When is the best time to visit Dubai?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'Can you arrange transfers and guides?',
        answer: '[Answer from the CMS — short and clear.]',
      },
    ],
  },
  {
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    tagline: 'Grand mosques, island museums and the Al Ain oasis.',
    heroImage: img(IMG.mosque, 'Abu Dhabi', 1800),
    secondaryImage: img(IMG.saadiyat, 'Saadiyat Island Abu Dhabi', 1100),
    videoUrl: V('16998220/16998220-hd_1280_720_30fps'),
    storyParagraphs: [
      'The capital pairs calm with scale: the white domes of Sheikh Zayed Grand Mosque, the museums of Saadiyat and long stretches of quiet coast.',
      'Inland, Al Ain’s oasis and forts show another side of the emirate.',
    ],
    bestTime: '[Months]',
    gettingThere: '[From Dubai: time]',
    visaNote: 'Depends on passport',
    transfersNote: 'AB Transport',
    faqs: [
      {
        question: 'How many days do I need in Abu Dhabi?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'When is the best time to visit Abu Dhabi?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'Can you arrange transfers and guides?',
        answer: '[Answer from the CMS — short and clear.]',
      },
    ],
  },
  {
    slug: 'sharjah',
    name: 'Sharjah',
    tagline: 'Heritage quarters, museums and an easy pace.',
    heroImage: img(IMG.sharjah, 'Sharjah', 1800),
    secondaryImage: img(IMG.sharjahCoast, 'Sharjah coast', 1100),
    storyParagraphs: [
      'Sharjah is the UAE’s cultural heart — restored heritage areas, museums and a coastline made for slow evenings.',
    ],
    bestTime: '[Months]',
    gettingThere: '[From Dubai: time]',
    visaNote: 'Depends on passport',
    transfersNote: 'AB Transport',
    faqs: [
      {
        question: 'How many days do I need in Sharjah?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'When is the best time to visit Sharjah?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'Can you arrange transfers and guides?',
        answer: '[Answer from the CMS — short and clear.]',
      },
    ],
  },
  {
    slug: 'ras-al-khaimah',
    name: 'Ras Al Khaimah',
    tagline: 'Mountain roads, mangroves and wide beaches.',
    heroImage: img(IMG.jais, 'Ras Al Khaimah', 1800),
    secondaryImage: img(IMG.camelsBeach, 'Ras Al Khaimah coast', 1100),
    storyParagraphs: [
      'In Ras Al Khaimah the Hajar Mountains meet the sea. Drive the roads of Jebel Jais, then end the day on the beach.',
    ],
    bestTime: '[Months]',
    gettingThere: '[From Dubai: time]',
    visaNote: 'Depends on passport',
    transfersNote: 'AB Transport',
    faqs: [
      {
        question: 'How many days do I need in Ras Al Khaimah?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'When is the best time to visit Ras Al Khaimah?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'Can you arrange transfers and guides?',
        answer: '[Answer from the CMS — short and clear.]',
      },
    ],
  },
  {
    slug: 'fujairah',
    name: 'Fujairah',
    tagline: 'The east coast, between mountains and sea.',
    heroImage: img(IMG.fujairah, 'Fujairah', 1800),
    secondaryImage: img(IMG.hatta, 'Hajar Mountains near Fujairah', 1100),
    storyParagraphs: [
      'On the Gulf of Oman side, Fujairah brings mountains, old forts and clear water for diving and snorkelling.',
    ],
    bestTime: '[Months]',
    gettingThere: '[From Dubai: time]',
    visaNote: 'Depends on passport',
    transfersNote: 'AB Transport',
    faqs: [
      {
        question: 'How many days do I need in Fujairah?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'When is the best time to visit Fujairah?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'Can you arrange transfers and guides?',
        answer: '[Answer from the CMS — short and clear.]',
      },
    ],
  },
  {
    slug: 'umm-al-quwain',
    name: 'Umm Al Quwain',
    tagline: 'Lagoons, mangroves and quiet islands.',
    heroImage: img(IMG.uaq, 'Umm Al Quwain', 1800),
    secondaryImage: img(IMG.uaq, 'Umm Al Quwain lagoons', 1100),
    storyParagraphs: [
      'Umm Al Quwain is the UAE at its quietest: mangrove lagoons for kayaking, birdlife and calm beaches.',
    ],
    bestTime: '[Months]',
    gettingThere: '[From Dubai: time]',
    visaNote: 'Depends on passport',
    transfersNote: 'AB Transport',
    faqs: [
      {
        question: 'How many days do I need in Umm Al Quwain?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'When is the best time to visit Umm Al Quwain?',
        answer: '[Answer from the CMS — short and clear.]',
      },
      {
        question: 'Can you arrange transfers and guides?',
        answer: '[Answer from the CMS — short and clear.]',
      },
    ],
  },
]
