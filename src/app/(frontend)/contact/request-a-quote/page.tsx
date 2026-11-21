import React from 'react'
import { ThreeStepQuoteForm } from '@/components/ContactForms'
import { getSiteData } from '@/content'

export default function RequestAQuotePage() {
  const { quotePlannerOptions } = getSiteData()

  return <ThreeStepQuoteForm options={quotePlannerOptions} />
}
