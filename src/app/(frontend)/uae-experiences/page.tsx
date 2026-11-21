import { notFound } from 'next/navigation'
import React from 'react'
import { OverviewTemplate } from '@/components/OverviewTemplate'
import { getOverviewPage } from '@/content'

export default function UAEExperiencesOverviewPage() {
  const page = getOverviewPage('uae-experiences')
  if (!page) notFound()

  return <OverviewTemplate page={page} />
}
