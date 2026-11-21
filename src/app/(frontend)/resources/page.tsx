import { notFound } from 'next/navigation'
import React from 'react'
import { OverviewTemplate } from '@/components/OverviewTemplate'
import { getOverviewPage } from '@/content'

export default function ResourcesOverviewPage() {
  const page = getOverviewPage('resources')
  if (!page) notFound()

  return <OverviewTemplate page={page} />
}
