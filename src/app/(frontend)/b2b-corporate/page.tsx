import { notFound } from 'next/navigation'
import React from 'react'
import { OverviewTemplate } from '@/components/OverviewTemplate'
import { getOverviewPage } from '@/content'

export default function B2BCorporateOverviewPage() {
  const page = getOverviewPage('b2b-corporate')
  if (!page) notFound()

  return <OverviewTemplate page={page} />
}
