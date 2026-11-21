import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function AdminLogo() {
  let logoUrl: string | null = null
  let logoAlt = 'AB Tours UAE'

  try {
    const payload = await getPayload({ config })
    const branding = await payload.findGlobal({
      slug: 'branding',
      depth: 1,
      overrideAccess: true,
    })
    const logo = branding?.fullColourLogo
    if (logo && typeof logo === 'object' && 'url' in logo && logo.url) {
      logoUrl = logo.url
      logoAlt = logo.alt || 'AB Tours UAE'
    }
  } catch {
    // Fallback to text logo if database is not yet initialized
  }

  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={logoAlt}
        style={{ maxHeight: '36px', width: 'auto' }}
      />
    )
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        lineHeight: 1,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <b style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '0.02em' }}>
        <span style={{ color: '#0A66E8' }}>AB.</span>
        <span style={{ color: '#14804A' }}>TOURS</span>
      </b>
      <small style={{ fontSize: '9px', letterSpacing: '0.32em', marginTop: '4px', opacity: 0.8 }}>
        UAE
      </small>
    </span>
  )
}
