import type { GlobalConfig } from 'payload'
import { hideFromNonAdmin, isAdmin } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
    hidden: ({ user }) => hideFromNonAdmin({ user }),
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'AB Tours UAE',
    },
    {
      name: 'seoTitleSuffix',
      type: 'text',
      defaultValue: ' — AB Tours UAE',
    },
    {
      name: 'defaultSeoDescription',
      type: 'textarea',
      defaultValue: 'AB Tours UAE — Destination Management Company',
    },
    {
      name: 'analyticsId',
      type: 'text',
      label: 'Google Analytics / Tag Manager ID',
    },
    {
      name: 'notFoundTitle',
      type: 'text',
      label: '404 page title',
      defaultValue: 'Page not found',
    },
    {
      name: 'notFoundText',
      type: 'textarea',
      label: '404 page text',
      defaultValue:
        'The page you are looking for is not available. Choose one of the sections below to continue.',
    },
  ],
}
