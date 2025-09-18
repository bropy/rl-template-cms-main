import { IncomingCollectionVersions } from 'node_modules/payload/dist/versions/types'

// version field
export const versionField: IncomingCollectionVersions = {
  drafts: {
    autosave: {
      interval: 30000,
    },
  },
  maxPerDoc: 11,
}
