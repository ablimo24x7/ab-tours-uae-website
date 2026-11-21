import type { DestinationItem } from '../types'
import { IMG, img } from './media'

const DEST_IMG: Record<string, string> = {
  Georgia: IMG.tbilisi,
  Azerbaijan: IMG.baku,
  Turkey: IMG.istanbul,
  Thailand: IMG.thailand,
  Maldives: IMG.maldives,
  Switzerland: IMG.swiss,
}

const makeDests = (
  styleSlug: string,
  styleTitle: string,
  cardNote: string,
  fallbackImg: string,
  names: string[],
): DestinationItem[] =>
  names.map((name) => ({
    slug: `${styleSlug}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    styleSlug,
    styleTitle,
    cardImage: img(DEST_IMG[name] || fallbackImg, name, 900),
    cardNote,
    shortDescription: '[Short description, inclusions and best season from the CMS]',
  }))

export const destinations: DestinationItem[] = [
  ...makeDests(
    'easy-visa-destinations',
    'Easy Visa Destinations',
    '[Visa note for UAE residents — depends on nationality; maintained in the CMS]',
    IMG.tbilisi,
    ['Georgia', 'Azerbaijan', 'Thailand'],
  ),
  ...makeDests(
    'budget-packages',
    'Budget Packages',
    'From AED [price] per person',
    IMG.baku,
    ['Georgia', 'Azerbaijan', 'Turkey'],
  ),
  ...makeDests(
    'midrange-packages',
    'Midrange Packages',
    'From AED [price] per person',
    IMG.istanbul,
    ['Turkey', 'Thailand', 'Georgia'],
  ),
  ...makeDests(
    'premium-packages',
    'Premium Packages',
    'Price on request',
    IMG.maldives,
    ['Maldives', 'Switzerland', 'Turkey'],
  ),
  ...makeDests(
    'cruises',
    'Cruises',
    '[Cruise line and dates from the CMS]',
    IMG.cruise,
    ['Arabian Gulf cruises', 'Mediterranean cruises', '[Cruise route]'],
  ),
]
