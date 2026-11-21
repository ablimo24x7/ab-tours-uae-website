import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
// redirectsPlugin is installed; registered in Phase 10 once routed collections exist
// (Payload throws if redirectsPlugin is registered with no collections).
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Branding } from './globals/Branding'
import { ContactDetails } from './globals/ContactDetails'
import { Footer } from './globals/Footer'
import { FormSettings } from './globals/FormSettings'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const blobEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const smtpPort = Number(process.env.SMTP_PORT || 587)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/admin/AdminLogo#AdminLogo',
        Icon: '/components/admin/AdminIcon#AdminIcon',
      },
    },
  },
  collections: [Users, Media],
  globals: [
    Branding,
    Header,
    Footer,
    ContactDetails,
    SiteSettings,
    FormSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI || process.env.DATABASE_URL || '',
    },
  }),
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@example.com',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'AB Tours UAE',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: smtpPort,
          secure: smtpPort === 465,
          auth:
            process.env.SMTP_USER && process.env.SMTP_PASS
              ? {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                }
              : undefined,
        },
      })
    : undefined,
  sharp,
  plugins: [
    seoPlugin({}),
    // redirectsPlugin is added in Phase 10 once routed collections (e.g. pages) exist.
    nestedDocsPlugin({
      collections: [],
    }),
    ...(blobEnabled
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
            clientUploads: true,
          }),
        ]
      : []),
  ],
})
