import type { Field } from 'payload'

export const linkField = (name = 'link', label = 'Link'): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'internal',
      options: [
        { label: 'Internal path', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'internalPath',
      type: 'text',
      label: 'Internal path',
      admin: {
        condition: (_, siblingData) => siblingData?.type !== 'external',
        description: 'e.g. /uae-experiences/dubai (document picker added in Phase 05)',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'External URL',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'external',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in new tab',
      defaultValue: false,
    },
  ],
})
