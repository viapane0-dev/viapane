import { postgresAdapter } from '@payloadcms/db-postgres'
import { pt } from '@payloadcms/translations/languages/pt'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudinaryPlugin } from '@jhb.software/payload-cloudinary-plugin'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { ProductCategories } from './collections/ProductCategories'
import { BlogCategories } from './collections/BlogCategories'
import { Posts } from './collections/Posts'
import { Home } from './globals/Home'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cmsURL = process.env.NEXT_PUBLIC_CMS_URL || process.env.URL || 'http://localhost:3001'
const appURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL: cmsURL,
  cors: [appURL, cmsURL, 'http://localhost:3000', 'http://localhost:3001'],
  csrf: [appURL, cmsURL, 'http://localhost:3000', 'http://localhost:3001'],
  routes: {
    admin: '/admin',
  },

  i18n: {
    supportedLngs: ['pt', 'en'],
    fallbackLng: 'pt',
    translations: {
      pt,
    },
  } as any,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, ProductCategories, BlogCategories, Posts],
  globals: [Home],
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
  sharp,
  plugins: [
    payloadCloudinaryPlugin({
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
      credentials: {
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: {
        media: true,
      },
    }),
  ],
})
