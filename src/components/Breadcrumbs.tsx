import Link from 'next/link'
import React from 'react'
import type { CrumbItem } from './types'

export function Breadcrumbs({ items }: { items?: CrumbItem[] }) {
  if (!items || items.length === 0) return null

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {index > 0 ? <span aria-hidden="true">›</span> : null}
          {item.href && index < items.length - 1 ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
