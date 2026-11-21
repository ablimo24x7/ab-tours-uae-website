import type { PackageDayItem, PackageItem } from '../types'
import { IMG, img } from './media'

const DAYS: PackageDayItem[] = [
  {
    place: 'Dubai',
    title: 'Arrive and settle in',
    text: 'Met at the airport by AB Transport and taken to your hotel.',
    image: img(IMG.dubaiNight, 'Dubai skyline at night', 1200),
  },
  {
    place: 'Dubai',
    title: 'Old Dubai and the creek',
    text: 'Wind-tower houses, an abra crossing and the souks with a local guide.',
    image: img(IMG.souk, 'Dubai spice and gold souks', 1200),
  },
  {
    place: 'Dubai',
    title: 'Into the desert',
    text: 'Afternoon dune drive, sunset and dinner at a desert camp.',
    image: img(IMG.dunes, 'Dubai desert dunes', 1200),
  },
  {
    place: 'Abu Dhabi',
    title: 'The capital',
    text: 'Sheikh Zayed Grand Mosque and the Saadiyat cultural district.',
    image: img(IMG.mosque, 'Sheikh Zayed Grand Mosque', 1200),
  },
  {
    place: 'Sharjah',
    title: 'Heritage and museums',
    text: 'Sharjah’s heritage area and museums at an easy pace.',
    image: img(IMG.sharjah, 'Sharjah heritage area', 1200),
  },
  {
    place: 'Ras Al Khaimah',
    title: 'Mountain day',
    text: 'The roads and viewpoints of Jebel Jais.',
    image: img(IMG.jais, 'Jebel Jais mountains', 1200),
  },
  {
    place: 'Dubai',
    title: 'Departure',
    text: 'Transfer to the airport with AB Transport.',
  },
]

const buildItinerary = (daysCount: number): PackageDayItem[] =>
  daysCount === 7 ? DAYS : [...DAYS.slice(0, daysCount - 1), DAYS[6]]

const sharedIncluded = [
  '[Hotel nights]',
  'Transfers by AB Transport',
  '[Guided visits]',
  '[Meals]',
]

const sharedShaped = [
  'Change dates or pace',
  'Choose hotel level',
  'Add an emirate',
  'Private or small group',
]

const sharedFaqs = [
  {
    question: 'Can I change the dates or hotels?',
    answer: '[Answer from the CMS — short and clear.]',
  },
  {
    question: 'Is it private or shared?',
    answer: '[Answer from the CMS — short and clear.]',
  },
  {
    question: 'Do you help with the UAE visa?',
    answer: '[Answer from the CMS — short and clear.]',
  },
]

export const packages: PackageItem[] = [
  {
    slug: '7-day-uae-highlights',
    title: '7-Day UAE Highlights',
    days: 7,
    style: 'Culture',
    cardImage: img(IMG.dubai, '7-Day UAE Highlights', 1800),
    route: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'],
    intro:
      'Four emirates in a week: city, capital, culture and mountains, at a comfortable pace.',
    summary:
      '[Short summary: who this package suits, what it covers and how our team adjusts it.]',
    price: { priceType: 'on_request' },
    itinerary: buildItinerary(7),
    included: sharedIncluded,
    shapedAroundYou: sharedShaped,
    faqs: sharedFaqs,
  },
  {
    slug: '5-day-dubai-abu-dhabi-family',
    title: 'Dubai & Abu Dhabi for Families',
    days: 5,
    style: 'Family',
    cardImage: img(IMG.burjArab, 'Dubai & Abu Dhabi for Families', 1800),
    route: ['Dubai', 'Abu Dhabi'],
    intro: 'Beaches, theme parks and short, easy days built around children.',
    summary:
      '[Short summary: who this package suits, what it covers and how our team adjusts it.]',
    price: { priceType: 'on_request' },
    itinerary: buildItinerary(5),
    included: sharedIncluded,
    shapedAroundYou: sharedShaped,
    faqs: sharedFaqs,
  },
  {
    slug: '4-day-desert-and-heritage',
    title: 'Desert & Heritage Escape',
    days: 4,
    style: 'Desert',
    cardImage: img(IMG.desert, 'Desert & Heritage Escape', 1800),
    route: ['Dubai', 'Al Ain'],
    intro: 'Dunes, a desert camp and the oasis town of Al Ain.',
    summary:
      '[Short summary: who this package suits, what it covers and how our team adjusts it.]',
    price: { priceType: 'on_request' },
    itinerary: buildItinerary(4),
    included: sharedIncluded,
    shapedAroundYou: sharedShaped,
    faqs: sharedFaqs,
  },
  {
    slug: '6-day-east-coast-and-mountains',
    title: 'East Coast & Mountains',
    days: 6,
    style: 'Adventure',
    cardImage: img(IMG.fujairah, 'East Coast & Mountains', 1800),
    route: ['Dubai', 'Ras Al Khaimah', 'Fujairah'],
    intro: 'Mountain drives, quiet beaches and clear water on the east coast.',
    summary:
      '[Short summary: who this package suits, what it covers and how our team adjusts it.]',
    price: { priceType: 'on_request' },
    itinerary: buildItinerary(6),
    included: sharedIncluded,
    shapedAroundYou: sharedShaped,
    faqs: sharedFaqs,
  },
]
