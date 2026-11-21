'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Split .head h2 into animated word spans unless already split
    document.querySelectorAll('.head h2:not([data-split])').forEach((heading) => {
      heading.setAttribute('data-split', '1')
      const words = (heading.textContent || '').trim().split(/\s+/).filter(Boolean)
      heading.textContent = ''
      words.forEach((word, index) => {
        const span = document.createElement('span')
        span.className = 'w'
        span.style.setProperty('--i', String(index))
        span.textContent = word
        heading.appendChild(span)
        if (index < words.length - 1) {
          heading.appendChild(document.createTextNode(' '))
        }
      })
    })

    // Apply staggered delays to grid children
    document
      .querySelectorAll('.cards, .quotes, .cta3, .tree, .events, .mosaic')
      .forEach((grid) => {
        Array.from(grid.children).forEach((child, index) => {
          if (child instanceof HTMLElement && child.classList.contains('rv')) {
            child.style.setProperty('--d', `${(index % 6) * 90}ms`)
          }
        })
      })

    const targets = Array.from(document.querySelectorAll('.rv, .head'))

    if (reduced) {
      targets.forEach((el) => el.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}
