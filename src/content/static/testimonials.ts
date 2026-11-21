import type { TestimonialItem } from '../types'

export const testimonials: TestimonialItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `testimonial-${i + 1}`,
  quote: `[Testimonial ${i + 1} from the CMS.]`,
  author: '[Name]',
  locationOrCompany: '[Country or company]',
}))
