import type { GuideItem } from '../types'
import { IMG, img } from './media'

export const guides: GuideItem[] = [
  {
    slug: 'best-time-to-visit-the-uae',
    title: 'Best time to visit the UAE',
    tag: 'Planning',
    cardImage: img(IMG.desert, 'Best time to visit the UAE', 900),
    intro: 'Season-by-season notes for planning your UAE trip.',
    bodyParagraphs: [
      '[Guide article body from the CMS — covering winter, shoulder months, and summer indoor experiences.]',
      '[Practical tips on booking desert camps, beaches, and city attractions across the seven emirates.]',
    ],
  },
  {
    slug: 'what-to-wear-in-the-uae',
    title: 'What to wear in the UAE',
    tag: 'Culture',
    cardImage: img(IMG.mosque2, 'What to wear in the UAE', 900),
    intro: 'Respectful, comfortable clothing for mosques, souks, beaches and desert evenings.',
    bodyParagraphs: [
      '[Guide article body from the CMS — dress code guidance for cultural landmarks, malls, and desert trips.]',
    ],
  },
  {
    slug: 'a-first-timers-dubai',
    title: 'A first-timer’s Dubai',
    tag: 'Dubai',
    cardImage: img(IMG.dubai, 'A first-timer’s Dubai', 900),
    intro: 'How to balance Old Dubai, the skyline, beaches and the desert on a first visit.',
    bodyParagraphs: [
      '[Guide article body from the CMS — suggested neighbourhoods, creek crossings, and evening experiences.]',
    ],
  },
  {
    slug: 'abu-dhabi-with-children',
    title: 'Abu Dhabi with children',
    tag: 'Family',
    cardImage: img(IMG.burjArab, 'Abu Dhabi with children', 900),
    intro: 'Easy-paced family days across Yas Island, Saadiyat and the Corniche.',
    bodyParagraphs: [
      '[Guide article body from the CMS — family-friendly attractions, pacing, and private transport tips.]',
    ],
  },
  {
    slug: 'three-days-in-the-mountains',
    title: 'Three days in the mountains',
    tag: 'Adventure',
    cardImage: img(IMG.jais, 'Three days in the mountains', 900),
    intro: 'Hatta, Jebel Jais and the east coast roads.',
    bodyParagraphs: [
      '[Guide article body from the CMS — mountain drives, viewpoints, and outdoor activities.]',
    ],
  },
  {
    slug: 'easy-visa-trips-from-the-uae',
    title: 'Easy-visa trips from the UAE',
    tag: 'Outbound',
    cardImage: img(IMG.tbilisi, 'Easy-visa trips from the UAE', 900),
    intro: 'Short-haul escapes for UAE residents.',
    bodyParagraphs: [
      '[Guide article body from the CMS — overview of popular short-haul destinations and visa notes.]',
    ],
  },
]
