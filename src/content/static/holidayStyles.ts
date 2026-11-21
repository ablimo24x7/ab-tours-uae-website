import type { HolidayStyleItem } from '../types'
import { IMG, img } from './media'

export const holidayStyles: HolidayStyleItem[] = [
  {
    slug: 'easy-visa-destinations',
    title: 'Easy Visa Destinations',
    shortLine: 'Simple trips from the UAE',
    lead: 'Short-notice escapes with simple visa steps for UAE residents.',
    cardNote: '[Visa note for UAE residents — depends on nationality; maintained in the CMS]',
    heroImage: img(IMG.tbilisi, 'Easy Visa Destinations', 1800),
    disclaimerNote: 'Destinations shown are examples — the final list comes from the client.',
  },
  {
    slug: 'budget-packages',
    title: 'Budget Packages',
    shortLine: 'Great value',
    lead: 'Great-value holidays with everything sorted.',
    cardNote: 'From AED [price] per person',
    heroImage: img(IMG.baku, 'Budget Packages', 1800),
    disclaimerNote: 'Destinations shown are examples — the final list comes from the client.',
  },
  {
    slug: 'midrange-packages',
    title: 'Midrange Packages',
    shortLine: 'Comfort and value',
    lead: 'More comfort, more choice, still great value.',
    cardNote: 'From AED [price] per person',
    heroImage: img(IMG.istanbul, 'Midrange Packages', 1800),
    disclaimerNote: 'Destinations shown are examples — the final list comes from the client.',
  },
  {
    slug: 'premium-packages',
    title: 'Premium Packages',
    shortLine: 'Luxury, end to end',
    lead: 'Luxury stays and private experiences, handled end to end.',
    cardNote: 'Price on request',
    heroImage: img(IMG.maldives, 'Premium Packages', 1800),
    disclaimerNote: 'Destinations shown are examples — the final list comes from the client.',
  },
  {
    slug: 'cruises',
    title: 'Cruises',
    shortLine: 'At sea, in style',
    lead: 'Sail the Arabian Gulf or further afield, with every detail arranged.',
    cardNote: '[Cruise line and dates from the CMS]',
    heroImage: img(IMG.cruise, 'Cruises', 1800),
    disclaimerNote: 'Destinations shown are examples — the final list comes from the client.',
  },
]
