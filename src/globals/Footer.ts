import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access'
import { linkField } from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'A destination management company in the UAE. Part of AB Group.',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            linkField('link', 'Link'),
          ],
        },
      ],
    },
    {
      name: 'bottomText',
      type: 'text',
      label: 'Bottom line text',
      defaultValue: '© AB Tours UAE · Part of AB Group',
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        linkField('link', 'Link'),
      ],
    },
  ],
}
