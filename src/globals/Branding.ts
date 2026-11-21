import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access'

const hexValidator = (val: string | null | undefined): true | string => {
  if (!val || val.trim() === '') return true
  return /^#[0-9A-Fa-f]{6}$/.test(val.trim())
    ? true
    : 'Enter a 6-digit hex colour such as #0A66E8, or leave empty for the default.'
}

export const Branding: GlobalConfig = {
  slug: 'branding',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'fullColourLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Full-colour logo',
    },
    {
      name: 'whiteLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'White logo (over dark heroes)',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'defaultSocialImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default social share image',
    },
    {
      name: 'colourOverrides',
      type: 'group',
      label: 'Optional colour overrides',
      admin: {
        description:
          'Leave empty to use the approved Design C6 palette values.',
      },
      fields: [
        { name: 'blue', type: 'text', label: '--blue', validate: hexValidator },
        { name: 'green', type: 'text', label: '--green', validate: hexValidator },
        { name: 'sun', type: 'text', label: '--sun', validate: hexValidator },
        { name: 'night', type: 'text', label: '--night', validate: hexValidator },
        { name: 'cream', type: 'text', label: '--cream', validate: hexValidator },
      ],
    },
  ],
}
