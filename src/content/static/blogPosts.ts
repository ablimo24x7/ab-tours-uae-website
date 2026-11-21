import type { BlogPostItem } from '../types'
import { IMG, img } from './media'

export const blogPosts: BlogPostItem[] = [
  {
    slug: 'old-dubai-and-the-creek',
    title: '[Post title]',
    date: '[Date]',
    category: 'Dubai',
    summary: '[Post summary from the CMS.]',
    cardImage: img(IMG.creek, 'Dubai Creek', 1200),
    bodyParagraphs: ['[Post body from the CMS.]'],
  },
  {
    slug: 'spice-and-gold-souks',
    title: '[Post title]',
    date: '[Date]',
    category: 'Culture',
    summary: '[Post summary from the CMS.]',
    cardImage: img(IMG.souk, 'Dubai souks', 1200),
    bodyParagraphs: ['[Post body from the CMS.]'],
  },
  {
    slug: 'corporate-events-in-the-uae',
    title: '[Post title]',
    date: '[Date]',
    category: 'Corporate',
    summary: '[Post summary from the CMS.]',
    cardImage: img(IMG.gala, 'Corporate gala event', 1200),
    bodyParagraphs: ['[Post body from the CMS.]'],
  },
]
