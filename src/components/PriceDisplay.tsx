import React from 'react'
import type { PriceInfo } from '@/content/types'

export function PriceDisplay({ price }: { price: PriceInfo }) {
  if (price.priceType === 'from_aed' && typeof price.amountAED === 'number') {
    return (
      <>
        From <b style={{ color: 'var(--navy)' }}>AED {price.amountAED.toLocaleString()}</b>{' '}
        {price.unit || 'per person'}
      </>
    )
  }

  return (
    <>
      <b style={{ color: 'var(--navy)' }}>Price on request</b>
    </>
  )
}
