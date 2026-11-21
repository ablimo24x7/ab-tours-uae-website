import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access'
import { linkField } from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'A UAE destination management company · Part of AB Group',
    },
    {
      name: 'topLinks',
      type: 'array',
      label: 'Top-bar links',
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField('link', 'Link'),
      ],
    },
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Main menu',
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField('link', 'Overview link'),
        { name: 'introText', type: 'textarea' },
        {
          name: 'featurePhoto',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'dropdownLinks',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'shortLine', type: 'text' },
            linkField('link', 'Link'),
          ],
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Header button label',
      defaultValue: 'Request a Quote',
    },
    linkField('ctaLink', 'Header button link'),
  ],
}
