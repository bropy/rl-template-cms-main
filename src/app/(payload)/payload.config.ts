import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { envClient, envServer } from '@/config/env'

import { Categories, Images, LayoutGlobal, Pages, Products, Templates, Users } from './entities'
import { locales } from './shared/constants'
import { plugins } from './widgets/plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// config
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, '(app)/admin/importMap.js'),
    },
    routes: {
      createFirstUser: '/create-root-user',
    },
    meta: {
      title: 'CMS Template',
      description: 'CMS Template - manage your content',
    },
    livePreview: {
      url: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
    },
  },
  routes: {
    admin: '/admin',
    api: '/api/rest',
  },
  collections: [Pages, Categories, Products, Templates, Images, Users],
  globals: [LayoutGlobal],
  editor: lexicalEditor(),
  secret: envServer.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  defaultDepth: 2,
  maxDepth: 4,
  db: postgresAdapter({
    idType: 'uuid',
    migrationDir: path.resolve(dirname, 'migrations'),
    generateSchemaOutputFile: path.resolve(dirname, 'db.schema.ts'),
    pool: {
      connectionString: envServer.DATABASE_URI,
    },
    readReplicas: envServer.DATABASE_URI_READ_ONLY ? [envServer.DATABASE_URI_READ_ONLY] : undefined,
    push: false,
  }),
  sharp,
  plugins,
  localization: locales,
  debug: envServer.NODE_ENV !== 'production',
})
