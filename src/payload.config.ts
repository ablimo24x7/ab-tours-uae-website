import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
// redirectsPlugin is installed; registered in Phase 10 once routed collections exist
// (Payload throws if redirectsPlugin is registered with no collections).
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const s3Enabled = Boolean(process.env.S3_BUCKET)
const smtpPort = Number(process.env.SMTP_PORT || 587)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
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
    ...(s3Enabled
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
              region: process.env.S3_REGION || 'us-east-1',
              endpoint: process.env.S3_ENDPOINT || undefined,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
})
