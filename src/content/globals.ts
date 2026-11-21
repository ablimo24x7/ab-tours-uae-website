import config from '@payload-config'
import { getPayload } from 'payload'
import type {
  FooterProps,
  HeaderProps,
  MediaAsset,
  NavGroup,
} from '@/components/types'
import { siteData } from './static/site'

interface LinkGroupValue {
  type?: 'internal' | 'external' | null
  internalPath?: string | null
  url?: string | null
  newTab?: boolean | null
}

function resolveLinkHref(link?: LinkGroupValue | null, fallback = '#'): string {
  if (!link) return fallback
  if (link.type === 'external' && link.url) return link.url
  if (link.internalPath) return link.internalPath
  return fallback
}

function resolveMedia(media: unknown, fallbackAlt = ''): MediaAsset | undefined {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    const alt = 'alt' in media && typeof media.alt === 'string' ? media.alt : fallbackAlt
    return { url: media.url, alt }
  }
  return undefined
}

export interface CMSSiteShell {
  header: HeaderProps
  footer: FooterProps
  whatsappNumber: string
  replyTimeText: string
  colourStyle: Record<string, string>
}

export async function getCMSSiteShell(): Promise<CMSSiteShell> {
  const fallback: CMSSiteShell = {
    header: siteData.header,
    footer: siteData.footer,
    whatsappNumber: siteData.whatsapp.number,
    replyTimeText: siteData.replyTimeText,
    colourStyle: {},
  }

  try {
    const payload = await getPayload({ config })
    const [branding, headerDoc, footerDoc, contactDoc, formDoc] = await Promise.all([
      payload.findGlobal({ slug: 'branding', depth: 1, overrideAccess: true }),
      payload.findGlobal({ slug: 'header', depth: 1, overrideAccess: true }),
      payload.findGlobal({ slug: 'footer', depth: 1, overrideAccess: true }),
      payload.findGlobal({ slug: 'contact-details', depth: 1, overrideAccess: true }),
      payload.findGlobal({ slug: 'form-settings', depth: 1, overrideAccess: true }),
    ])

    const colourStyle: Record<string, string> = {}
    const overrides = branding?.colourOverrides
    if (overrides) {
      if (overrides.blue) colourStyle['--blue'] = overrides.blue
      if (overrides.green) colourStyle['--green'] = overrides.green
      if (overrides.sun) colourStyle['--sun'] = overrides.sun
      if (overrides.night) colourStyle['--night'] = overrides.night
      if (overrides.cream) colourStyle['--cream'] = overrides.cream
    }

    const fullColourLogo = resolveMedia(branding?.fullColourLogo, 'AB Tours UAE')
    const whiteLogo = resolveMedia(branding?.whiteLogo, 'AB Tours UAE')

    const navGroups: NavGroup[] =
      headerDoc?.mainMenu && headerDoc.mainMenu.length > 0
        ? headerDoc.mainMenu.map((item, idx) => {
            const fallbackGroup =
              siteData.header.navGroups[idx] || siteData.header.navGroups[0]
            const key =
              (['uae-experiences', 'international-holidays', 'b2b-corporate'][
                idx
              ] as NavGroup['key']) || fallbackGroup.key
            return {
              key,
              label: item.label || fallbackGroup.label,
              intro: item.introText || fallbackGroup.intro,
              overviewHref: resolveLinkHref(item.link, fallbackGroup.overviewHref),
              featureImage:
                resolveMedia(item.featurePhoto, item.label) ||
                fallbackGroup.featureImage,
              items:
                item.dropdownLinks && item.dropdownLinks.length > 0
                  ? item.dropdownLinks.map((d) => ({
                      title: d.name,
                      description: d.shortLine || '',
                      href: resolveLinkHref(d.link, '#'),
                    }))
                  : fallbackGroup.items,
            }
          })
        : siteData.header.navGroups

    const header: HeaderProps = {
      ...siteData.header,
      tagline: headerDoc?.tagline || siteData.header.tagline,
      topLinks:
        headerDoc?.topLinks && headerDoc.topLinks.length > 0
          ? headerDoc.topLinks.map((t) => ({
              label: t.label,
              href: resolveLinkHref(t.link, '#'),
            }))
          : siteData.header.topLinks,
      navGroups,
      ctaLabel: headerDoc?.ctaLabel || siteData.header.ctaLabel,
      ctaHref: resolveLinkHref(headerDoc?.ctaLink, siteData.header.ctaHref),
      logoImage: fullColourLogo,
      logoWhiteImage: whiteLogo,
    }

    const footer: FooterProps = {
      ...siteData.footer,
      description: footerDoc?.description || siteData.footer.description,
      address: contactDoc?.officeAddress || siteData.footer.address,
      phone: contactDoc?.phone || siteData.footer.phone,
      email: contactDoc?.email || siteData.footer.email,
      licenceNumbers: contactDoc?.licenceNumbers || siteData.footer.licenceNumbers,
      columns:
        footerDoc?.columns && footerDoc.columns.length > 0
          ? footerDoc.columns.map((col) => ({
              title: col.heading,
              links: (col.links || []).map((l) => ({
                label: l.label,
                href: resolveLinkHref(l.link, '#'),
              })),
            }))
          : siteData.footer.columns,
      copyright: footerDoc?.bottomText || siteData.footer.copyright,
      legalLinks:
        footerDoc?.legalLinks && footerDoc.legalLinks.length > 0
          ? footerDoc.legalLinks.map((l) => ({
              label: l.label,
              href: resolveLinkHref(l.link, '#'),
            }))
          : siteData.footer.legalLinks,
      logoImage: whiteLogo || fullColourLogo,
    }

    return {
      header,
      footer,
      whatsappNumber: contactDoc?.whatsappNumber || siteData.whatsapp.number,
      replyTimeText: formDoc?.replyTimePromise || siteData.replyTimeText,
      colourStyle,
    }
  } catch {
    return fallback
  }
}
