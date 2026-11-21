import type { TicketItem } from '../types'
import { IMG, img } from './media'

export const tickets: TicketItem[] = [
  {
    slug: 'burj-khalifa-observation-deck',
    title: 'Burj Khalifa observation deck',
    emirate: 'Dubai',
    cardImage: img(IMG.dubaiNight, 'Burj Khalifa observation deck', 900),
    metaLabel: 'Tickets arranged for you',
  },
  {
    slug: 'dubai-frame',
    title: 'Dubai Frame',
    emirate: 'Dubai',
    cardImage: img(IMG.frame, 'Dubai Frame', 900),
    metaLabel: 'Tickets arranged for you',
  },
  {
    slug: 'louvre-abu-dhabi',
    title: 'Louvre Abu Dhabi',
    emirate: 'Abu Dhabi',
    cardImage: img(IMG.saadiyat, 'Louvre Abu Dhabi', 900),
    metaLabel: 'Tickets arranged for you',
  },
  {
    slug: 'ferrari-world-abu-dhabi',
    title: 'Ferrari World Abu Dhabi',
    emirate: 'Abu Dhabi',
    cardImage: img(IMG.ferrari, 'Ferrari World Abu Dhabi', 900),
    metaLabel: 'Tickets arranged for you',
  },
  {
    slug: 'dubai-aquarium',
    title: 'Dubai Aquarium',
    emirate: 'Dubai',
    cardImage: img(IMG.aquarium, 'Dubai Aquarium', 900),
    metaLabel: 'Tickets arranged for you',
  },
  {
    slug: 'dubai-miracle-garden',
    title: 'Dubai Miracle Garden',
    emirate: 'Dubai',
    cardImage: img(IMG.garden, 'Dubai Miracle Garden', 900),
    metaLabel: 'Tickets arranged for you',
  },
]
