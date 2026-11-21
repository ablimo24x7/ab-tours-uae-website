import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
    defaultColumns: ['filename', 'alt', 'width', 'height', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        const mime = typeof data?.mimeType === 'string' ? data.mimeType : ''
        const width = typeof data?.width === 'number' ? data.width : null
        if (mime.startsWith('image/') && width !== null && width < 2400) {
          console.warn(
            `[Media] Hero image warning: "${data?.filename || 'image'}" is ${width}px wide (recommended >= 2400px for hero banners).`,
          )
          return {
            ...data,
            heroWidthWarning: `Width is ${width}px (recommended >= 2400px for hero banners).`,
          }
        }
        return {
          ...data,
          heroWidthWarning: '',
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Credit (photographer)',
    },
    {
      name: 'heroWidthWarning',
      type: 'text',
      label: 'Hero resolution notice',
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => Boolean(data?.heroWidthWarning),
        description:
          'Non-blocking warning shown when an uploaded image is under 2400 px wide.',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'application/pdf'],
    focalPoint: true,
    crop: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 900,
        height: 675,
        position: 'centre',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 2400,
        height: undefined,
        position: 'centre',
      },
    ],
  },
}
