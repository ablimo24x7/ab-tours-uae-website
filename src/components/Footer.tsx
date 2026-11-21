import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { FooterProps } from './types'

export function Footer({
  logoPrimary,
  logoSecondary,
  logoSubtext,
  logoImage,
  description,
  address,
  phone,
  email,
  columns,
  copyright,
  licenceNumbers,
  legalLinks,
}: FooterProps) {
  return (
    <footer>
      <div className="wrap top">
        <div className="brand">
          {logoImage ? (
            <Image
              src={logoImage.url}
              alt={logoImage.alt || 'AB Tours UAE'}
              width={160}
              height={46}
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <b>
              <span>{logoPrimary}</span>
              <span>{logoSecondary}</span> {logoSubtext}
            </b>
          )}
          <p style={{ marginTop: '14px', maxWidth: '300px' }}>{description}</p>
          <p style={{ marginTop: '14px', fontSize: '13px' }}>
            {address} · {phone} · {email}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="wrap bottom">
        <span>
          {copyright} · Licence: {licenceNumbers}
        </span>
        <span>
          {legalLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 ? ' · ' : null}
              <Link href={link.href} style={{ display: 'inline' }}>
                {link.label}
              </Link>
            </React.Fragment>
          ))}
        </span>
      </div>
    </footer>
  )
}
