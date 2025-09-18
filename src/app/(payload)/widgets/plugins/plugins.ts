// plugins
import { Plugin } from 'payload'

// import { copyResolver, openAIResolver, translator } from '@payload-enchants/translator'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'

import { envServer } from '@/config/env'
import { generateTitle } from '@/payload/shared/services'

// plugins
export const plugins: Plugin[] = [
  payloadCloudPlugin(),
  seoPlugin({ generateTitle }),
  s3Storage({
    collections: {
      images: { prefix: 'images' },
    },
    bucket: envServer.S3_BUCKET,
    config: {
      credentials: {
        accessKeyId: envServer.S3_ACCESS_KEY_ID,
        secretAccessKey: envServer.S3_SECRET_ACCESS_KEY,
      },
      region: envServer.S3_REGION,
      endpoint: envServer.S3_ENDPOINT,
      forcePathStyle: true,
    },
  }),
  // translator({
  //   collections: ['categories', 'products'],
  //   globals: [],
  //   resolvers: [
  //     copyResolver(),
  //     openAIResolver({
  //       apiKey: envServer.OPENAI_API_KEY,
  //     }),
  //   ],
  // }),
]
