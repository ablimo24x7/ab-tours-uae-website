import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access'

export const ContactDetails: GlobalConfig = {
  slug: 'contact-details',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'officeAddress',
      type: 'text',
      defaultValue: '[Office address]',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '[Phone]',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '[Phone]',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: '[Email]',
    },
    {
      name: 'officeHours',
      type: 'text',
      defaultValue: '[Office hours]',
    },
    {
      name: 'mapLink',
      type: 'text',
      label: 'Map link',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'licenceNumbers',
      type: 'text',
      defaultValue: '[UAE tourism licence numbers]',
    },
  ],
}
