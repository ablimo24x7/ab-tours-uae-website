import { notFound } from 'next/navigation'
import React from 'react'
import { OverviewTemplate } from '@/components/OverviewTemplate'
import { getOverviewPage } from '@/content'

export default function InternationalHolidaysOverviewPage() {
  const page = getOverviewPage('international-holidays')
  if (!page) notFound()

  return <OverviewTemplate page={page} />
}
