import type { PartnerItem } from '../types'

const categories: PartnerItem['category'][] = [
  'Hotels & resorts',
  'Attractions',
  'Airlines & cruise lines',
]

export const partners: PartnerItem[] = categories.flatMap((category, groupIndex) =>
  Array.from({ length: 6 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    name: `[Logo ${i + 1}]`,
    category,
    showOnHomepage: groupIndex === 0,
  })),
)

export const homepagePartnerPlaceholders = Array.from({ length: 6 }, (_, i) => ({
  id: `hp-${i + 1}`,
  label: `[Partner logo ${i + 1}]`,
}))
