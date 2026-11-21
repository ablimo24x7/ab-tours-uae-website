import type { GlobalConfig } from 'payload'
import { adminFieldOnly, isAdminOrEditor } from '../access'

export const FormSettings: GlobalConfig = {
  slug: 'form-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'recipients',
      type: 'group',
      label: 'Enquiry recipient emails (Admin only)',
      access: adminFieldOnly,
      fields: [
        { name: 'leisure', type: 'email', label: 'Leisure UAE recipient email' },
        { name: 'outbound', type: 'email', label: 'Outbound holidays recipient email' },
        { name: 'b2b', type: 'email', label: 'B2B & Corporate recipient email' },
      ],
    },
    {
      name: 'replyTimePromise',
      type: 'text',
      label: 'Reply-time promise text (Admin only)',
      defaultValue: '[response time]',
      access: adminFieldOnly,
    },
    {
      name: 'quotePlanningOptions',
      type: 'array',
      label: 'Quote planner — "What are you planning?" options',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'budgetLevels',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'preferredContactMethods',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'consultationTopics',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'consultationMethods',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'timeSlots',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'partnerTypes',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'partnerInterests',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'thankYouHeading',
      type: 'text',
      defaultValue: 'Your trip is in good hands',
    },
    {
      name: 'thankYouText',
      type: 'textarea',
      defaultValue:
        'Thank you — in the live site this becomes a lead in the CMS and our team replies.',
    },
  ],
}
